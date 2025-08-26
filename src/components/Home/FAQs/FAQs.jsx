import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqData = [
  {
    id: 1,
    question: "Can I access the course on a mobile or tablet device?",
    answer:
      "Yes, you can! Our course is fully accessible on mobile and tablet devices, so you can study anytime, anywhere. We understand that many students have busy schedules and personal commitments, which can make IELTS prep challenging. That’s why we prioritize flexibility, allowing you to learn on the go and fit your preparation around your life.",
  },
  {
    id: 2,
    question: "How is this course different from other IELTS preparation courses?",
    answer:
      "Our course takes IELTS prep to the next level with fun, interactive features! You’ll get video lessons, quizzes, real examples, and mock tests, plus personal feedback on your essays to help you improve fast. But that’s not all—join our community page where you can connect with other test-takers, share tips, and celebrate your progress. You’ll also earn achievement badges to show off your wins and boost your social profile! It’s a dynamic, supportive way to prepare for IELTS while staying motivated and engaged.",
  },
  {
    id: 3,
    question: "What kind of support is available during the course?",
    answer:
      "We’ve got your back with fast, friendly support! For any general questions, you’ll hear from us within 24 hours. When it comes to your assignments, we take up to 48 hours to provide personalised feedback from an IELTS expert—because we want to make sure you get thoughtful insights that really help you improve.",
  },
  {
    id: 4,
    question: "How do I know if this course is right for me?",
    answer:
      "This course is perfect for you if you’re juggling a busy schedule and need flexibility, or if you prefer to study online at your own pace. It’s also a great option if you’re looking for an affordable alternative to expensive 1-on-1 classes. Plus, you’ll join a supportive community of test-takers, so you never feel like you’re preparing alone! If you want a flexible, budget-friendly way to prepare for IELTS with others by your side, this course is for you!",
  },
  {
    id: 5,
    question: "Do I need to be at a certain English level to take this course?",
    answer:
      "This course is designed for non-native English speakers, so don’t worry if English isn’t your first language! If you have some academic English experience, you’ll find it easy to navigate and follow along. However, please note that we don’t teach English from the beginner level—you should already have a basic understanding of English to get the most out of the course.",
  },
];

const FAQs = () => {
  const [openId, setOpenId] = useState(null);

  const toggleAccordion = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="w-full flex flex-col py-20 items-center justify-center">
      <h2 className="text-[40px] md:text-[48px] font-semibold text-center mb-12">
        <span className="text-[#0554F2]">Frequently</span> Asked Questions
      </h2>

      <div className="w-11/12 md:w-4/5 max-w-3xl">
        {faqData.map((faq) => (
          <div
            key={faq.id}
            className="border-b border-gray-300 py-5 cursor-pointer group"
            onClick={() => toggleAccordion(faq.id)}
          >
            {/* Question */}
            <div className="flex justify-between items-center">
              <h3
                className={`text-lg font-medium transition-colors duration-300 ${
                  openId === faq.id
                    ? "text-[#0554F2]"
                    : "text-gray-800 group-hover:text-[#0554F2]"
                }`}
              >
                {faq.question}
              </h3>
              {openId === faq.id ? (
                <FaChevronUp className="w-5 h-5 text-[#0554F2] transition-transform duration-300" />
              ) : (
                <FaChevronDown className="w-5 h-5 text-gray-500 group-hover:text-[#0554F2] transition-transform duration-300" />
              )}
            </div>

            {/* Answer with animation */}
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                openId === faq.id ? "max-h-[500px] mt-3" : "max-h-0"
              }`}
            >
              <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQs;
