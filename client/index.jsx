import React from 'react';
import { render } from 'react-dom';

import App from './src/App';

render(<App />, document.getElementById('app'));

/* eslint-disable */
if(module.hot) {
  module.hot.accept('./src/App');
}
/* eslint-enable */
