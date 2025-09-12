import { useState, useEffect } from "react";
import { FaChartLine, FaBook, FaTrash } from "react-icons/fa";
import api from "../../services/api";
import StudentsProgressModal from "../../components/Modals/StudentsProgressModal";
import StudentsQuizzesModal from "../../components/Modals/StudentsQuizzesModal";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [isProgressModalOpen, setIsProgressModalOpen] = useState(false);
  const [isQuizzesModalOpen, setIsQuizzesModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await api.get("/users");
        setStudents(res.data);
        console.log(res.data);
      } catch (err) {
        console.error("Error fetching students:", err);
      }
    };
    fetchStudents();
  }, []);

  const handleProgress = (student) => {
    setSelectedStudent(student);
    setIsProgressModalOpen(true);
  };

  const handleQuizzes = (student) => {
    setSelectedStudent(student);
    setIsQuizzesModalOpen(true);
  };

  const handleDelete = (studentId) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      console.log("Delete student:", studentId);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white mt-10 mb-20 rounded shadow-sm">
      <h2 className="text-2xl font-bold mb-6">Students List</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Paid</th>
              <th className="p-3 border">Registered</th>
              <th className="p-3 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) =>
              student.role === "student" ? (
                <tr key={student._id} className="hover:bg-gray-50">
                  <td className="p-3 border">{student.name}</td>
                  <td className="p-3 border">{student.email}</td>
                  <td className="p-3 border">
                    {student.hasPaid ? (
                      <p className="bg-green-600 text-white flex items-center justify-center rounded px-2 py-1">
                        Yes
                      </p>
                    ) : (
                      <p className="bg-red-600 text-white flex items-center justify-center rounded px-2 py-1">
                        No
                      </p>
                    )}
                  </td>
                  <td className="p-3 border">
                    {new Date(student.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3 border text-center space-x-2">
                    <button
                      onClick={() => handleProgress(student)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 inline-flex items-center gap-1"
                    >
                      <FaChartLine /> Progress
                    </button>
                    <button
                      onClick={() => handleQuizzes(student)}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 inline-flex items-center gap-1"
                    >
                      <FaBook /> Quizzes
                    </button>
                    <button
                      onClick={() => handleDelete(student._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 inline-flex items-center gap-1"
                    >
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
              ) : null
            )}
            {students.length === 0 && (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    

      <StudentsProgressModal
        isProgressModalOpen={isProgressModalOpen}
        selectedStudent={selectedStudent}
        setIsProgressModalOpen={setIsProgressModalOpen}
      />

      <StudentsQuizzesModal
        isQuizzesModalOpen={isQuizzesModalOpen}
        selectedStudent={selectedStudent}
        setIsQuizzesModalOpen={setIsQuizzesModalOpen}
      />
    </div>
  );
}
