import { FC, Fragment, ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router";
import LoadingBar from "react-top-loading-bar";
import { UserRound } from "lucide-react";
import {
  Navbar,
  Footer,
  Consultant,
  CourseCard,
  Skeleton,
  LoadingCourseCard,
} from "@/components";
import {
  TCourseItems,
  TGetCourseByIdResponse,
  TGetCourseResponse,
  api,
  formatDate,
} from "@/lib";

export const CourseDetail: FC = (): ReactElement => {
  const [courses, setCourses] = useState<TCourseItems[]>([]);
  const [courseById, setCourseById] = useState<TCourseItems>({
    author: "",
    created_at: "",
    description: "",
    id: 0,
    media_file: "",
    title: "",
    user_id: 0,
    views: 0,
  });
  const [loadingCourse, setLoadingCourse] = useState(false);
  const [loadingCourseById, setLoadingCourseById] = useState(false);
  const [progress, setProgress] = useState(0);

  const id = useParams();

  const getCourse = async () => {
    try {
      setLoadingCourse(true);
      const { data } = await api.get<TGetCourseResponse>("/courses");
      setCourses(data?.data);
    } catch (error) {
      setCourses([]);
    } finally {
      setLoadingCourse(false);
    }
  };

  const getCourseById = async () => {
    try {
      setLoadingCourseById(true);
      setProgress(30);
      const { data } = await api.get<TGetCourseByIdResponse>(
        `/courses/${id.id}`,
      );
      setProgress(50);
      setCourseById(data?.data);
      setProgress(70);
    } catch (error) {
      setCourseById({
        author: "",
        created_at: "",
        description: "",
        id: 0,
        media_file: "",
        title: "",
        user_id: 0,
        views: 0,
      });
    } finally {
      setProgress(100);
      setLoadingCourseById(false);
    }
  };

  useEffect(() => {
    getCourse();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    getCourseById();
  }, [id?.id]);

  return (
    <main className="flex flex-col overflow-x-visible font-inter">
      <Navbar className="bg-white" />

      {/* Video */}
      <section className="container mt-24 flex min-h-[400px] flex-wrap justify-between">
        <div className="flex w-full flex-col gap-1 lg:w-[70%]">
          {loadingCourseById ? (
            <Skeleton className="h-[200px] bg-slate-500 md:h-[400px]" />
          ) : (
            <div className="h-[200px] md:h-[400px]">
              <video
                controls
                onContextMenu={(e) => e.preventDefault()}
                controlsList="nodownload"
                className="h-full w-full rounded-md"
                preload="metadata"
              >
                {courseById?.media_file && (
                  <source src={courseById?.media_file} />
                )}
              </video>
            </div>
          )}

          <h1 className="break-words text-[1rem] font-black text-[#1E212B] md:text-[1.7rem] lg:text-[2rem]">
            {courseById?.title}
          </h1>
          <div className="flex items-center gap-1">
            <UserRound className="p-1" />
            <p className="text-sm">
              {`${courseById?.author} ${formatDate(courseById?.created_at as string)} ${
                courseById?.views === 0
                  ? "(Belum ditonton)"
                  : `(${courseById?.views}x ditonton)`
              }`}
            </p>
          </div>

          <div className="mt-3 whitespace-pre-wrap break-words text-font-black-2">
            {courseById?.description}
          </div>
        </div>

        {/* Course List */}
        <div className="mt-20 flex w-full flex-wrap gap-7 lg:mt-0 lg:w-[25%] lg:gap-10">
          <h1 className="flex text-lg font-bold md:hidden">List courses</h1>
          {loadingCourse || loadingCourseById ? (
            <Fragment>
              <LoadingCourseCard className="w-full md:w-[45%] lg:w-full" />
              <LoadingCourseCard className="w-full md:w-[45%] lg:w-full" />
              <LoadingCourseCard className="w-full md:w-[45%] lg:w-full" />
            </Fragment>
          ) : (
            courses
              ?.filter((course) => course.id !== courseById?.id)
              .sort(() => Math.random() - 0.5)
              .slice(0, 3)
              .map((course, index) => (
                <div className="w-full">
                  <CourseCard
                    key={index}
                    author={course.author}
                    created_at={course.created_at}
                    description={course.description}
                    href={course.id}
                    title={course.title}
                    video={course.media_file}
                    views={course.views}
                    className="w-full md:w-[45%] lg:w-full"
                  />
                </div>
              ))
          )}
        </div>
      </section>

      {/* Consultant */}
      <Consultant className="bg-white pt-32 lg:pt-64" />

      <Footer className="z-10" />

      <LoadingBar
        color="#10b981"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
    </main>
  );
};
