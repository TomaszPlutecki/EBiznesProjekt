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
import axios from 'axios';

class App extends Component {

    async User() {
        try {

            const {data: response} = await axios.get('/getUser');
            sessionStorage.setItem('isLogged', response.log);
            sessionStorage.setItem('userId', response.userId);
            sessionStorage.setItem('email', response.email);
            sessionStorage.setItem('fullName', response.fullName);

        } catch (e) {
            console.error(e);
        }
    };

    componentWillMount() {
        this.User();
    }

    clearStorage(e) {
        sessionStorage.clear();
    };

    isLogged() {
        var isLogged = sessionStorage.getItem('isLogged');
        if (isLogged === "true") {
            return (

                    <a className="link " onClick={this.clearStorage.bind} href="http://localhost:9000/signOut">
                        <button className="btn btn-primary">
                            Log Out
                        </button>
                    </a>

                // <div>
                //     <a className="nav-link " onClick={this.clearStorage.bind} href="http://localhost:9000/signOut">
                //         Wyloguj
                //     </a>
                // </div>
            )
        } else {
            return (
                    <a className="link " href="http://localhost:9000/signIn">
                        <button class="btn btn-primary">
                            Log in
                        </button>
                    </a>
            )
        }
    }


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
                        {this.isLogged()}
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
