import React, { Component } from 'react';
import axios from 'axios';

export default class Product extends Component {

    render () {
        const product = this.props.location.state.product
        console.log(product)
        // const name = this.props.product.name;
        // const id = this.props.product.id;
        // const price = this.props.product.price;

        return (
            <div>
                <p align="center" id="productId">
                    dupa + {product.name}
                </p>
                {/*<p align="center" id="productName">*/}
                    {/*{name}*/}
                {/*</p>*/}
                {/*<p align="center" id="productPrice">*/}
                    {/*{price}*/}
                {/*</p>*/}
            </div>
        )
    }
}
