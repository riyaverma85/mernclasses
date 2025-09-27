import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import BackendUrl from '../utils/BackendUrl';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(`${BackendUrl}task/all`, {
          headers: { Authorization: token }
        });
        setTasks(res.data.tasks);
      } catch (err) {
        toast.error(err.response.data.message || "Error fetching tasks");
      }
    }
    fetchTasks();
  }, [refresh]);

  const submitTask = async (id) => {
    try {
      await axios.put(`${BackendUrl}task/submit/${id}`, {}, {
        headers: { Authorization: token }
      });
      toast.success("Task submitted!");
      setRefresh(!refresh);
    } catch (err) {
      toast.error(err.response.data.message || "Error submitting task");
    }
  }

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2>User Dashboard</h2>
        <div className="table-responsive mt-4">
          <table className="table table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Assigned By</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map(task => (
                <tr key={task._id}>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>{task.assignedBy.name}</td>
                  <td>{task.status}</td>
                  <td>
                    {task.status === 'pending' && (
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => submitTask(task._id)}
                      >
                        Submit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {tasks.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center">No tasks assigned</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer position="top-center" />
    </>
  )
}

export default UserDashboard;
