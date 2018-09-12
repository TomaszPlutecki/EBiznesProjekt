import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { BrowserRouter, Route } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
        <BrowserRouter>
            <div>
                <App />
            </div>
        </BrowserRouter>
    , document.getElementById('root'));
registerServiceWorker();
