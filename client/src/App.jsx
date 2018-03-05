import React from 'react';
// We will remove react-hot-loader in production, so it is listed
// in depDependency
import { hot } from 'react-hot-loader'; // eslint-disable-line

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello World!</h1>
      </div>
    );
  }
}

export default hot(module)(App); // eslint-disable-line
