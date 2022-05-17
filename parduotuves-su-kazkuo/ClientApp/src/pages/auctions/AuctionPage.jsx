import { useState, useEffect } from "react";
import { Table, Button } from "reactstrap";
import { Link, Route, Routes } from "react-router-dom";
import { axiosAuth } from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import DelModal from "../../components/DelModal";
import ShopsCreate from "./ShopsCreate";
import ShopsEdit from "./ShopsEdit";

export default function DataTable() {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  // useEffect(() => {
  //   setLoading(true);
  //   axiosAuth
  //     .get("/shops", { headers: { Authorization: `Bearer ${user.jwtToken}` } })
  //     .then((response) => {
  //       setShops(response.data);
  //       setLoading(false);
  //     })
  //     .catch((err) => console.log(err.response.data));
  // }, []);

  return (
    <>
      <h1>Auctions</h1>
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
          {auctions.map((item) => {
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
                      Participate
                    </Button>{" "}
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
