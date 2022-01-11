import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { App } from './app/App';
import reportWebVitals from './reportWebVitals';
import 'reset-css';
import './mapboxgl/mapboxgl-settings';
import { Provider } from 'react-redux';
import { store } from './store/store';
import 'antd/dist/antd.css';
import { CustomRouter } from './app/components/CustomRouter/CustomRouter';
import { history } from './history';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <CustomRouter history={history}>
        <App />
      </CustomRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
