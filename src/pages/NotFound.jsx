import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="px-6 py-16 text-center max-w-2xl">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-gray-800 px-3 py-1 text-xs font-medium text-gray-600 dark:text-gray-300 mb-6">
          <span className="inline-block size-2 rounded-full bg-rose-500" />
          Page Not Found
        </div>

        {/* 404 Header */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-7xl sm:text-8xl font-extrabold tracking-tight mb-4 select-none"
        >
          <span className="bg-gradient-to-r from-rose-500 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent">
            404
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8"
        >
          Oops! The page you’re looking for doesn’t exist or may have been moved.
        </motion.p>

        {/* Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mx-auto mb-10 max-w-md"
        >
          <svg
            viewBox="0 0 400 180"
            role="img"
            aria-label="Broken route illustration"
            className="w-full h-auto drop-shadow-sm"
          >
            <defs>
              <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="50%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
            </defs>
            <rect x="0" y="0" width="400" height="180" rx="16" fill="url(#grad)" opacity="0.08" />
            <g fill="none" strokeWidth="3" strokeLinecap="round">
              <path d="M20 130 C 80 40, 160 40, 220 130" stroke="#e5e7eb" />
              <path d="M180 130 C 240 40, 320 40, 380 130" stroke="#e5e7eb" />
              <circle cx="200" cy="90" r="28" stroke="#a855f7" />
              <path d="M190 90 h20" stroke="#ef4444" />
            </g>
          </svg>
        </motion.div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center rounded-2xl border border-gray-200 dark:border-gray-800 px-5 py-3 text-sm font-medium text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            Go Back
          </button>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold text-white bg-gray-900 dark:bg-white dark:text-gray-900 hover:opacity-90 shadow-sm"
          >
            Go Home
          </Link>
        </div>

        {/* Footer hint */}
        <p className="mt-8 text-xs text-gray-500 dark:text-gray-400">
          Error code: <span className="font-mono">404_NOT_FOUND</span>
        </p>
      </div>
    </div>
  );
}
