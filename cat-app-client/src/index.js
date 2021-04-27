import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from 'axios';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Store from './store/configureStore';
import rootReducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

import Applayout from './components/layout/Applayout';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';

axios.defaults.baseURL = 'http://localhost:8080/';
// axios.defaults.withCredentials = true;

const store = Store(rootReducer, composeWithDevTools());

ReactDOM.render(
    <React.StrictMode>
        {/* React.StrictMode는 배포시 지울 코드 */}
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <Router>
                    <Applayout>
                        <App />
                    </Applayout>
                </Router>
            </ThemeProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
