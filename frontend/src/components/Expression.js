import React, { useEffect, useState } from 'react'
import { FaHandHoldingHeart, FaCommentAlt, FaShareSquare, FaTrashAlt } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import { commentDeletePost, commentPost, likeOrDislike } from '../features/mypost/postSlice';
const Expression = (props) => {

    const [comment, setComment] = useState('')
    //dispatch and redux codes
    const dispatch = useDispatch()
    const [expstatus, setExpstatus] = useState(false)
    const { posts, isLoadingPost, msgPost } = useSelector((state) => state.post)
    const { blogs } = useSelector((state) => (state.blog))
    const { user } = useSelector((state) => state.auth)

    useEffect(() => {
        props.explikes.includes(user.id) ? setExpstatus(true) : setExpstatus(false)

    }, [isLoadingPost, msgPost, expstatus, posts, blogs])



    const handelClick = () => {
        const expdata = { 'user': user.id, 'pid': props.exppost }
        dispatch(likeOrDislike(expdata))
    }

    const commentHandel = () => {
        const expData = { 'user': user.id, 'name': user.name, 'commentText': comment, 'pid': props.exppost }
        dispatch(commentPost(expData))
    }

    const commentDeleteHandel = (cid) => {
        const expData = { 'cmntId': cid, 'pid': props.exppost }
        dispatch(commentDeletePost(expData))
    }



    return (
        <>
            <div className="card-footer border-0">
                <div className="row d-flex text-center">

                    <div className="col-4 border-end fs-5">
                        <FaHandHoldingHeart className={`cursorPointer me-2 ${expstatus ? 'text-danger' : 'text-secondary'}`} onClick={handelClick} /> ({props.explikes.length > 0 ? props.explikes.length : 0})
                    </div>

                    <div className="col-4 border-end fs-5">
                        <FaCommentAlt className='cursorPointer me-2' data-bs-toggle="collapse" data-bs-target={`#p${props.exppost}`} aria-expanded="false" aria-controls={`#p${props.exppost}`} /> ({props.expcomments && props.expcomments.length > 0 ? props.expcomments.length : 0})
                    </div>

                    <div className="col-4 border-end fs-5"><FaShareSquare className='cursorPointer me-2' /></div>
                </div>
                <div className="collapse" id={`p${props.exppost}`}>
                    <div className="card card-body">
                        <ol className="list-unstyled friendList mb-0">
                            <li className='mt-3 mb-3'>
                                <div className="postTop d-flex w-100">
                                    <img className='profile-icon' src="https://simg.nicepng.com/png/small/838-8382821_matt-round-png-round-image-of-man.png" alt="" />
                                    <div className="headingDetails d-flex w-100">
                                        <input type="text" name='comment' value={comment} onChange={(e) => { setComment(e.target.value) }} className="w-100 ms-2 me-2" />
                                        <span className={`btn btn-success ${comment.length > 0 ? '' : "disabled"}`} onClick={commentHandel}>Post</span>
                                    </div>
                                </div>
                            </li>

                            {
                                props.expcomments && props.expcomments.map(cmnt => {
                                    return (<li className='mt-3 mb-3' key={cmnt._id}>
                                        <div className="postTop d-flex">
                                            <img className='profile-icon' src="https://simg.nicepng.com/png/small/838-8382821_matt-round-png-round-image-of-man.png" alt="" />
                                            <div className="headingDetails d-flex w-100">
                                                <p className='mb-0 w-100'>{cmnt.userName} </p>
                                                {user && user.id === cmnt.user ? <span className=' mr-auto me-3'><FaTrashAlt className='text-danger' onClick={() => { commentDeleteHandel(cmnt._id) }} /></span> : ''}
                                            </div>
                                        </div>
                                        <small className='ms-5'>{cmnt.msg}</small>
                                    </li>)
                                })
                            }
                        </ol>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Expression
