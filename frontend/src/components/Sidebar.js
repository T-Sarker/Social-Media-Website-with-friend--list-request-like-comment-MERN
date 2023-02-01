import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addFriend, getAllUsers, getCurrentUsersFriendReq, reset } from '../features/friends/friendSlice'

const Sidebar = () => {

    const dispatch = useDispatch()
    const { isLoadingF, usersF, friendReqF } = useSelector((state) => (state.friends))
    // console.log(usersF);
    // console.log(friendReqF);

    useEffect(() => {
        dispatch(getAllUsers())
        dispatch(getCurrentUsersFriendReq())

    }, [isLoadingF])

    const handelAddFriend = (toId) => {
        const fData = { 'toId': toId }
        dispatch(addFriend(fData))
    }

    // const checkrequest = (uId) => {
    //     friendReqF && friendReqF.allReq.filter(dta => {
    //         return dta.toId
    //     })
    // }


    return (
        <>
            <div className="col-md-3">
                <div className="position-sticky">


                    <div className="p-4  bg-light shadow-sm friendZone">
                        <h4 className="">Suggestions</h4>
                        <ol className="list-unstyled friendList mb-0">
                            {
                                usersF && usersF.allUser.map(userS => {
                                    return (
                                        <li className='mt-3 mb-3' key={'bla' + userS._id}>
                                            <div className="postTop d-flex">
                                                <img className='profile-icon' src="https://simg.nicepng.com/png/small/838-8382821_matt-round-png-round-image-of-man.png" alt="" />
                                                <div className="headingDetails">
                                                    <p className='mb-0 fs-6'>{userS.name}</p>

                                                    <span className={`btn btn-success btn-sm ms-3 ${() => (null)}`} onClick={() => { handelAddFriend(userS._id) }} >Add Friend</span>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })
                            }

                        </ol>
                    </div>

                    <div className="p-4 mt-3 bg-light shadow-sm friendZone">
                        <h4 className="">Friend List</h4>
                        <ol className="list-unstyled friendList mb-0">
                            <li className='mt-3 mb-3'>
                                <div className="postTop d-flex">
                                    <img className='profile-icon' src="https://simg.nicepng.com/png/small/838-8382821_matt-round-png-round-image-of-man.png" alt="" />
                                    <div className="headingDetails">
                                        <p className='mb-0 fs-6'>user name</p>
                                    </div>
                                </div>
                            </li>
                        </ol>
                    </div>

                    <div className="p-4 mt-3 shadow-sm">
                        <h4 className="">Elsewhere</h4>

                        <ol className="list-unstyled">
                            <li><NavLink to="/">GitHub</NavLink></li>
                            <li><NavLink to="/">Twitter</NavLink></li>
                            <li><NavLink to="/">Facebook</NavLink></li>
                        </ol>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar
