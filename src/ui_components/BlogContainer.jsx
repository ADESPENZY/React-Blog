import React from 'react';
import BlogCard from './BlogCard';
import Spinner from './Spinner';

const BlogContainer = ({ isPending, blogs, title="🍔 Latest Posts" }) => {
  if (isPending) {
    return <Spinner />;
  }

  return (
    <section className="padding-x py-6 max-container">
      <h2 className="font-semibold text-xl mb-6 dark:text-white text-center">
        {title}
      </h2>

      <div className="flex items-center gap-6 justify-center flex-wrap">
        {Array.isArray(blogs) && blogs.length > 0 ? (
          blogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)
        ) : (
          <p className="text-center text-gray-500">No blogs available.</p>
        )}
      </div>
    </section>
  );
};

export default BlogContainer;
