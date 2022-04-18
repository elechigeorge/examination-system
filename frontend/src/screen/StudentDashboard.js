import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, Container, ListGroup, ListGroupItem } from "react-bootstrap";
import ExamDetail from "../component/ExamDetail";
import { get_exams_by_id } from "../action/exam";
import { get_single_paper } from "../action/paper";
import Message from "../component/Message";
import Loader from "../component/Loader";

function Dashboard() {
  const [paper_by_dept, setPaperByDept] = useState([]);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // dispatch setup
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(get_exams_by_id(userInfo._id));
  }, [0]);

  useEffect(() => {
    dispatch(get_single_paper(userInfo.department));
  }, [0]);

  // grab student exams from redux
  const getAllExamById = useSelector((state) => state.getAllExamById);
  const { loading: examloading, error: examerror, exams } = getAllExamById;

  const getSinglePapers = useSelector((state) => state.getSinglePapers);
  const { loading: paperloading, error: papererror, papers } = getSinglePapers;

  if (!userInfo) {
    return navigate("/login");
  }

  return (
    <Container>
      <Fragment>
        <h1 className="large text-primary text-uppercase">Dashboard</h1>
        <p className="lead">
          <i className="fas fa-user" /> Welcome, {userInfo && userInfo.fullname}
        </p>
      </Fragment>
      <hr />
      <Fragment>
        <h1 className="lead text-primary text-uppercase">My Profile</h1>
        <ListGroup>
          <ListGroup.Item>
            Full Name |{" "}
            <span className="lead text-primary text-uppercase">
              {userInfo && userInfo.fullname}
            </span>
          </ListGroup.Item>
          <ListGroup.Item>
            Matric Number |{" "}
            <span className="lead text-primary text-uppercase">
              {userInfo && userInfo.matric_number}
            </span>
          </ListGroup.Item>
          <ListGroup.Item>
            Department |{" "}
            <span className="lead text-primary text-uppercase">
              {userInfo && userInfo.department}
            </span>
          </ListGroup.Item>
        </ListGroup>
      </Fragment>
      <hr />

      <Fragment>
        <h3 className="lead text-primary text-uppercase">
          Available Papers{" "}
        
        </h3>
        <p className="lead">list of papers you need to write will show up here, when available</p>
        {paperloading && <Loader />}
        {papererror && <Message variant="danger">{papererror}</Message>}
        <ListGroup>
          {papers &&
            papers.map((paper) => (
              <ListGroupItem
                action
                className="my-1"
                href={`/examination/${paper._id}`}
              >
                <span className="text-primary">Title </span>
                {paper.title}
              </ListGroupItem>
            ))}
        </ListGroup>
      </Fragment>
      {/* MY EXAM DETAILS */}
      <hr />
      <Fragment>
        <h3 className="lead mt-5 text-primary text-uppercase">
          Your Examainations Result will display here, when they are available
        </h3>
        {exams &&
          exams.map((exam, index) => (
            <ExamDetail key={exam._id} exam={exam} index={index} />
          ))}
      </Fragment>
    </Container>
  );
}

export default Dashboard;
