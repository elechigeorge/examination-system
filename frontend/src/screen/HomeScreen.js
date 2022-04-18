import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";

function HomeScreen() {
  return (
    <Container>
      <Row
        style={{
          display: "flex",
          alignItems: "center",
          height: "90vh",
          width: "100%",
        }}
      >
        <Col md={6} sm={12} lg={6}>
          <div>
            <Image
              src={require("../images/computer.png")}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            ></Image>
          </div>
        </Col>
        <Col md={6} sm={12} lg={6}>
          <div className="text-center-sm">
            <h1 className="text-primary">STUDENT EXAMINATION SYSTEM</h1>
            <p>
              Exam Lab is a student examination system that allows students to
              participate in online exams and get results instantly after
              submission{" "}
            </p>
            <a href="/login" className="btn btn-primary btn-lg">
              Get Started
            </a>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default HomeScreen;
