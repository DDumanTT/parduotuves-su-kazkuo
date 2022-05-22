import { useState, useEffect } from "react";
import { Table, Button } from "reactstrap";
import { Link } from "react-router-dom";

import { axiosAuth } from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import DelModal from "../../components/DelModal";
import { getScrapers, deleteScraper } from "./ScraperRequests";

export default function ScraperPage() {
  const [scrapers, setScrapers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const deleteItem = (id) => {
    deleteScraper(id)
      .then((response) => {
        //   TODO implement by scraper
        setScrapers((prev) => prev.filter((user) => user.id !== id));
      })
      .catch((err) => console.log(err.response.data));
  };

  useEffect(() => {
    setLoading(true);
    getScrapers()
      .then((response) => {
        setScrapers(response.data);
        setLoading(false);
      })
      .catch((err) => console.log(err.response.data));
  }, []);

  return (
    <>
    NOT IMPLEMENTED
      <h1>Scrapers</h1>
      <Table responsive hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Created</th>
            <th>Updated</th>
            <th>Path</th>
            <th>Frequency</th>
            <th>Shop Id</th>
            <th>Updated</th>
            {/* TODO remove auctions th */}
            <th>Actions</th> 
          </tr>
        </thead>
        <tbody>
          {scrapers.map((item) => {
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
