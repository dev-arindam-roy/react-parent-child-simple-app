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
  }

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
