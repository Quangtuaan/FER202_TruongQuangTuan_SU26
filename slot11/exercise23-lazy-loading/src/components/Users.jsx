import { useEffect, useState } from "react";
import { fetchUsers } from "../api";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers()
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading users:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="loading">Loading users...</p>;
  }

  return (
    <div>
      <section className="hero">
        <h1>👥 Users</h1>
      </section>

      <div className="user-list">
        {users.map((user) => (
          <div className="user-card" key={user.id}>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Users;