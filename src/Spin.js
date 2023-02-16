import "./App.css";
import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";



const { Configuration, OpenAIApi } = require("openai");

class Product extends Component {
  constructor() {
    super();
    this.state = {
      response: "....",
    };
    this.state = {
      value: "",
    };
  }
  onChange = (e) => {
    this.setState({ value: e.target.value });
  };

  onFormSubmit = (e) => {
    // Start by Preventing the Default
    e.preventDefault();
    const formData = new FormData(e.target),
      formDataObj = Object.fromEntries(formData.entries());

    console.log("write a one-liner " + this.state.value + " opinion about:" + formDataObj.productName);

    ///// OPENAI

    const configuration = new Configuration({
      apiKey: "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",
    });

    const openai = new OpenAIApi(configuration);
    openai
      .createCompletion({
        model: "text-davinci-002",
        prompt: "write a one-liner " + this.state.value +" opinion about: " + formDataObj.productName,
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
      });
  };

  render() {
    const { value } = this.state;
    return (
      <div>
        <a className="title" href="/">
          <h1 className="bg-green p-2">Excuseme.life</h1>
        </a>
        <div>
        <Link className="btn" to="/">Excuses</Link> /
        {/* <Link className="btn" to="/inspiration">Inspiration</Link> / */} &nbsp;
        <Link className="btn" to="/spin">Spin</Link> / &nbsp;
        <Link className="btn" to="/horror">Horror</Link>
        </div>

        <Container className="col-md-5 col-xs-12 col-sm-6">
          <h2 className="h2 pb-4">
          There's always another side to things
          </h2>
          <br />
          <div className="card1o">
            <container className=" container1">
              <card className="card2 col-md-4">
                <h4 className="cardo3">{this.state.response}</h4>
              </card>
            </container>
          </div>

          <br />
          <Form onSubmit={this.onFormSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>
                <h5>
                I would like to have an
                
                 &nbsp;
              <select className="mb-2"
                id="options"
                value={value}
                onChange={this.onChange}
                name="options"
                required
              >
              
                <option value="positive">+ve</option>
                <option value="negative">-ve</option>
              </select>
              &nbsp;
            
            spin on</h5>
              </Form.Label>
              <input  className="  col-11" 
             
                type="text"
                name="productName"
                placeholder=""
                required
              />
              <br/>
              <Form.Text className="text-muted">
                (e.g. Managing Rude boss, Making tons of money etc)
              </Form.Text>
            </Form.Group>
            
            <Button className="btn btn-success" type="submit" size="lg">
              Go!
            </Button>
          </Form>
        </Container>
        <br />
        <br />
      </div>
    );
  }
}

export default Product;
