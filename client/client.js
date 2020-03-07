// test cors error
const API_URL = 'http://localhost:3000/todo'
$(() => {
  $.get(API_URL).then(todos => {
    todos.map(todo => {
      console.log(todo)
    })
  });
});