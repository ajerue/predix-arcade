import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import ListPage from "./ListPage";
import RunPage from "./RunPage";
import { handleError } from "./utils";
import "./App.css";
import AppTimer from "./AppTimer";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
    this.appTimer = new AppTimer();
    this.appTimer.start();
  }

  render() {
    if (this.state.error) {
      return (
        <div className="container my-4">
          <div className="row justify-content-center">
            <div className="col-md-8">
              Oops - there has been an error. It has been logged to the console.
            </div>
          </div>
        </div>
      );
    }
    return (
      <BrowserRouter>
        <div className="App">
          <Route exact path="/" component={ListPage} />
          <Route exact path="/run" component={RunPage} />
          <Route exact path="/run/:rom" component={RunPage} />
        </div>
      </BrowserRouter>
    );
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error });
    this.appTimer.stop(); // Stop Timer if error occurred
    handleError(error, errorInfo);
  }
}

export default App;
