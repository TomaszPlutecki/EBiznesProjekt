import React, { Component } from 'react';
import axios from 'axios';
import {Button, Form, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import {Link} from "react-router-dom";


export default class Product extends Component {

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

    componentDidMount() {

        axios({
            method: 'get',
            url: 'http://localhost:9000/getReview/'+ this.props.id
        }).then((res) => {
            this.setState({commentList: res.data})
        }).catch((err) => {
            console.log('AXIOS addProduct FAILED', err)
        });
    }

    state = {
        commentList : []
    }

    render () {
        const comentL = this.state.commentList;
        const product = this.props.location.state.product
        console.log(product)
        // const name = this.props.product.name;
        // const id = this.props.product.id;
        // const price = this.props.product.price;

        return (
            <div>
                <p align="center" id="productId">
                    {product.name}
                </p>
                <p align="center" id="description">
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

                    <Button type="submit" bsStyle="primary">Add</Button>
                </Form>

                <div>
                    <h3 className="text-center"><b>Comments</b></h3>
                    <hr/>
                    {comentL.map((productId, reviewText) => (
                        <div className="col-sm-6" key={productId}>


                            <div className="panel panel-primary">
                                <Link to={{pathname: "/product", state: {product: product}}}>{product.name}</Link>
                                <div className="panel-body">
                                    <p align="center" id="productName">
                                        {product.name}
                                    </p>
                                    <p align="center" id="productDesc">
                                        {product.description}
                                    </p>
                                    <p>
                                        <br></br>
                                        <i>Key words: {product.key_words}</i>
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