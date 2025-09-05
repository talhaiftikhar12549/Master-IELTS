import React, { useEffect, useState } from "react";
import api from "../../services/api";

const QuizBuilder = () => {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedLesson, setSelectedLesson] = useState("");

  const [courses, setCourses] = useState([]);
  const [topics, setTopics] = useState([]);
  const [lessons, setLessons] = useState([]);

  const [questions, setQuestions] = useState([]);
  const [title, setTitle] = useState("");
  const [timer, setTimer] = useState(0);

  const [quizzes, setQuizzes] = useState([]);
  const [editingQuizId, setEditingQuizId] = useState(null);

  // Fetch courses on mount
  useEffect(() => {
    const getCourses = async () => {
      try {
        const res = await api.get("/courses");
        setCourses(res.data);
      } catch (error) {
        console.log(error, "Error fetching courses");
      }
    };
    getCourses();
    fetchQuizzes();
  }, []);

  // Fetch all quizzes
  const fetchQuizzes = async () => {
    try {
      const res = await api.get("/quizzes");
      setQuizzes(res.data);
    } catch (error) {
      console.log(error, "Error fetching quizzes");
    }
  };

  // When course changes → fetch topics
  useEffect(() => {
    if (!selectedCourse) return;
    const fetchTopics = async () => {
      try {
        const res = await api.get(`/courses/${selectedCourse}`);
        setTopics(res.data.topics);
        setSelectedTopic("");
        setLessons([]);
        setSelectedLesson("");
      } catch (error) {
        console.log(error, "Error fetching topics");
      }
    };
    fetchTopics();
  }, [selectedCourse]);

  // When topic changes → fetch lessons
  useEffect(() => {
    if (!selectedTopic) return;
    const fetchLessons = async () => {
      try {
        const res = await api.get(`/courses/${selectedCourse}`);
        const theTopic = res.data.topics.find(
          (topic) => topic._id === selectedTopic
        );
         
        setLessons(theTopic ? theTopic.lessons : []);
        setSelectedLesson("");
      } catch (error) {
        console.log(error, "Error fetching lessons");
      }
    };
    fetchLessons();
  }, [selectedTopic]);

  // Add question by type
  const handleAddQuestion = (type) => {
    let newQuestion = { type };
    switch (type) {
      case "mcq":
        newQuestion = {
          ...newQuestion,
          question: "",
          options: ["", "", "", ""],
          correctAnswer: "",
        };
        break;
      case "fill":
        newQuestion = { ...newQuestion, question: "", correctAnswer: "" };
        break;
      case "truefalse":
        newQuestion = { ...newQuestion, question: "", correctAnswer: "true" };
        break;
      case "short":
        newQuestion = { ...newQuestion, question: "", correctAnswer: "" };
        break;
      case "matchingHeadings":
        newQuestion = {
          ...newQuestion,
          statementHeading: "",
          statementDescription: "",
          paragraphs: ["", "", "", ""],
          options: ["", "", "", ""],
          correctOrder: ["", "", "", ""],
        };
        break;
      default:
        return;
    }
    setQuestions([...questions, newQuestion]);
  };

  const handleChange = (index, key, value, subIndex = null) => {
    const updated = [...questions];
    if (subIndex !== null) {
      updated[index][key][subIndex] = value;
    } else {
      updated[index][key] = value;
    }
    setQuestions(updated);
  };

  const handleRemoveQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  // Save quiz
  const handleSaveQuiz = async () => {
    if (!selectedLesson) {
      alert("Please select a lesson before saving the quiz.");
      return;
    }
    try {
      const payload = {
        lesson: selectedLesson,
        title,
        timer,
        questions,
      };

      if (editingQuizId) {
        // Update quiz
        await api.put(`/quizzes/${editingQuizId}`, payload);
        alert("Quiz updated successfully!");
        setEditingQuizId(null);
      } else {
        // Create quiz
        await api.post("/quizzes", payload);
        alert("Quiz saved successfully!");
      }

      setQuestions([]);
      setTitle("");
      setTimer(0);
      fetchQuizzes();
    } catch (error) {
      console.log(error, "Error saving quiz");
      alert("Failed to save quiz");
    }
  };

  // Delete quiz
  const handleDeleteQuiz = async (id) => {
    if (!window.confirm("Are you sure you want to delete this quiz?")) return;
    try {
      await api.delete(`/quizzes/${id}`);
      fetchQuizzes();
    } catch (error) {
      console.log(error, "Error deleting quiz");
    }
  };

  // Edit quiz
  const handleEditQuiz = (quiz) => {
    setEditingQuizId(quiz._id);
    setSelectedCourse(quiz.lesson?.topic?.course?._id || "");
    setSelectedTopic(quiz.lesson?.topic?._id || "");
    setSelectedLesson(quiz.lesson?._id || "");
    setTitle(quiz.title);
    setTimer(quiz.timer);
    setQuestions(quiz.questions || []);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full flex flex-col pb-14">
      <div className="w-full flex p-6 gap-6">
        {/* Sidebar */}
        <div className="w-[250px] border-r pr-4">
          <h2 className="text-lg font-semibold mb-2">Step 1: Select Course</h2>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="w-full border p-2 rounded mb-4"
          >
            <option value="">-- Select Course --</option>
            {courses.map((c) => (
              <option key={c._id} value={c._id}>
                {c.title}
              </option>
            ))}
          </select>

          {topics.length > 0 && (
            <>
              <h2 className="text-lg font-semibold mb-2">
                Step 2: Select Topic
              </h2>
              <select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="w-full border p-2 rounded mb-4"
              >
                <option value="">-- Select Topic --</option>
                {topics.map((t) => (
                  <option key={t._id} value={t._id}>
                    {t.title}
                  </option>
                ))}
              </select>
            </>
          )}

          {lessons.length > 0 && (
            <>
              <h2 className="text-lg font-semibold mb-2">
                Step 3: Select Lesson
              </h2>
              <select
                value={selectedLesson}
                onChange={(e) => setSelectedLesson(e.target.value)}
                className="w-full border p-2 rounded mb-4"
              >
                <option value="">-- Select Lesson --</option>
                {lessons.map((l) => (
                  <option key={l._id} value={l._id}>
                    {l.title}
                  </option>
                ))}
              </select>
            </>
          )}

          <h3 className="text-md font-semibold mb-2">
            Step 4: Add Question Type
          </h3>
          <button
            className="w-full bg-blue-500 text-white py-2 px-3 rounded mb-2"
            onClick={() => handleAddQuestion("mcq")}
          >
            Multiple Choice
          </button>
          <button
            className="w-full bg-green-500 text-white py-2 px-3 rounded mb-2"
            onClick={() => handleAddQuestion("fill")}
          >
            Fill in the Blanks
          </button>
          <button
            className="w-full bg-yellow-500 text-white py-2 px-3 rounded mb-2"
            onClick={() => handleAddQuestion("truefalse")}
          >
            True / False
          </button>
          <button
            className="w-full bg-purple-500 text-white py-2 px-3 rounded"
            onClick={() => handleAddQuestion("short")}
          >
            Short Answer
          </button>
          <button
            className="w-full bg-pink-500 text-white py-2 px-3 rounded mt-2"
            onClick={() => handleAddQuestion("matchingHeadings")}
          >
            Matching Headings
          </button>
        </div>

        {/* Question Builder */}
        <div className="h-full pb-10 flex-1 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">
            Quiz Builder {selectedLesson ? `for Lesson` : ""}
          </h2>

          {selectedLesson && (
            <div className="mb-6">
              <input
                type="text"
                placeholder="Quiz Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full mb-2 p-2 border rounded"
              />
              <label htmlFor="timer">Quiz Timer (seconds)</label>
              <input
                type="number"
                placeholder="Timer (seconds)"
                value={timer}
                onChange={(e) => setTimer(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
          )}

          {/* Questions */}
          {questions.length === 0 && <p>No questions added yet.</p>}
          {questions.map((q, index) => (
            <div
              key={index}
              className="w-full border p-4 mb-4 rounded shadow bg-gray-50"
            >
             

              <h3 className="font-semibold mb-2">
                Q{index + 1} - {q.type.toUpperCase()}
              </h3>
              {/* Your question type inputs (same as before) */}
              {q.type === "mcq" && (
                <div>
                  <input
                    type="text"
                    placeholder="Enter question"
                    value={q.question}
                    onChange={(e) =>
                      handleChange(index, "question", e.target.value)
                    }
                    className="w-full mb-2 p-2 border rounded"
                  />
                  {q.options.map((opt, optIndex) => (
                    <div key={optIndex} className="flex items-center mb-2">
                      <span className="mr-2">{opt.label}.</span>
                      <input
                        type="text"
                        placeholder={`Option ${opt.label}`}
                        value={opt}
                        onChange={(e) =>
                          handleChange(
                            index,
                            "options",
                            e.target.value,
                            optIndex,
                            "text"
                          )
                        }
                        className="flex-1 p-2 border rounded"
                      />
                    </div>
                  ))}
                  <input
                    type="text"
                    placeholder="Correct Answer (e.g., A)"
                    value={q.correctAnswer}
                    onChange={(e) =>
                      handleChange(index, "correctAnswer", e.target.value)
                    }
                    className="w-full p-2 border rounded"
                  />
                </div>
              )}

              {/* True / False */}
              {q.type === "truefalse" && (
                <div>
                  <input
                    type="text"
                    placeholder="Enter question"
                    value={q.question}
                    onChange={(e) =>
                      handleChange(index, "question", e.target.value)
                    }
                    className="w-full mb-2 p-2 border rounded"
                  />
                  <select
                    value={q.correctAnswer}
                    onChange={(e) =>
                      handleChange(index, "correctAnswer", e.target.value)
                    }
                    className="w-full p-2 border rounded"
                  >
                    <option value="">Select Answer</option>
                    <option value="true">True</option>
                    <option value="false">False</option>
                  </select>
                </div>
              )}

              {/* Short Answer */}
              {q.type === "short" && (
                <div>
                  <input
                    type="text"
                    placeholder="Enter question"
                    value={q.question}
                    onChange={(e) =>
                      handleChange(index, "question", e.target.value)
                    }
                    className="w-full mb-2 p-2 border rounded"
                  />
                  <input
                    type="text"
                    placeholder="Correct Answer"
                    value={q.correctAnswer}
                    onChange={(e) =>
                      handleChange(index, "correctAnswer", e.target.value)
                    }
                    className="w-full p-2 border rounded"
                  />
                </div>
              )}

              {/* Fill in the Blank */}
              {q.type === "fill" && (
                <div>
                  <input
                    type="text"
                    placeholder="Enter question with ___ for blank"
                    value={q.question}
                    onChange={(e) =>
                      handleChange(index, "question", e.target.value)
                    }
                    className="w-full mb-2 p-2 border rounded"
                  />
                  <input
                    type="text"
                    placeholder="Correct Answer"
                    value={q.correctAnswer}
                    onChange={(e) =>
                      handleChange(index, "correctAnswer", e.target.value)
                    }
                    className="w-full p-2 border rounded"
                  />
                </div>
              )}

              {/* matchingHeadings */}
              {q.type === "matchingHeadings" && (
                <div className="space-y-4">
                  {/* Statement Heading */}
                  <input
                    type="text"
                    placeholder="Enter statement heading"
                    value={q.statementHeading}
                    onChange={(e) =>
                      handleChange(index, "statementHeading", e.target.value)
                    }
                    className="w-full mb-2 p-2 border rounded"
                  />

                  {/* Statement Description */}
                  <textarea
                    placeholder="Enter statement description"
                    value={q.statementDescription}
                    onChange={(e) =>
                      handleChange(
                        index,
                        "statementDescription",
                        e.target.value
                      )
                    }
                    className="w-full mb-2 p-2 border rounded"
                  />

                  {/* Paragraphs */}
                  <div>
                    <h4 className="font-semibold mb-2">Paragraphs</h4>
                    {q.paragraphs.map((para, pIndex) => (
                      <div className="flex items-center">
                       <span className="mr-2">
                          {pIndex+1}.
                        </span>
                      <input
                        key={pIndex}
                        type="text"
                        placeholder={`Paragraph ${pIndex + 1}`}
                        value={para}
                        onChange={(e) =>
                          handleChange(
                            index,
                            "paragraphs",
                            e.target.value,
                            pIndex
                          )
                        }
                        className="w-full mb-2 p-2 border rounded"
                      />
                      </div>
                    ))}
                  </div>

                  {/* Options */}
                  <div>
                    <h4 className="font-semibold mb-2">Options (Headings)</h4>
                    {q.options.map((opt, optIndex) => (
                      <div key={optIndex} className="flex items-center mb-2">
                        <span className="mr-2">
                          {String.fromCharCode(65 + optIndex)}.
                        </span>
                        <input
                          type="text"
                          placeholder={`Heading ${String.fromCharCode(
                            65 + optIndex
                          )}`}
                          value={opt}
                          onChange={(e) =>
                            handleChange(
                              index,
                              "options",
                              e.target.value,
                              optIndex
                            )
                          }
                          className="flex-1 p-2 border rounded"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Correct Order */}
                  <div>
                    <h4 className="font-semibold mb-2">Correct Order</h4>
                    {q.correctOrder.map((ans, ansIndex) => (
                      <input
                        key={ansIndex}
                        type="text"
                        placeholder={`Correct for Paragraph ${
                          ansIndex + 1
                        } (e.g. A)`}
                        value={ans}
                        onChange={(e) =>
                          handleChange(
                            index,
                            "correctOrder",
                            e.target.value,
                            ansIndex
                          )
                        }
                        className="w-full mb-2 p-2 border rounded"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Ordering */}
              {q.type === "ordering" && (
                <div>
                  <input
                    type="text"
                    placeholder="Enter instruction (e.g., Arrange in correct order)"
                    value={q.question}
                    onChange={(e) =>
                      handleChange(index, "question", e.target.value)
                    }
                    className="w-full mb-2 p-2 border rounded"
                  />
                  {q.sequence.map((step, stepIndex) => (
                    <div key={stepIndex} className="flex items-center mb-2">
                      <span className="mr-2">{stepIndex + 1}.</span>
                      <input
                        type="text"
                        placeholder={`Step ${stepIndex + 1}`}
                        value={step}
                        onChange={(e) =>
                          handleChange(
                            index,
                            "sequence",
                            e.target.value,
                            stepIndex
                          )
                        }
                        className="flex-1 p-2 border rounded"
                      />
                    </div>
                  ))}
                </div>
              )}

              <button
                className="mt-3 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                onClick={() => handleRemoveQuestion(index)}
              >
                Remove Question
              </button>
            </div>
          ))}

          {questions.length > 0 && selectedLesson && (
            <div className="mt-6">
              <button
                className="bg-indigo-600 text-white py-3 px-6 rounded hover:bg-indigo-700"
                onClick={handleSaveQuiz}
              >
                Save Quiz
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Quizzes Table */}
      <div className="mt-10 p-6 mb-10">
        <h2 className="text-xl font-bold mb-4">All Quizzes</h2>
        {quizzes.length === 0 ? (
          <p>No quizzes found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="border border-gray-300 px-4 py-2 w-1/3">
                    Title
                  </th>
                  <th className="border border-gray-300 px-4 py-2 w-1/3">
                    Lesson
                  </th>
                  <th className="border border-gray-300 px-4 py-2 w-1/6 text-center">
                    Timer
                  </th>
                  <th className="border border-gray-300 px-4 py-2 w-1/6 text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {quizzes.map((quiz) => (
                  <tr key={quiz._id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">
                      {quiz.title}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {quiz.lesson?.title || "N/A"}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {quiz.timer || 0}s
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                          onClick={() => handleEditQuiz(quiz)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                          onClick={() => handleDeleteQuiz(quiz._id)}
                        >
                          Delete
                        </button>
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

export default QuizBuilder;
