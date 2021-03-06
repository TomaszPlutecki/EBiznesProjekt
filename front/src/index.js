import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import {BrowserRouter, Route} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import Products from "./components/Products";
import ProductForm from "./components/ProductForm";
import Category from "./components/Category";
import Product from "./components/Product";
import Basket from "./components/Basket";
import Order from "./components/Order";

ReactDOM.render(
    <BrowserRouter>
        <div>
            <Route exact path="/" component={App}/>
            <Route path="/products" component={Products}/>
            <Route path="/productadd" component={ProductForm}/>
            <Route path="/category" component={Category}/>
            <Route path="/product" component={Product}/>
            <Route path="/basket" component={Basket}/>
            <Route path="/order" component={Order}/>
        </div>
    </BrowserRouter>
    , document.getElementById('root'));
registerServiceWorker();
