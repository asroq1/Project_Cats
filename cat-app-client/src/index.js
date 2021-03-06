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
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
axios.defaults.baseURL =
    // 'https://cors-everywhere-hh.herokuapp.com/http://ec2-3-36-163-150.ap-northeast-2.compute.amazonaws.com:8080/';
    'http://ec2-3-36-163-150.ap-northeast-2.compute.amazonaws.com:8080/';
//'http://localhost:8080';

const store = Store(rootReducer, composeWithDevTools());
const persistor = persistStore(store);

if (!localStorage.token) {
    persistor.purge();
}
ReactDOM.render(
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ThemeProvider theme={theme}>
                    <Router>
                        <Applayout>
                            <App />
                        </Applayout>
                    </Router>
                </ThemeProvider>
            </PersistGate>
        </Provider>,
    document.getElementById('root')
);
