import React from 'react';
import ReactDOM from 'react-dom';
import '@babel/polyfill';
import "./styles/app.scss";

import Navbar from './../components/navbar';
import Homepage from './../components/homepage';
import Footer from './../components/footer';


class Main extends React.Component {
    render() {
        return (
          <div>
            <Navbar />
            <Homepage />
            <Footer />
          </div>
        );
    }
}

ReactDOM.render(<Main />, document.getElementById('root'));
