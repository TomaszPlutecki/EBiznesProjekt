import React, { Component } from 'react';
import axios from 'axios';
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


    render () {
        const coment = this.state.comentList;
        const product = this.props.location.state.product
        console.log(product)
        // const name = this.props.product.name;
        // const id = this.props.product.id;
        // const price = this.props.product.price;

        return (
            <div>
                <Header/>
                <p align="center" id="productId">
                    {product.name}
                </p>
                <p align="left" id="description">
                    {product.description}
                </p>
                <p align="center" id="category">
                    {product.category}
                </p>
                {/*<p align="center" id="productPrice">*/}
                {/*{price}*/}
                {/*</p>*/}


                <Form onSubmit={this.handleSubmit}>

                    <FormGroup controlId="formControlsTextarea">
                        <ControlLabel>Review</ControlLabel>
                        <FormControl id="reviewText" name="reviewText" type="text" componentClass="textarea" placeholder="review" />
                    </FormGroup>

                    <select className="form-control" id="productId" name="productId" ><option value={product.id} >Product id = {product.id}</option></select>

                    <Button type="submit" bsStyle="primary">Add Review</Button>
                </Form>

                <div className="btn-group " role="group" aria-label="Basic example">
                    <a type="button"  id={product.id} onClick={this.addToCart.bind(this,product.id)} className="btn btn-success">Add to Cart</a>
                </div>

                <div>
                    <h3 className="text-center"><b>Comments</b></h3>

                    {coment.map((comment, index) => (
                        <div className="col-sm-6" key={index}>
                            <div className="panel panel-primary">
                                <div className="panel-body">
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
