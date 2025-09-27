import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import BackendUrl from '../utils/BackendUrl';
import TaskTable from '../components/TaskTable';
import UserForm from '../components/UserFrom';
import { ToastContainer, toast } from 'react-toastify';

const AdminDashboard = () => {
  const [tasks,setTasks] = useState([]);
  const [users,setUsers] = useState([]);
  const [refresh,setRefresh] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(()=>{
    // fetch tasks
    const fetchTasks = async () => {
      const res = await axios.get(`${BackendUrl}task/all`, { headers:{Authorization: token}});
      setTasks(res.data.tasks);
    }
    fetchTasks();

    // fetch users for assigning task
    const fetchUsers = async () => {
      const res = await axios.get(`${BackendUrl}user/all`, { headers:{Authorization: token}});
      setUsers(res.data.users);
    }
    fetchUsers();

  },[refresh]);

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2>Admin Dashboard</h2>
        <div className="row">
          <div className="col-md-4">
            <UserForm refresh={refresh} setRefresh={setRefresh}/>
          </div>
          <div className="col-md-8">
            <TaskTable tasks={tasks} refresh={refresh} setRefresh={setRefresh}/>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center"/>
    </>
  )
}

export default AdminDashboard;
