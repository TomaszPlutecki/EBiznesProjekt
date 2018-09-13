import React, {Component} from 'react';
import axios from 'axios';
import Product from "./Product";
import {Link} from "react-router-dom";

class Products extends Component {

    constructor() {
        super();
        this.state = {
            productList: [],
        };
    }

    componentDidMount() {

        axios({
            method: 'get',
            url: 'http://localhost:9000/getproducts'
        }).then((res) => {
            console.log(res.data)
            this.setState({productList: res.data})
        }).catch((err) => {
            console.log('AXIOS addProduct FAILED', err)
        });
    }

    render() {
        const productList = this.state.productList;
        return (
            <div>
                <h3 className="text-center"><b>Products</b></h3>
                <hr/>
                {productList.map((product, index) => (
                    <div className="col-sm-6" key={index}>
                        <div className="panel panel-primary">
                            <Link to={{pathname: "/product", state: {product: product}}}>{product.name}</Link>
                            <div className="panel-body">
                                <p align="center" id="productName">
                                    {product.name}
                                </p>
                                <p align="left" id="productDesc">
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
        )
    }
}

export default Products;
