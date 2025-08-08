import React, { useState } from "react";

const QuizBuilder = () => {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [questions, setQuestions] = useState([]);

  const courses = ["Reading", "Writing", "Listening", "Speaking"];

  const handleAddQuestion = (type) => {
    let newQuestion = { type };

    switch (type) {
      case "mcq":
        newQuestion = {
          ...newQuestion,
          question: "",
          options: ["", "", "", ""],
          correctAnswer: ""
        };
        break;
      case "fill":
        newQuestion = {
          ...newQuestion,
          sentence: "",
          correctAnswer: ""
        };
        break;
      case "truefalse":
        newQuestion = {
          ...newQuestion,
          statement: "",
          correctAnswer: "true"
        };
        break;
      case "short":
        newQuestion = {
          ...newQuestion,
          prompt: ""
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
    const updated = questions.filter((_, i) => i !== index);
    setQuestions(updated);
  };

  return (
    <div className="w-full flex p-6 gap-6">
      {/* Sidebar */}
      <div className="w-[250px] border-r pr-4">
        <h2 className="text-lg font-semibold mb-2">Select Course</h2>
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        >
          <option value="">-- Select Course --</option>
          {courses.map((course) => (
            <option key={course} value={course.toLowerCase()}>
              {course}
            </option>
          ))}
        </select>

        <h3 className="text-md font-semibold mb-2">Add Question Type</h3>
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
      </div>

      {/* Question Builder */}
      <div className="h-full pb-10 flex-1 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Quiz for {selectedCourse || "..."}</h2>

        {questions.length === 0 && <p>No questions added yet.</p>}

        {questions.map((q, index) => (
          <div
            key={index}
            className="w-full border p-4 mb-4 rounded shadow bg-gray-50"
          >
            <h3 className="font-semibold mb-2">
              Q{index + 1} - {q.type.toUpperCase()}
            </h3>

            {q.type === "mcq" && (
              <>
                <input
                  type="text"
                  value={q.question}
                  onChange={(e) => handleChange(index, "question", e.target.value)}
                  placeholder="Question statement"
                  className="w-full mb-2 p-2 border rounded"
                />
                {q.options.map((opt, i) => (
                  <input
                    key={i}
                    type="text"
                    value={opt}
                    onChange={(e) => handleChange(index, "options", e.target.value, i)}
                    placeholder={`Option ${i + 1}`}
                    className="w-full mb-2 p-2 border rounded"
                  />
                ))}
                <input
                  type="text"
                  value={q.correctAnswer}
                  onChange={(e) => handleChange(index, "correctAnswer", e.target.value)}
                  placeholder="Correct Answer"
                  className="w-full p-2 border rounded"
                />
              </>
            )}

            {q.type === "fill" && (
              <>
                <input
                  type="text"
                  value={q.sentence}
                  onChange={(e) => handleChange(index, "sentence", e.target.value)}
                  placeholder="Sentence with blank"
                  className="w-full mb-2 p-2 border rounded"
                />
                <input
                  type="text"
                  value={q.correctAnswer}
                  onChange={(e) => handleChange(index, "correctAnswer", e.target.value)}
                  placeholder="Correct Answer"
                  className="w-full p-2 border rounded"
                />
              </>
            )}

            {q.type === "truefalse" && (
              <>
                <input
                  type="text"
                  value={q.statement}
                  onChange={(e) => handleChange(index, "statement", e.target.value)}
                  placeholder="True or False Statement"
                  className="w-full mb-2 p-2 border rounded"
                />
                <select
                  value={q.correctAnswer}
                  onChange={(e) => handleChange(index, "correctAnswer", e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </>
            )}

            {q.type === "short" && (
              <>
                <input
                  type="text"
                  value={q.prompt}
                  onChange={(e) => handleChange(index, "prompt", e.target.value)}
                  placeholder="Short Answer Prompt"
                  className="w-full p-2 border rounded"
                />
              </>
            )}

            <button
              className="mt-3 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
              onClick={() => handleRemoveQuestion(index)}
            >
              Remove Question
            </button>
          </div>
        ))}

        {questions.length > 0 && (
          <div className="mt-6">
            <button
              className="bg-indigo-600 text-white py-3 px-6 rounded hover:bg-indigo-700"
              onClick={() => {
                console.log("Saving Quiz:", { selectedCourse, questions });
              }}
            >
              Save Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizBuilder;