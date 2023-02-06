import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { login } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const { isLoading, isSuccess, isError, user, msg } = useSelector((state) => state.auth)


    const [formData, setFormData] = useState({ email: '', password: '' })

    const handelChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }
    useEffect(() => {
        console.log('i am called effect');
        if (isError) {
            toast.error(msg)
        }
        console.log(isSuccess + "-------" + user);
        if (user) {

            navigate('/home')
        }
        // dispatch(reset())
    }, [isError, isSuccess, user, msg, dispatch, navigate])


    const handelSubmitForm = (e) => {
        e.preventDefault()
        dispatch(login(formData))

    }

    if (isLoading) {
        <Spinner />
    }


    return (
        <>
            <div className="vh-100 d-flex justify-content-center align-items-center ">
                <div className="col-md-5 p-5 shadow-sm border rounded-5 border-primary bg-white">
                    <h2 className="text-center mb-4 text-primary">Login Form</h2>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control border border-primary" id="exampleInputEmail1" name="email" value={handelChange.email} onChange={handelChange} aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control border border-primary" name="password" value={handelChange.password} onChange={handelChange} id="exampleInputPassword1" />
                        </div>
                        <p className="small"><a className="text-primary" href="forget-password.html">Forgot password?</a></p>
                        <div className="d-grid">
                            <button className="btn btn-primary" type="submit" onClick={handelSubmitForm}>Login</button>
                        </div>
                    </form>
                    <div className="mt-3">
                        <p className="mb-0  text-center">Don't have an account? <NavLink to="/register"
                            className="text-primary fw-bold">Sign
                            Up</NavLink></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
