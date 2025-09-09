import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function SkeletonRow() {
  return (
    <section className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Category Tag */}
      <div className="mb-4">
        <Skeleton width={80} height={28} borderRadius={6} />
      </div>

      {/* Title */}
      <div className="mb-6 space-y-1">
        <div className="w-full sm:w-[90%]">
          <Skeleton height={24} />
        </div>
        <div className="w-3/4">
          <Skeleton height={28} />
        </div>
      </div>

      {/* Featured Image */}
      <div className="mb-6">
        <Skeleton height={220} className="w-full" />
      </div>

      {/* Author Info */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <Skeleton circle width={40} height={40} />
        <div className="flex flex-col gap-1">
          <Skeleton width={60} height={12} />
          <div className="flex gap-4">
            <Skeleton width={80} height={12} />
            <Skeleton width={40} height={12} />
          </div>
        </div>
      </div>

      {/* Subtitle */}
      <div className="mb-4 space-y-2">
        <div className="w-full sm:w-[80%]">
          <Skeleton height={20} />
        </div>
        <div className="w-3/4">
          <Skeleton height={20} />
        </div>
      </div>

      {/* Body Paragraphs */}
      {/* <div className="space-y-2">
        <Skeleton height={12} count={2} className="w-full" />
        <Skeleton height={12} className="w-[95%]" />
        <Skeleton height={12} className="w-[90%]" />
        <Skeleton height={12} className="w-[85%]" />
      </div> */}
    </section>
  );
};

