var express = require('express');
var router = express.Router();

const queries = require('../db/queries')
const { validTodo, validId } = require('../lib/validations');
const setStatusRenderError = require('../lib/responseHelpers');

/* GET home page. */
/* This router is mounted at /todo */
router.get('/', (req, res) => {
  queries
    .getAll()
    .then(todos => {
      // res.json(todos)
      res.render('all', { todos: todos });
    });
});

router.get('/new', (req, res) => {
  res.render('new');
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  respondAndRenderTodo(id, res, 'single');
});

router.get('/:id/edit', (req, res) => {
  const id = req.params.id;
  respondAndRenderTodo(id, res, 'edit');
});

router.post('/', (req, res) => {
  validateTodoRenderError(req, res, (todo) => {
    todo.date = new Date();
    queries
      .create(todo)
      .then(ids => {
        const id = ids[0];
        res.redirect(`/todo/${id}`);
      });
  });
});

router.put('/:id', (req, res) => {
  validateTodoRenderError(req, res, (todo) => {
    const id = req.params.id;
    queries.
      update(id, todo)
      .then(() => {
        res.redirect(`/todo/${id}`);
      });
  });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  if (validId(id)) {
    queries
      .delete(id)
      .then(() => {
        res.redirect('/todo');
      });
  } else {
    setStatusRenderError(res, 500, 'Invalid id')
  }
});

function validateTodoRenderError(req, res, callback) {
  if (validTodo(req.body)) {
    const todo = {
      title: req.body.title,
      description: req.body.description,
      priority: req.body.priority
    };

    callback(todo);
  } else {
    setStatusRenderError(res, 500, 'Invalid todo')
  }
}

function respondAndRenderTodo(id, res, viewName) {
  if (validId(id)) {
    queries
      .getOne(id)
      .then(todo => {
        if (todo) {
          res.render(viewName, todo);
        }
        else {
          setStatusRenderError.setStatusRenderError(res, 500, 'Invalid id')
        }
      });
  } else {
    setStatusRenderError(res, 500, 'Invalid id')
  }
}
function setStatusRenderError1(res, statusCode, message) {
  res.status(statusCode);
  res.render('error', {
    message
  });
}

module.exports = router;
