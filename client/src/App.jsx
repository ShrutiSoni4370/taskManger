import './App.css'
import { useState, useEffect } from "react";
import axios from "axios";

function App() {

  const API = "http://localhost:3000/tasks";

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [selectedTask, setSelectedTask] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  // 🔄 Fetch tasks
  const fetchTasks = async () => {
    try {
      const res = await axios.get(API);
      setTasks(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ➕ Create task
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(API, { title, content });
      setTitle("");
      setContent("");
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  // ❌ Delete task
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  // ✏️ Update task
  const handleUpdate = async () => {
    try {
      await axios.put(`${API}/${selectedTask._id}`, {
        title: editTitle,
        content: editContent,
      });

      setEditMode(false);
      setSelectedTask(null);
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex p-6 bg-gray-100 gap-6">

      {/* LEFT: FORM */}
      <div className="w-1/3 bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-bold mb-4">Create Task</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Title"
            className="p-2 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Content"
            className="p-2 border h-80 rounded"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <button className="bg-blue-500 text-white p-2 rounded">
            Add Task
          </button>
        </form>
      </div>

      {/* RIGHT: TASK LIST */}
      <div className="w-2/3 bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-bold mb-4">Tasks</h2>

        <div className="flex flex-col gap-4">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="p-4 border rounded cursor-pointer hover:bg-gray-50"
              onClick={() => {
                setSelectedTask(task);
                setEditMode(false);
              }}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">{task.title}</h3>

                <div className="flex gap-2">
                  {/* DELETE */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(task._id);
                    }}
                    className="text-red-500"
                  >
                    🗑
                  </button>

                  {/* EDIT */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedTask(task);
                      setEditMode(true);
                      setEditTitle(task.title);
                      setEditContent(task.content);
                    }}
                    className="text-blue-500"
                  >
                    ✏️
                  </button>
                </div>
              </div>

              <p className="text-sm text-gray-600 truncate">
                {task.content}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 📌 MODAL */}
      {selectedTask && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-1/3 relative">

            <button
              onClick={() => {
                setSelectedTask(null);
                setEditMode(false);
              }}
              className="absolute top-2 right-2"
            >
              ❌
            </button>

            {editMode ? (
              <>
                <h2 className="text-xl font-bold mb-4">Edit Task</h2>

                <input
                  className="w-full p-2 border rounded mb-3"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />

                <textarea
                  className="w-full p-2 border rounded mb-3"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                />

                <button
                  onClick={handleUpdate}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Update
                </button>
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold mb-2">
                  {selectedTask.title}
                </h2>

                <p className="text-gray-700 mb-4">
                  {selectedTask.content}
                </p>

                <button
                  onClick={() => {
                    setEditMode(true);
                    setEditTitle(selectedTask.title);
                    setEditContent(selectedTask.content);
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Edit
                </button>
              </>
            )}

          </div>
        </div>
      )}

    </div>
  );
}

export default App;