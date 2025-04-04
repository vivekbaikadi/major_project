import React, { useState } from "react";
import Button from "@mui/material/Button";
import { useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchUsers = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await axios.get("http://localhost:4000/api/user");
            if (response.data.success && Array.isArray(response.data.users)) {
                setUsers(response.data.users);
            } else {
                setUsers([]);
                setError("No users found.");
            }
        } catch (err) {
            setUsers([]);
            setError("Failed to fetch users. Please try again.");
            console.error("Error fetching users:", err);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="right-content w-100">
            <h2 className="mb-3 text-center">All Users</h2>

            {loading && <p className="text-info text-center">Loading users...</p>}
            {error && <p className="text-danger text-center">{error}</p>}


            {users.length > 0 ? (
                <div className="table-responsive">
                    <table className="table table-striped table-bordered table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                !loading && <p className="text-muted text-center">No users found.</p>
            )}
            <div className="text-center mb-3">
                <Button variant="contained" color="primary" onClick={fetchUsers}>
                    Refresh Users
                </Button>
            </div>
        </div>
    );
};

export default UserList;
