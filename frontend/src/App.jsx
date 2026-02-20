import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [token, setToken] = useState("");

  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [name, setName] = useState("");

  const [msg, setMsg] = useState("");

  const API = "http://localhost:5000/api/v1";

  // REGISTER
  const register = async () => {
    if (!name || !email || !password) {
      setMsg("Fill all fields");

      return;
    }

    try {
      const res = await axios.post(API + "/auth/register", {
        name,

        email,

        password,

        role: "user",
      });

      setMsg(res.data.msg);
    } catch (e) {
      setMsg(e.response?.data?.msg || "Registration failed");
    }
  };

  // LOGIN
  const login = async () => {
    try {
      const res = await axios.post(API + "/auth/login", {
        email,

        password,
      });

      setToken(res.data.token);

      localStorage.setItem("token", res.data.token);

      setMsg("Login successful");

      // load tasks after login
      loadTasks(res.data.token);
    } catch (e) {
      setMsg(e.response?.data?.msg || "Login failed");
    }
  };

  // LOAD TASKS
  const loadTasks = async (customToken) => {
    try {
      const res = await axios.get(API + "/tasks", {
        headers: {
          authorization: `Bearer ${customToken || token}`,
        },
      });

      setTasks(res.data);
    } catch {
      setMsg("Failed to load tasks");
    }
  };

  // ADD TASK
  const addTask = async () => {
    if (!title) {
      setMsg("Title required");

      return;
    }

    await axios.post(
      API + "/tasks",

      { title },

      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    );

    setTitle("");

    loadTasks();
  };

  // DELETE TASK
  const deleteTask = async (id) => {
    await axios.delete(
      API + "/tasks/" + id,

      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    );

    loadTasks();
  };

  useEffect(() => {
    const saved = localStorage.getItem("token");

    if (saved) {
      setToken(saved);

      loadTasks(saved);
    }
  }, []);

  // LOGOUT
  const logout = () => {
    setToken("");

    localStorage.removeItem("token");

    setTasks([]);
  };

  // UI

  if (!token)
    return (
      <div className="container">
        <h2>PrimeTrade Assignment</h2>

        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={register}>Register</button>

        <button onClick={login}>Login</button>

        <p>{msg}</p>
      </div>
    );

  return (
    <div className="container">
      <h2>Dashboard</h2>

      <button onClick={logout}>Logout</button>

      <input
        placeholder="New Task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button onClick={addTask}>Add Task</button>

      <p>{msg}</p>

      {tasks.map((task) => (
        <div className="task" key={task._id}>
          {task.title}

          <button onClick={() => deleteTask(task._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;
