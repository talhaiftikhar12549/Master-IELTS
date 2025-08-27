import { useState, useEffect, useRef } from "react";
import api from "../../services/api";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegEdit, FaRegEye } from "react-icons/fa";

const CreateLessons = () => {
  const [formData, setFormData] = useState({
    title: "",
    // description: "",
    type: "video",
    videoUrl: "",
    resources: "",
    content: "",
  });

  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [editId, setEditId] = useState(null);
  const [courses, setCourses] = useState([]);
  const [topics, setTopics] = useState([]);
  const [courseID, setCourseID] = useState("");
  const [topicID, setTopicID] = useState("");

  const formRef = useRef();
  const fetchCourses = async () => {
    try {
      const res = await api.get("/courses");
      const res2 = await api.get("/topics");

      setCourses(res.data);
      setTopics(res2.data);
    } catch (err) {
      console.error("Error fetching lessons");
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchLessons = async () => {
    try {
      const res = await api.get("/lessons");
      setLessons(res.data);
    } catch (err) {
      console.error("Error fetching lessons");
    }
  };

  useEffect(() => {
    fetchLessons();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      // description: "",
      type: "video",
      videoUrl: "",
      resources: "",
      content: "",
    });
    setCourseID("");
    setTopicID("");
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const payload = {
      ...formData,
      topic: topicID,
    };

    try {
      if (editId) {
        await api.put(`/lessons/${editId}`, payload);
        setMessage("Lesson updated successfully!");
      } else {
        await api.post(`/lessons/${topicID}`, payload);
        setMessage("Lesson created successfully!");
      }

      resetForm();
      fetchLessons();
    } catch (error) {
      setMessage("Error saving topic.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this topic?")) return;

    try {
      await api.delete(`/lessons/${id}`);
      fetchLessons();
    } catch (err) {
      alert("Failed to delete topic");
    }
  };

  const handleEdit = async (lesson) => {
    const selectedTopic = topics.find((t) => t._id === lesson.topic._id);
    const affiliatedCourseID = selectedTopic?.course?._id || "";
    setTopicID(selectedTopic?._id || "");
    setCourseID(affiliatedCourseID);
    setFormData({
      topic: lesson.topic._id,
      title: lesson.title,
      description: lesson.description || "",
      type: lesson.type || "video",
      videoUrl: lesson.videoUrl || "",
      resources: lesson.resources?.join(", ") || "",
      content: lesson.content || "",
    });
    // setTopicID(selectedTopic?._id || "");
    // setCourseID(affiliatedCourseID);
    setEditId(lesson._id);

    window.scrollTo({
      top: formRef.current.offsetTop - 100,
      behavior: "smooth",
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white mt-10 mb-20 rounded shadow-sm">
      <div ref={formRef}>
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          {editId ? "Edit Lesson" : "Create Lesson"}
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

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium mb-1">Select Course</label>
              <select
                name="course"
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
              <label className="block font-medium mb-1">Select Topic</label>
              <select
                name="topic"
                value={topicID}
                onChange={(e) => setTopicID(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
              >
                <option value="">-- Select Topic --</option>
                {topics
                  .filter((topic) => topic.course?._id === courseID)
                  .map((topic) => (
                    <option key={topic._id} value={topic._id}>
                      {topic.title}
                    </option>
                  ))}
              </select>
            </div>
            {/* Title */}
            <div>
              <label className="block font-medium mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>
            {/* Type */}
            <div>
              <label className="block font-medium mb-1">Lesson Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="video">Video</option>
                <option value="quiz">Quiz</option>
              </select>
            </div>

            {/* Video URL */}
            <div>
              <label className="block font-medium mb-1">Video URL</label>
              <input
                type="text"
                name="videoUrl"
                value={formData.videoUrl}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="https://youtube.com/..."
              />
            </div>
            {/* Resources */}
            <div className="md:col-span-2">
              <label className="block font-medium mb-1">
                Resources (comma separated)
              </label>
              <input
                type="text"
                name="resources"
                value={formData.resources}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="link1.pdf, link2.pdf, https://example.com"
              />
            </div>

            {/* Content */}
            <div className="md:col-span-2">
              <label className="block font-medium mb-1">Content</label>
              {/* <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows={4}
                className="w-full border border-gray-300 rounded px-3 py-2"
              ></textarea> */}
              <ReactQuill
                theme="snow"
                value={formData.content}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, content: value }))
                }
                className="bg-white rounded"
              />
            </div>
            <div>
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
                  ? "Update Lesson"
                  : "Create Lesson"}
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
          </div>
        </form>
      </div>

      {/* Lesson Table */}
      <div className="mt-12">
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">
          Created Lessons
        </h3>
        {lessons.length === 0 ? (
          <p className="text-gray-500">No lessons found.</p>
        ) : (
          <div className="overflow-x-auto rounded border border-gray-200">
            <table className="w-full table-auto text-sm text-left">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="border px-4 py-2">Title</th>
                  <th className="border px-4 py-2">Linked to</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {lessons.map((lesson) => (
                  <tr key={lesson._id}>
                    <td className="border px-4 py-2">{lesson.title}</td>
                    <td className="border px-4 py-2">{lesson.topic.title}</td>
                    <td className="border px-4 py-2 space-x-2">
                      <div className="flex items-center space-x-2">
                        {/* <FaRegEye
                          className="cursor-pointer text-blue-600 hover:text-blue-800"
                          onClick={() => alert(`Viewing: ${lesson._id}`)}
                        /> */}
                        <FaRegEdit
                          className="cursor-pointer text-yellow-600 hover:text-yellow-800"
                          onClick={() => handleEdit(lesson)}
                        />
                        <AiOutlineDelete
                          className="cursor-pointer text-red-600 hover:text-red-800"
                          onClick={() => handleDelete(lesson._id)}
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

export default CreateLessons;
