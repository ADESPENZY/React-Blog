import Badge from '@/ui_components/Badge'
import React, { useState } from 'react'
import BlogWriter from '@/ui_components/BlogWriter'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteBlog, getBlog } from '@/services/apiBlog'
import Spinner from '@/ui_components/Spinner'
import { BASE_URL } from '@/api'
import { HiPencilAlt } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import Modal from '@/ui_components/Modal'
import CreatePostPage from './CreatePostPage'
import { toast } from 'react-toastify'

const DetailPage = ({username, isAuthenticated}) => {
  const { slug } = useParams();
  const [showModal, setShowModal] = useState(false)
  const navigate= useNavigate()

  function toggleModal(){
    setShowModal(curr => !curr)
  }

  const { isPending, isError, error, data: blog } = useQuery({
    queryKey: ["blogs", slug],
    queryFn: () => getBlog(slug),
  });

  const blogID = blog?.id

  console.log(blog);

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteBlog(id),
    onSuccess: () => {
      toast.success("Your Post has been deleted sucessfully")
      navigate("/")
    },

    onError: (err) => {
      console.log(err)
      toast.error(err.message)
    }
  })
  

  function handleDeleteBlog(){
    const popup = window.confirm("Are you sure you want to delete this post?")
    if(!popup){
      return;
    }

    deleteMutation.mutate(blogID)

  }

  // Handle loading and error states
  if (isPending){
    return <Spinner/>
  }
  if (isError) return <p className="text-center text-red-500">Error: {error.message}</p>;

  return (
    <>
    <div className="padding-dx max-container py-9">
      <Badge blog={blog}/>

      {/* Blog Title */}
      <div className="flex flex-col md:flex-row gap-3 md-0 mb-5 md:mb-0 md:justify-between items-center">
        <h2 className="py-6 leading-normal text-2xl md:text-3xl text-[#181A2A] tracking-wide font-semibold dark:text-[#FFFFFF]">
          {blog?.title}
        </h2>
        { isAuthenticated && username === blog.author.username &&
          <span className="flex justify-between items-center gap-2">
            <HiPencilAlt onClick={toggleModal} className="dark:text-white text-3xl cursor-pointer" />
            <MdDelete onClick={handleDeleteBlog} className="dark:text-white text-3xl cursor-pointer" />
          </span>
        }
      </div>

      {/* Blog Writer Info */}
      <BlogWriter blog={blog} />

      {/* Blog Image */}
      <div className="w-full h-[350px] my-9 overflow-hidden rounded-sm">
        <img className="w-full h-full object-cover rounded-sm" src={`${BASE_URL}${blog.featured_image}`} alt={blog?.title} />
      </div>

      {/* Blog Content */}
      <p className="text-[16px] leading-[2rem] text-justify text-[#3B3C4A] dark:text-[#BABABF]">
        {blog?.content}
      </p>
    </div>
    {showModal && <Modal>
      <CreatePostPage blog={blog} />
    </Modal>
    }
    </>
  );
};

export default DetailPage;
