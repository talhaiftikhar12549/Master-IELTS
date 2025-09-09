import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const BlogSkeleton = () => (
  <section className="!w-[100%] !flex !justify-center">
    <div className=" !w-[100%] pb-[50px]">
      <Skeleton height={200} borderRadius={8} />
      <div className="pt-[20px] pb-[10px]">
        <Skeleton height={24} width="75%" />
      </div>
      <Skeleton count={2} height={14} style={{ marginBottom: "8px" }} />
      <Skeleton height={18} width="30%" />
    </div>
  </section>
 
);
export default BlogSkeleton;
