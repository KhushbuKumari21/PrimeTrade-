import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [token, setToken] = useState("");
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null); // for editing
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");

  const API = "http://localhost:5000/api/v1";

  // REGISTER
  const register = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      setMsg("All fields are required");
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
      setName("");
      setEmail("");
      setPassword("");
    } catch (e) {
      setMsg(e.response?.data?.msg || "Registration failed");
    }
  };

  // LOGIN
  const login = async () => {
    if (!email.trim() || !password.trim()) {
      setMsg("Email and Password are required");
      return;
    }

    try {
      const res = await axios.post(API + "/auth/login", {
        email,
        password,
      });

      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      setMsg("Login successful");

      loadTasks(res.data.token);
      setEmail("");
      setPassword("");
    } catch (e) {
      setMsg(e.response?.data?.msg || "Login failed");
    }
  };

  // LOAD TASKS
  const loadTasks = async (customToken) => {
    try {
      const res = await axios.get(API + "/tasks", {
        headers: { authorization: `Bearer ${customToken || token}` },
      });
      setTasks(res.data);
    } catch {
      setMsg("Failed to load tasks");
    }
  };

  // ADD OR UPDATE TASK
  const saveTask = async () => {
    if (!title.trim()) {
      setMsg("Title is required");
      return;
    }

    try {
      if (editingTaskId) {
        // UPDATE
        await axios.put(
          `${API}/tasks/${editingTaskId}`,
          { title },
          { headers: { authorization: `Bearer ${token}` } }
        );
        setMsg("Task updated");
        setEditingTaskId(null);
      } else {
        // ADD
        await axios.post(
          API + "/tasks",
          { title },
          { headers: { authorization: `Bearer ${token}` } }
        );
        setMsg("Task added");
      }

      setTitle("");
      loadTasks();
    } catch {
      setMsg("Operation failed");
    }
  };

  // DELETE TASK
  const deleteTask = async (id) => {
    await axios.delete(`${API}/tasks/${id}`, {
      headers: { authorization: `Bearer ${token}` },
    });
    loadTasks();
  };

  // START EDITING TASK
  const editTask = (task) => {
    setEditingTaskId(task._id);
    setTitle(task.title);
    setMsg("Editing task");
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
    setMsg("");
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

        <p className="msg">{msg}</p>
      </div>
    );

  return (
    <div className="container">
      <h2>Dashboard</h2>

      <button className="logout" onClick={logout}>
        Logout
      </button>

      <input
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button onClick={saveTask}>{editingTaskId ? "Update Task" : "Add Task"}</button>

      <p className="msg">{msg}</p>

      {tasks.map((task) => (
        <div className="task" key={task._id}>
          <span>{task.title}</span>
          <div>
            <button onClick={() => editTask(task)}>Edit</button>
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;