import { useEffect, useState } from "react";
import { NavLink, useParams, useLocation, useNavigate } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa";
import LessonComments from "../../../components/Courses/Lessons/LessonComments";
import api from "../../../services/api";

const BASE_URL = import.meta.env.VITE_API_URL;

export const Lesson = () => {
  const { courseSlug, lessonSlug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const [activeTab, setActiveTab] = useState("lesson");
  const [singleLessonData, setSingleLessonData] = useState(null);
  const [lessonQuiz, setLessonQuiz] = useState(null);
  const [attemptId, setAttemptId] = useState(null);
  const [responses, setResponses] = useState({});
  const [quizStarted, setQuizStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null); // seconds

  useEffect(() => {
    const tab = queryParams.get("tab");
    if (tab === "qa") {
      setActiveTab("qa");
    } else {
      setActiveTab("lesson");
    }
  }, [location.search]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    navigate(`?tab=${tab}`); // keeps URL in sync
  };

  // ✅ Get Lesson Data
  const getLesson = async () => {
    try {
      const res = await api.get(`/lessons`);
      const filteredLessonData = res.data.find((lesson) => {
        return (
          lesson.title
            .toString()
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-")
            .replace(/[^\w\-]+/g, "")
            .replace(/\-\-+/g, "-") === lessonSlug
        );
      });

      console.log(filteredLessonData);
      

      setSingleLessonData(filteredLessonData);

      // If lesson exists, fetch quiz
      if (filteredLessonData?._id) {
        getLessonQuiz(filteredLessonData._id);
      }
    } catch (error) {
      console.error("Error fetching lesson:", error);
    }
  };

  useEffect(() => {
    getLesson();
  }, []);

  // ✅ Get Quiz for this Lesson
  const getLessonQuiz = async (lessonId) => {
    try {
      const res = await api.get(`/quizzes`);
      const filteredQuiz = res.data.find(
        (quiz) => quiz.lesson?._id === lessonId
      );
      setLessonQuiz(filteredQuiz || null);
    } catch (error) {
      console.error("Error fetching quiz:", error);
    }
  };

  // useEffect(() => {
  //   if (lessonQuiz?._id) {
  //     startAttempt(lessonQuiz._id);
  //   }
  // }, [lessonQuiz]);

  useEffect(() => {
    if (!quizStarted || timeLeft === null) return;

    if (timeLeft <= 0) {
      handleSubmit(); // auto-submit when time is up
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [quizStarted, timeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const handleStartQuiz = async () => {
    try {
      const res = await api.post(`/quizAttempts/${lessonQuiz._id}/start`);
      setAttemptId(res.data._id);
      setQuizStarted(true);
      setTimeLeft(lessonQuiz.timer); // set countdown in seconds
    } catch (error) {
      console.error("Error starting quiz:", error);
    }
  };

  // const startAttempt = async (quizId) => {
  //   try {
  //     const res = await api.post(`/quizAttempts/${quizId}/start`);
  //     setAttemptId(res.data._id);
  //   } catch (error) {
  //     console.error("Error starting attempt:", error);
  //   }
  // };

  const handleSubmit = async () => {
    if (!attemptId) return;

    const answers = Object.entries(responses).map(([questionId, response]) => {
      const question = lessonQuiz.questions.find((q) => q._id === questionId);
      return { questionId, type: question.type, response };
    });

    try {
      const res = await api.post(`/quizAttempts/${attemptId}/submit`, {
        answers,
      });
      alert(
        `⏱ Quiz submitted! Please visit Quiz Attempts section on your Dashboard!`
      );
      setQuizStarted(false); // stop showing questions
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };

  if (!singleLessonData) {
    return <p className="text-blue-500">Loading...</p>;
  }

  return (
    <div className="p-6 bg-white shadow rounded">
      <NavLink
        to={`/course/${courseSlug}`}
        className="w-fit py-2 px-5 mb-4 rounded-md bg-blue-500 flex items-center justify-center text-white capitalize"
      >
        <FaAngleLeft className="mr-2" /> {courseSlug}
      </NavLink>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="flex space-x-6">
          <button
            className={`py-2 px-4 text-sm font-medium cursor-pointer ${
              activeTab === "lesson"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-blue-600"
            }`}
            onClick={() => handleTabChange("lesson")}
          >
            Lesson
          </button>
          <button
            className={`py-2 px-4 text-sm font-medium cursor-pointer ${
              activeTab === "qa"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-blue-600"
            }`}
            onClick={() => handleTabChange("qa")}
          >
            Q & A
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === "lesson" && (
        <div>
          <h1 className="text-2xl font-bold mb-4">{singleLessonData.title}</h1>
          <p className="text-gray-600 mb-2">Type: {singleLessonData.type}</p>
          <p className="text-gray-600 mb-4">Course: {courseSlug}</p>

          {singleLessonData.files && singleLessonData.files.length > 0 && (
            <div className="mt-6">
              <h2 className="text-xl font-bold mb-2">Lesson Files:</h2>
              <div className="space-y-4">
                
                
                {singleLessonData.files.map((file, index) => {
  const fileType = file.type?.split("/")[0];
  const fileUrl = `${BASE_URL}${file.path}`; // ✅ remove extra slash
  console.log(fileUrl);

  if (fileType === "video") {
    return (
      <video
        key={index}
        controls
        className="w-full max-h-[400px] rounded shadow"
      >
        <source src={fileUrl} type={file.type} /> {/* ✅ use file.type */}
        Your browser does not support the video tag.
      </video>
    );
  }

  if (fileType === "image") {
    return (
      <img
        key={index}
        src={fileUrl}
        alt={file.originalName} // ✅ use correct field
        className="w-full max-w-[600px] rounded shadow"
      />
    );
  }

  if (file.type === "application/pdf") {
    return (
      <a
        key={index}
        href={fileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-blue-600 underline"
      >
        📄 {file.originalName}
      </a>
    );
  }

  return (
    <a
      key={index}
      href={fileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block text-gray-700 underline"
    >
      📁 {file.originalName}
    </a>
  );
})}

              </div>
            </div>
          )}

          {/* ✅ Quiz Section */}
          {singleLessonData.type === "quiz" && (
            <div className="mt-6 p-4 border border-gray-200 rounded">
              <h2 className="text-xl font-bold mb-2">Quiz</h2>
              {lessonQuiz ? (
                <div>
                  <p className="font-semibold mb-2">{lessonQuiz.title}</p>
                  <p className="text-gray-600 mb-4">
                    Time: {lessonQuiz.timer}s
                  </p>

                  {quizStarted ? (
                    <>
                      <div className="text-right font-bold text-red-600 mb-4">
                        Time Left: {formatTime(timeLeft)}
                      </div>

                      {/* ✅ Render Questions */}
                      <div className="space-y-6">
                        {lessonQuiz.questions.map((q, qIndex) => (
                          <div
                            key={qIndex}
                            className="p-4 border rounded bg-gray-50 shadow-sm"
                          >
                            <p className="font-medium mb-3">
                              {qIndex + 1}. {q.question}
                            </p>

                            {/* MCQ */}
                            {q.type === "mcq" && (
                              <div className="space-y-2">
                                {q.options.map((opt, optIndex) => (
                                  <label
                                    key={optIndex}
                                    className="flex items-center space-x-2"
                                  >
                                    {/* <input
                                  type="radio"
                                  name={`q-${qIndex}`}
                                  value={opt.text}
                                  className="text-blue-500"
                                /> */}

                                    <input
                                      type="radio"
                                      name={`q-${q._id}`}
                                      value={opt}
                                      checked={responses[q._id] === opt}
                                      onChange={(e) =>
                                        setResponses({
                                          ...responses,
                                          [q._id]: e.target.value,
                                        })
                                      }
                                    />
                                    <span>{opt}</span>
                                  </label>
                                ))}
                              </div>
                            )}

                            {/* True/False */}
                            {q.type === "truefalse" && (
                              <div className="space-y-2">
                                <label className="flex items-center space-x-2">
                                  {/* <input
                                type="radio"
                                name={`q-${qIndex}`}
                                value="True"
                              /> */}
                                  <input
                                    type="radio"
                                    name={`q-${q._id}`}
                                    value="True"
                                    checked={responses[q._id] === "True"}
                                    onChange={(e) =>
                                      setResponses({
                                        ...responses,
                                        [q._id]: e.target.value,
                                      })
                                    }
                                  />
                                  <span>True</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                  {/* <input
                                type="radio"
                                name={`q-${qIndex}`}
                                value="False"
                              /> */}
                                  <input
                                    type="radio"
                                    name={`q-${q._id}`}
                                    value="False"
                                    checked={responses[q._id] === "False"}
                                    onChange={(e) =>
                                      setResponses({
                                        ...responses,
                                        [q._id]: e.target.value,
                                      })
                                    }
                                  />
                                  <span>False</span>
                                </label>
                              </div>
                            )}

                            {/* Short Answer */}
                            {q.type === "short" && (
                              // <input
                              //   type="text"
                              //   placeholder="Type your answer"
                              //   className="w-full p-2 border rounded"
                              // />

                              <input
                                type="text"
                                value={responses[q._id] || ""}
                                placeholder="Type your answer"
                                onChange={(e) =>
                                  setResponses({
                                    ...responses,
                                    [q._id]: e.target.value,
                                  })
                                }
                                className="w-full p-2 border rounded"
                              />
                            )}

                            {/* Fill in the Blank */}
                            {q.type === "fill" && (
                              // <input
                              //   type="text"
                              //   placeholder="Fill in the blank"
                              //   className="w-full p-2 border rounded"
                              // />

                              <input
                                type="text"
                                value={responses[q._id] || ""}
                                placeholder="Fill in the blank"
                                onChange={(e) =>
                                  setResponses({
                                    ...responses,
                                    [q._id]: e.target.value,
                                  })
                                }
                                className="w-full p-2 border rounded"
                              />
                            )}

                            {/* Matching (simple frontend version) */}
                            {q.type === "matchingHeadings" && (
                              <div>
                                <div>
                                  <h3 className="font-bold text-lg">
                                    Statement Heading
                                  </h3>
                                  <p className="mb-2">{q.statementHeading}</p>
                                </div>

                                <div>
                                  <h3 className="font-bold text-lg">
                                    Statement Description
                                  </h3>
                                  <p className="mb-2">
                                    {q.statementDescription}
                                  </p>
                                </div>

                                <h3 className="font-bold text-lg">
                                  Paragraphs
                                </h3>
                                {q.paragraphs.map((para, idx) => (
                                  <div
                                    key={idx}
                                    className="flex items-center space-x-2 mb-2"
                                  >
                                    <span className="w-full">
                                      {" "}
                                      <span className="mr-2">
                                        {idx + 1}.
                                      </span>{" "}
                                      {para}
                                    </span>
                                  </div>
                                ))}

                                <h3 className="font-bold text-lg">Options</h3>
                                {q.options.map((options, optIndex) => (
                                  <div
                                    key={optIndex}
                                    className="flex items-center space-x-2 mb-2"
                                  >
                                    <span className="w-full">
                                      {" "}
                                      <span className="mr-2">
                                        {String.fromCharCode(65 + optIndex)}.
                                      </span>{" "}
                                      {options}
                                    </span>
                                  </div>
                                ))}

                                <h3 className="font-bold text-lg">
                                  Correct Order
                                </h3>
                                {q.correctOrder.map((cOrder, cIndex) => (
                                  <div
                                    key={cIndex}
                                    className="w-full flex items-center space-x-2 mb-2"
                                  >
                                    <span className="w-full">
                                      {" "}
                                      {/* <input
                                    type="text"
                                    placeholder={`Correct for Paragraph ${
                                      cIndex + 1
                                    } (e.g. A)`}
                                    className="flex-1 p-2 border rounded w-2/3"
                                  /> */}
                                      <input
                                        type="text"
                                        placeholder={`Correct for Paragraph ${
                                          cIndex + 1
                                        } (e.g. A)`}
                                        value={responses[q._id]?.[cIndex] || ""}
                                        onChange={(e) => {
                                          const updated = [
                                            ...(responses[q._id] || []),
                                          ];
                                          updated[cIndex] = e.target.value;
                                          setResponses({
                                            ...responses,
                                            [q._id]: updated,
                                          });
                                        }}
                                        className="flex-1 p-2 border rounded w-2/3"
                                      />
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* ✅ Later: Add submit button */}
                      <button
                        onClick={handleSubmit}
                        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Submit Quiz
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={handleStartQuiz}
                      className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                      Start Quiz
                    </button>
                  )}
                </div>
              ) : (
                <p className="text-gray-500">No quiz found for this lesson.</p>
              )}
            </div>
          )}

          <div className="mt-5">
            <h2 className="text-xl font-bold mb-2">Lesson Description:</h2>
            <div
              dangerouslySetInnerHTML={{ __html: singleLessonData.content }}
            />
          </div>
        </div>
      )}

      {activeTab === "qa" && (
        <div>
          <LessonComments lessonID={singleLessonData._id} />
        </div>
      )}
    </div>
  );
};
