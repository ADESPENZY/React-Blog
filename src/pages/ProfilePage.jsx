import { getUserInfo } from '@/services/apiBlog'
import BlogContainer from '@/ui_components/BlogContainer'
import Hero from '@/ui_components/Hero'
import Modal from '@/ui_components/Modal'
import Spinner from '@/ui_components/Spinner'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import SignUpPage from './SignUpPage'

const ProfilePage = ({authUsername}) => {

  const [showModal, setShowModal]= useState(false)  

  const toggleModal = () => {
    setShowModal(curr => !curr)
  }

  const {username} = useParams()

  const {isPending, data} = useQuery({
    queryKey: ["users", username],
    queryFn: () => getUserInfo(username)
  });
  const blogs = data?.author_posts

  if(isPending){
    return <Spinner />
  }  

  return (
    <>
       <Hero userInfo={data} authUsername={authUsername} toggleModal={toggleModal} />
       <BlogContainer blogs={blogs} title={`🍔 ${username}'s Posts`} />

       {showModal && (
        <Modal toggleModal={toggleModal}>
          <SignUpPage userInfo={data} updateForm={true} toggleModal={toggleModal} />
        </Modal>
      )}
    </>
  )
}

export default ProfilePage
