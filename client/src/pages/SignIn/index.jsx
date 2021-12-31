import React from 'react'
import { Link } from 'react-router-dom'
import { signIn } from "@actions/authActions";
import { useFormik } from 'formik';
import { signInSchema } from './validation';

import Header from '@components/Header'

import './SignIn.scss'

export default function SignIn() {

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: signInSchema,
        onSubmit: (values) => {
            console.log(values)
            signIn(values);
        },
    });
    return (
        <div className='signIn'>
            <Header />
            <div className="signIn__container">
                <form className="signIn__form" onSubmit={formik.handleSubmit} noValidate>
                    <div className="signIn__title">Sign In</div>

                    <input className="signIn__input" 
                        placeholder='Username...'
                        name="username"
                        type="text"

                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.username}
                    />
                    <input className="signIn__input" 
                        placeholder='Password...'
                        name="password"
                        type="password"

                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                    />

                    <button type="submit" className="signIn__button btn-signIn submit" >Sign In</button>
                    <Link to="/registration" className="signIn__button btn-reg">Dont have account? Register</Link>
                    <Link to="/restorepass" className="signIn__button btn-restorepass">Forgot your password?</Link>
                </form>
            </div>
        </div>
    )
}
