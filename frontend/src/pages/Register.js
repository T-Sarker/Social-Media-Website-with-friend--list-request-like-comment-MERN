import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { reset, register } from '../features/auth/authSlice'
import { NavLink, useNavigate } from 'react-router-dom'

const Register = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({ name: '', email: '', password: '' })

    const { isError, isLoading, isSuccess, user, msg } = useSelector((state) => state.auth)

    useEffect(() => {
        if (isSuccess || user) {
            navigate('/home')
        }
    }, [isError, isLoading, isSuccess, user, msg])



    const handelChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handelSubmitForm = (e) => {
        e.preventDefault()
        dispatch(register(formData))
    }


    return (
        <>
            <div className="vh-100 d-flex justify-content-center align-items-center ">
                <div className="col-md-5 p-5 shadow-sm border rounded-5 border-primary bg-white">
                    <h2 className="text-center mb-4 text-primary">Signup Form</h2>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className="form-control border border-primary" id="name" name='name' value={formData.name} onChange={handelChange} aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control border border-primary" id="exampleInputEmail1" name='email' value={formData.email} onChange={handelChange} aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control border border-primary" name='password' value={formData.password} onChange={handelChange} id="exampleInputPassword1" />
                        </div>
                        <div className="d-grid">
                            <button className="btn btn-primary" type="submit" onClick={handelSubmitForm}>Register</button>
                        </div>
                    </form>
                    <div className="mt-3">
                        <p className="mb-0  text-center">Have an account? <NavLink to="/"
                            className="text-primary fw-bold">
                            Login</NavLink></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register
