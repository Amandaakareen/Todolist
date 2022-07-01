import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [text, setText] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [countTasks, setCountTasks] = useState(0);

  const url = "http://localhost:3333/tasks";

  useEffect(() => {
    getTasks();
  }, []);

  function getTasks() {
    axios
      .get(url)
      .then((response) => setTaskList(response.data))
      .catch((error) => console.error(error));
  }

  function addTask() {
    axios.post(url, { description: text }).then(() => {
      setDescription("");
      getTasks();
    });
  }

  function updateTaskForChecked(id) {
    axios.put(`${url}/${id}`, { completed: 1 }).then(() => {
      getTasks();
      setCountTasks(countTasks + 1);
    });
  }

  function deleteTaks(id) {
    axios.delete(`${url}/${id}`).then((response) => getTasks());
  }

  return (
    <div className="wrapper">
      <header>
        <h1>Todo List</h1>
        <p>
          Quando se sabe o que quer, a caminhada se torna mas focada e
          determinada
        </p>
      </header>
      <main>
        <header>
          <input
            type="text"
            name="description"
            id="description"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button onClick={() => addTask()}>
            <i className="fas fa-plus"></i>
          </button>
        </header>
        <ul>
          {taskList.map((item) => {
            return (
              <li key={item.id.toString()}>
                <p className={item.completed && "completed"}>
                  {item.description}
                </p>
                <button
                  onClick={() => updateTaskForChecked(item.id)}
                  className={item.completed && "completed"}
                >
                  <i className="fas fa-check-circle"></i>
                </button>
                <button
                  onClick={() => deleteTaks(item.id)}
                  className={item.completed && "completed"}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </li>
            );
          })}
        </ul>
      </main>
      <footer>
        <p>Você possui {countTasks} atividades completas</p>
      </footer>
    </div>
  );
}

export default App;
