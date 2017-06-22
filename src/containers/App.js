import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppBarTop from './appbar/AppBarTop';
import Routes from './Routes';
import { Grid } from 'react-flexbox-grid';
import GlobalMessageHandler from '../components/GlobalMessageHandler';
import '../App.css';

import {BrowserRouter as Router} from 'react-router-dom';


class App extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.isAuthenticated !== nextProps.isAuthenticated;
    }

    render() {

        const { isAuthenticated } = this.props;

        return (
            <Router>
                <div>
                    <AppBarTop isAuthenticated={isAuthenticated} />
                    <Grid fluid>
                        <Routes isAuthenticated={isAuthenticated} />
                    </Grid>
                    <GlobalMessageHandler />
                </div>
            </Router>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
};

export default connect(mapStateToProps)(App)
