import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// import blogImageFallback from "../assets/Post Thumbnail.png";
// import authImage from "../assets/9e3a4d582a45a8c496e0fef1f9efb92f06fd9293.jpg";
import { FaEye } from "react-icons/fa";
import { FaRegCalendarAlt } from "react-icons/fa";
import SkeletonRow from "./SingleBlogSkeleton";
import { Helmet } from "react-helmet";
import DOMPurify from "dompurify";
import api from "../../services/api";

export default function SingleBlog() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await api.get(`/blogs/${slug}`);
        setBlog(response.data.data);
      } catch (error) {
        console.error("Failed to fetch blog data:", error);
        navigate("/not-found");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  useEffect(() => {
    if (!blog && !loading) {
      navigate("/not-found");
    }
  }, [blog]);

  const blogCategory = blog?.categories.some((cat) => cat.includes("["))
    ? JSON.parse(blog?.categories).join(", ")
    : blog?.categories;

  if (loading) {
    return (
      <>
        <SkeletonRow />
      </>
    );
  }

  // if (!blog) {
  //   return (
  //     <NotFound />
  //   );
  // }

  return (
    <section className="w-full md:max-w-[1280px] custom-width px-4 sm:px-6 lg:px-[40px] xl:px-0 mx-auto pb-[80px] pt-32">
      <Helmet>
        <title>{blog.meta_title} | My Blog</title>
        <meta
          name="description"
          content={blog.meta_description || blog.content.slice(0, 150)}
        />
        <meta
          name="keywords"
          content={
            typeof blog.keywords === "string"
              ? JSON.parse(blog.keywords).join(", ")
              : blog.keywords.join(", ")
          }
        />
        <meta
          name="tags"
          content={
            typeof blog.tags === "string"
              ? JSON.parse(blog.tags)?.join(", ")
              : blog.tags.join(", ")
          }
        />
        <meta name="categories" content={blogCategory} />
        <meta property="og:title" content={blog.meta_title} />
        <meta
          property="og:description"
          content={blog.meta_description || blog.content.slice(0, 150)}
        />
        <meta property="og:type" content="article" />
        {/* <meta
          property="og:url"
          content={`https://mangocompare.co.uk/${blog.slug}`}
        /> */}
        <meta property="og:image" content={blog.featuredImage} />

        {/* <link rel="canonical" href={`https://mangocompare.co.uk/${blog.slug}`} /> */}
      </Helmet>
      <div className=" w-[100%] md:w-[75%] flex justify-content-center items-center flex-col mx-auto">
        <div className="w-[100%] flex justify-start items-center">
          <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4">
            {
              // Array.isArray(blogCategory) &&
              //   blogCategory.length > 0 ?
              blogCategory?.split(", ").map((cat, index) => (
                <p
                  key={index}
                  className="py-1 px-3 bg-[#FCC821] rounded-[3px] text-[12px]"
                >
                  {cat.trim()}
                </p>
              ))
              // :
              // <p className="py-1 px-3 bg-[#FCC821] rounded-[3px] text-[12px]"
              // >
              //   {blogCategory}
              // </p>
            }
          </div>
        </div>

        <h1 className="text-[28px] sm:text-[36px] lg:text-[46px] font-bold leading-tight mt-4">
          {blog.title}
        </h1>

        <div className="pt-5 w-[100%] flex justify-center items-center">
          <img
            className="w-fit h-auto rounded-m "
            src={blog.featuredImage}
            alt="Blog Thumbnail"
          />
        </div>

        <div className="flex flex-col w-[100%] justify-start items-center sm:flex-row  gap-4 mt-4">
          <div className="flex gap-3 items-center">
            {/* <img
              className="rounded-full h-[42px] w-[42px]"
              src={authImage}
              alt="Author"
            /> */}
            <p className="font-bold text-sm sm:text-[14px]">
              {blog.author?.name === "admin"
                ? "Ibrahim Taqi"
                : blog.author?.name}
            </p>
            <div className="flex flex-row justify-between pl-[10px] sm:pl-[30px]  text-[#515151] text-sm sm:text-[16px] font-semibold sm:gap-9 gap-6">
              <div className="flex items-center justify-center">
                <FaRegCalendarAlt /> &nbsp;
                {new Date(blog.createdAt).toLocaleDateString()}
              </div>

              <div className="flex items-center justify-center">
                <FaEye /> &nbsp; {blog.views || 0}
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between pt-4 text-[#515151] text-sm sm:text-[14px] font-semibold gap-5"></div>
        </div>

        <div className="py-6 w-full">
          <div
            className="prose"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(blog.content),
            }}
          />
          {/* <p className="text-[16px] sm:text-[14px] text-[#434343] leading-[160%]">
            {blog.content}
          </p> */}
        </div>
      </div>
    </section>
  );
}
