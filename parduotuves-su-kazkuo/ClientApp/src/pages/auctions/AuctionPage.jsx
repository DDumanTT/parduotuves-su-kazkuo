import { useState, useEffect } from "react";
import { Table, Button, UncontrolledAlert } from "reactstrap";
import { Link, Route, Routes } from "react-router-dom";
import { axiosAuth } from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import BetModal from "../../components/BetModal";
import moment from "moment";

export default function DataTable() {
  const [auctions, setAuctions] = useState([{bid: []}]);
  const [bidError, setBidError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    fetchAuctions();
  }, []);

  const fetchAuctions = () => {
    axiosAuth
      .get("/auctions", {
        headers: { Authorization: `Bearer ${user.jwtToken}` },
      })
      .then((response) => {
        setAuctions(response.data);
      })
      .catch((err) => console.log(err.response.data));
  };

  const onConfirm = (id, bidSize, close) => {
    axiosAuth
      .post(
        "/auctions/" + id,
        {
          amount: bidSize,
        },
        {
          headers: { Authorization: `Bearer ${user.jwtToken}` },
        }
      )
      .then((response) => {
        fetchAuctions();
        close();
        setShowSuccess(true)
        setTimeout(() => {
          setShowSuccess(false)
        }, 2100);
      })
      .catch((err) => {
        console.log(err.response.data);
        setBidError(err.response.data.message);
      });
  };

  const resetAuctions = (e) => {
    e.preventDefault();
    axiosAuth
    .delete(
      "/auctions/",
      {
        headers: { Authorization: `Bearer ${user.jwtToken}` },
      }
    )
    .then((response) => {
      axiosAuth.post("/auctions/", {
        ExpirationDate: moment().add(10, 'minute').format(("YYYY-MM-DDTHH:mm:ss")),
        Name: "IRL Among Us vent (aka subway vent)",
        Bid: [],
        Prize: {
          Name: "Among Us vent"
        }
      }).then(res => {
        axiosAuth.post("/auctions/", {
          ExpirationDate: moment().add(5, 'minute').format(("YYYY-MM-DDTHH:mm:ss")),
          Name: "Large yellow banana, straight from uganda.",
          Bid: [],
          Prize: {
            Name: "1x Banana"
          }
        }).then(res => {
          axiosAuth.post("/auctions/", {
            ExpirationDate: moment().add(1.2, 'minute').format(("YYYY-MM-DDTHH:mm:ss")),
            Name: "Nothing - yep, you read it right!",
            Bid: [],
            Prize: {
              Name: "full 1x of nothing"
            }
          }).then(res => {
            fetchAuctions();
          })
        })
      })
    })
    .catch((err) => {
      console.log(err.response.data);
    });
  }


  return (
    <>
      <h1>Auctions</h1>
      {showSuccess && (
        <UncontrolledAlert>
          <h6 className="alert-heading">Hurray!</h6>
          Your bid was successful.
        </UncontrolledAlert>
      )}
      <Table responsive hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Current Bid</th>
            <th>Highest bidder: </th>
            <th>Expiration Date</th>
          </tr>
        </thead>
        <tbody>
          {auctions.map((item) => {
            return (
              <tr key={item.id}>
                <th scope="row">{item.id}</th>
                <td>{item.name}</td>
                <td>{item.bid.length ? Math.max(...item.bid.map((x) => x.amount)) : "None"}</td>
                {/* {console.log(item.bid.reduce((max, bid) => max.amount > bid.amount ? max : bid, {amount: 0}))} */}
                <td>{item.bid.length ? item.bid.reduce((max, bid) => max.amount > bid.amount ? max : bid).account.email : "None"}</td>
                <td>{moment(item.expirationDate).fromNow()}</td>
                <td>
                  <div style={{ width: "110px" }}>
                    <BetModal
                      item={item}
                      error={bidError}
                      onConfirm={onConfirm}
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Button tag={Link} to="create" color="success" onClick={resetAuctions}>
        Reset auctions
      </Button>
    </>
  );
}
