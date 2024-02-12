import { FC, ReactElement, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { UserRound } from "lucide-react";
import { Button, Navbar, Footer } from "@/components";
import {
  TCourseItems,
  TGetCourseResponse,
  api,
  formatDate,
  getAccessToken,
  useGetCourseById,
} from "@/lib";

export const CourseDetail: FC = (): ReactElement => {
  const [courses, setCourses] = useState<TCourseItems[]>([]);

  const id = useParams();

  const { data, refetch } = useGetCourseById(id?.id);

  const navigate = useNavigate();

  const getCourse = async () => {
    const { data } = await api.get<TGetCourseResponse>("/courses");
    setCourses(data?.data);
  };

  useEffect(() => {
    getCourse();
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch, id.id]);

  return (
    <main className="flex flex-col overflow-x-visible font-inter">
      <Navbar className="bg-white" />

      <section className="container mt-24 flex min-h-[400px] flex-wrap justify-between">
        <div className="flex w-full flex-col gap-1 lg:w-[70%]">
          <div className="h-[200px] md:h-[400px]">
            <video
              controls
              onContextMenu={(e) => e.preventDefault()}
              controlsList="nodownload"
              className="h-full w-full rounded-md object-fill"
              preload="metadata"
            >
              <source src={data?.data.media_file} />
            </video>
          </div>
          <h1 className="text-[1rem] font-black text-[#1E212B] md:text-[1.7rem] lg:text-[2rem]">
            {data?.data.title}
          </h1>
          <div className="flex items-center gap-1">
            <UserRound className="p-1" />
            <p className="text-sm">
              {`${data?.data.author} ${formatDate(data?.data.created_at as string)}`}
            </p>
          </div>

          <div className="mt-3 whitespace-pre-wrap text-font-black-2">
            {data?.data.description}
          </div>
        </div>

        <div className="mt-20 flex w-full flex-wrap gap-7 lg:mt-0 lg:w-[25%] lg:gap-10">
          {courses.slice(0, 3).map((course, index) => (
            <section
              className="flex w-full flex-col rounded-md bg-light-2 p-3 py-4 shadow-lg hover:cursor-pointer hover:bg-emerald-100 md:w-[30%] lg:w-full"
              onClick={() => {
                navigate(`/courses/${course.id}`);
              }}
              key={index}
            >
              <section className="flex flex-col py-2">
                <video
                  controls
                  onContextMenu={(e) => e.preventDefault()}
                  controlsList="nodownload"
                  className="h-full w-full rounded-md object-fill"
                  preload="metadata"
                >
                  <source src={course.media_file} />
                </video>
                <section className="flex items-center gap-1">
                  <UserRound className="p-1" />
                  <p className="text-sm">{course.author}</p>
                </section>
                <h5 className="text-[#707075]">
                  Posted - {formatDate(course.created_at)}
                </h5>
              </section>
              <section className="flex flex-col gap-2 pt-2">
                <h3 className="text-lg font-bold text-font-black-1 md:text-base">
                  {course.title}
                </h3>
                <div className="whitespace-pre-wrap">
                  {course.description.substring(0, 100)}...
                </div>
              </section>
            </section>
          ))}
        </div>
      </section>

      <section className="flex min-h-[200px] flex-col justify-end gap-5 bg-white pt-20 md:min-h-[400px] md:pt-0 lg:pt-56">
        <div className="flex h-[250px] bg-[url('/backgrounds/green.png')] bg-cover lg:h-[300px]">
          <div className="container flex">
            <div className="flex w-full flex-col justify-center gap-3 md:w-1/2">
              <h3 className="text-base font-bold text-font-black-3 md:text-lg lg:text-2xl">
                Dapatkan konsultasi kesehatan yang terpercaya dengan tim ahli
                medis kami, siap membantu Anda menemukan solusi terbaik untuk
                kesehatan Anda.
              </h3>
              <div>
                <Button
                  onClick={() =>
                    getAccessToken() ? navigate("/courses") : navigate("/login")
                  }
                >
                  Konsultasi Sekarang
                </Button>
              </div>
            </div>
            <div className="hidden w-1/2 items-center justify-center md:flex">
              <img
                src="/illustrations/doctor.png"
                alt="doctor"
                className="relative scale-90 md:bottom-[12%] lg:bottom-[21%] xl:bottom-[27.5%]"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer className="z-10" />
    </main>
  );
};
