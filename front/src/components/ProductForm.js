import React, {Component} from 'react';
import axios from 'axios';

class Products extends Component {

    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        axios({
            method: 'post',
            url: 'http://localhost:9000/addproduct',
            data: data
        }).then((res) => {
            alert('dodano produkt');
        }).catch((err) => {
            console.log('AXIOS addProduct FAILED', err)
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="name">Product name</label>
                <input id="name" name="name" type="text" />

                <label htmlFor="description">Description</label>
                <input id="description" name="description" type="description" />

                <label htmlFor="price">Product price</label>
                <input id="price" name="price" type="number" />

                <label htmlFor="category">Product category</label>
                <input id="category" name="category" type="number" />

                <label htmlFor="key_word">Product key_word</label>
                <input id="key_word" name="key_word" type="text" />

                <button>Add product</button>
            </form>
        );
    }

}


export default Products;
