import "./App.css";
import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Form } from "react-bootstrap";

const { Configuration, OpenAIApi } = require("openai");

class Horror extends Component {
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
          "Write one-liner funny horror story on " +
          formDataObj.productName +
          ".",
        temperature: 1,
        max_tokens: 100,
        top_p: 1,
        frequency_penalty: 0.5,
        presence_penalty: 0.5,
      })
      .then((response) => {
        this.setState({
          response: response.data.choices[0].text,
        });
        console.log(response.data.choices[0].text);
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
          <div className="cardh1">
            <container className=" container1">
              <card className="cardh2 col-md-4">
                <h4 className="cardh3">{this.state.response}</h4>
              </card>
            </container>
          </div>

          <h1>Weird Funny Horror Stories </h1>
          <br />
          <Form onSubmit={this.onFormSubmit}>
            <Form.Group className="mb-3 " controlId="formBasicEmail">
              {/* <Form.Label>
                <h4>I am struggling with ...</h4>
              </Form.Label> */}
              <Form.Control type="text" name="productName" required />
              <Form.Text className="text-muted">
                (e.g. office, work, bed, shoes etc)
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
export default Horror;
