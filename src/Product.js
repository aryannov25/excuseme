import "./App.css";
import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";

import { Container, Form, Button, Card } from "react-bootstrap";
const { Configuration, OpenAIApi } = require("openai");

class Product extends Component {
  constructor() {
    super();
    this.state = {
      heading: "Your world-class excuse will show up here",
      response: "....",
    };
  }
  onFormSubmit = (e) => {
    // Start by Preventing the Default
    e.preventDefault();
    const formData = new FormData(e.target),
      formDataObj = Object.fromEntries(formData.entries());
    console.log(formDataObj.productName);

    ///// OPENAI

    const configuration = new Configuration({
      apiKey: "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",
    });
    const openai = new OpenAIApi(configuration);
    openai
      .createCompletion({
        model: "text-davinci-002",
        prompt: "Write a hilarious excuse for " + formDataObj.productName,
        temperature: 1,
        max_tokens: 100,
        top_p: 1,
        frequency_penalty: 0.16,
        presence_penalty: 1.24,
      })
      .then((response) => {
        this.setState({
          heading: "Here is your Excuse for : " + formDataObj.productName,
          response: response.data.choices[0].text,
        });
      });
  };

  render() {
    return (
      <div>
        <a className="title" href="/">
          <h1 className="bg-blue p-2">Excuseme.life</h1>
        </a>
        <div>
          <Link className="btn" to="/">
            Excuses
          </Link>{" "}
          /{/* <Link className="btn" to="/inspiration">Inspiration</Link> / */}{" "}
          &nbsp;
          <Link className="btn" to="/spin">
            Spin
          </Link>{" "}
          / &nbsp;
          <Link className="btn" to="/horror">
            Horror
          </Link>
        </div>
        <Container className="col-md-6 container">
          <h1> Generate Excuses </h1>
          <br />
          <Form onSubmit={this.onFormSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>
                <h4>I need an Excuse for ......</h4>
              </Form.Label>
              <Form.Control
                type="text"
                name="productName"
                placeholder=""
                required
              />
              <Form.Text className="text-muted">
                (e.g. not going to office, not meeting my girlfriend today,
                skipping an important meeting etc)
              </Form.Text>
            </Form.Group>
            <Button variant="primary" size="lg" type="submit">
              Boom!
            </Button>
          </Form>
          <br />
          <br />
          <Card>
            <Card.Body>
              <Card.Title>
                <h1>{this.state.heading}</h1>
              </Card.Title>
              <hr />
              <br />
              <Card.Text>
                <h4>{this.state.response}</h4>
              </Card.Text>
            </Card.Body>
          </Card>
        </Container>
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }
}
export default Product;
