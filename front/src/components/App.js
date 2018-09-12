import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import './App.css';
import Products from './Products'
import ProductForm from './ProductForm'
import Category from './Category'
import Product from "./Product";

class App extends Component {

    render() {
        return <Router>
            <div id="menu">
                <ul>
                    <li>
                        <Link to="/products">Products</Link>
                    </li>
                    <li>
                        <Link to="/productadd">Add Product</Link>
                    </li>
                    <li>
                        <Link to="/category">Add Category</Link>
                    </li>
                </ul>
                <Route path="/products" component={Products}/>
                <Route path="/productadd" component={ProductForm}/>
                <Route path="/category" component={Category}/>
                <Route path="/product" component={Product}/>
            </div>
        </Router>
    }
}

export default App;
