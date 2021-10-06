import { useState, useEffect } from "react";
import { Button, Form, Header, Input, Modal } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import json from "json5";
import { Font } from "../styles/Styling";
export default function Microgrid({data, status, setStatus}) {
  const [name, setName] = useState("");
  const [port, setPort] = useState("");
  const [address, setAddress] = useState("");
  const [open, setOpen] = useState(false);
  const [blockchain, setBlockchain] = useState("");

  const list = {
    name: name,
    port: port,
    address: address,
    status: "Pending",
    blockchain: blockchain,
  };
    try {

      const data1 =  data.filter(
        (a) => a.blockchain == blockchain && a.status == "Verified"
      );
      setAmount(data1[0].Energy);
      setStatus(data1[0].status);
    } catch (error) {}

    // console.log(amount)
  // }, []);

  const onSubmit = async (e) => {
    // await e.preventDefault()
    await console.log(list);
    // COMMENT: Start Server Before uncommenting below
    const response = await fetch("http://127.0.0.1:5000/check", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(list),
    });
    const data1 = await response.text();
    // const data = "Verified";
    setStatus(data1);
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
                      placeholder="Owner of the Grid"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Field>
                  <Form.Field>
                    <Input
                      placeholder="IP Address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </Form.Field>
                  <Form.Field>
                    <Input
                      placeholder="Port Number"
                      value={port}
                      onChange={(e) => setPort(e.target.value)}
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
                onClick={() => {
                  setOpen(false), onSubmit();
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
