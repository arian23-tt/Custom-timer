class View {
    outputTimers(res, todoList) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(todoList));
    }

    outputTimer(res, todo) {
      if (!todo) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'TODO Not Found' }));
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(todo));
      }
    }
  

    outputCreatedTimer(res, newTodo) {
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newTodo.id));
    }
  
    outputUpdatedTimer(res, todo) {
      if (!todo) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'TODO Not Found' }));
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end();
      }
    }

    outputDeletedTimer(res, todo, id = 0) {
      if (!todo) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'TODO Not Found' }));
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: `TODO ${id} deleted` }));
      }
    }
  
    outputError(res, error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Internal Server Error' }));
      console.log(error);
    }
  }
  
  module.exports = {
    View,
  };