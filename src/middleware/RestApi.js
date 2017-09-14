/**
 * Created by artis on 20/04/2017.
 */

import fetch from 'isomorphic-fetch';
import { logoutUser } from '../actions/index';
import merge from 'lodash/merge';

// From webpack define plugin "profiles"
let baseUrl = API_URL;

export default function doFetch(endpoint, configuration, authenticated=false) {

    return (dispatch) => new Promise((resolve, reject) => {

        let token = localStorage.getItem('token');
        let config = {
            headers:{'content-type': 'application/json;charset=UTF-8'},
            method: 'GET'
        };

        if (authenticated) {
            if (token) {
                config.headers = merge(config.headers, {'Authorization': `Bearer ${token}`});
            } else {
                return reject("No token available");
            }
        }

        fetch(baseUrl + endpoint, merge(config, configuration))
            .then((response) => {

            console.log(response.headers.get("X-Authentication"));

            if (response.ok) {
                return resolve(response)
            }

            return response.json().then(json => {
                if (json.status===401) {
                    dispatch(logoutUser());
                }

                reject(json);
            })
        })
    })
}




