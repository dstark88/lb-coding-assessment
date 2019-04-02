import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import Card from "../components/Card";
import Note from "../components/Note";
import Footer from "../components/Footer";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List } from "../components/List";

class Saved extends Component {
  state = {
    notes: []
  };

  componentDidMount() {
    this.getSavedNotes();
  }

  getSavedNotes = () => {
    API.getSavedNotes()
      .then(res =>
        this.setState({
          notes: res.data
        })
      )
      .catch(err => console.log(err));
  };

  handleNoteDelete = _id => {
    API.deleteNote(_id).then(res => this.getSavedNotes());
  };

  render() {
    return (
      <Container>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1 className="text-center">
                <strong>Saved Notes</strong>
              </h1>
              <h2 className="text-center">All Saved Notes.</h2>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            <Card title="Saved Notes" icon="download">
              {this.state.notes.length ? (
                <List>
                  {this.state.notes.map(note => (
                    <Note
                      key={note._id}
                      body={note.body}
                      date={note.date}
                      Button={() => (
                        <button
                          onClick={() => this.handleNoteDelete(note._id)}
                          className="btn btn-danger ml-2"
                        >
                          Delete
                        </button>
                      )}
                    />
                  ))}
                </List>
              ) : (
                <h2 className="text-center">No Saved Notes</h2>
              )}
            </Card>
          </Col>
        </Row>
        <Footer />
      </Container>
    );
  }
}

export default Saved;
