import React, { Component } from 'react';
import axios from 'axios';
import './Product.css';
import {Button, Form, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import {Link} from "react-router-dom";
import Header from "./Header";


export default class Product extends Component {

    constructor() {
        super();
        this.state = {
            comentList : []
        };
    }
    componentDidMount() {

        axios({
            method: 'get',
            url: 'http://localhost:9000/getReview/'+ this.props.location.state.product.id
        }).then((res) => {
            this.setState({comentList: res.data})
        }).catch((err) => {
            console.log('AXIOS addProduct FAILED', err)
        });


    }


    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        axios({
            method: 'post',
            url: 'http://localhost:9000/addReview',
            data: data
        }).then((res) => {
            alert('dodano opinie');
        }).catch((err) => {
            console.log('AXIOS addProduct FAILED', err)
        });


    }

    addToCart(id) {
        var formData = new FormData();
        var uId = sessionStorage.getItem('userId').toString();
        console.log("dupa "+ id)
        formData.append('userId', uId);
        formData.append('productId', id);
        formData.append('quantity', 1);

        axios({
            method: 'post',
            url: 'http://localhost:9000/addToBasket',
            data: formData
        }).then((res) => {
            alert("dodano produkt do koszyka");
        }).catch((err) => {
            alert('AXIOS addProduct FAILED', err)
        });
    }


    addToCartButon() {
        console.log("Islogged " + sessionStorage.getItem('isLogged'))
        if (sessionStorage.getItem('isLogged') === "true")
        {
             return <div className="btn-group " role="group" aria-label="Basic example">
                <a type="button" id={this.props.location.state.product.id} onClick={this.addToCart.bind(this, this.props.location.state.product.id)}
                   className="btn btn-success">Add to Cart</a>
            </div>
        }
    }


    render () {
        const coment = this.state.comentList;
        const product = this.props.location.state.product
        const category = this.props.location.state.categorie


        return (
            <div>
                <Header/>
                <p align="center" id="productId">
                    {product.name}
                </p>
                <p align="left" id="description">
                    {product.description}
                </p>
                <p align="left" id="price">
                    Cena: {product.price} zł
                </p>
                <p align="left" id="category">
                    Kategoria: {category.name}
                </p>


                <Form onSubmit={this.handleSubmit}>

                    <FormGroup controlId="formControlsTextarea">
                        <ControlLabel>Review</ControlLabel>
                        <FormControl id="reviewText" name="reviewText" type="text" componentClass="textarea" placeholder="review" />
                    </FormGroup>

                    {<select className="form-control" className="hide" id="productId" name="productId" ><option value={product.id} >Product id = {product.id}</option></select>}

                    <Button type="submit" bsStyle="primary">Add Review</Button>
                </Form>
                {this.addToCartButon()}


                <div>
                    <h3 className="text-center"><b>Comments</b></h3>

                    {coment.map((comment, index) => (
                        <div className="col-sm-12" key={index}>
                            <div className="panel panel-primary">
                                <div className="panel-body comment">
                                    <p align="left" id="productDesc">
                                        {comment.review_text}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>

            </div>
        )
    }
}
