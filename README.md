#

### Parent Component

```js
import React, { useState } from "react";
import Child from "./Child";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";
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
  // get array index key when edit event call from child
  const [editIndex, setEditIndex] = useState(null);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      // update user
      const updatedUserList = userList.map((item, index) =>
        index === editIndex ? user : item
      );
      setUserList(updatedUserList);
      toast.success("User updated successfully!");
    } else {
      // add new user
      const newUser = { ...user, uuid: uuidv4() };
      setUserList([...userList, newUser]);
      toast.success("User added successfully!");
      console.log(user);
    }
    resetFormHandler();
  };

  const resetFormHandler = () => {
    setUser(initUserState);
    setEditIndex(null);
  };

  // delete event perform once it call from child
  const deleteEventHandler = (keyIndex) => {
    setUserList(userList.filter((_, index) => index !== keyIndex));
    toast.success("User deleted successfully!");
  };

  // edit event perform once it call from child
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
            {/* child componet with props. left side belongs to child component & right side within the brace belongs to parent component */}
            {/* when child call/trigger any operation then the call should be emit in parent like function */}
            {/* child to parent ==> function/event should emit */}
            {/* parent to child only pass the data in props */}
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
                      {editIndex !== null ? "Save Changes" : "Add User"}
                    </Button>{" "}
                    <Button
                      type="button"
                      variant={editIndex !== null ? "danger" : "secondary"}
                      onClick={resetFormHandler}
                    >
                      {editIndex !== null ? "Cancel" : "Reset"}
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
```

### Child Component

```js
import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { FiUsers } from "react-icons/fi";

const Child = ({
  receiveUserListFromParent,
  onDeleteEventFromChild,
  onEditEventFromChild,
}) => {
  const [getUserList, setUserList] = useState([]);

  useEffect(() => {
    setUserList(receiveUserListFromParent);
    console.log(receiveUserListFromParent);
  }, [receiveUserListFromParent]);

  const maskString = (str) => {
    if (str.length <= 8) {
      return str;
    }
    const firstPart = str.slice(0, 4);
    const lastPart = str.slice(-4);
    const masked = `${firstPart}-****-${lastPart}`;
    return masked;
  };

  return (
    <>
      <h2>
        <FiUsers className="mtx-10" /> User List
      </h2>
      <Card>
        <Card.Body>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>UUID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone No</th>
                <th>#</th>
              </tr>
            </thead>
            <tbody>
              {getUserList && getUserList.length > 0 ? (
                getUserList.map((item, index) => (
                  <tr key={"user-" + index}>
                    <td>{index + 1}</td>
                    <td>{maskString(item.uuid)}</td>
                    <td>{item.firstName + " " + item.lastName}</td>
                    <td>{item.email}</td>
                    <td>{item.phoneNumber}</td>
                    <td>
                      <Button
                        type="button"
                        variant="success"
                        size="sm"
                        onClick={() => onEditEventFromChild(index)}
                      >
                        Edit
                      </Button>
                      <Button
                        type="button"
                        variant="danger"
                        size="sm"
                        className="mx-2"
                        onClick={() => onDeleteEventFromChild(index)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6}>No User Found! Please Add User</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </>
  );
};

export default Child;
```