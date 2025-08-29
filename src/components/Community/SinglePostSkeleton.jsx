import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SinglePostSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#f3f4f6" highlightColor="#e5e7eb">
      <div className="max-w-4xl mx-auto bg-white">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Skeleton height={32} width={150} />
            </div>
            <nav className="flex space-x-6">
              <Skeleton height={20} width={60} count={5} inline className="mr-4" />
            </nav>
            <Skeleton height={36} width={120} />
          </div>
        </header>

        {/* Main Content */}
        <main className="px-6 py-8">
          {/* Post Header */}
          <div className="mb-6">
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <Skeleton height={16} width={120} className="mr-2" />
              <Skeleton height={16} width={80} />
            </div>
            <div className="text-sm text-gray-400 mb-4">
              <Skeleton height={14} width={60} />
            </div>
          </div>

          {/* Post Title */}
          <div className="mb-6">
            <Skeleton height={36} width="60%" className="mb-4" />
          </div>

          {/* Post Content */}
          <div className="mb-8">
            <Skeleton height={16} count={12} className="mb-2" />
          </div>

          {/* Interaction Buttons */}
          <div className="flex items-center space-x-6 mb-8 pb-6 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <Skeleton height={20} width={20} />
              <Skeleton height={16} width={16} />
            </div>
            <div className="flex items-center space-x-2">
              <Skeleton height={20} width={20} />
              <Skeleton height={16} width={16} />
            </div>
            <div className="flex items-center space-x-2">
              <Skeleton height={20} width={20} />
              <Skeleton height={16} width={16} />
            </div>
            <div className="flex items-center space-x-2">
              <Skeleton height={20} width={20} />
              <Skeleton height={16} width={40} />
            </div>
          </div>

          {/* Comment Input */}
          <div className="mb-8">
            <Skeleton height={120} className="mb-3" />
            <div className="flex justify-end">
              <Skeleton height={36} width={100} />
            </div>
          </div>

          {/* Comments Section */}
          <div>
            <Skeleton height={24} width={100} className="mb-6" />
            
            {/* Comment Items */}
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="mb-6 pb-4 border-b border-gray-100 last:border-b-0">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Skeleton height={16} width={60} />
                    <Skeleton height={14} width={80} />
                  </div>
                  <div className="flex items-center space-x-2 text-xs">
                    <Skeleton height={12} width={60} />
                  </div>
                </div>
                <div className="mb-3">
                  <Skeleton height={16} width="70%" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Skeleton height={14} width={40} />
                    <Skeleton height={14} width={30} />
                    <Skeleton height={14} width={40} />
                  </div>
                  <div className="flex items-center space-x-1">
                    <Skeleton height={14} width={50} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Logo and Description */}
            <div>
              <Skeleton height={32} width={150} className="mb-4" baseColor="#374151" highlightColor="#4b5563" />
              <Skeleton height={16} count={3} baseColor="#374151" highlightColor="#4b5563" />
            </div>

            {/* Links */}
            <div>
              <Skeleton height={20} width={80} className="mb-4" baseColor="#374151" highlightColor="#4b5563" />
              <div className="space-y-2">
                <Skeleton height={16} width={60} count={5} baseColor="#374151" highlightColor="#4b5563" />
              </div>
            </div>

            {/* Contact */}
            <div>
              <Skeleton height={20} width={80} className="mb-4" baseColor="#374151" highlightColor="#4b5563" />
              <Skeleton height={16} width={200} className="mb-4" baseColor="#374151" highlightColor="#4b5563" />
              <Skeleton height={20} width={100} baseColor="#374151" highlightColor="#4b5563" />
              <div className="flex space-x-3 mt-4">
                <Skeleton height={24} width={24} count={4} inline className="mr-2" baseColor="#374151" highlightColor="#4b5563" />
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-700 mt-8 pt-6 text-center">
            <Skeleton height={14} width={300} baseColor="#374151" highlightColor="#4b5563" />
          </div>
        </footer>
      </div>
    </SkeletonTheme>
  );
};

export default SinglePostSkeleton