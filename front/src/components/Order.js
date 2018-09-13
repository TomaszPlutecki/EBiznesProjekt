import React, {Component} from 'react';
import axios from 'axios';
import Header from "./Header";

class Order extends Component {

    constructor() {
        super();
        this.state = {
            order: [],
            producs:[]
        };
    }

    componentDidMount() {
        console.log("componentDidMount ")
        axios({
            method: 'get',
            url: 'http://localhost:9000/getorders/' + sessionStorage.getItem('userId').toString()
        }).then((res) => {
            console.log("Ordery " + res.data)
            this.setState({order: res.data, producs: res.data.products})
        }).catch((err) => {
            console.log('AXIOS addProduct FAILED', err)
        });
    }

    render() {

        const order = this.state.order;
        const products =this.state.producs;
        console.log("Render " + this.state.producs)
        return (
            <div>
                <Header/>
                <h3 className="text-center"><b>My order</b></h3>
                <hr/>
                    <div className="col-sm-6" key="1">
                        <div className="panel panel-primary">
                            <div className="panel-body">
                                <p align="center" id="productName">
                                    name: {order.id}
                                </p>
                                <p>
                                    <br></br>
                                    <i>Total price: {order.totalPrice}</i>
                                </p>
                                {products.map((product, index) => (
                                <div className="col-sm-6" key={index}>
                                    <div className="panel panel-primary">
                                        <div className="panel-body">
                                            <p align="center" id="productName">
                                                name: {product.productName}
                                            </p>
                                            <p align="center" id="productName">
                                                price: {product.price}
                                            </p>
                                            <p align="center" id="productName">
                                                quantity: {product.quantity}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                ))}
                            </div>
                        </div>
                    </div>
            </div>
        )
    }
}

export default Order;
