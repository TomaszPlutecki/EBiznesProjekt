import React, {Component} from 'react';
import axios from 'axios';
import Header from "./Header";

class Basket extends Component {

    constructor() {
        super();
        this.state = {
            basketProducts: [],
        };
    }

    componentDidMount() {

        axios({
            method: 'get',
            url: 'http://localhost:9000/getbasket/' + sessionStorage.getItem('userId').toString()
        }).then((res) => {
            console.log(res.data)
            this.setState({basketProducts: res.data})
        }).catch((err) => {
            console.log('AXIOS addProduct FAILED', err)
        });
    }

    render() {
        const basketProductsList = this.state.basketProducts;
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
            </div>
        )
    }
}

export default Basket;
