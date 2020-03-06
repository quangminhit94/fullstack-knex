
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('todo').del()
    .then(function () {
      // Inserts seed entries
      const todos = [
        {
          title: 'Build a CRUD app',
          priority: 1,
          date: new Date()
        },
        {
          title: 'Do something',
          priority: 3,
          date: new Date()
        },
        {
          title: 'Render a view',
          priority: 2,
          date: new Date()
        },
        {
          title: 'Walk with dog',
          priority: 5,
          date: new Date()
        }
      ];
      return knex('todo').insert(todos)
    });
};
