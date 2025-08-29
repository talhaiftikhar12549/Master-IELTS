import { useState } from "react";
import { IoArrowRedoSharp, IoChatboxOutline } from "react-icons/io5";
import { TbArrowNarrowUp } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { FaMessage } from "react-icons/fa6";
import { TbArrowBigUpFilled } from "react-icons/tb";
import api from "../../services/api";
import { GoDotFill } from "react-icons/go";
import { useAuth } from "../../context/AuthContext";

export const PostsCard = ({ post, fetchPosts }) => {
  const [loadingVotes, setLoadingVotes] = useState({});

  const navigate = useNavigate();
   const { user } = useAuth();

  const handleCopy = (postId) => {
    const url = `${window.location.origin}/post/${postId}`;
    navigator.clipboard
      .writeText(url)
      .then(() => alert("Link copied to clipboard!"))
      .catch((err) => console.error("Failed to copy!", err));
  };

  const handleVote = async (postId, type) => {
    setLoadingVotes((prev) => ({ ...prev, [`post-${type}`]: true }));
    try {
      await api.post(`/post/${postId}/${type}`);
      fetchPosts();
    } catch (error) {
      console.error(`Error trying to ${type}:`, error);
    } finally {
      setLoadingVotes((prev) => ({ ...prev, [`post-${type}`]: false }));
    }
  };
  function getTimeAgo(dateString) {
    const postDate = new Date(dateString);
    const now = new Date();
    const diffMs = now - postDate;

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
  }

  return (
   
    <div className="w-[100%] flex flex-col gap-4 border-b border-gray-300  cursor-pointer transition ">
      <div className="hover:bg-[#fdfdfb] border-[#dcdcdc] transition-colors duration-300 ease-in-out rounded-[10px] p-4 mb-[10px]">
        <div
          onClick={() => navigate(`/posts/${post._id}`)}
          className="flex-1"
        >
          <div className="w-full flex mb-4">
            <p className="py-1 px-2 bg-orange-500 text-white rounded text-xs">
              {post.community}
            </p>
          </div>
          <div className="flex items-start justify-between space-x-5">
            <div className="flex gap-2">
              <div className="w-7 h-7 border border-gray-400 text-white font-bold bg-red-700 rounded-full flex items-center justify-center text-sm">
                {post.author?.name.slice(0, 1).toUpperCase()}
              </div>

              <div className="flex gap-2 items-center">
                <p className="text-xs text-gray-800 font-[500] flex items-center gap-2">
                  {post.author?.name}
                  <GoDotFill className="text-[5px]" />
                </p>
                <p className="text-xs font-[400]">
                  {getTimeAgo(post.createdAt)}
                </p>
              </div>
            </div>

            <div>
              <div className="w-full flex">
                {/* <p className="py-1 px-2 bg-[#FCC821] rounded text-xs">
                  {post.community}
                </p> */}
              </div>
            </div>
          </div>
          <h3 className="text-sm font-semibold">{post.title}</h3>

          <p className="text-gray-700 text-sm line-clamp-3">
            {post.body?.length > 250
              ? `${post.body.slice(0, 250)}...`
              : post.body}
          </p>

          <div></div>
        </div>

        <div className="w-full flex space-x-4 text-center mt-5 text-sm text-gray-500">
          <div
            disabled={loadingVotes[`post-upvote`]}
            onClick={() => handleVote(post._id, "upvote")}
            className="flex items-center space-x-3 text-black text-[14px] bg-gray-100 py-[4px] px-[10px] rounded-[5px]  hover:text-orange-500 transition-colors duration-300 ease-in-out "
          >
            <TbArrowBigUpFilled /> <p>{post.upvotes?.length || 0}</p>
          </div>
          <div
            onClick={() => {user ? navigate(`/posts/${post._id}`) : navigate(`/login`)}}
            className="flex items-center space-x-2 text-black text-[14px] bg-gray-100 py-[4px] px-[10px] rounded-[5px] hover:text-orange-500 transition-colors duration-300 ease-in-out"
          >
            <FaMessage /> <p>{post.commentsCount || 0}</p>
          </div>
          <div
            onClick={() => handleCopy(post._id)}
            className="flex items-center space-x-2 text-black text-[14px] bg-gray-100 py-[4px] px-[10px] rounded-[5px] hover:text-orange-500 transition-colors duration-300 ease-in-out"
          >
            <IoArrowRedoSharp />
            <p>Share</p>
          </div>
        </div>
      </div>
    </div> 

  );
};
