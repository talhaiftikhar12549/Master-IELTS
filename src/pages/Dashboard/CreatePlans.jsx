import { useState, useEffect, useRef } from "react";
import api from "../../services/api";
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";

const CreatePlans = () => {
  const [formData, setFormData] = useState({
    title: "",
    actualPrice: "",
    discPrice: "",
    offer: "",
    desc: "",
  });

  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [editId, setEditId] = useState(null);

  const formRef = useRef();

  const fetchPlans = async () => {
    try {
      const res = await api.get("/plans");
      setPlans(res.data);
    } catch (err) {
      console.error("Error fetching plans");
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      actualPrice: "",
      discPrice: "",
      offer: "",
      desc: "",
    });
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const payload = {
      title: formData.title,
      actualPrice: parseFloat(formData.actualPrice),
      discPrice: formData.discPrice ? parseFloat(formData.discPrice) : undefined,
      offer: formData.offer,
      desc: formData.desc
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== ""),
    };

    try {
      if (editId) {
        await api.put(`/plans/${editId}`, payload);
        setMessage("Plan updated successfully!");
      } else {
        await api.post("/plans", payload);
        setMessage("Plan created successfully!");
      }

      resetForm();
      fetchPlans();
    } catch (error) {
      setMessage("Error saving plan.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this plan?")) return;

    try {
      await api.delete(`/plans/${id}`);
      fetchPlans();
    } catch (err) {
      alert("Failed to delete plan");
    }
  };

  const handleEdit = (plan) => {
    setFormData({
      title: plan.title,
      actualPrice: plan.actualPrice.toString(),
      discPrice: plan.discPrice?.toString() || "",
      offer: plan.offer || "",
      desc: plan.desc.join(", "),
    });
    setEditId(plan._id);
    window.scrollTo({
      top: formRef.current.offsetTop - 100,
      behavior: "smooth",
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white mt-10 mb-20 rounded shadow-sm">
      <div ref={formRef}>
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          {editId ? "Edit Plan" : "Create Plan"}
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
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Actual Price ($)</label>
            <input
              type="number"
              name="actualPrice"
              value={formData.actualPrice}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Discount Price ($)</label>
            <input
              type="number"
              name="discPrice"
              value={formData.discPrice}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Offer</label>
            <input
              type="text"
              name="offer"
              value={formData.offer}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block font-medium mb-1">
              Description (comma separated features)
            </label>
            <input
              type="text"
              name="desc"
              value={formData.desc}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
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
                ? "Update Plan"
                : "Create Plan"}
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

      {/* Plans Table */}
      <div className="mt-12">
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">
          Created Plans
        </h3>
        {plans.length === 0 ? (
          <p className="text-gray-500">No plans found.</p>
        ) : (
          <div className="overflow-x-auto rounded border border-gray-200">
            <table className="w-full table-auto text-sm text-left">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="border px-4 py-2">Title</th>
                  <th className="border px-4 py-2">Actual Price</th>
                  <th className="border px-4 py-2">Discount Price</th>
                  <th className="border px-4 py-2">Offer</th>
                  <th className="border px-4 py-2">Features</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {plans.map((plan) => (
                  <tr key={plan._id}>
                    <td className="border px-4 py-2">{plan.title}</td>
                    <td className="border px-4 py-2">${plan.actualPrice}</td>
                    <td className="border px-4 py-2">
                      {plan.discPrice ? `$${plan.discPrice}` : "-"}
                    </td>
                    <td className="border px-4 py-2">
                      {plan.offer || "—"}
                    </td>
                    <td className="border px-4 py-2">
                      {plan.desc?.join(", ")}
                    </td>
                    <td className="border px-4 py-2 space-x-2">
                      <div className="flex items-center space-x-2">
                        <FaRegEdit
                          className="cursor-pointer text-yellow-600 hover:text-yellow-800"
                          onClick={() => handleEdit(plan)}
                        />
                        <AiOutlineDelete
                          className="cursor-pointer text-red-600 hover:text-red-800"
                          onClick={() => handleDelete(plan._id)}
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

export default CreatePlans;
