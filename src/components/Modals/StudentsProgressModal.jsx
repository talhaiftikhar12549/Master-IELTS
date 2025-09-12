import CoursesProgress from "../../pages/Dashboard/CoursesProgress";
import StudentCourseProgress from "../Dashboard/StudentCourseProgress";

export default function StudentsProgressModal({
  isProgressModalOpen,
  selectedStudent,
  setIsProgressModalOpen,
}) {
  return (
    <>
      {isProgressModalOpen && selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          {/* Scrollable modal container */}
          <div className="relative w-full lg:w-2/3 max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-lg">
            <div className="p-6">
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">
                {selectedStudent.name} - Progress
              </h3>

              <StudentCourseProgress userID={selectedStudent._id} />

              {/* Footer */}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setIsProgressModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
