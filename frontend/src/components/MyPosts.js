import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { FaAngleLeft, FaAngleRight, FaEdit, FaTrashAlt } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import { deleteMyPostData, getAllPost } from '../features/mypost/postSlice';
import { reset } from '../features/mypost/postSlice';
import { toast } from 'react-toastify'
import EditModal from './EditModal';
import Expression from './Expression';



const MyPosts = () => {
    const dispatch = useDispatch();
    const [editDatas, setEditDatas] = useState(null)
    const { user } = useSelector((state) => state.auth)
    const { posts, isLoadingPost, isSuccessPost, isErrorPost, msgPost } = useSelector((state) => state.post)
    const { isError, isSuccess, isLoading, msg } = useSelector((state) => (state.blog))


    useEffect(() => {
        if (isSuccessPost) {
            console.log('triggered isSuccessPost');
            toast.success(msgPost)

        }
        if (isErrorPost) {
            console.log('triggered isErrorPost');
            toast.error(msgPost)
        }
        dispatch(getAllPost(user && user.id !== null ? user.id : null))
        // dispatch(reset())
    }, [msgPost, isLoading, isLoadingPost])

    const handleEdit = (id) => {
        if (posts) {
            let data = posts.allBlogs.filter((dta) => { return dta._id === id })
            setEditDatas(data)
        }

    }
    const handleDelete = (id) => {
        dispatch(deleteMyPostData(id))

    }

    const [details, setDetails] = useState(0)

    const changeDetailsValue = (id) => {
        setDetails(id)
    }

    return (
        <>

            <div className="row g-5 mt-4">
                <div className="col-2"></div>
                <div className="col-md-6">

                    <div className="container">
                        {posts && posts.allBlogs.map(blog => {
                            let time = 0
                            const followedAt = new Date(blog.updatedAt);
                            const currentDate = new Date();
                            const diffTime = Math.abs(currentDate - followedAt);

                            if (Math.trunc(diffTime / 1000 / 60) < 60) {
                                time = Math.trunc(diffTime / 1000 / 60) + 'm'
                            } else if (Math.trunc(diffTime / 1000 / 60 / 60) <= 24) {
                                time = Math.trunc(diffTime / 1000 / 60 / 60) + 'h'
                            } else if (Math.trunc(diffTime / 1000 / 60) / 60 >= 24) {
                                time = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 'd'
                            } else if (Math.trunc(diffTime / 1000 / 60) < 1) {
                                time = 'now'
                            }

                            return (<div className="card shadow-sm mb-3" key={blog._id}>
                                <div className="card-header border-0">
                                    <div className="postTop d-flex">
                                        <img className='profile-icon' src="https://simg.nicepng.com/png/small/838-8382821_matt-round-png-round-image-of-man.png" alt="" />
                                        <div className="headingDetails w-100">
                                            <p className='mb-0 fs-5'>{blog.title}</p>
                                            <small className='ms-2 fw-bold fs-small d-flex'>{blog.name} .<span className='ms-3 fw-light fs-smaller'>{time}</span>
                                                <div className="d-flex ms-auto">
                                                    <span className='badge text-bg-primary' onClick={() => { handleEdit(blog._id) }} data-bs-toggle="modal" data-bs-target="#exampleModal"><FaEdit /></span>

                                                    <span className='badge text-bg-warning ms-3' onClick={() => { handleDelete(blog._id) }}><FaTrashAlt /></span>
                                                </div>
                                            </small>

                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <p id={blog._id}>{blog._id == details ? blog.description : blog.description.substring(0, 120)} {blog._id !== details ? <span className='text-primary' onClick={() => { changeDetailsValue(blog._id) }}>... See More</span> : <span className='text-primary' onClick={() => { changeDetailsValue(0) }}>... See Less</span>}</p>

                                    <div id={`id${blog.images[0].split('.')[0]}`} className="carousel slide" data-bs-ride="carousel">
                                        <div className="carousel-inner">
                                            {blog.images.map(img => {
                                                return <div className="carousel-item active" key={`cid${blog.images[0].split('.')[0] + Date.now() + Math.random()}`}>
                                                    <img src={`http://localhost:4000/uploads/${img}`} className="d-block w-100" alt="..." />
                                                </div>
                                            })}
                                        </div>
                                        {blog.images.length > 1 ? <><button className="carousel-control-prev" type="button" data-bs-target={`#id${blog.images[0].split('.')[0]}`} data-bs-slide="prev">
                                            <span className="" aria-hidden="true"><FaAngleLeft className='text-info fs-2' /></span>
                                            <span className="visually-hidden">Previous</span>
                                        </button>
                                            <button className="carousel-control-next" type="button" data-bs-target={`#id${blog.images[0].split('.')[0]}`} data-bs-slide="next">
                                                <span className="text-warning" aria-hidden="true"><FaAngleRight className='text-info fs-2' /></span>
                                                <span className="visually-hidden">Next</span>
                                            </button></> : ''}

                                    </div>
                                </div>
                                <Expression exppost={blog._id} explikes={blog.likes} expcomments={blog.comments} />
                            </div>)
                        })}
                    </div>
                </div>
                <EditModal editData={editDatas} />
                <Sidebar />
            </div>
        </>
    )
}

export default MyPosts
