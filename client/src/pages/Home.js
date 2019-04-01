import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import Card from "../components/Card";
import Form from "../components/Form";
import Note from "../components/Note";
import Footer from "../components/Footer";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List } from "../components/List";

class Home extends Component {
  state = {
    notes: [],
    q: "",
    message: "Search For A Note To Begin!"
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  getNotes = () => {
    API.getNotes(this.state.q)
      .then(res =>
        this.setState({
          notes: res.data
        })
      )
      .catch(() =>
        this.setState({
          notes: [],
          message: "No New Notes Found, Try a Different Query"
        })
      );
  };

  handleFormSubmit = event => {
    event.preventDefault();
    this.getNotes();
  };

  handleNoteSave = id => {
    const note = this.state.notes.find(note => note.id === id);

    API.saveNote({
      googleId: note.id,
      title: note.volumeInfo.title,
      subtitle: note.volumeInfo.subtitle,
      link: note.volumeInfo.infoLink,
      authors: note.volumeInfo.authors,
      description: note.volumeInfo.description,
      image: note.volumeInfo.imageLinks.thumbnail
    }).then(() => this.getNotes());
  };

  render() {
    return (
      <Container>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1 className="text-center">
                <strong>Notes Search</strong>
              </h1>
              <h2 className="text-center">Search for and Save Notes of Interest.</h2>
            </Jumbotron>
          </Col>
          <Col size="md-12">
            <Card title="Note Search" icon="far fa-book">
              <Form
                handleInputChange={this.handleInputChange}
                handleFormSubmit={this.handleFormSubmit}
                q={this.state.q}
              />
            </Card>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            <Card title="Results">
              {this.state.notes.length ? (
                <List>
                  {this.state.notes.map(note => (
                    <Note
                      key={note.id}
                      title={note.volumeInfo.title}
                      subtitle={note.volumeInfo.subtitle}
                      link={note.volumeInfo.infoLink}
                      authors={note.volumeInfo.authors.join(", ")}
                      description={note.volumeInfo.description}
                      image={note.volumeInfo.imageLinks.thumbnail}
                      Button={() => (
                        <button
                          onClick={() => this.handleNoteSave(note.id)}
                          className="btn btn-primary ml-2"
                        >
                          Save
                        </button>
                      )}
                    />
                  ))}
                </List>
              ) : (
                <h2 className="text-center">{this.state.message}</h2>
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
