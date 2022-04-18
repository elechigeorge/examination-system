
import React, { useState, useEffect } from "react";
import ExamsView from "./ExamView";
import { get_all_questions_by_paper } from "../action/question";
import { create_exam } from "../action/exam";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../component/Message";
import Loader from "../component/Loader";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Countdown, {
  zeroPad,
  calcTimeDelta,
  formatTimeDelta,
} from "react-countdown";

const ExaminationScreen = () => {
  const [grade, setGrade] = useState(0);
  

  // grab params from URI
  const { id } = useParams();

  // extra import
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // grab questions from server when page loads
  useEffect(() => {
    dispatch(get_all_questions_by_paper(id));
  }, [0]);

  // grab questions from redux state
  const getAllQuestion = useSelector((state) => state.getAllQuestion);
  const { loading, error, questions } = getAllQuestion;

  // grab exams registration process from redux state
  const createExam = useSelector((state) => state.createExam);
  const { loading: examloading, error: examerror, exam } = createExam;

  // grab user from redux state
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // state updater
  const increase = (answer, selected) => {
    if (answer === selected) {
      setGrade(grade + 1);
      
      console.log(grade);
      return;
    } else {
      console.log("You picked wrongly");
    }
  };

  // submit exam handler
  const submitHandler = () =>
    dispatch(
      create_exam({
        user: userInfo._id,
        paper: id,
        result: grade,
      })
    );

  const whenToStart = () => {
    if (questions) {
      return;
    }
  };

  // scroll implementation
  const renderer = ({ hours, minutes, seconds }) => (
    <span className="lead text-uppercase">
      Timer | {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
    </span>
  );
  return (
    <div>
      {loading && <Loader />}
      {error && (
        <Message variant="warning">
          Please check your network, and reload this page
        </Message>
      )}
      {exam && navigate("/student/dashboard")}

      {questions &&
        questions.map((question) => (
          <div>
            <Countdown
              date={Date.now() + 1200000}
              intervalDelay={1000}
              precision={3}
              renderer={renderer}
              onComplete={submitHandler}
              onStart={whenToStart}
            />
            <ExamsView
              changeGrade={increase}
              question={question}
              renderer={renderer}

            />
          </div>
        ))}

      <div className="d-grid gap-2 mb-5">
        <Button
          variant="primary"
          className="btn-block btn-md mb-5"
          onClick={submitHandler}
        >
          {examloading ? "Collating result..." : "Submit Examination"}
        </Button>
      </div>
    </div>
  );
};

export default ExaminationScreen;