import React, {useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";

import { useFormik } from 'formik';
import { signInSchema } from './validation';

import { signIn } from "@actions/authActions";
import { auth } from "@actions/authActions";

import Header from '@components/Header'

import './SignIn.scss'

export default function SignIn() {
    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
      dispatch(auth())
    }, [])
  
    if (isAuth === true) {
        navigate('/main',{replace: true})
    }


    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: signInSchema,
        onSubmit: (values) => {
            dispatch(signIn(values.username, values.password))
            navigate('/main',{replace: true})
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
