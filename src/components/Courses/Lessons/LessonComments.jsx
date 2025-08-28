import { useEffect, useState } from "react";
import { FaMessage } from "react-icons/fa6";
import { CiCirclePlus } from "react-icons/ci";
import api from "../../../services/api";
import { useAuth } from "../../../context/AuthContext";

const LessonComments = ({ lessonID }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [editing, setEditing] = useState({
    id: null,
    text: "",
    isReply: false,
    parentId: null,
  });
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();

  const token = localStorage.getItem("token");

  // Fetch comments for lesson
  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/discussion/lesson/${lessonID}`);

        setComments(res.data?.data || []);
      } catch (err) {
        console.error("Error fetching comments:", err);
      } finally {
        setLoading(false);
      }
    };
    if (lessonID) fetchComments();
  }, [lessonID]);

  // Add new top-level comment
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const res = await api.post(`/discussion/lesson/${lessonID}`, {
        comment: newComment.trim(),
      });
      const created = res.data?.data;
      if (created) setComments((prev) => [created, ...prev]);
      setNewComment("");
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  // Update a top-level comment
  const handleUpdateComment = async (commentId) => {
    try {
      const res = await api.put(`/discussion/comment/${commentId}`, {
        comment: editing.text,
      });
      const updated = res.data?.data;
      if (updated) {
        setComments((prev) =>
          prev.map((c) => (c._id === commentId ? updated : c))
        );
      }
      setEditing({ id: null, text: "", isReply: false, parentId: null });
    } catch (err) {
      console.error("Error updating comment:", err);
    }
  };

  // Delete a top-level comment
  const handleDeleteComment = async (commentId) => {

    try {
      await api.delete(`/discussion/comment/${commentId}`);
      setComments((prev) => prev.filter((c) => c._id !== commentId));
    } catch (err) {
      console.error("Error deleting comment:", err);
    }
  };

  // Add a reply to a comment
  const handleAddReply = async (parentId) => {
    if (!replyText.trim()) return;
    try {
      const res = await api.post(`/discussion/comment/${parentId}/replies`, {
        comment: replyText.trim(),
      });
      // Controller returns updated parent comment as data
      const updatedParent = res.data?.data;
      if (updatedParent) {
        setComments((prev) =>
          prev.map((c) => (c._id === parentId ? updatedParent : c))
        );
      }
      setReplyText("");
      setReplyingTo(null);
    } catch (err) {
      console.error("Error adding reply:", err);
    }
  };

  // Update a reply
  const handleUpdateReply = async (parentId, replyId) => {
    try {
      const res = await api.put(
        `/discussion/comment/${parentId}/replies/${replyId}`,
        {
          comment: editing.text,
        }
      );
      const updatedParent = res.data?.data;
      if (updatedParent) {
        setComments((prev) =>
          prev.map((c) => (c._id === parentId ? updatedParent : c))
        );
      }
      setEditing({ id: null, text: "", isReply: false, parentId: null });
    } catch (err) {
      console.error("Error updating reply:", err);
    }
  };

  // Delete a reply
  const handleDeleteReply = async (parentId, replyId) => {
    try {
      const res = await api.delete(
        `/discussion/comment/${parentId}/replies/${replyId}`
      );
      const updatedParent = res.data?.data;
      if (updatedParent) {
        setComments((prev) =>
          prev.map((c) => (c._id === parentId ? updatedParent : c))
        );
      }
    } catch (err) {
      console.error("Error deleting reply:", err);
    }
  };

  return (
    <div className="mt-10">
      {/* Top-level Comment Form */}
      <form onSubmit={handleAddComment} className="mb-6 space-y-2">
        <div className="relative">
          <textarea
            placeholder="Join the conversation"
            className="w-full p-2 border rounded-md"
            rows="4"
            required
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <div className="flex items-center gap-2 justify-end absolute right-5 bottom-3">
            <button
              type="submit"
              className="px-4 py-2 bg-[#0045ac] text-white rounded-full hover:bg-orange-500 disabled:opacity-50 cursor-pointer"
              disabled={loading}
            >
              Comment
            </button>
          </div>
        </div>
      </form>

      {/* Comments List */}
      <h2 className="text-xl font-bold mb-4">Comments</h2>
      {loading && <p className="text-sm text-gray-500">Loading comments…</p>}
      <div className="space-y-4">
        {comments.map((c) => (
          <div key={c._id} className="p-3 rounded-lg border bg-white">
            {/* Comment Header */}
            <div className="flex gap-2 items-center">
              <p className="text-sm text-black font-bold capitalize">
                {c.user?.name || "Anonymous"}
              </p>
              <p className="text-xs text-gray-500">
                {c.createdAt ? new Date(c.createdAt).toLocaleString() : ""}
              </p>
            </div>

            {/* Comment Text / Edit */}
            {editing.id === c._id && !editing.isReply ? (
              <div>
                <textarea
                  className="w-full border rounded p-1"
                  rows="2"
                  value={editing.text}
                  onChange={(e) =>
                    setEditing({ ...editing, text: e.target.value })
                  }
                />
                <div className="flex gap-2 mt-1">
                  <button
                    type="button"
                    onClick={() => handleUpdateComment(c._id)}
                    className="text-sm bg-green-600 text-white px-2 rounded"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setEditing({
                        id: null,
                        text: "",
                        isReply: false,
                        parentId: null,
                      })
                    }
                    className="text-sm bg-gray-400 px-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-gray-800 whitespace-pre-wrap">{c.comment}</p>
            )}

            {/* Comment Actions */}
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setReplyingTo(c._id)}
                  className="flex items-center gap-2 text-black text-[14px] cursor-pointer bg-gray-100 py-[4px] px-[10px] rounded hover:text-orange-500 transition-colors"
                >
                  <FaMessage /> Reply
                </button>
                {user.role === "admin" ||
                user.role === "superadmin" ||
                user.token === token ? (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setEditing({
                          id: c._id,
                          text: c.comment,
                          isReply: false,
                          parentId: null,
                        })
                      }
                      className="text-yellow-600 cursor-pointer text-sm hover:underline ml-4"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteComment(c._id)}
                      className="text-red-600 text-sm cursor-pointer hover:underline ml-4"
                    >
                      Delete
                    </button>
                  </>
                ) : null}
              </div>

              <div className="mr-3 text-xs text-gray-500 flex items-center space-x-2">
                <p className="text-black">Replies ({c.replies?.length || 0})</p>
                <div
                  className="hover:text-black cursor-pointer"
                  onClick={() =>
                    setReplyingTo((prev) => (prev === c._id ? null : c._id))
                  }
                  title={replyingTo === c._id ? "Hide reply box" : "Reply"}
                >
                  <CiCirclePlus />
                </div>
              </div>
            </div>

            {/* Reply Form */}
            {replyingTo === c._id && (
              <div className="mt-2 ml-4">
                <textarea
                  placeholder="Write a reply..."
                  className="w-full p-2 border rounded-md"
                  rows="2"
                  required
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                />
                <div className="mt-1 flex space-x-2">
                  <button
                    type="button"
                    onClick={() => handleAddReply(c._id)}
                    className="px-3 py-1 bg-[#0045ac] text-white rounded-full hover:bg-orange-500"
                  >
                    Reply
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setReplyingTo(null);
                      setReplyText("");
                    }}
                    className="px-3 py-1 bg-gray-400 text-black rounded-full hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Replies */}
            <div className="ml-6 mt-2 space-y-2">
              {c.replies?.map((r) => (
                <div
                  key={r._id}
                  className="bg-gray-50 border-l-[2px] border-gray-300 p-2"
                >
                  <div className="flex gap-2 items-center">
                    <p className="text-sm font-bold">
                      {r.user?.name || "Anonymous"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {r.createdAt
                        ? new Date(r.createdAt).toLocaleString()
                        : ""}
                    </p>
                  </div>

                  {editing.id === r._id && editing.isReply ? (
                    <div>
                      <textarea
                        className="w-full border rounded p-1"
                        rows="2"
                        value={editing.text}
                        onChange={(e) =>
                          setEditing({ ...editing, text: e.target.value })
                        }
                      />
                      <div className="flex gap-2 mt-1">
                        <button
                          type="button"
                          onClick={() => handleUpdateReply(c._id, r._id)}
                          className="text-sm bg-green-600 text-white px-2 rounded"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setEditing({
                              id: null,
                              text: "",
                              isReply: false,
                              parentId: null,
                            })
                          }
                          className="text-sm bg-gray-400 px-2 rounded"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="whitespace-pre-wrap">{r.comment}</p>
                  )}

                  <div className="flex items-center space-x-2 mt-2">
                    <button
                      type="button"
                      onClick={() =>
                        setEditing({
                          id: r._id,
                          text: r.comment,
                          isReply: true,
                          parentId: c._id,
                        })
                      }
                      className="text-yellow-600 text-sm hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteReply(c._id, r._id)}
                      className="text-red-600 text-sm hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        {!loading && comments.length === 0 && (
          <p className="text-sm text-gray-500">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>
    </div>
  );
};

export default LessonComments;
