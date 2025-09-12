import StudentQuizAttempts from "../Dashboard/StudentQuizAttempts";

export default function StudentsQuizzesModal({
  isQuizzesModalOpen,
  selectedStudent,
  setIsQuizzesModalOpen,
}) {
  return (
    <>
      {/* Quizzes Modal */}
      {isQuizzesModalOpen && selectedStudent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full lg:w-2/3">
            <h3 className="text-xl font-bold mb-4">
              {selectedStudent.name} - Quizzes
            </h3>

            <StudentQuizAttempts userID={selectedStudent._id} />

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setIsQuizzesModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
