import { useState, useEffect } from "react";
import { axiosAuth } from "../api/axios";
import useAuth from "../hooks/useAuth";
import {
  Button,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Input,
  Label,
  FormFeedback,
  FormGroup,
} from "reactstrap";

export default function BetModal({ item, onConfirm, error }) {
  const [open, setOpen] = useState(false);
  const [bidSize, setBidSize] = useState(0);
  const [money, setMoney] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    axiosAuth
      .get(`/accounts/${user.id}`, {
        headers: { Authorization: `Bearer ${user.jwtToken}` },
      })
      .then((response) => {
        setMoney(response.data.money);
      })
      .catch((err) => console.log(err.response.data));
  }, [open]);

  const minBid = item.bid.length ? Math.max(...item.bid.map((x) => x.amount)) : false;
  return (
    <>
      <Button color="warning" onClick={() => setOpen(true)}>
        Bid
      </Button>
      <Modal centered isOpen={open} toggle={() => setOpen(false)}>
        <ModalHeader>Enter bid size</ModalHeader>
        <ModalBody>
          <p>Remaining money: {money}</p>
          {minBid && <p>Current bid: {minBid}</p>}
          <FormGroup className="position-relative">
            <Label for="exampleEmail">Bid size</Label>
            <Input
              placeholder="Enter bid size:"
              rows={5}
              type="number"
              invalid={!!error}
              onChange={(e) => setBidSize(e.target.value)}
            />
            <FormFeedback tooltip>{error}</FormFeedback>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={() => {
              onConfirm(item.id, bidSize, setOpen.bind(false));
            }}
          >
            Confirm
          </Button>
          <Button color="danger" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
