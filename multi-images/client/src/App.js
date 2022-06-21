import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState({
    title: "",
    description: "",
    completed: false,
  });

  const loadTodos = async () => {
    try {
      let res = await fetch("http://localhost:5000/todos");
      res = await res.json();
      if (res.success) {
        setTodos(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const postTodo = async (e) => {
    e.preventDefault();
    console.log(todo);
    try {
      let res = await fetch("http://localhost:5000/todos", {
        method: "POST",
        body: JSON.stringify(todo),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <div className="App">
      <div className="box">
        <h1>add Todo</h1>
        <form method="post" onSubmit={postTodo}>
          <input
            type="text"
            name="description"
            placeholder="description"
            value={todo.description}
            onChange={(e) => setTodo({ ...todo, description: e.target.value })}
          />
          <input
            type="text"
            name="title"
            placeholder="title"
            value={todo.title}
            onChange={(e) => setTodo({ ...todo, title: e.target.value })}
          />
          <button type="submit">add todo</button>
        </form>
      </div>

      <div className="box">
        <h1>all Todos</h1>
        {todos.map((item) => (
          <div className="todo" key={item.id}>
            <p>{item.title}</p>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
