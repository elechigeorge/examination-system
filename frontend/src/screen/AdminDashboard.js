import React, {useEffect, Fragment} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Tabs, Tab } from "react-bootstrap";
import AddQuestionTab from "./AddQuestionTab";
import AddPaperTab from "./AddPaperTab";

const AdminDashboard = () => {

  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const {userInfo} = userLogin;


  useEffect(() => {
    if(userInfo && userInfo.isStudent == true) {
      return navigate("/login");
    }
  }, [0])
  
  return (
    <div className='container mt-4'>
      <Fragment>
      <h1 className="large text-primary text-uppercase">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome,{" "}
        {userInfo && userInfo.fullname}
      </p>
      <div className="py-4">
        <i>
          Please add Course Work and their Questions
        </i>
      </div>
      <Fragment>
        <Tabs
          defaultActiveKey="subject"
          id="uncontrolled-tab-example"
          className="text-dark"
        >
          <Tab eventKey="subject" title="Add New Paper" className="text-dark">
            <p className="lead">Add New Course / Paper</p>
            <AddPaperTab />
          </Tab>
          <Tab
            eventKey="question"
            title="Add New Question"
            className="text-dark"
          >
            <p className="lead">Add New Question</p>
            <AddQuestionTab />
          </Tab>
          
        </Tabs>
      </Fragment>
    </Fragment>
    </div>
  )
}

export default AdminDashboard