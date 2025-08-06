import { TbArrowBigUpFilled, TbArrowBigDownFilled } from "react-icons/tb";
import { FaMessage } from "react-icons/fa6";
import { IoArrowRedoSharp } from "react-icons/io5";
import { CiCirclePlus } from "react-icons/ci";

const LessonComments = () => {
  return (
    <div className="mt-10">
      {/* Top-level Comment Form */}
      <form className="mb-6 space-y-2">
       
        <div className="relative">
          <textarea
            placeholder="Join the conversation"
            className="w-full p-2 border rounded-md"
            rows="6"
            required
          ></textarea>

          <div className="flex items-center gap-2 justify-end absolute right-5 bottom-5">
            <button
              type="submit"
              className="px-4 py-2 bg-[#0045ac] text-white rounded-full hover:bg-orange-500 disabled:opacity-50 cursor-pointer"
            >
              Comment
            </button>
          </div>
        </div>
      </form>

      {/* Comments */}
      <h2 className="text-xl font-bold mb-4">Comments</h2>
      <div className="mb-4">
        <div className="p-3 rounded-lg">
          <div className="flex gap-1">
            <p className="text-sm text-black font-bold capitalize">John Doe</p>
            <p className="text-sm text-gray-500">2 hours ago</p>
          </div>
          <p className="text-gray-800">This is a sample comment on the lesson.</p>

          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center space-x-2">
              <button className="flex items-center space-x-2 text-black text-[14px] bg-gray-100 py-[4px] px-[10px] rounded-[5px] hover:text-orange-500 transition-colors duration-300 ease-in-out gap-2 cursor-pointer">
                <FaMessage /> Reply
              </button>
              <button className="text-yellow-600 text-sm hover:underline ml-4 cursor-pointer">Edit</button>
              <button className="text-red-600 text-sm hover:underline ml-4 cursor-pointer">Delete</button>
            </div>

            <div className="mr-3 text-xs text-gray-400 flex items-center space-x-2">
              <p className="text-black">Replies (1)</p>
              <div className="hover:text-black cursor-pointer">
                <CiCirclePlus />
              </div>
            </div>
          </div>
        </div>

        {/* Reply Form */}
        <form className="mt-2 ml-4">
          <textarea
            placeholder="Write a reply..."
            className="w-full p-2 border rounded-md"
            rows="2"
            required
          ></textarea>
          <div className="mt-1 flex space-x-2">
            <button
              type="submit"
              className="px-3 py-1 bg-[#0045ac] text-white rounded-full hover:bg-orange-500"
            >
              Reply
            </button>
            <button
              type="button"
              className="px-3 py-1 bg-gray-400 text-black rounded-full hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </form>

        {/* Replies */}
        <div className="ml-6 mt-2 space-y-2">
          <div className="bg-white border-l-[1px] border-gray-400 p-2 m-0">
            <p className="text-sm text-black font-bold">Jane Smith</p>
            <p>This is a sample reply.</p>
            <div className="flex items-center space-x-2 mt-2">
              <button className="text-yellow-600 text-sm hover:underline ml-4">Edit</button>
              <button className="text-red-600 text-sm hover:underline ml-4">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonComments;