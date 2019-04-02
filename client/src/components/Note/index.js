import React from "react";
import { ListItem } from "../List";
import { Row, Col } from "../Grid";
import "./style.css";

function Note({ id, body, date, Update, Delete }) {
  
  return (
    <ListItem>
      <Row className="flex-wrap-reverse">
        <Col size="md-8">
          <h3 className="font-italic">{body}</h3>
          {id && <h5 className="font-italic">{id}</h5>}
        </Col>
        <Col size="md-2">
            <Update />
        </Col>
        <Col size="md-2">
            <Delete />
        </Col>
      </Row>
      <Row>
        <Col size="md-6">
          <p className="font-italic small">Date Written {date}</p>
        </Col>
      </Row>
    </ListItem>
  );
}

export default Note;
