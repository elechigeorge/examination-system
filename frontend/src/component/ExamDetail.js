import React from "react";
import { Table, Container } from "react-bootstrap";

function ExamDetails({ exam, index }) {
  return (
    <Container className="mb-5">
      <Table striped bordered hover className="mb-5">
        <thead>
          <tr>
            <th>S/N</th>
            <th>Paper</th>
            <th>Score</th>
            <th>Remark</th>
          </tr>
        </thead>
        <tbody>
          {exam &&
            
              <tr>
                <td>{index + 1}</td>
                <td>{exam.paper.title}</td>
                <td>{exam.result} </td>
                <td>{exam.result >= 5 ? "Great Score" : "Poor performace"}</td>
              </tr>
           }
        </tbody>
      </Table>
    </Container>
  );
}

export default ExamDetails;