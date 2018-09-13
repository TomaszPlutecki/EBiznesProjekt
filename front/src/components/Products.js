import React, {Component} from 'react';
import axios from 'axios';
import Product from "./Product";
import {Link} from "react-router-dom";
import Header from "./Header";
import './Product.css';

class Products extends Component {

    constructor() {
        super();
        this.state = {
            productList: [],
            categories: []
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

        axios.get('http://localhost:9000/getcategories')
            .then(res => {
                console.log(res)
                this.setState({
                    categories: res.data
                });
            })
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

    addToCartButon(productId) {
        console.log(productId + " <- Islogged " + sessionStorage.getItem('isLogged'))
        if (sessionStorage.getItem('isLogged') === "true")
        {
            return <div className="btn-group " role="group" aria-label="Basic example">
                <a type="button" id={productId} onClick={this.addToCart.bind(this, productId)}
                   className="btn btn-success">Add to Cart</a>
            </div>
        }
    }


    render() {
        const productList = this.state.productList;
        const categories = this.state.categories;
        return (
            <div>
                <Header/>
                <h3 className="text-center"><b>Products</b></h3>
                <hr/>
                {productList.map((product, index) => (
                    <div className="col-sm-6 product" key={index}>
                        <div className="panel panel-primary">
                            <Link to={{
                                pathname: "/product", state: {
                                    product: product, categorie: categories.find((element) => {
                                        return element.id === product.category;
                                    })
                                }
                            }}>{product.name}</Link>
                            <div className="panel-body">
                                <p align="center" id="productName">
                                    {product.name}
                                </p>
                                <p align="left" id="productDesc">
                                    {product.description}
                                </p>
                                <p align="left" id="productPrice">
                                    Cena : {product.price} zł
                                </p>
                                <p>
                                    <br></br>
                                    <i>Key words: {product.key_words}</i>
                                </p>
                                {this.addToCartButon(product.id)}
                            </div>
                        </div>
                        <br/>
                    </div>
                ))}
            </div>
        )
    }
}

export default Products;
