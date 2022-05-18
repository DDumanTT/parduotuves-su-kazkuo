import { useState, useEffect } from "react";
import { Table, Button } from "reactstrap";
import { Link } from "react-router-dom";

import { axiosAuth } from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import DelModal from "../../components/DelModal";
import { getUsers, deleteUser } from "./UsersRequests";
import Roles from "./Roles";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const deleteItem = (id) => {
    deleteUser(id)
      .then((response) => {
        setUsers((prev) => prev.filter((user) => user.id !== id));
      })
      .catch((err) => console.log(err.response.data));
  };

  useEffect(() => {
    setLoading(true);
    getUsers()
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((err) => console.log(err.response.data));
  }, []);

  return (
    <>
      <h1>Users</h1>
      <Table responsive hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created</th>
            <th>Updated</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item) => {
            console.log(item);
            const created = item.created
              ? new Date(item.created).toUTCString()
              : "-";
            const updated = item.updated
              ? new Date(item.updated).toUTCString()
              : "-";
            return (
              <tr key={item.id}>
                <th scope="row">{item.id}</th>
                <td>{item.firstName ?? "-"}</td>
                <td>{item.lastName ?? "-"}</td>
                <td>{item.email}</td>
                <td>{item.role}</td>
                <td>{created}</td>
                <td>{updated}</td>
                {/* <td>{item.website}</td> */}
                <td>
                  <div style={{ width: "110px" }}>
                    <Button
                      tag={Link}
                      to={`edit/${item.id}`}
                      color="warning"
                      style={{ marginRight: 5 }}
                    >
                      Edit
                    </Button>
                    <DelModal item={item} onConfirm={deleteItem} />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Button tag={Link} to="create" color="success">
        Create
      </Button>
    </>
  );
}
