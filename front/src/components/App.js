import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import './App.css';
import Products from './Products'
import ProductForm from './ProductForm'

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
            </ul>
        <Route path="/products" component={Products}/>
            <Route path="/productadd" component={ProductForm}/>
        </div>
    </Router>
  }
}

export default App;
