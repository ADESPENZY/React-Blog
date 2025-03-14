import React from 'react';
import { BASE_URL } from '@/api';
import { FormatDate } from '@/services/formatDate';
import { Link } from 'react-router-dom';

const BlogWriter = ({ blog }) => {
  return (
    <Link to={`/profile/${blog.author.username}`} className="flex items-center gap-2 cursor-pointer">
      <span className="flex items-center gap-2">
        <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
          <img
            src={`${BASE_URL}${blog.author.profile_picture}`}
            alt="Author"
            className="rounded-full w-full h-full object-cover"
          />
        </div>

        <small className="text-[#696A75] text-[14px]">
          {blog.author.first_name} {blog.author.last_name}
        </small>
      </span>

      <small className="text-[#696A75] text-[14px] ml-3">
        {FormatDate(blog.published_date)}
      </small>
    </Link>
  );
};

export default BlogWriter;
