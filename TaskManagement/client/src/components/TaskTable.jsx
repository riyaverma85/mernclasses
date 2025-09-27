
import { useState } from 'react';
import axios from 'axios';
import BackendUrl from '../utils/BackendUrl';
import { toast } from 'react-toastify';

const TaskTable = ({tasks,refresh,setRefresh}) => {
  const token = localStorage.getItem("token");

  const submitTask = async (id)=>{
    try{
      await axios.put(`${BackendUrl}task/submit/${id}`, {}, { headers:{Authorization: token}});
      toast.success("Task submitted!");
      setRefresh(!refresh);
    }catch(err){ toast.error(err.response.data.message);}
  }

  return (
    <table className="table table-bordered">
      <thead className="table-dark">
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Assigned To</th>
          <th>Assigned By</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map(task=>(
          <tr key={task._id}>
            <td>{task.title}</td>
            <td>{task.description}</td>
            <td>{task.assignedTo.name}</td>
            <td>{task.assignedBy.name}</td>
            <td>{task.status}</td>
            <td>
              {task.status==='pending' && <button className="btn btn-success btn-sm" onClick={()=>submitTask(task._id)}>Submit</button>}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default TaskTable;
