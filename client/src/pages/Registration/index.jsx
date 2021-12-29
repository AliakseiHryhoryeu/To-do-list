import React from 'react'
import { Link } from "react-router-dom"


import { useFormik } from 'formik';
import { registerSchema } from './validation';

import Header from '@components/Header'

import './Registration.scss'

export default function Registration() {
    const formik = useFormik({
        initialValues: {
          username: '',
          email: '',
          password: '',
          repeatPassword: ''
        },
        validationSchema: registerSchema,
        onSubmit: (values) => {
          registerUserWithEmail(values, history);
        },
      });

    return (
        <div className='registration'>
            <Header />
            <div className="registration__container">
                <div className="registration__form">
                    <div className="registration__title">Registration</div>

                    <input className="registration__input" 
                        type="text" placeholder='User name...' 
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.username}
                    />
                    <input className="registration__input" 
                    type="text" placeholder='Email Adress...' 
                    onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />
                    <input className="registration__input" 
                    type="password" placeholder='Password...' 
                    onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                    />
                    <input className="registration__input" 
                    type="password" placeholder='Repeat your password...' 
                    onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.repeatPassword}
                    />
                    
                    <button href="" type="submit" className="registration__button-reg">Register</button>
                    <Link to="/auth" className="registration__button-signIn">Alredy have account? Sign in</Link>
                </div>
            </div>
        </div>
    )
}
