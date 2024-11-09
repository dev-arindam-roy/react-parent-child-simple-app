import React, { useState } from "react";
import Header from "./Header";
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

  const getRandomString = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const randomLength = Math.floor(Math.random() * 3) + 4; // Random length between 4 and 6
    let result = "";
    for (let i = 0; i < randomLength; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return capitalizeFirstChar(result);
  };

  const capitalizeFirstChar = (str) => {
    if (!str) return ""; // Handle empty strings
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const getRandomPhoneNumber = () => {
    const firstDigit = Math.floor(Math.random() * 9) + 1; // Ensures the first digit is between 1 and 9
    const remainingDigits = Math.floor(Math.random() * 1_000_000_000)
      .toString()
      .padStart(9, "0"); // Generates a 9-digit string
    return `${firstDigit}${remainingDigits}`;
  };

  // child event emit from header component
  const loadUserEventHandler = () => {
    let randomUserBucket = [];
    for (let i = 1; i <= 100; i++) {
      let _tempUser = {
        uuid: uuidv4(),
        firstName: getRandomString(),
        lastName: getRandomString(),
        email: getRandomString() + "@" + getRandomString() + ".onex",
        phoneNumber: getRandomPhoneNumber(),
      };
      randomUserBucket.push(_tempUser);
    }
    // merge old/previous users with the random created userbucket
    const mergeUserList = [...userList, ...randomUserBucket];
    setUserList(mergeUserList);
    //console.log(randomUserBucket);
    Swal.fire({
      title: "Please wait...",
      html: "System is <strong>processing</strong> your request",
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
    }).then(() => {
      Swal.close();
      toast.success("Random user loaded successfully!");
    });
  };

  // child event emit from header component
  const deleteAllUserEventHandler = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to remove all users",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0d6efd",
      cancelButtonColor: "#dc3545",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        setUserList([]);
        resetFormHandler();
        toast.success("All users deleted successfully!");
      }
    });
  };

  return (
    <>
      <Container fluid="md" className="mt-3">
        {/* header child component */}
        <Header
          onLoadUserEventFromChild={loadUserEventHandler}
          deleteAllUserEventFromChild={deleteAllUserEventHandler}
          receiveUserListFromParent={userList}
        />
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
