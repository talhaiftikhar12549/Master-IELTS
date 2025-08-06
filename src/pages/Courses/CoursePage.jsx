import { useState } from "react";
import reading from "../../assets/Courses/reading-course.jpeg";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa";

export const courseData = {
  reading: [
    {
      topicTitle: "Reading Topic 1",
      lessons: [
        { title: "Reading Lesson 1", slug: "reading-lesson-1", type: "video" },
        { title: "Reading Lesson 2", slug: "reading-lesson-2", type: "quiz" },
      ],
    },
    {
      topicTitle: "Reading Topic 2",
      lessons: [
        { title: "Reading Lesson 1", slug: "reading-lesson-1", type: "mock test" },
      ],
    },
  ],
  writing: [
    {
      topicTitle: "Writing Topic 1",
      lessons: [
        { title: "Writing Lesson 1", slug: "writing-lesson-1", type: "video" },
      ],
    },
  ],
  listening: [
    {
      topicTitle: "Listening Topic 1",
      lessons: [
        { title: "Listening Lesson 1", slug: "listening-lesson-1", type: "video" },
        { title: "Listening Quiz", slug: "listening-quiz", type: "quiz" },
      ],
    },
  ],
  speaking: [
    {
      topicTitle: "Speaking Topic 1",
      lessons: [
        { title: "Speaking Mock Test", slug: "speaking-mock-test", type: "mock test" },
      ],
    },
  ],
};

export const CoursePage = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const { coursePage, lessonSlug } = useParams();

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const topics = courseData[coursePage];

  if (!topics) {
    return (
      <div className="text-center mt-10 text-red-500 font-bold">
        Course not found.
      </div>
    );
  }

  if (lessonSlug) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-10">
        <Outlet />
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center mt-10">
       <NavLink to={`/all-courses`} className="w-fit py-2 px-5 rounded-md bg-blue-500 flex items-center justify-center text-white capitalize">
                  <FaAngleLeft className="mr-2" /> Courses
                  </NavLink>
      <h2 className="text-2xl font-bold capitalize mb-4">{coursePage} Course</h2>
      <img src={reading} alt="Course" className="rounded-md shadow-lg mb-8 w-full" />

      <div className="w-full space-y-4">
        <h3 className="text-xl font-semibold mb-4">Topics</h3>

        {topics.map((topic, index) => (
          <div key={index} className="border rounded-md shadow-sm">
            <button
              className="w-full text-left px-4 py-3 bg-gray-100 hover:bg-gray-200 font-medium"
              onClick={() => toggleAccordion(index)}
            >
              {topic.topicTitle}
            </button>

            {openIndex === index && (
              <div className="px-6 py-3 space-y-2 bg-white flex flex-col">
                {topic.lessons.map((lesson, idx) => (
                  <NavLink
                    to={`${lesson.slug}`}
                    key={idx}
                    className="text-blue-600 hover:underline cursor-pointer"
                  >
                    {lesson.title}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
