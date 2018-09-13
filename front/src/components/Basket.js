import React, {Component} from 'react';
import axios from 'axios';
import Header from "./Header";

class Basket extends Component {

    constructor() {
        super();
        this.state = {
            basketProducts: [],
            basketId: 0
        };
    }

    componentDidMount() {

        axios({
            method: 'get',
            url: 'http://localhost:9000/getbasket/' + sessionStorage.getItem('userId').toString()
        }).then((res) => {
            this.setState({basketProducts: res.data, basketId: res.data[0].basketId})
        }).catch((err) => {
            console.log('AXIOS addProduct FAILED', err)
        });
    }

    createOrder(basketId) {
        var formData = new FormData();
        console.log("Tworze order " + basketId)
        formData.append('basketId', basketId);
        formData.append('paymentId', 1);

        axios({
            method: 'post',
            url: 'http://localhost:9000/addorder',
            data: formData
        }).then((res) => {
            alert("stworzono zamówienie");
        }).catch((err) => {
            alert('AXIOS addProduct FAILED', err)
        });
    }

    render() {
        const basketProductsList = this.state.basketProducts;
        const basketId = this.state.basketId
        return (
            <div>
                <Header/>
                <h3 className="text-center"><b>Products In basket</b></h3>
                <hr/>
                {basketProductsList.map((product, index) => (
                    <div className="col-sm-6" key={index}>
                        <div className="panel panel-primary">
                            <div className="panel-body">
                                <p align="center" id="productName">
                                    name: {product.productName}
                                </p>
                                <p>
                                    <br></br>
                                    <i>quantity: {product.quantity}</i>
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="btn-group " role="group" aria-label="Basic example">
                    <a type="button"  id={1} onClick={this.createOrder.bind(this,basketId)} className="btn btn-success">CreateOrder</a>
                </div>
            </div>
        )
    }
}

export default Basket;
