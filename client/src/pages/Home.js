import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import Card from "../components/Card";
import Note from "../components/Note";
import Footer from "../components/Footer";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List } from "../components/List";

class Home extends Component {
    state = {
        notes: [],
        id: "",
        body: "",
        date: "",
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
    
      handleNoteDelete = id => {
        API.deleteNote(id).then(res => this.getSavedNotes());
      };
    
      render() {
        return (
          <Container>
            <Row>
              <Col size="md-12">
                <Jumbotron>
                  <h1 className="text-center">
                    <strong>All Notes</strong>
                  </h1>
                </Jumbotron>
              </Col>
            </Row>
            <Row>
              <Col size="md-12">
                <Card title="Notes">
                  {this.state.notes.length ? (
                    <List>
                      {this.state.notes.map(note => (
                        <Note
                          key={note.id}
                          body={note.body}
                          date={note.date}
                          Button={() => (
                            <button
                              onClick={() => this.handleNoteDelete(note.id)}
                              className="btn btn-danger ml-2"
                            >
                              Delete
                            </button>
                          )}
                        />
                      ))}
                    </List>
                  ) : (
                    <h2 className="text-center">No Notes</h2>
                  )}
                </Card>
              </Col>
            </Row>
            <Footer />
          </Container>
        );
      }
}
export default Home;