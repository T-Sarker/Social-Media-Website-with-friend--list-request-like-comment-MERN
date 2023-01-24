import React from 'react'
import MyPosts from '../components/MyPosts'
import PostArea from '../components/PostArea'

const Profile = () => {
    return (
        <>
            <main className="container myPosts">


                <PostArea />

                <MyPosts />

            </main>



        </>
    )
}

export default Profile
