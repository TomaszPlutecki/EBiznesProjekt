import React, {Component} from 'react';
import './App.css';
import Header from "./Header";
import axios from 'axios';

class App extends Component {

    async User() {
        try {
            const {data: response} = await axios.get('/getUser');
            sessionStorage.setItem('isLogged', response.log);
            sessionStorage.setItem('userId', response.userId);
            sessionStorage.setItem('email', response.email);
            sessionStorage.setItem('fullName', response.fullName);
        } catch (e) {
            console.error(e);
        }
    };

    state = {
        products: [],
        categories: []
    }

    componentWillMount() {
        this.User();
        axios.get('http://localhost:9000/getproducts')
            .then(res => {
                this.setState({
                    products: res.data
                });
            })

        axios.get('http://localhost:9000/getcategories')
            .then(res => {
                console.log(res)
                this.setState({
                    categories: res.data
                });
            })
    }


    render() {
        return <div>
            <Header/>
        </div>
    }
}

export default App;
