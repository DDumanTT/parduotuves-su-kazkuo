import { useState } from "react";
import { Button, Modal, ModalHeader, ModalFooter } from "reactstrap";

export default function DelModal({ item, onConfirm }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button color="danger" onClick={() => setOpen(true)}>
        Del
      </Button>
      <Modal centered isOpen={open} toggle={() => setOpen(false)}>
        <ModalHeader>Delete {item.name}?</ModalHeader>
        <ModalFooter>
          <Button color="success" onClick={() => onConfirm(item.id)}>
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
