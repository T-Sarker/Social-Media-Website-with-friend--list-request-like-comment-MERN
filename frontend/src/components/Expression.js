import React, { useEffect, useState } from 'react'
import { FaHandHoldingHeart, FaCommentAlt, FaShareSquare } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import { likeOrDislike } from '../features/mypost/postSlice';
const Expression = (props) => {
    const dispatch = useDispatch()
    const [expstatus, setExpstatus] = useState(false)
    const { posts, isLoadingPost, msgPost } = useSelector((state) => state.post)
    const { user } = useSelector((state) => state.auth)

    useEffect(() => {
        props.explikes.includes(user.id) ? setExpstatus(true) : setExpstatus(false)

    }, [isLoadingPost, msgPost, expstatus, posts])



    const handelClick = () => {
        const expdata = { 'user': user.id, 'pid': props.exppost }
        dispatch(likeOrDislike(expdata))
    }



    return (
        <>
            <div className="card-footer border-0">
                <div className="row d-flex text-center">
                    <div className="col-4 border-end fs-5"><FaHandHoldingHeart className={`cursorPointer me-2 ${expstatus ? 'bg-info' : 'bg-light'}`} onClick={handelClick} /> ({props.explikes.length > 0 ? props.explikes.length : 0})</div>
                    <div className="col-4 border-end fs-5"><FaCommentAlt className='cursorPointer me-2' /> (0)</div>
                    <div className="col-4 border-end fs-5"><FaShareSquare className='cursorPointer me-2' /></div>
                </div>
            </div>
        </>
    )
}

export default Expression
