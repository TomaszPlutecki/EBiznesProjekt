import {Link} from "react-router-dom";
import React, {Component} from 'react';
import {Button, Navbar, Nav, NavItem, Thumbnail, MenuItem} from 'react-bootstrap';
import './Header.css';


export default class Header extends Component {

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
       return  <Navbar>
            <Navbar.Header>
                <Navbar.Brand>
                    <h1>
                        <Link to={{pathname:"/"}}>But-uj</Link>
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
                <NavItem eventKey={2}>
                    <Link className="link" to="/basket">
                        <Button bsStyle="primary">
                            Basket
                        </Button>
                    </Link>
                </NavItem>
                <NavItem eventKey={2}>
                    <Link className="link" to="/order">
                        <Button bsStyle="primary">
                            Order
                        </Button>
                    </Link>
                </NavItem>
                {this.isLogged()}
            </Nav>
        </Navbar>
    }

}
