import { useState, useEffect, useRef } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";

const CreateTopics = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",

  });
  const navigate = useNavigate();

  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [editId, setEditId] = useState(null);
  const [courses, setCourses] = useState([]);
  const [courseID, setCourseID] = useState("");

  const formRef = useRef();

  const fetchCourses = async () => {
    try {
      const res = await api.get("/courses");
      setCourses(res.data);
    } catch (err) {
      console.error("Error fetching topics");
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchTopics = async () => {
    try {
      const res = await api.get("/topics");
      setTopics(res.data);
    } catch (err) {
      console.error("Error fetching topics");
    }
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
    });
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const payload = {
      ...formData,
    };

    try {
      if (editId) {
        await api.put(`/topics/${editId}`, payload);
        setMessage("Topic updated successfully!");
      } else {
        await api.post(`/topics/${courseID}`, payload);
        setMessage("Topic created successfully!");
      }

      resetForm();
      fetchTopics();
    } catch (error) {
      setMessage("Error saving topic.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this topic?")) return;

    try {
      await api.delete(`/topics/${id}`);
      fetchTopics();
    } catch (err) {
      alert("Failed to delete topic");
    }
  };

  const handleEdit = (topic) => {
    setFormData({
      title: topic.title,
      description: topic.description,
    });
    setEditId(topic._id);
    window.scrollTo({
      top: formRef.current.offsetTop - 100,
      behavior: "smooth",
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white mt-10 mb-20 rounded shadow-sm">
      <div ref={formRef}>
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          {editId ? "Edit Topic" : "Create Topic"}
        </h2>

        {message && (
          <div
            className={`mb-4 p-3 rounded text-sm ${
              message.includes("success")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div>
            <label className="block font-medium mb-1">Select Course</label>
            <select
              type="text"
              name="title"
              value={courseID}
              onChange={(e) => setCourseID(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            >
              <option value="">-- Select Course --</option>
              {courses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full border border-gray-300 rounded px-3 py-2"
            ></textarea>
          </div>

          <div className="md:col-span-2 mt-2">
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-2 text-white font-semibold rounded ${
                loading
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading
                ? editId
                  ? "Updating..."
                  : "Creating..."
                : editId
                ? "Update Topic"
                : "Create Topic"}
            </button>
            {editId && (
              <button
                type="button"
                onClick={resetForm}
                className="ml-4 text-gray-600 underline hover:text-gray-800"
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Topic Table */}
      <div className="mt-12">
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">
          Created Topics
        </h3>
        {topics.length === 0 ? (
          <p className="text-gray-500">No topics found.</p>
        ) : (
          <div className="overflow-x-auto rounded border border-gray-200">
            <table className="w-full table-auto text-sm text-left">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="border px-4 py-2">Title</th>
                  <th className="border px-4 py-2">Course</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {topics.map((topic) => (
                  <tr key={topic._id}>
                    <td className="border px-4 py-2">{topic.title}</td>
                    <td className="border px-4 py-2">{topic.course.title}</td>
                    <td className="border px-4 py-2 space-x-2">
                      <div className="flex items-center space-x-2">
                        {/* <FaRegEye
                        className="cursor-pointer text-blue-600 hover:text-blue-800"
                          onClick={() =>
                            navigate(
                              `/course/${topic.course.title.toLowerCase()}`
                            )
                          }
                        /> */}
                        <FaRegEdit 
                        className="cursor-pointer text-yellow-600 hover:text-yellow-800"
                        onClick={() => handleEdit(topic)} />
                        <AiOutlineDelete
                        className="cursor-pointer text-red-600 hover:text-red-800"
                          onClick={() => handleDelete(topic._id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateTopics;
