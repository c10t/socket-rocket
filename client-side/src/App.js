import React, { Component } from 'react';
import socketIoClient from 'socket.io-client';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: "http://127.0.0.1:4001"
    };
  }

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIoClient(endpoint);
    socket.on("FromAPI", data => this.setState({ response: data }));
  }

  render() {
    return (
      <div className="App">
        <div style={{ textAlign: "center" }}>
          { response ? <p>The response is: {response} </p> 
            : <p>Now Loading!</p>}
        </div>
      </div>
    );
  }
}

export default App;
