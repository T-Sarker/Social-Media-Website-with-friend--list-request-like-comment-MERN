import React, { useEffect, useState } from 'react'
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { updateMyPostData } from '../features/mypost/postSlice';
import { toast } from 'react-toastify'
const EditModal = (props) => {
    const dispatch = useDispatch();
    const { posts, isLoadingPost, isSuccessPost, isErrorPost, msgPost } = useSelector((state) => state.post)
    //function for modal data edit function
    const [tags, setTags] = useState([])
    const [data, setData] = useState({ title: '', description: '' })

    const [images, setImages] = useState('')

    const handelChangeData = (e) => {
        setData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const onFileChange = (e) => {
        setImages(e.target.files)
    }

    useEffect(() => {
        if (isSuccessPost === true) {
            toast.success(msgPost)
        }
    }, [isLoadingPost])


    const handelChangeTags = (e) => {
        setTags(e.target.value.split(','))
    }
    const deleteByValue = (tagVal) => {

        setTags(prev => { return prev.filter(tag => tag !== tagVal) })
    }

    const handelPostSubmit = (e) => {

        let formData = new FormData();
        console.log(JSON.stringify(data) + JSON.stringify(tags) + JSON.stringify(images));
        for (let i = 0; i < images.length; i++) {
            formData.append('images', images[i]);

        }
        formData.append('title', data.title)
        formData.append('description', data.description)
        formData.append('tags', tags.length == 0 ? props.editData[0].tags[0] : tags)
        formData.append('id', props.editData[0]._id)
        console.log(props.editData[0].tags[0].split(','));

        dispatch(updateMyPostData(formData))
        setTags([])
        setData({ title: '', description: '' })
        setImages('')


    }


    return (
        <>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Post</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        {props.editData && props.editData.map((edata) => {

                            return <>

                                <div className="modal-body">
                                    <div className="card-body">
                                        <div className="mb-3">
                                            <input type="text" className="form-control" id="title" placeholder="title" defaultValue={edata.title} name='title' onChange={handelChangeData} />
                                        </div>
                                        <div className="mb-3">
                                            <textarea className="form-control" id="description" defaultValue={edata.description} rows="2" name='description' placeholder='description' onChange={handelChangeData}></textarea>
                                        </div>
                                        <div className="mb-3">
                                            <input className="form-control" type="file" id="formFile" name='images' multiple onChange={onFileChange} />
                                        </div>
                                        <div className="mb-3">
                                            <div className="d-flex">
                                                <b>Old Tags</b>
                                                {edata.tags[0].split(',').map(tag => {
                                                    return (
                                                        <small className='bg-dark text-white p-1 m-1' key={tag}>{tag}</small>
                                                    )
                                                })}
                                            </div>
                                            <input type="text" className="form-control form-control-sm" id="tags" defaultValue={tags} placeholder="tags" name='tags' onChange={handelChangeTags} />
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
                                        <button className='btn btn-primary btn-sm' onClick={handelPostSubmit} data-bs-dismiss="modal" aria-label="Close">Post</button>
                                    </div>
                                </div>
                            </>
                        })}


                    </div>
                </div>
            </div>
        </>
    )
}

export default EditModal
