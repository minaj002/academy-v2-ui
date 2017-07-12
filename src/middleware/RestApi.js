/**
 * Created by artis on 20/04/2017.
 */

import fetch from 'isomorphic-fetch';
import { logoutUser } from '../actions/index';

// From webpack define plugin "profiles"
let baseUrl = API_URL;

export default function doFetch(endpoint, configuration, authenticated) {

    return (dispatch) => new Promise((resolve, reject) => {

        let token = localStorage.getItem('token');
        let config = {
            headers: {'Content-Type': 'application/json'},
            method: 'GET'
        };

        if (authenticated) {
            if (token) {
                config.headers = Object.assign(config.headers, {'Authorization': `Bearer ${token}`});
            } else {
                return reject("No token available");
            }
        }

        fetch(baseUrl + endpoint, Object.assign(config, configuration))
            .then((response) => {

            if (response.ok) {
                return resolve(response)
            }

            return response.json().then(json => {
                if (json.status===401) {
                    dispatch(logoutUser());
                }

                reject(Object.assign(new Error(json.message || response.statusText), { response }));
            })
        })
    })
}




