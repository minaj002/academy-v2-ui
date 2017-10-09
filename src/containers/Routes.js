/**
 * Created by artis on 19/04/2017.
 */

import React from 'react';
import {Route} from 'react-router-dom';
import Login from '../pages/login/Login';
import Dashboard from '../pages/enterprise/dashboard/Dashboard';
import AddUser from "../pages/enterprise/add-user/AddUser";

const Routes = (props) => {

    const { isAuthenticated, errorMessage } = props;

    return (
        <div>
            {/*<Route exact path="/" component={requiresAuth(SignUp, isAuthenticated)} />*/}

            <Route exact path="/" component={(props) => <Login {...props}
                  isAuthenticated={isAuthenticated} errorMessage={errorMessage} />} />
            {/* Signup */}

            <Route path="/login" component={(props) => <Login {...props}
                  isAuthenticated={isAuthenticated} errorMessage={errorMessage} />} />
            <Route path="/check-in" component={(props) => <Dashboard {...props}
                  isAuthenticated={isAuthenticated} errorMessage={errorMessage} />} />
            <Route path="/add-member" component={(props) => <AddUser {...props}
                  isAuthenticated={isAuthenticated} errorMessage={errorMessage} />} />

        </div>
    )

};

export default Routes;
