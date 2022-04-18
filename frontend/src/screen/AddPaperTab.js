import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { create_paper } from "../action/paper";
import Message from "../component/Message";
import Loader from "../component/Loader";

const AddPaperTab = () => {
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [department, setDepartment] = useState("");

  // other setup
  const dispatch = useDispatch();

  // redux state
  const createPaper = useSelector((state) => state.createPaper);
  const { loading, error, paper: success } = createPaper;

  const options = [
    { value: "computer_science", label: "Computer Science" },
    { value: "business_admin", label: "Business Administration" },
    { value: "science_lab", label: "Science Laboratory Tech" },
    { value: "computer_engineering", label: "Computer Engineering" },
    { value: "electrical_engineering", label: "Electrical Engineering" },
    { value: "accountancy", label: "Accountancy" },
  ];

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(create_paper(title, code, department.value));

    setTitle("");
    setCode("");
    setDepartment("");
  };

  return (
    <div>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      {success && <Message variant="success">Paper Created</Message>}
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label>Course Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Course Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Course Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Course Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Select Department</Form.Label>
          <Select options={options} onChange={setDepartment} />
        </Form.Group>

        <div className="d-grid gap-2">
          <Button type="submit" variant="primary" className="btn-block mt-3">
            Add New
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddPaperTab;
