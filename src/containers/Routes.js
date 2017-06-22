/**
 * Created by artis on 19/04/2017.
 */

import React from 'react';
import {Route} from 'react-router-dom';
import Login from '../pages/login/Login';
import SignUp from '../pages/signup/SignUp';
import { requiresAuth } from './RequiresAuth';

const Routes = (props) => {

    const { isAuthenticated, errorMessage } = props;

    return (
        <div>
            {/*<Route exact path="/" component={requiresAuth(SignUp, isAuthenticated)} />*/}

            <Route exact path="/" component={SignUp} />
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={(props) => <Login {...props}
                  isAuthenticated={isAuthenticated} errorMessage={errorMessage} />} />

        </div>
    )

};

export default Routes;
