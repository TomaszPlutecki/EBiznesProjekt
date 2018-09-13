import React, {Component} from 'react';
import {Button, Navbar, Nav, NavItem, Thumbnail, MenuItem} from 'react-bootstrap';
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
            <div id="menu" class="App-header">

                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <h1>
                                <font color="white">But-UJ</font>
                            </h1>
                        </Navbar.Brand>

                    </Navbar.Header>
                    <Nav>
                        <NavItem eventKey={1}>
                            <Link className="link" to="/products"><Button bsStyle="primary">
                                Products</Button>
                            </Link>
                        </NavItem>
                        <NavItem eventKey={2}>
                            <Link className="link" to="/productadd">
                                <Button bsStyle="primary">Add Product
                                </Button>
                            </Link>
                        </NavItem>
                        <NavItem eventKey={2}>
                            <Link className="link" to="/category">
                                <Button bsStyle="primary">
                                    Add Category
                                </Button>
                            </Link>
                        </NavItem>
                    </Nav>
                </Navbar>

                <Route path="/products" component={Products}/>
                <Route path="/productadd" component={ProductForm}/>
                <Route path="/category" component={Category}/>
                <Route path="/product" component={Product}/>
            </div>
        </Router>
    }
}

export default App;
