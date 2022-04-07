import { useState, useEffect } from "react";
import { Table, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { axiosAuth } from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import DelModal from "../../components/DelModal";

export default function DataTable() {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const { user } = useAuth();

  const deleteItem = (id) => {
    axiosAuth
      .delete(`/shops/${id}`, {
        headers: { Authorization: `Bearer ${user.jwtToken}` },
      })
      .then((response) => {
        setShops((prev) => prev.filter((shop) => shop.id !== id));
      })
      .catch((err) => console.log(err.response.data));
  };

  useEffect(() => {
    setLoading(true);
    axiosAuth
      .get("/shops", { headers: { Authorization: `Bearer ${user.jwtToken}` } })
      .then((response) => {
        setShops(response.data);
        setLoading(false);
      })
      .catch((err) => console.log(err.response.data));
  }, []);

  return (
    <>
      <Table responsive hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            {/* <th>Coordinates</th> */}
            <th>Address</th>
            {/* <th>Website</th> */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {shops.map((item) => {
            return (
              <tr key={item.id}>
                <th scope="row">{item.id}</th>
                <td>{item.name}</td>
                {/* <td>{item.coordinates}</td> */}
                <td>{item.address}</td>
                {/* <td>{item.website}</td> */}
                <td>
                  <div style={{ width: "110px" }}>
                    <Button tag={Link} to={`edit/${item.id}`} color="warning">
                      Edit
                    </Button>{" "}
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
