import React from 'react'
import PostArea from '../components/PostArea'
import Posts from '../components/Posts'

const Home = () => {
    return (
        <>
            <main className="container mt-5">
                <div className="row p-4 p-md-5 mb-4 rounded text-bg-dark">
                    <div className="col-md-6 px-0">
                        <h1 className="display-4">Title of a longer featured blog post</h1>
                        <p className="lead my-3">Multiple lines of text that form the lede, informing new readers quickly and efficiently about what’s most interesting in this post’s contents.</p>
                        <p className="lead mb-0"><a href="#" className="text-white fw-bold">Continue reading...</a></p>
                    </div>
                    <div className="col-md-6 px-0">
                        <img className='w-75' src="https://cdni.iconscout.com/illustration/premium/thumb/finding-online-date-4228900-3543455.png" alt="" />
                    </div>
                </div>

                <PostArea />

                <Posts />

            </main>

        </>
    )
}

export default Home
