import React, {Component} from 'react';
import {Form, FormGroup, Col} from 'react-bootstrap';
import axios from 'axios';

class Products extends Component {

    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);

        axios({
            method: 'get',
            url: 'http://localhost:9000/getcategories'
        }).then((res) => {
            this.setState({categoryList: res.data})
            console.log("duoa")
            console.log(this.state.categoryList)
            console.log("duoa")
        }).catch((err) => {
            console.log('AXIOS addProduct FAILED', err)
        });
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

    state = {
        categoryList: []
    }

    render() {
        const categories = this.state.categoryList;
        console.log(categories)
        return (
            <Form onSubmit={this.handleSubmit}>

                <FormGroup horizontal controlId="formHorizontalEmail">
                    <label htmlFor="name">Product name</label>
                    <input id="name" name="name" type="text"/>
                </FormGroup>

                <FormGroup horizontal>
                    <label htmlFor="description">Description</label>
                    <input id="description" name="description" type="description"/>
                </FormGroup>

                <FormGroup horizontal>
                    <label htmlFor="price">Product price</label>
                    <input id="price" name="price" type="number"/>
                </FormGroup>

                <FormGroup horizontal>
                    <label htmlFor="category">Product category</label>

                    <select id="category" name="category">
                        {
                            categories.map(cat => {
                                return <option value={cat.id} key={cat.id}>{cat.name}</option>
                            })
                        }
                    </select>
                </FormGroup>

                <FormGroup horizontal>
                    <label htmlFor="key_word">Product key_word</label>
                    <input id="key_word" name="key_word" type="text"/>
                </FormGroup>

                <button>Add product</button>
            </Form>
        );
    }

}


export default Products;
