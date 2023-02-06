import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { addFriend, getAllUsers, getCurrentUsersFriendReq, getCurrentUsersSentReq, reset } from '../features/friends/friendSlice'

const Sidebar = () => {

    const dispatch = useDispatch()

    const { user, me, isLoading, isSuccess } = useSelector((state) => state.auth)
    const { isLoadingF, usersF, friendReqF, sentReqF, isSuccessF, isErrorF, msgF } = useSelector((state) => (state.friends))
    // console.log(friendReqF);
    console.log(user);
    console.log(me);
    console.log(sentReqF);

    useEffect(() => {
        if (isSuccessF) {
            toast.info('Request sent')
            // dispatch(reset())
        }

        if (isErrorF) {
            toast.error(msgF)
            // dispatch(reset())
        }
    }, [isSuccessF, isErrorF,])



    useEffect(() => {
        dispatch(getAllUsers())
        dispatch(getCurrentUsersFriendReq())
        dispatch(getCurrentUsersSentReq())

    }, [isLoadingF, user, isLoading, isSuccess, isSuccessF])

    const handelAddFriend = (toId) => {
        const fData = { 'toId': toId }
        dispatch(addFriend(fData))
    }



    return (
        <>
            <div className="col-md-3">
                <div className="position-sticky">


                    <div className="p-4  bg-light shadow-sm friendZone">
                        <h4 className="">Suggestions</h4>
                        <ol className="list-unstyled friendList mb-0">
                            {
                                usersF ? usersF.allUser?.map(usr => {

                                    return me ? me.friends.some(fr => fr._id === usr._id) ? '' : <li className='mt-3 mb-3' key={'fg' + usr._id}>
                                        <div className="postTop d-flex">
                                            <img className='profile-icon' src="https://simg.nicepng.com/png/small/838-8382821_matt-round-png-round-image-of-man.png" alt="" />
                                            <div className="headingDetails">
                                                <p className='mb-0 fs-6'>{usr.name}</p>
                                                {
                                                    sentReqF ? sentReqF.allSendReq.length > 0 ? sentReqF.allSendReq.some(reqF => { return usr._id === reqF.toId && reqF.status === false }) ? <span className='btn btn-info btn-sm ms-3 disabled' onClick={() => { handelAddFriend(usr._id) }} >Already Sent</span> : <span className='btn btn-info btn-sm ms-3' onClick={() => { handelAddFriend(usr._id) }} >Add Friend</span> : <span className='btn btn-info btn-sm ms-3' onClick={() => { handelAddFriend(usr._id) }} >Add Friend</span> : ''
                                                }
                                            </div>
                                        </div>
                                    </li> : 'Friends...'
                                }) : 'Loading'
                            }

                        </ol>
                    </div>

                    <div className="p-4 mt-3 bg-light shadow-sm friendZone">
                        <h4 className="">Friend List</h4>
                        <ol className="list-unstyled friendList mb-0">
                            {
                                me ? me.friends?.map(friend => {
                                    return (
                                        <li className='mt-3 mb-3' key={'fgdfg' + friend._id}>
                                            <div className="postTop d-flex">
                                                <img className='profile-icon' src="https://simg.nicepng.com/png/small/838-8382821_matt-round-png-round-image-of-man.png" alt="" />
                                                <div className="headingDetails">
                                                    <p className='mb-0 fs-6'>{friend.name}</p>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                }) : ''
                            }
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
