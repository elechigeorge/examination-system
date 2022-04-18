import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../component/Message";
import Loader from "../component/Loader";
import FormContainer from "../component/FormContainer";
import { register } from "../action/user";
import Select from "react-select";

const Register = () => {
  const [fullname, setFullName] = useState("");
  const [department, setDepartment] = useState("");
  const [matric_number, setMatricNumber] = useState("");
  const [isStudent, setIsStudent] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo && userInfo.isStudent) {
      return navigate("/student/dashboard");
    } else if (userInfo && userInfo.isStudent == false) {
      return navigate("/admin/dashboard");
    }
  }, [dispatch, navigate, register]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      email !== "" &&
      fullname !== "" &&
      password !== "" &&
      department !== ""
    ) {
      dispatch(
        register(
          fullname,
          matric_number,
          department.value,
          isStudent.value,
          email,
          password
        )
      );
    }
  };
  const options = [
    { value: "computer_science", label: "Computer Science" },
    { value: "business_admin", label: "Business Administration" },
    { value: "science_lab", label: "Science Laboratory Tech" },
    { value: "computer_engineering", label: "Computer Engineering" },
    { value: "electrical_engineering", label: "Electrical Engineering" },
    { value: "accountancy", label: "Accountancy" },
  ];

  const options2 = [
    { value: true, label: "True" },
    { value: false, label: "False" },
  ];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
        marginTop: "20px",
      }}
    >
      <FormContainer>
        <h1 className="text-primary text-uppercase mt-5">
          Register an account
        </h1>

        {loading && <Loader />}
        {error && (
          <Message variant="danger">
            {error}
          </Message>
        )}

        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter Full Name"
              value={fullname}
              onChange={(e) => setFullName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="gender">
            <Form.Label>Matric Number </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Matric Number"
              value={matric_number}
              onChange={(e) => setMatricNumber(e.target.value)}
            ></Form.Control>
            <Form.Text>
              Please ignore this field, if you are not a student
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Select Department</Form.Label>
            <Select options={options} onChange={setDepartment} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Are you a student</Form.Label>
            <Select options={options2} onChange={setIsStudent} />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter secure passcode"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <div className="d-grid gap-2">
            <Button type="submit" variant="primary" className="btn-block mt-3">
              Register
            </Button>
          </div>
        </Form>

        <Row className="py-3">
          <Col>
            Have an account ? <Link to={"/login"}>Login</Link>
          </Col>
        </Row>
      </FormContainer>
    </div>
  );
};

export default Register;
