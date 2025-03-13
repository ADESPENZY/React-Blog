import React, { useState } from 'react';
import BlogContainer from '@/ui_components/BlogContainer';
import Header from '@/ui_components/Header';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import PagePagination from '@/ui_components/PagePagination';
import { getBlogs } from '@/services/apiBlog';

const HomePage = () => {

  const [page, setPage] = useState(1)
  const numOfBlogsPerPage = 3
 
  const { data, isLoading, error } = useQuery({
    queryKey: ['blogs', page],
    queryFn:() => getBlogs(page),
    placeholderData: keepPreviousData,
  });

  const blogs = data?.results || [];

  const numOfPages = Math.ceil(data?.count/numOfBlogsPerPage)

  function handleSetPage(val){
    setPage(val)
  }

  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <Header />
      <BlogContainer isPending={isLoading} blogs={blogs} />
      <PagePagination numOfPages={numOfPages} handleSetPage={handleSetPage} page={page} />
    </>
  );
};

export default HomePage;
