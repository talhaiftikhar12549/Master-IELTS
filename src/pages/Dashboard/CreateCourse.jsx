import { useState, useEffect, useRef } from "react";
import api from "../../services/api";
import { FaRegEdit, FaRegEye } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";

const CreateCourse = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    level: "",
    duration: "",
    price: "",
    thumbnail: "",
    status: "Draft",
    tags: "",
  });

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [editId, setEditId] = useState(null);

  const formRef = useRef();

  const fetchCourses = async () => {
    try {
      const res = await api.get("/courses");
      setCourses(res.data);
    } catch (err) {
      console.error("Error fetching courses");
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      level: "",
      duration: "",
      price: "",
      thumbnail: "",
      status: "Draft",
      tags: "",
    });
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const payload = {
      ...formData,
      price: parseFloat(formData.price),
      tags: formData.tags.split(",").map((tag) => tag.trim()),
    };

    try {
      if (editId) {
        await api.put(`/courses/${editId}`, payload);
        setMessage("Course updated successfully!");
      } else {
        await api.post("/courses", payload);
        setMessage("Course created successfully!");
      }

      resetForm();
      fetchCourses();
    } catch (error) {
      setMessage("Error saving course.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    try {
      await api.delete(`/courses/${id}`);
      fetchCourses();
    } catch (err) {
      alert("Failed to delete course");
    }
  };

  const handleEdit = (course) => {
    setFormData({
      title: course.title,
      description: course.description,
      level: course.level,
      duration: course.duration,
      price: course.price.toString(),
      thumbnail: course.thumbnail,
      status: course.status,
      tags: course.tags.join(", "),
    });
    setEditId(course._id);
    window.scrollTo({
      top: formRef.current.offsetTop - 100,
      behavior: "smooth",
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white mt-10 mb-20 rounded shadow-sm">
      <div ref={formRef}>
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          {editId ? "Edit Course" : "Create Course"}
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

          <div>
            <label className="block font-medium mb-1">Level</label>
            <input
              type="text"
              name="level"
              value={formData.level}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Duration</label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Price ($)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Thumbnail URL</label>
            <input
              type="text"
              name="thumbnail"
              value={formData.thumbnail}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
              <option value="Archived">Archived</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block font-medium mb-1">
              Tags (comma separated)
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
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
                ? "Update Course"
                : "Create Course"}
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

      {/* Course Table */}
      <div className="mt-12">
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">
          Created Courses
        </h3>
        {courses.length === 0 ? (
          <p className="text-gray-500">No courses found.</p>
        ) : (
          <div className="overflow-x-auto rounded border border-gray-200">
            <table className="w-full table-auto text-sm text-left">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="border px-4 py-2">Title</th>
                  <th className="border px-4 py-2">Level</th>
                  <th className="border px-4 py-2">Duration</th>
                  <th className="border px-4 py-2">Price</th>
                  <th className="border px-4 py-2">Status</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course._id}>
                    <td className="border px-4 py-2">{course.title}</td>
                    <td className="border px-4 py-2">{course.level}</td>
                    <td className="border px-4 py-2">{course.duration}</td>
                    <td className="border px-4 py-2">${course.price}</td>
                    <td className="border px-4 py-2">{course.status}</td>
                    <td className="border px-4 py-2 space-x-2">
                      <div className="flex items-center space-x-2">
                        {/* <FaRegEye
                          className="cursor-pointer text-blue-600 hover:text-blue-800"
                           onClick={() => alert(`Viewing: ${course._id}`)}
                        /> */}
                        <FaRegEdit
                          className="cursor-pointer text-yellow-600 hover:text-yellow-800"
                          onClick={() => handleEdit(course)}
                        />
                        <AiOutlineDelete
                          className="cursor-pointer text-red-600 hover:text-red-800"
                          onClick={() => handleDelete(course._id)}
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

export default CreateCourse;
