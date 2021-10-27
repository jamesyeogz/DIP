import { useState, useEffect } from "react";
import { Button, Form, Header, Input, Modal } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import { Font } from "../styles/Styling";
import api from './axios'


export default function Microgrid({ blockchain , status}) {
  const [port, setPort] = useState(5050);
  const [address, setAddress] = useState("");
  const [open, setOpen] = useState(false);



  const onSubmit = async (event) => {
    await event.preventDefault()
    const list = {
      Address: blockchain,
      IP: address,
      Port: port,
    };
    console.log(list)
    try {
      const response = await api.post('/Mname/create', list)
      console.log(response)
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button>MicroGrid {status}</Button>}
      >
        {status == "Verified" && (
          <>
            <Modal.Header>You're Already Connected</Modal.Header>
            <Modal.Content>
              <Button color="black" onClick={() => setOpen(false)}>
                Close
              </Button>
            </Modal.Content>
          </>
        )}
        {status !== "Verified" && (
          <>
            <Modal.Header>Connect Microgrid</Modal.Header>
            <Modal.Content>
              <Modal.Description>Insert 3D Image Here</Modal.Description>
              <Modal.Description>
                <Header>Details Of MicroGrid</Header>
                <Form onSubmit={onSubmit}>
                  <Form.Field>
                    <Input
                      placeholder="IP Address"
                      value={address}
                      onChange={(event) => setAddress(event.target.value)}
                    />
                  </Form.Field>
                  <Form.Field>
                    <Input
                      placeholder="Port Number"
                      value={port}
                      onChange={(event) => setPort(event.target.value)}
                    />
                  </Form.Field>
                </Form>
              </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
              <Button color="black" onClick={() => setOpen(false)}>
                Nope
              </Button>
              <Button
                content="Yep, that's me"
                labelPosition="right"
                icon="checkmark"
                onClick={(event) => {
                  setOpen(false), onSubmit(event);
                }}
                positive
              />
            </Modal.Actions>
          </>
        )}
      </Modal>
    </>
  );
}
