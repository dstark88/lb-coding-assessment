import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import Card from "../components/Card";
import Note from "../components/Note";
import Footer from "../components/Footer";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import { Link } from "react-router-dom";

class Home extends Component {
    state = {
        notes: [],
        id: "",
        body: "",
        date: "",
    };

    componentDidMount() {
        this.getNotes();
    }
    
    getNotes = () => {
    API.getNotes()
        .then(res =>
        this.setState({
            notes: res.data,
        })
        )
        .catch(err => console.log(err));
    };

    handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
        [name]: value
    });
    };

    handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.body) {
        API.saveNote({
            body: this.state.body,
        })
        .then(res => {
        this.getNotes({ notes: res.data })
        this.setState({ body: "" })
        })
        .catch(err => console.log(err));
    }
    };

    // handleNoteUpdate(event) {
    //     this.setState({ body: event.target.value })
    // }
    
    handleNoteDelete = id => {
        API.deleteNote(id).then(res => this.getNotes());
    };
    
      render() {
        return (
          <Container fluid>
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
              <Col size="md-6">
                <Card title="Add Notes">
                    <form>
                        <TextArea
                            value={this.state.body}
                            onChange={this.handleInputChange}
                            name="body"
                            placeholder="Note (required)"
                        />
                        <FormBtn
                            onClick={this.handleFormSubmit}
                        >
                            <Link to="/">Submit</Link>
                        </FormBtn>
                    </form>
                </Card>
              </Col>

              <Col size="md-6">
                <Card title="Notes">
                  {this.state.notes.length ? (
                    <List>
                      {this.state.notes.map(note => (
                        <Note
                          key={note._id}
                          id={note.id}
                          body={note.body}
                          date={note.date}
                        //   Update={() => (
                        //     <button
                        //       onClick={() => this.handleNoteUpdate(note._id)}
                        //       className="btn btn-light">
                        //       Update
                        //     </button>
                        //   )}
                          Delete={() => (  
                            <button
                              onClick={() => this.handleNoteDelete(note._id)}
                              className="btn btn-danger">
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