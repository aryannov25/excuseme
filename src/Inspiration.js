import "./App.css";
import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Form } from "react-bootstrap";

const { Configuration, OpenAIApi } = require("openai");

class Product extends Component {
  constructor() {
    super();
    this.state = {
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
        prompt:
          "write a hilarious inspiration one-liner related to: " +
          formDataObj.productName,
        temperature: 1,
        max_tokens: 100,
        top_p: 1,
        frequency_penalty: 0.5,
        presence_penalty: 0.5,
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
          <h1 className="bg-yellow p-2">Excuseme.life</h1>
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

        <Container className="col-md-5 container">
          <div className="card1">
            <container className="card2 container1">
              <card className="card2 col-md-4">
                <h4 className="card3">{this.state.response}</h4>
              </card>
            </container>
          </div>

          <br />
          <h1>Your daily dose of Inspiration </h1>
          <br />
          <br />
          <Form onSubmit={this.onFormSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>
                <h4>I am struggling with ...</h4>
              </Form.Label>
              <Form.Control
                type="text"
                name="productName"
                placeholder=""
                required
              />
              <Form.Text className="text-muted">
                (e.g. overeating, over thinking, dealing with my manager etc)
              </Form.Text>
            </Form.Group>
            <button className="btn1" size="lg" type="submit">
              Ding!
            </button>
          </Form>
          <br />
          <br />
        </Container>
        <br />
        <br />
      </div>
    );
  }
}
export default Product;
