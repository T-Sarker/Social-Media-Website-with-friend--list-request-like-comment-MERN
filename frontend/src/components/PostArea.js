import React, { useEffect, useState } from 'react'
import { FaTrashAlt } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify'
import { addBlog, allBlog, reset } from '../features/blog/blogSlice';
import Spinner from './Spinner';

const PostArea = () => {
    const [tags, setTags] = useState([])
    const [data, setData] = useState({ title: '', description: '' })
    const [images, setImages] = useState('')
    const dispatch = useDispatch();


    const { isError, isSuccess, isLoading, msg } = useSelector((state) => (state.blog))
    const { user } = useSelector((state) => state.auth)

    const handelChangeData = (e) => {
        setData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const onFileChange = (e) => {
        setImages(e.target.files)
    }

    const handelChangeTags = (e) => {
        setTags(e.target.value.split(','))
    }
    const deleteByValue = (tagVal) => {

        setTags(prev => { return prev.filter(tag => tag !== tagVal) })
    }

    //handeling the submit request
    const handelPostSubmit = (e) => {

        let formData = new FormData();
        // console.log(JSON.stringify(data) + JSON.stringify(tags) + JSON.stringify(images));
        for (let i = 0; i < images.length; i++) {
            formData.append('images', images[i]);

        }
        formData.append('title', data.title)
        formData.append('description', data.description)
        formData.append('tags', tags)
        formData.append('name', user.name)

        dispatch(addBlog(formData))
        setTags([])
        setData({ title: '', description: '' })
        setImages('')


    }

    useEffect(() => {
        if (isError) {
            toast.error(msg)
        }
        if (isSuccess) {
            toast.success('Added Successfully')
        }
        dispatch(reset())
    }, [isError, isSuccess, isLoading, msg])



    if (isLoading) {
        <Spinner />
    }
    return (
        <>
            <div className="mb-4 mt-5">
                <div className="postArea">
                    <div className="card mb-3 border-0">
                        <div className="row">
                            <div className="col-2"></div>
                            <div className="col-6 shadow-sm p-0">
                                <div className="row">
                                    <div className="col-md-4 align-self-center">
                                        <img src="https://simg.nicepng.com/png/small/838-8382821_matt-round-png-round-image-of-man.png" className="img-fluid rounded-start w-50  ms-2" alt="..." />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <div className="mb-3">
                                                <input type="text" className="form-control" id="title" placeholder="title" value={data.title} name='title' onChange={handelChangeData} />
                                            </div>
                                            <div className="mb-3">
                                                <textarea className="form-control" id="description" value={data.description} rows="2" name='description' placeholder='description' onChange={handelChangeData}></textarea>
                                            </div>
                                            <div className="mb-3">
                                                <input className="form-control" type="file" id="formFile" name='images' multiple onChange={onFileChange} />
                                            </div>
                                            <div className="mb-3">
                                                <input type="text" className="form-control form-control-sm" id="tags" value={tags} placeholder="tags" name='tags' onChange={handelChangeTags} />
                                                <div className="d-flex">
                                                    <ul className="list-group list-group-horizontal">
                                                        {tags.map(tag => {
                                                            return (
                                                                <li className="list-group-item" key={tag}>
                                                                    <span>{tag}</span>
                                                                    <span onClick={() => deleteByValue(tag)}><FaTrashAlt className='ms-2 text-danger' /></span>
                                                                </li>
                                                            )
                                                        })}
                                                    </ul>
                                                </div>
                                            </div>
                                            <button className='btn btn-primary btn-sm' onClick={handelPostSubmit}>Post</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-3 shadow-sm text-center ms-2">
                                <p>Ads</p>
                                <img src="https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/attachments/delivery/asset/1d2850d30e32e5629e9e22cef4794a52-1651010824/Artboard%201/create-eye-catching-3d-cover-mockup-from-your-2d-book-cover.png" className='w-75' alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PostArea
