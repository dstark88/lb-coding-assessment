import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import Card from "../components/Card";
import Form from "../components/Form";
import Note from "../components/Note";
import Footer from "../components/Footer";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { List, ListItem } from "../components/List";

import { Col, Row, Container } from "../components/Grid";
import { Input, FormBtn } from "../components/Form";


class Search extends Component {
  state = {
    notes: [],
    id: "",
    body: "",
    date: "",
    message: "Search For A Note To Begin!",
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
    API.getNote(this.state.body || this.state.date)
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
    if (this.state.body || this.state.date) {
      API.findNotes({
        body: this.state.body,
        date: this.state.date,
      })
        .then(res => {
          this.setState({ notes: res.data, body: "", date: "" })
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
                    <ListItem key={note._id}>
                    <Link to={"/notes/" + note._id}>
                      
                        <strong>{note.body}</strong> Date Written {note.date}
                        <br></br>
                    </Link>
           
                  </ListItem>
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
