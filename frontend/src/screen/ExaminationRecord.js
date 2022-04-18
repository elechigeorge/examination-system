import React, { useState, useEffect } from "react";
import { Form, Table } from "react-bootstrap";
import Select from "react-select";
import { useSelector, useDispatch } from "react-redux";
import { get_exams_by_department } from "../action/exam";
import Message from "../component/Message";
import Loader from "../component/Loader";
import Moment from "react-moment";

const ExaminationRecord = () => {
  const [selectedId, setSelectedId] = useState({});

  const dispatch = useDispatch();

  const submitSelectedPaper = (e) => setSelectedId(e);

  // fetch data from redux state
  const getAllExamByDepartment = useSelector(
    (state) => state.getAllExamByDepartment
  );
  const { loading, error, exams } = getAllExamByDepartment;

  // make new request when state value changes
  useEffect(() => {
    dispatch(get_exams_by_department(selectedId.value));
  }, [selectedId]);

  // loop over the subjects list from redux and set to options
  const options = [
    { value: "computer_science", label: "Computer Science" },
    { value: "business_admin", label: "Business Administration" },
    { value: "science_lab", label: "Science Laboratory Tech" },
    { value: "computer_engineering", label: "Computer Engineering" },
    { value: "electrical_engineering", label: "Electrical Engineering" },
    { value: "accountancy", label: "Accountancy" },
  ];

  const Header = ["Student", "Course Code", "Course Title", "Department"];

  return (
    <div className="container">
      <h2>Records of all exams </h2>

      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Select department</Form.Label>
          <Select options={options} onChange={submitSelectedPaper} />
        </Form.Group>
      </Form>

      <div>
        {loading && <Loader />}
        {error && <Message variant="danger">{error}</Message>}

        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Student</th>
                <th>Course Title</th>
                <th>Course Code </th>
                <th>Department</th>
                <th>Score</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {exams &&
                exams.map((exam) => (
                  <tr>
                    <td>{exam.user.fullname}</td>
                    <td>{exam.paper.title}</td>
                    <td>{exam.paper.code}</td>
                    <td>{exam.paper.department}</td>
                    <td>{exam.result}</td>
                    <td><Moment format="YYYY/MM/DD">{exam.createdAt}</Moment></td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ExaminationRecord;
