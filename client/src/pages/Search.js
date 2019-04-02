import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import Card from "../components/Card";
import Form from "../components/Form";
import Note from "../components/Note";
import Footer from "../components/Footer";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List } from "../components/List";
import { Input, FormBtn } from "../components/Form";


class Search extends Component {
  state = {
    notes: [],
    id: "",
    body: "",
    date: "",
    message: "Search For A Note To Begin!",
    idList: [],
    bodyList: [],
    dateList: [],
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  getNotes = () => {
    API.getNotes(this.state.id || this.state.body || this.state.date)
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
    // this.getNotes();
    if (this.state.id || this.state.body || this.state.date) {
      API.findNotes({
        id: this.state.id,
        body: this.state.body,
        date: this.state.date,
      })
        .then(res => {
          this.setState({ notes: res.data, id: "", body: "", date: "" })
        })
        .catch(err => console.log(err));
    }
  };

  // handleNoteSearch = id => {
  //   const note = this.state.notes.find(note => note.id === id);

  //   API.saveNote({
  //     id: note.id,
  //     body: note.body,
  //     date: note.date,
  //   }).then(() => this.getNotes());
  // };

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
              <form>
                <Input 
                  list="id"
                  value={this.state.id}
                  onChange={this.handleInputChange}
                  name="id"
                  placeholder="Note ID # (Optional)"
                />
                <datalist id="id">
                  {this.state.idList.map(note => <option key={note}>{note}</option>)}
                </datalist>
                <Input 
                  list="body"
                  value={this.state.body}
                  onChange={this.handleInputChange}
                  name="body"
                  placeholder="Body (Optional)"
                />
                <datalist id="body">
                  {this.state.bodyList.map(note => <option key={note}>{note}</option>)}
                </datalist>
                <Input 
                  list="date"
                  value={this.state.date}
                  onChange={this.handleInputChange}
                  name="date"
                  placeholder="Date Written (Optional)"
                />
                <datalist id="date">
                  {this.state.dateList.map(note => <option key={note}>{note}</option>)}
                </datalist>
                <FormBtn
                  onClick={this.handleFormSubmit}
                >
                Search
                </FormBtn>
              </form>

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
                      key={note._id}
                      id={note.id}
                      body={note.body}
                      date={note.date}
                      Button={() => (
                        <button
                          onClick={() => this.handleNoteSave(note._id)}
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

export default Search;
