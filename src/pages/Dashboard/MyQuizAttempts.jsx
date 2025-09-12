import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import api from "../../services/api";

const MyQuizAttempts = () => {
  const [attempts, setAttempts] = useState([]);
  const [selectedAttempt, setSelectedAttempt] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [singleQuiz, setSingleQuiz] = useState(null);

  // ✅ Fetch quiz attempts
  useEffect(() => {
    const fetchAttempts = async () => {
      try {
        const res = await api.get("/quizAttempts/my");        
        setAttempts(res.data);
      } catch (error) {
        console.error("Error fetching attempts:", error);
      }
    };
    fetchAttempts();
  }, []);

  // ✅ Delete attempt
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this attempt?"))
      return;
    try {
      await api.delete(`/quizAttempts/${id}`);
      setAttempts(attempts.filter((a) => a._id !== id));
    } catch (error) {
      console.error("Error deleting attempt:", error);
    }
  };

  const getQuizDetail = async (id) => {
    try {
      const res = await api.get(`/quizzes/${id}`);
      
      setSingleQuiz(res.data);
    } catch (error) {
      console.error("Error deleting attempt:", error);
    }
  };

  // ✅ Open modal with details
  const handleView = (attempt) => {
    setSelectedAttempt(attempt);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white mt-10 mb-20 rounded shadow-sm">
      <h2 className="text-2xl font-bold mb-6">Quiz Attempts</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border">Quiz</th>
              <th className="p-3 border">Score</th>
              <th className="p-3 border">Started</th>
              <th className="p-3 border">Submitted</th>
              <th className="p-3 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {attempts.map((attempt) => (
              <tr key={attempt._id} className="hover:bg-gray-50">
                <td className="p-3 border">{attempt.quiz?.title}</td>
                <td className="p-3 border font-semibold">
                  {attempt.score} / {attempt.answers?.length}
                </td>
              
                <td className="p-3 border">
                  {new Date(attempt.startedAt).toLocaleString()}
                </td>
                <td className="p-3 border">
                  {attempt.submittedAt
                    ? new Date(attempt.submittedAt).toLocaleString()
                    : "-"}
                </td>
                <td className="p-3 border text-center space-x-2">
                  <button
                    onClick={() => {
                      handleView(attempt);
                      getQuizDetail(attempt.quiz?._id);
                    }}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    View
                  </button>
                  {/* <button
                    onClick={() => handleDelete(attempt._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button> */}
                </td>
              </tr>
            ))}
            {attempts.length === 0 && (
              <tr>
                <td colSpan="8" className="p-4 text-center text-gray-500">
                  No quiz attempts yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ Modal for viewing answers */}
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-3xl w-full bg-white rounded-lg shadow-lg p-6 overflow-y-auto max-h-[80vh]">
            <Dialog.Title className="text-xl font-bold mb-4">
              Quiz Attempt Details
            </Dialog.Title>

            {selectedAttempt ? (
              <div>
                <p>
                  <strong>User:</strong> {selectedAttempt.user?.name}
                </p>
                <p>
                  <strong>Quiz:</strong> {singleQuiz?.title}
                </p>
                <p>
                  <strong>Score:</strong> {selectedAttempt.score} /{" "}
                  {singleQuiz?.questions?.length}
                </p>
                <hr className="my-4" />
                
                
                {selectedAttempt.answers.length !== 0 && singleQuiz &&
                  selectedAttempt.answers?.map((ans, idx) => {

                    const q = singleQuiz?.questions.find(
                      (q) => q._id === ans.questionId
                    );

                    
                    
                    return (
                      <div key={ans._id} className="mb-4">
                        {q.type === "matchingHeadings" ? (
                          <div>
                            <h4 className="font-semibold">Q{idx + 1}:</h4>
                            <div>
                              <h4 className="font-semibold">Heading:</h4>{" "}
                              {q?.statementHeading}
                            </div>
                            <div>
                              <h4 className="font-semibold">Description:</h4>{" "}
                              {q?.statementDescription}
                            </div>
                            <div>
                              <h4 className="font-semibold">Paragraphs</h4>{" "}
                              {q?.paragraphs.map((p, i) => {
                                return (
                                  <div key={i} className="flex">
                                    {" "}
                                    <h4 className="font-semibold">
                                      {i + 1}.
                                    </h4>{" "}
                                    {p}{" "}
                                  </div>
                                );
                              })}
                            </div>

                            <div>
                              <h4 className="font-semibold">
                                Headings to Match:
                              </h4>{" "}
                              {q?.options.map((p, i) => {
                                return (
                                  <div key={i} className="flex">
                                    {" "}
                                    <h4 className="font-semibold">
                                      {i + 1}.
                                    </h4>{" "}
                                    {p}{" "}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        ) : (
                          <h4 className="font-semibold">
                            Q{idx + 1}: {q?.question}
                          </h4>
                        )}
                        <p>
                          <strong>Students Answer:</strong>{" "}
                          {JSON.stringify(ans.response)}
                        </p>
                        <p>
                          <strong>Correct:</strong>{" "}
                          {ans.isCorrect ? (
                            <span className="text-green-600">Yes</span>
                          ) : (
                            <span className="text-red-600">No</span>
                          )}
                        </p>
                        <hr className="mt-2" />
                      </div>
                    );
                  })}
              </div>
            ) : (
              <p>No attempt selected.</p>
            )}

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default MyQuizAttempts;
