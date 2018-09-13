import React, {Component} from 'react';
import axios from 'axios';
import Header from "./Header";

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
            <div>
                <Header/>
                <form onSubmit={this.handleSubmit}>
                    <br/>
                    <label htmlFor="categoryName">Category name</label>
                    <input id="categoryName" name="categoryName" type="text"/>

                    <button>Add category</button>
                </form>
            </div>
        );
    }

}


export default Category;
