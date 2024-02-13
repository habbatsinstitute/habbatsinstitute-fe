import { FC, Fragment, ReactElement, useEffect, useState } from "react";
import { CourseCard, LoadingCourseCard } from "..";
import { TCourseItems, TGetCourseResponse, api } from "@/lib";

export const TrendCourse: FC = (): ReactElement => {
  const [course, setCourse] = useState<TCourseItems[]>([]);
  const [loading, setLoading] = useState(false);

  const getNews = async () => {
    try {
      setLoading(true);
      const { data } = await api.get<TGetCourseResponse>("/courses");
      setCourse(data?.data);
    } catch (error) {
      setCourse([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  return (
    <section className="flex min-h-[600px] flex-col justify-evenly gap-5 bg-light-2 pt-10 md:gap-0 md:pt-0">
      <div className="container h-[1px] w-4/5 bg-[#36373C] md:w-[95%]" />
      <h1 className="container text-[2rem] font-bold text-font-black-1">
        Trending Course
      </h1>
      <section className="container flex flex-wrap gap-10 md:gap-8 xl:gap-14">
        {loading ? (
          <Fragment>
            <LoadingCourseCard />
            <LoadingCourseCard />
            <LoadingCourseCard />
          </Fragment>
        ) : course.length === 0 ? (
          <div className="flex min-h-[400px] w-full flex-col items-center justify-center">
            <img
              src="/illustrations/course-not-found.png"
              alt="news not found"
              className="h-[300px]"
            />
            <p>Belum ada trending course</p>
          </div>
        ) : (
          course
            .slice(0, 3)
            .map((item, index) => (
              <CourseCard
                key={index}
                video={item.media_file}
                author={item.author}
                created_at={item.created_at}
                title={item.title}
                description={item.description}
                views={item.views}
                href={item.id}
              />
            ))
        )}
      </section>
    </section>
  );
};
