import { FaArrowRight } from "react-icons/fa";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";


export const BlogCard = ({ blog, handleDelete }) => {
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const { user } = useAuth();

  const handleClick = () => {
    setShowMoreInfo(true);
  };
  const getExcerpt = (text, wordLimit = 25) => {
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };
  return (
    <>
      <NavLink
        to={`/${blog.slug}`}
        key={blog._id}
        aria-label={`Read more about ${blog.title}`}
        title={`Read more about ${blog.title}`}
        className="group flex flex-col max-w-[413px] flex-1 cursor-pointer border-2 bg-[#FFFFFF] border-[#ffffff] hover:border-blue-300 rounded-xl p-4 shadow-sm transition duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl no-underline"
      >
        <div>
          <img
            src={blog.featuredImage}
            alt={blog.title || "Blog Image"}
            className="rounded-lg w-full"
          />
        </div>

        <div className="flex flex-col flex-1">
          <h3 className="text-[22px] pt-[20px] pb-[10px] !font-[600] font-montserrat text-[#000000] transition-colors duration-300">
            {blog.title || "Untitled Blog"}
          </h3>

          <p className="text-[14px] font-[400] font-montserrat text-[#5B5C67] flex-1">
            {getExcerpt(
              blog.excerpt ||
                "Lorem ipsum dolor sit amet consectetur. Pellentesque arcu nisl at aliquam vitae donec consequat cursus vel. Viverra.",
              25
            )}
          </p>

          <h4 className="text-[18px] pt-[10px] font-[600] font-montserrat text-[#000000] group-hover:!text-blue-400 duration-300 inline-flex items-center cursor-pointer mt-auto">
            Read More
            <span className="sr-only"> about {blog.title}</span>
            <FaArrowRight className="ml-2" />
          </h4>
        </div>
      </NavLink>
    </>
  );
};
