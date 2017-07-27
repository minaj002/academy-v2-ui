/**
 * Created by artis on 19/04/2017.
 */

import React from 'react';
import {Route} from 'react-router-dom';
import Login from '../pages/login/Login';
import SignUp from '../pages/enterprise/signup/SignUp';
import SignUpSuccess from '../pages/enterprise/signup/SignUpSuccess';
import SignUpConfirm from '../pages/enterprise/signup/confirm/SignUpConfirm';
import { requiresAuth } from './RequiresAuth';

const Routes = (props) => {

    const { isAuthenticated, errorMessage } = props;

    return (
        <div>
            {/*<Route exact path="/" component={requiresAuth(SignUp, isAuthenticated)} />*/}

            <Route exact path="/" component={SignUp} />
            <Route exact path="/signup" component={SignUp} />
            <Route path="/signup/success" component={SignUpSuccess} />
            <Route path="/signup/confirm/:token" component={SignUpConfirm} />
            <Route path="/login" component={(props) => <Login {...props}
                  isAuthenticated={isAuthenticated} errorMessage={errorMessage} />} />

        </div>
    )

};

export default Routes;
