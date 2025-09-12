import { useState, useEffect } from "react";
import api from "../../services/api";

const MyQAs = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  const getMyLessons = async () => {
    try {
      const res = await api.get("/discussion/my-lessons"); 
      setLessons(res.data.data);
      
    } catch (err) {
      console.error("Failed to fetch my discussions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMyLessons();
  }, []);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6 bg-white mt-10 mb-20 rounded shadow-sm">
        <h2 className="text-2xl font-bold mb-6">My Discussions</h2>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white mt-10 mb-20 rounded shadow-sm">
      <h2 className="text-2xl font-bold mb-6">My Discussions</h2>

      {lessons.length === 0 ? (
        <p className="text-gray-600">You haven't commented on any lessons yet.</p>
      ) : (
        <ul className="space-y-4">
          {lessons.map((lesson) => (
            <li
              key={lesson._id}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <h2 className="text-lg font-bold mb-2">{lesson.topic.course.title}</h2>
              <h3 className=" font-semibold">{lesson.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">
                {lesson.description}
              </p>
              <a
                 href={`/course/${lesson.topic.course.slug}/${lesson.slug}?tab=qa`}
                className="text-blue-600 hover:underline text-sm mt-2 inline-block"
              >
                View Discussion →
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyQAs;
