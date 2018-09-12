import React, {Component} from 'react';
import axios from 'axios';

class Category extends Component {

    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        axios({
            method: 'post',
            url: 'http://localhost:9000/addcategory',
            data: data
        }).then((res) => {
            alert('dodano kategorie');
        }).catch((err) => {
            console.log('AXIOS addProduct FAILED', err)
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="categoryName">Category name</label>
                <input id="categoryName" name="categoryName" type="text" />

                <button>Add category</button>
            </form>
        );
    }

}


export default Category;
