import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import {
  TbArrowBigUpFilled,
  TbArrowBigDownFilled,
} from "react-icons/tb";
import { CiCircleChevLeft } from "react-icons/ci";
import { FaMessage } from "react-icons/fa6";
import { IoArrowRedoSharp } from "react-icons/io5";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { BsThreeDots } from "react-icons/bs";
import { MdEdit,MdDelete  } from "react-icons/md";
import { IoIosCloseCircle } from "react-icons/io";
import moment from "moment";
import SinglePostSkeleton from "../components/Community/SinglePostSkeleton";

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyContent, setReplyContent] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [loadingVotes, setLoadingVotes] = useState({});
  const [submittingComment, setSubmittingComment] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingContent, setEditingContent] = useState("");
  const [expandedReplies, setExpandedReplies] = useState({});
  //   const [textareaRows, setTextareaRows] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [id]);

  const handleVote = async (postId, type) => {
    setLoadingVotes((prev) => ({ ...prev, [`post-${type}`]: true }));
    try {
      await api.post(`/post/${postId}/${type}`);
      fetchPost();
    } catch (error) {
      console.error(`Error trying to ${type}:`, error);
    } finally {
      setLoadingVotes((prev) => ({ ...prev, [`post-${type}`]: false }));
    }
  };

  const fetchPost = async () => {
    const res = await api.get(`/post/${id}`);
    setPost(res.data.data);
  };

  const fetchComments = async () => {
    const res = await api.get(`/comments/post/${id}`);
    setComments(res.data.data);
  };

  const toggleReplies = (commentId) => {
    setExpandedReplies((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const handleCommentSubmit = async (e, parentComment = null) => {
    e.preventDefault();
    setSubmittingComment(true);

    const content = parentComment ? replyContent[parentComment] : newComment;
    if (!content.trim()) return;

    try {
      await api.post(`/comments/post/${id}`, {
        content,
        parentComment,
      });

      if (parentComment) {
        setReplyContent((prev) => ({ ...prev, [parentComment]: "" }));
        setReplyingTo(null);
      } else {
        setNewComment("");
      }

      fetchComments();
    } catch (error) {
      console.error("Comment submission failed:", error);
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleEdit = () => {
    setEditContent(post.body);
    setIsEditing(true);
  };

  const handleEditComment = (commentId, currentContent) => {
    setEditingCommentId(commentId);
    setEditingContent(currentContent);
  };

  const handleEditSubmit = async () => {
    try {
      await api.put(`/post/${post._id}`, {
        body: editContent,
      });
      setIsEditing(false);
      fetchPost();
    } catch (err) {
      console.error("Edit failed", err);
    }
  };

  const handleEditCommentSubmit = async () => {
    try {
      await api.put(`/comments/${editingCommentId}`, {
        content: editingContent,
      });
      setEditingCommentId(null);
      setEditingContent("");
      fetchComments();
    } catch (err) {
      console.error("Failed to update comment", err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await api.delete(`/post/${post._id}`);
        navigate("/community");
      } catch (err) {
        console.error("Delete failed", err);
      }
    }
  };

  const handleDeleteComment = async (commentID) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      try {
        await api.delete(`/comments/${commentID}`);
        fetchComments();
      } catch (err) {
        console.error("Delete failed", err);
      }
    }
  };
  //   const handleTextareaExpand = () => {
  //     setTextareaRows(6);
  //   };
  //   const handleTextareaClose = () => {
  //     setTextareaRows(1);
  //   };
  const handleCopy = (postId) => {
    const url = `${window.location.origin}/post/${postId}`;
    navigator.clipboard
      .writeText(url)
      .then(() => alert("Link copied to clipboard!"))
      .catch((err) => console.error("Failed to copy!", err));
  };
//   if (!post) return <p className="text-center mt-10">Loading...</p>;
if (!post) return <SinglePostSkeleton />;

  return (
    <div className="w-full flex flex-col items-center pb-20">

    <div className="w-2/3 pt-20 pl-8 sm:pl-0 md:pl-14">
          <div className="w-full flex justify-between relative">
            <CiCircleChevLeft onClick={()=> navigate("/dashboard/community")} className="absolute -left-10 text-[25px] text-gray-700 hover:text-gray-400 cursor-pointer" />
            <div className="flex flex-col ">
              <p className="font-bold flex items-center gap-2">
                {post.community}{" "}
                <p className="text-sm text-black font-normal">
                  {moment(post.createdAt).fromNow()}
                </p>
              </p>
              <p className="text-sm text-gray-500 mb-4">by {post.author?.name}</p>
            </div>
            <div className="relative">
              <BsThreeDots
                onClick={() => setIsModalOpen(!isModalOpen)}
                className="cursor-pointer rounded-full hover:bg-gray-200 transition-colors duration-200"
              />
              
              {isModalOpen && (
                <div className="absolute right-0 top-4 z-50 bg-white shadow-lg rounded-md border border-gray-200 w-48">
                  <div className="py-1">
                    {/* <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                      Edit
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                      Delete
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                      Share
                    </button> */}
                    {user && (post.author?._id === user.id || user.role === "admin" || user.role === "superadmin") && (
                      <>
                        <button
                          onClick={()=>{
                            handleEdit();
                            setIsModalOpen(false)
                          }}
                          className="flex gap-2 items-center cursor-pointer w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                        >
                        <MdEdit />  Edit
                        </button>
                        <button
                          onClick={handleDelete}
                          className="flex gap-2 items-center cursor-pointer w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                        >
                        <MdDelete />  Delete
                        </button>
                        <button
                          className="flex gap-2 items-center cursor-pointer w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                          onClick={() => setIsModalOpen(false)}
                        >
                        <IoIosCloseCircle />  Close
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
    
          {/* {user && post.author?._id === user.id && (
            <div className="flex space-x-3 mb-4">
              <button
                onClick={handleEdit}
                className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          )} */}
    
          {isEditing ? (
            <div className="mb-6">
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full p-2 border rounded"
                rows="4"
              />
              <div className="mt-2 flex space-x-2">
                <button
                  onClick={handleEditSubmit}
                  className="px-4 py-2 bg-[#0045ac] text-white rounded-full hover:bg-orange-500 disabled:opacity-50 cursor-pointer"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1 bg-gray-400 text-black rounded-full hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <p className="mb-6">{post.body}</p>
          )}
    
          {/* Top-level Comment Form */}
          <form onSubmit={(e) => handleCommentSubmit(e)} className="mb-6 space-y-2">
            <div className="w-full flex space-x-4 text-center mt-5 text-sm text-gray-500">
              <div
                disabled={loadingVotes[`post-upvote`]}
                onClick={() => handleVote(post._id, "upvote")}
                className="flex items-center space-x-3 text-black text-[14px] bg-gray-100 py-[4px] px-[10px] rounded-[5px]  hover:text-orange-500 transition-colors duration-300 ease-in-out "
              >
                <TbArrowBigUpFilled /> <p>{post.upvotes?.length || 0}</p>
              </div>
              <div
                disabled={loadingVotes[`post-downvote`]}
                onClick={() => handleVote(post._id, "downvote")}
                className="flex items-center space-x-3 text-black text-[14px] bg-gray-100 py-[4px] px-[10px] rounded-[5px]  hover:text-orange-500 transition-colors duration-300 ease-in-out "
              >
                <TbArrowBigDownFilled /> <p>{post.downvotes?.length || 0}</p>
              </div>
              <div
                onClick={() => {!user && navigate(`/login`)}}
                className="flex items-center space-x-2 text-black text-[14px] bg-gray-100 py-[4px] px-[10px] rounded-[5px] hover:text-orange-500 transition-colors duration-300 ease-in-out"
              >
                <FaMessage />
              </div>
              <div
                onClick={() => handleCopy(post._id)}
                className="flex items-center space-x-2 text-black text-[14px] bg-gray-100 py-[4px] px-[10px] rounded-[5px] hover:text-orange-500 transition-colors duration-300 ease-in-out"
              >
                <IoArrowRedoSharp />
                <p>Share</p>
              </div>
            </div>
    
            <div className="border-b border-gray-300 pb-6 mb-6"></div>
            {user && <div className="relative">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Join the conversation"
                className="w-full p-2 border rounded-md"
                rows="6"
                required
              ></textarea>
    
              <div
                className={`flex items-center gap-2 justify-end absolute right-5 bottom-5`}
              >
                {/* <button
                  type="button"
                //   onClick={handleTextareaClose}
                  className="px-4 py-2 bg-gray-300 text-black rounded-full hover:bg-gray-500 disabled:opacity-50 cursor-pointer"
                >
                  Cancel
                </button> */}
                <button
                  type="submit"
                  disabled={submittingComment}
                  className="px-4 py-2 bg-[#0045ac] text-white rounded-full hover:bg-orange-500 disabled:opacity-50 cursor-pointer"
                >
                  {submittingComment ? "Posting..." : "Comment"}
                </button>
              </div>
            </div> }
          </form>
    
          {/* Comments */}
          <h2 className="text-xl font-bold mb-4">Comments</h2>
          {[...comments].reverse().map((comment) => (
            <div key={comment._id} className="mb-4">
              <div className="p-3 rounded-lg">
                <div className="flex gap-1">
                  <p className="text-sm text-black font-bold capitalize ">
                    {comment.author?.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {moment(comment.createdAt).fromNow()}
                  </p>
                </div>
    
                {/* comment content and its editing box  */}
                {editingCommentId === comment._id ? (
                  <div className="mt-2">
                    <textarea
                      value={editingContent}
                      onChange={(e) => setEditingContent(e.target.value)}
                      className="w-full p-2 border rounded"
                      rows="2"
                    />
                    <div className="mt-2 flex space-x-2">
                      <button
                        onClick={handleEditCommentSubmit}
                        className="px-4 py-2 bg-[#0045ac] text-white rounded-full hover:bg-orange-500 disabled:opacity-50 cursor-pointer"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingCommentId(null)}
                        className="px-3 py-1 bg-gray-400 text-black rounded-full hover:bg-gray-500"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-800">{comment.content}</p>
                )}
    
                {/* edit delete reply collapse comments  */}
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center space-x-2">
                   {user && <button
                      onClick={() => setReplyingTo(comment._id)}
                      className="flex items-center space-x-2 text-black text-[14px] bg-gray-100 py-[4px] px-[10px] rounded-[5px] hover:text-orange-500 transition-colors duration-300 ease-in-out gap-2 cursor-pointer"
                    >
                      <FaMessage /> Reply
                    </button> }
    
                    {user && (comment.author?._id === user.id || user.role === "admin" || user.role === "superadmin") && (
                      <>
                        <button
                          onClick={() =>
                            handleEditComment(comment._id, comment.content)
                          }
                          className="text-yellow-600 text-sm hover:underline ml-4 cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteComment(comment._id)}
                          className="text-red-600 text-sm hover:underline ml-4 cursor-pointer"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
    
                  <div className="mr-3 text-xs text-gray-400 flex items-center space-x-2">
                    <p className="text-black">
                      Replies {`(${comment.replies?.length})`}
                    </p>
    
                    <div
                      onClick={() => toggleReplies(comment._id)}
                      className="hover:text-black cursor-pointer"
                    >
                      {expandedReplies[comment._id] ? (
                        <CiCircleMinus className="text-black" />
                      ) : (
                        <CiCirclePlus />
                      )}
                    </div>
                  </div>
                </div>
              </div>
    
              {/* Reply Form for comments */}
              {replyingTo === comment._id && (
                <form
                  onSubmit={(e) => handleCommentSubmit(e, comment._id)}
                  className="mt-2 ml-4"
                >
                  <textarea
                    value={replyContent[comment._id] || ""}
                    onChange={(e) =>
                      setReplyContent((prev) => ({
                        ...prev,
                        [comment._id]: e.target.value,
                      }))
                    }
                    placeholder="Write a reply..."
                    className="w-full p-2 border rounded-md"
                    rows="2"
                    required
                  ></textarea>
                  <div className="mt-1 flex space-x-2">
                    <button
                      type="submit"
                      disabled={submittingComment}
                      className="px-3 py-1 bg-[#0045ac] text-white rounded-full hover:bg-orange-500 disabled:opacity-50"
                    >
                      {submittingComment ? "Replying..." : "Reply"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setReplyingTo(null)}
                      className="px-3 py-1 bg-gray-400 text-black rounded-full hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
    
              {/* edit delete replies  */}
              {expandedReplies[comment._id] && comment.replies?.length > 0 && (
                <div className="ml-6 mt-2 space-y-2">
                  {comment.replies.map((reply) => (
                    <div
                      key={reply._id}
                      className="bg-white border-l-[1px] border-gray-400 p-2 m-0"
                    >
                      <p className="text-sm text-black font-bold">
                        {reply.author?.name}
                      </p>
                      {editingCommentId === reply._id ? (
                        <div className="mt-2">
                          <textarea
                            value={editingContent}
                            onChange={(e) => setEditingContent(e.target.value)}
                            className="w-full p-2 border rounded"
                            rows="2"
                          />
                          <div className="mt-2 flex space-x-2">
                            <button
                              onClick={handleEditCommentSubmit}
                              className="px-4 py-2 bg-[#0045ac] text-white rounded-full hover:bg-orange-500 disabled:opacity-50 cursor-pointer"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditingCommentId(null)}
                              className="px-3 py-1 bg-gray-400 text-black rounded-full hover:bg-gray-500"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p>{reply.content}</p>
                      )}
                      <div className="flex items-center space-x-2 mt-2">
                        {user && reply.author?._id === user.id && (
                          <>
                            <button
                              onClick={() =>
                                handleEditComment(reply._id, reply.content)
                              }
                              className="text-yellow-600 text-sm hover:underline ml-4"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteComment(reply._id)}
                              className="text-red-600 text-sm hover:underline ml-4"
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
    </div>
  );
};

export default PostDetail;
