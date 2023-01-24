import React from 'react'

const Sidebar = () => {
    return (
        <>
            <div className="col-md-3">
                <div className="position-sticky">


                    <div className="p-4 shadow-sm">
                        <h4 className="">Friends</h4>
                        <ol className="list-unstyled friendList mb-0">


                            <li className='mt-3 mb-3'>
                                <div className="postTop d-flex">
                                    <img className='profile-icon' src="https://simg.nicepng.com/png/small/838-8382821_matt-round-png-round-image-of-man.png" alt="" />
                                    <div className="headingDetails">
                                        <p className='mb-0 fs-6'>Tapos Kumar sarker </p>
                                    </div>
                                </div>
                            </li>

                            <li className='mt-3 mb-3'>
                                <div className="postTop d-flex">
                                    <img className='profile-icon' src="https://simg.nicepng.com/png/small/838-8382821_matt-round-png-round-image-of-man.png" alt="" />
                                    <div className="headingDetails">
                                        <p className='mb-0 fs-6'>Tapos Kumar sarker </p>
                                    </div>
                                </div>
                            </li>

                            <li className='mt-3 mb-3'>
                                <div className="postTop d-flex">
                                    <img className='profile-icon' src="https://simg.nicepng.com/png/small/838-8382821_matt-round-png-round-image-of-man.png" alt="" />
                                    <div className="headingDetails">
                                        <p className='mb-0 fs-6'>Tapos Kumar sarker </p>
                                    </div>
                                </div>
                            </li>

                            <li className='mt-3 mb-3'>
                                <div className="postTop d-flex">
                                    <img className='profile-icon' src="https://simg.nicepng.com/png/small/838-8382821_matt-round-png-round-image-of-man.png" alt="" />
                                    <div className="headingDetails">
                                        <p className='mb-0 fs-6'>Tapos Kumar sarker </p>
                                    </div>
                                </div>
                            </li>

                            <li className='mt-3 mb-3'>
                                <div className="postTop d-flex">
                                    <img className='profile-icon' src="https://simg.nicepng.com/png/small/838-8382821_matt-round-png-round-image-of-man.png" alt="" />
                                    <div className="headingDetails">
                                        <p className='mb-0 fs-6'>Tapos Kumar sarker </p>
                                    </div>
                                </div>
                            </li>

                        </ol>
                    </div>

                    <div className="p-4 mt-3 shadow-sm">
                        <h4 className="fst-italic">Elsewhere</h4>
                        <ol className="list-unstyled">
                            <li><a href="#">GitHub</a></li>
                            <li><a href="#">Twitter</a></li>
                            <li><a href="#">Facebook</a></li>
                        </ol>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar
