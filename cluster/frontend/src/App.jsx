import {useEffect, useState } from "react";
import axios from "axios";


const App = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [newUser, setNewUser] = useState({ name: "", email: "", age: "" });
  const limit = 3;

  const fetchUsers = async (pageNumber) => {
    const res = await axios.get(`http://localhost:5000/users?page=${pageNumber}&limit=${limit}`);
    setUsers(res.data.users);
    setTotalPages(res.data.totalPages);
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/add-user", newUser);
    setNewUser({ name: "", email: "", age: "" });
    fetchUsers(page);
  };

  return (
    <div className="container">
      <h2>Dynamic Pagination Example</h2>

      {/* Add User Form */}
      <form onSubmit={handleAddUser} className="user-form">
        <input
          name="name"
          value={newUser.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          name="email"
          value={newUser.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          name="age"
          value={newUser.age}
          onChange={handleChange}
          placeholder="Age"
          type="number"
          required
        />
        <button type="submit">Add User</button>
      </form>

      {/* Users Table */}
      <div className="table-wrapper">
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
          ⬅ Prev
        </button>
        <span>Page {page} of {totalPages}</span>
        <button onClick={() => setPage((p) => Math.min(p + 1, totalPages))} disabled={page === totalPages}>
          Next ➡
        </button>
      </div>
    </div>
  );
};

export default App;
