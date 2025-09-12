import { useEffect, useState } from "react";
import api from "../../services/api";
import { FaBook, FaCheckCircle } from "react-icons/fa";

const CoursesProgress = () => {
  const [coursesProgress, setCoursesProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await api.get("/progress");
        console.log(res.data);
        
        setCoursesProgress(res.data);
      } catch (err) {
        console.error("Failed to fetch courses progress", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProgress();
  }, []);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white mt-10 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold mb-4">My Courses Progress</h2>
        <p>Loading progress...</p>
      </div>
    );
  }

  if (!coursesProgress || coursesProgress.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white mt-10 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold mb-4">My Courses Progress</h2>
        <p className="text-gray-600">No progress to show yet.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white mt-10 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">
        📊 My Courses Progress
      </h2>

      <div className="space-y-6">
        {coursesProgress.map((course) => {
          const percent =
            course.totalLessons > 0
              ? (course.completedLessons / course.totalLessons) * 100
              : 0;

          return (
            <div
              key={course.courseId}
              className="p-5 border rounded-xl shadow-sm bg-gray-50 hover:shadow-md transition"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 shadow-inner">
                    <FaBook className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {course.courseTitle}
                  </h3>
                </div>
                <span className="text-sm font-medium text-gray-600">
                  {course.completedLessons}/{course.totalLessons} lessons
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden mb-2">
                <div
                  className="bg-blue-500 h-3 rounded-full transition-all"
                  style={{ width: `${percent}%` }}
                ></div>
              </div>

              {/* Status */}
              <div className="flex items-center gap-2 text-sm">
                {percent === 100 ? (
                  <>
                    <FaCheckCircle className="text-green-600" />
                    <span className="text-green-700 font-medium">
                      Completed
                    </span>
                  </>
                ) : (
                  <span className="text-gray-600">
                    {Math.round(percent)}% complete
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CoursesProgress;