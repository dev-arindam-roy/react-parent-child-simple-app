import React, { useState } from "react";
import Child from "./Child";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { toast } from 'react-toastify';
import Swal from 'sweetalert2'
import { v4 as uuidv4 } from 'uuid';
import { FiUserPlus } from "react-icons/fi";
import "./User.css";

const initUserState = {
uuid: "",
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
};
const Parent = () => {
  const [user, setUser] = useState(initUserState);
  const [userList, setUserList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updatedUserList = userList.map((item, index) =>
        index === editIndex ? user : item
      );
      setUserList(updatedUserList);
      toast.success('User updated successfully!');
    } else {
        const newUser = { ...user, uuid: uuidv4() };
      setUserList([...userList, newUser]);
      toast.success('User added successfully!');
      console.log(user);
    }
    resetFormHandler();
  };

  const resetFormHandler = () => {
    setUser(initUserState);
    setEditIndex(null);
  };

  const deleteEventHandler = (keyIndex) => {
    setUserList(userList.filter((_, index) => index !== keyIndex));
    toast.success('User deleted successfully!');
  };

  const editEventHandler = (keyIndex) => {
    setUser(userList[keyIndex]);
    setEditIndex(keyIndex);
  };

  return (
    <>
      <Container fluid="md" className="mt-3">
        <Row>
          <Col>
            <h2>
              <strong>Parent - Child - Prop - App</strong>
            </h2>
            <hr />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col xs={12} md={8}>
            <Child
              receiveUserListFromParent={userList}
              onDeleteEventFromChild={deleteEventHandler}
              onEditEventFromChild={editEventHandler}
            />
          </Col>
          <Col xs={12} md={4}>
            <h2>
              <FiUserPlus className="mtx-10" /> Add / Edit User
            </h2>
            <Card>
              <Card.Body>
                <form onSubmit={formSubmitHandler}>
                  <Form.Group className="mb-3" controlId="user.firstName">
                    <Form.Label>
                      <strong>First Name:</strong>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="First Name"
                      required
                      value={user.firstName}
                      onChange={(e) =>
                        setUser({ ...user, firstName: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="user.lastName">
                    <Form.Label>
                      <strong>Last Name:</strong>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Last Name"
                      required
                      value={user.lastName}
                      onChange={(e) =>
                        setUser({ ...user, lastName: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="user.email">
                    <Form.Label>
                      <strong>Email Id:</strong>
                    </Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      required
                      value={user.email}
                      onChange={(e) =>
                        setUser({ ...user, email: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="user.phoneNumber">
                    <Form.Label>
                      <strong>Phone Number:</strong>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Phone Number"
                      required
                      value={user.phoneNumber}
                      onChange={(e) =>
                        setUser({ ...user, phoneNumber: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="user.phoneNumber">
                    <Button type="submit" variant="primary">
                      { (editIndex !== null) ? 'Save Changes' : 'Add User' }
                    </Button>{" "}
                    <Button
                      type="button"
                      variant={ (editIndex !== null) ? 'danger' : 'secondary' }
                      onClick={resetFormHandler}
                    >
                      { (editIndex !== null) ? 'Cancel' : 'Reset' }
                    </Button>{" "}
                  </Form.Group>
                </form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Parent;
