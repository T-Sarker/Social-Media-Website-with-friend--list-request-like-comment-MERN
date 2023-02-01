import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { logout } from '../features/auth/authSlice'
import { useSelector, useDispatch } from 'react-redux'
import { allBlog } from '../features/blog/blogSlice'
import { FaUsers } from 'react-icons/fa'
import Spinner from './Spinner'
import { handelAllFriendRequests } from '../features/friends/friendSlice'

const Header = () => {
    const { user } = useSelector((state) => state.auth)
    const { isLoading } = useSelector((state) => (state.blog))
    const { isLoadingPost } = useSelector((state) => state.post)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    //friendReq notify
    const { isLoadingF, friendReqF } = useSelector((state) => (state.friends))
    const [friendReqNotify, setFriendReqNotify] = useState()
    const [notify, setNotify] = useState(null)



    useEffect(() => {
        setFriendReqNotify(friendReqF);
        //notify count
        const notifyCounter = friendReqF && friendReqF.allReq.filter(reqs => {
            return reqs.status === false
        })

        setNotify(notifyCounter && notifyCounter.length > 0 ? notifyCounter.length : 0)

    }, [isLoadingF, friendReqF])

    useEffect(() => {

        if (user == null || !user || !localStorage.getItem('user')) {

            navigate('/')
        }
    }, [user])

    useEffect(() => {
        dispatch(allBlog())
    }, [isLoading, isLoadingPost])


    const handelLogout = () => {

        dispatch(logout())
    }
    if (isLoading) {
        <Spinner />
    }

    //accept friend request
    const handelFriendReq = (type, reqId) => {
        const reqData = { 'type': type, 'reqId': reqId }
        dispatch(handelAllFriendRequests(reqData))
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-dark fixed-top mb-4">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/">SocialME</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto align-items-baseline">

                            {user !== null ? (<>
                                <li className="nav-item">
                                    <NavLink className="nav-link active" aria-current="page" to="/home">Home</NavLink>
                                </li>


                                <li className="nav-item dropdown ms-3 me-3 cursorPointer">
                                    {
                                        notify && notify > 0 ? (<p className='dropdown-toggle' data-bs-toggle="dropdown" aria-expanded="false"><FaUsers className='text-white fs-4' /><span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                            {notify}
                                        </span></p>) : ''
                                    }
                                    <ul className="dropdown-menu dropdown-menu-light p-2 notifyList">
                                        {/* <li><a className="dropdown-item" href="#">Action</a></li> */}
                                        {
                                            friendReqF && friendReqF.allReq.map(Freq => {
                                                if (Freq.status === false) {
                                                    return (
                                                        <li className="dropdown-item shadow-sm my-2" key={'hh' + Freq._id}>
                                                            <h6>{Freq.fromId.name} wants to be your friend</h6>
                                                            <span className='btn btn-info btn-sm ms-3' onClick={() => { handelFriendReq('accept', Freq._id) }}>Accept</span>
                                                            <span className='btn btn-danger btn-sm ms-3' onClick={() => { handelFriendReq('decline', Freq._id) }}>Decline</span>
                                                        </li>
                                                    )
                                                }
                                            })
                                        }

                                    </ul>
                                </li>

                                <li className="nav-item">
                                    <NavLink className="nav-link active" aria-current="page" to="/profile">Profile</NavLink>
                                </li>
                                <li className="nav-item">
                                    <p className="nav-link fw-bold text-danger cursorPointer" onClick={handelLogout}>Logout</p>
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
