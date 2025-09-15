import { motion, AnimatePresence } from "framer-motion";

export default function NotesModal({
  loading,
  isOpen,
  setIsOpen,
  note,
  setNote,
  handleSave,
  handleClear,
}) {
  // Predefined colors for sticky notes
  const colors = ["#fff8b5", "#ffd6d6", "#d6ffd6", "#d6e5ff", "#f5d6ff"];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/20 z-50">
          {/* Modal Card anchored bottom-left */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: -30, y: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: -30, y: 30 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute bottom-20 right-6 w-96 max-h-[70vh] rounded-2xl shadow-2xl flex flex-col p-4"
            style={{ backgroundColor: note.color }}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-3">
              <input
                type="text"
                className="bg-transparent font-bold text-lg flex-1 outline-none"
                value={note.title}
                onChange={(e) => setNote({ ...note, title: e.target.value })}
              />
              <button
                onClick={() => setIsOpen(false)}
                className="ml-2 text-gray-600 hover:text-black transition"
              >
                ✖
              </button>
            </div>

            {/* Content */}
            <textarea
              className="flex-1 w-full min-h-60 bg-transparent outline-none resize-none p-2 rounded-lg"
              placeholder="Write your notes here..."
              value={note.content}
              onChange={(e) => setNote({ ...note, content: e.target.value })}
            />

            {/* Color Picker */}
            <div className="flex gap-2 mt-3">
              {colors.map((c) => (
                <button
                  key={c}
                  className={`w-6 h-6 rounded-full border-2 ${
                    note.color === c ? "border-black" : "border-transparent"
                  }`}
                  style={{ backgroundColor: c }}
                  onClick={() => setNote({ ...note, color: c })}
                />
              ))}
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center mt-3">
              <button
                onClick={handleClear}
                className="text-sm text-red-600 hover:text-red-800 transition"
              >
                Clear
              </button>
              <button
                onClick={handleSave}
                disabled={loading}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-50 transition"
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
