import React, { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { logout } from '../features/auth/authSlice'
import { useSelector, useDispatch } from 'react-redux'
import { allBlog } from '../features/blog/blogSlice'
import Spinner from './Spinner'

const Header = () => {
    const { user } = useSelector((state) => state.auth)
    const { blogs, isLoading } = useSelector((state) => (state.blog))
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {

        if (user == null || !user || !localStorage.getItem('user')) {
            console.log('i am called');
            navigate('/')
        }
    }, [user,])

    useEffect(() => {
        dispatch(allBlog())
    }, [isLoading])


    const handelLogout = () => {

        dispatch(logout())
    }
    if (isLoading) {
        <Spinner />
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-dark fixed-top mb-4">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/">AuthApp</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">

                            {user !== null ? (<>
                                <li className="nav-item">
                                    <NavLink className="nav-link active" aria-current="page" to="/home">Home</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link active" aria-current="page" to="/profile">Profile</NavLink>
                                </li>
                                <li className="nav-item">
                                    <p className="nav-link fw-bold text-danger" onClick={handelLogout}>Logout</p>
                                </li>
                            </>) : (
                                <>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/">Login</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/register">Register</NavLink>
                                    </li>
                                </>
                            )}


                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header
