import {
    SIGN_IN,
    SIGN_UP,
} from '../types'

import axios from 'axios'

export function signUp(data) {

    const request = axios({
        method: 'POST',
        url: SIGNUP,
        data: {
            email: data.email,
            password: data.password,
            returnSecureToken: true,
        },
        header: {
            "Content-Type": "application/json"
        }
    }).then(response => {
        console.log(response.data)
        return response.data
    }).catch(err => {
        alert('ERROR')
        return false
    })

    return {
        type: SIGN_UP,
        payload: request
    }
}
