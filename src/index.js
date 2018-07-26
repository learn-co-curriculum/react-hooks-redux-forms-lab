import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import manageBand from './reducers/manageBand'

import { Provider } from 'react-redux';
import { createStore } from 'redux';

const store = createStore(manageBand)



const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
  document.getElementById('root')
  )
};

render()
// not directly exporting the render function
// because need to stub it out in tests.
export const renderer = { render };
