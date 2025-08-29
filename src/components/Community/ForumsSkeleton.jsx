import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ForumPageSkeleton = () => {
  return (
    <div className="max-w-[1280px] w-[100%] lg:px-[40px] xl:px-0 px-[16px] flex flex-col space-y-4">
      {[...Array(3)].map((_, idx) => (
        <div key={idx} className="bg-white p-4 rounded-md shadow-sm border border-gray-100 relative">
          {/* Header row: Avatar + Admin + Date */}
          <div className="flex items-center space-x-3 mb-2">
            <Skeleton circle height={40} width={40} />
            <div className="flex flex-col">
              <Skeleton width={80} height={10} />
              <Skeleton width={60} height={10} />
            </div>
          </div>

          {/* Post title */}
          <Skeleton height={20} width={`60%`} className="mb-2" />

          {/* Post body */}
          <Skeleton count={2} height={12} />

          {/* Bottom bar: buttons */}
          <div className="flex items-center space-x-4 mt-4">
            <Skeleton width={50} height={30} />
            <Skeleton width={50} height={30} />
            <Skeleton width={60} height={30} />
          </div>

          {/* Community tag badge */}
          <div className="absolute top-4 right-4">
            <Skeleton width={120} height={30} borderRadius={8} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ForumPageSkeleton;
