import { useState, useEffect } from "react";
import { Button, Form, Header, Input, Modal } from "semantic-ui-react";

export default function Microgrid() {
  const [name, setName] = useState("");
  const [port, setPort] = useState("");
  const [address, setAddress] = useState("");
  //Creating a comment jus for Github commit
  const list = {
    name: name,
    port: port,
    address: address,
    status: "Pending",
  };
  // COMMENT: Start Server Before uncommenting below
  //   useEffect( async () => {
  //     const res = await fetch('http://127.0.0.1:5000/check')
  //     const data = await res.text()
  //     console.log(data)
  //   }, [])
  const [status, setStatus] = useState("Not Connected");
  const [open, setOpen] = useState(false);
  const onSubmit = async (e) => {
    // await e.preventDefault()
    await console.log(list);
    // COMMENT: Start Server Before uncommenting below
    // const response =  await fetch('http://127.0.0.1:5000/check', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type' : 'application/json'
    //   },
    //   body: JSON.stringify(list),
    // })
    // const data = await response.text()
    const data = "Verified";
    await setStatus(data);
  };
  return (
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
  );
}
