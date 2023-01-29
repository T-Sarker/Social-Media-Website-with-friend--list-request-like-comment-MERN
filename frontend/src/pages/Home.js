import React from 'react'
import PostArea from '../components/PostArea'
import Posts from '../components/Posts'

const Home = () => {
    return (
        <>
            <main className="container mt-5">
                <div className="row p-4 p-md-5 mb-4 rounded heroBanner ">
                    <div className="col-md-6 px-0">
                        <h1 className="display-4 fw-700 text-white">It's Fun when </h1>
                        <p className="lead my-3 fw-700 text-white">Life is Shared and Cared by Loved ones. SO,let's be friends</p>
                        {/* <p className="lead mb-0"><a href="#" className="text-white fw-bold">Continue reading...</a></p> */}
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
