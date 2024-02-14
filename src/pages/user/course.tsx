import { FC, Fragment, ReactElement, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import {
  Button,
  ChatBot,
  Consultant,
  CourseCard,
  Footer,
  LoadingNewsCard,
  Navbar,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  TrendCourse,
  TrendNews,
} from "@/components";
import {
  TCourseItems,
  TGetCourseResponse,
  TPaging,
  api,
  getAccessToken,
} from "@/lib";

export const Course: FC = (): ReactElement => {
  const [courses, setCourses] = useState<TCourseItems[]>([]);
  const [loading, setLoading] = useState(false);
  const [paging, setPaging] = useState<TPaging>({
    previous_page: 0,
    current_page: 1,
    next_page: 0,
    page_size: 9,
    total_page: 0,
    total_data: 0,
  });
  const [scrollPosition, setScrollPosition] = useState(0);

  const getCourses = async (
    page: number = paging.current_page || 1,
    pageSize: number = 9,
  ) => {
    try {
      setLoading(true);
      const { data } = await api.get<TGetCourseResponse>("/courses", {
        params: {
          page,
          page_size: pageSize,
        },
      });
      setCourses(data?.data);
      setPaging(data?.pagination);
    } catch (error) {
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  const handlePageChange = (page: number) => {
    getCourses(page);
  };

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };

    const initialScrollPosition = window.scrollY;
    setScrollPosition(initialScrollPosition);

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return getAccessToken() ? (
    <main className="flex flex-col overflow-x-hidden overflow-y-hidden bg-[url('/backgrounds/white.jpg')] font-inter">
      <Navbar
        className={
          scrollPosition > 0 ? "bg-white duration-300 ease-in-out" : ""
        }
      />

      {/* Category */}
      <section className="container mb-10 mt-24 flex min-h-[450px] flex-row-reverse md:mb-0 md:mt-16">
        <section className="flex w-full flex-col justify-center gap-3 md:gap-2 lg:w-[45%]">
          <h1 className="pb-0 text-[1.8rem] font-bold text-[#1E1E1E] md:pb-2 md:text-[2.7rem] lg:text-[2rem]">
            Perjalanan edukatif. <br />
            Mari baca dan pelajari.
          </h1>
          <h3 className="text-[1.3rem] font-bold text-font-black-1 md:text-[1.5rem] lg:text-[1rem]">
            Kategori pembahasan.
          </h3>
          <p className="w-5/6 text-xs text-font-black-2 md:w-[80%] md:text-base lg:text-[0.9rem]">
            Mari bergabung dalam perjalanan edukatif ini, dan temukan bagaimana
            gabungan antara alam dan teknologi dapat mengubah cara kita
            memandang kesehatan.
          </p>
          <div className="flex w-full flex-wrap gap-3 font-bold md:w-4/5 lg:w-11/12">
            <div className="grid place-items-center rounded-md border border-bright-2 px-2 py-2 text-sm text-font-black-3 lg:p-2 lg:text-base xl:p-3">
              Tanaman Herbal
            </div>
            <div className="grid place-items-center rounded-md border border-bright-2 px-2 py-2 text-sm text-font-black-3 lg:p-2 lg:text-base xl:p-3">
              Teknologi Pengobatan
            </div>
            <div className="grid place-items-center rounded-md border border-bright-2 px-2 py-2 text-sm text-font-black-3 lg:p-2 lg:text-base xl:p-3">
              Tips Kesehatan
            </div>
            <div className="grid place-items-center rounded-md border border-bright-2 px-2 py-2 text-sm text-font-black-3 lg:p-2 lg:text-base xl:p-3">
              Diet dan Nutrisi
            </div>
            <div className="grid place-items-center rounded-md border border-bright-2 px-2 py-2 text-sm text-font-black-3 lg:p-2 lg:text-base xl:p-3">
              Apa Kata Medis
            </div>
            <div className="grid place-items-center rounded-md border border-bright-2 px-2 py-2 text-sm text-font-black-3 lg:p-2 lg:text-base xl:p-3">
              Pengobatan Sunah
            </div>
          </div>
        </section>
        <section className="hidden w-1/2 place-items-center lg:grid">
          <img
            src="/illustrations/course.png"
            alt="doctor"
            className="relative left-[-170px] top-[30px] scale-150 object-cover xl:top-[10px] xl:scale-125"
          />
        </section>
      </section>

      {/* TrendCourse */}
      <TrendCourse />

      {/* All Course */}
      <section className="flex min-h-[600px] flex-col justify-evenly gap-5 bg-white pt-10">
        <div className="container h-[1px] w-4/5 bg-[#36373C] md:w-[95%]" />
        <h1 className="container text-[2rem] font-bold text-font-black-1">
          All course
        </h1>
        <section className="container flex flex-wrap gap-10 md:gap-8 xl:gap-14">
          {loading ? (
            <Fragment>
              <LoadingNewsCard />
              <LoadingNewsCard />
              <LoadingNewsCard />
            </Fragment>
          ) : courses.length === 0 ? (
            <div className="flex min-h-[400px] w-full flex-col items-center justify-center">
              <img
                src="/illustrations/course-not-found.png"
                alt="course not found"
                className="h-[300px]"
              />
              <p>Belum ada course</p>
            </div>
          ) : (
            courses
              .slice(0, 9)
              .map((item, index) => (
                <CourseCard
                  author={item.author}
                  created_at={item.created_at}
                  description={item.description}
                  video={item.media_file}
                  title={item.title}
                  href={item.id}
                  views={item.views}
                  key={index}
                />
              ))
          )}
        </section>
      </section>

      {/* Pagination */}
      {paging.total_data > 9 && (
        <section className="flex w-full justify-end bg-white py-10">
          <Pagination>
            <PaginationContent className="container w-full flex-wrap justify-end">
              {paging.current_page !== 1 && (
                <PaginationItem>
                  <PaginationPrevious
                    className="hover:cursor-pointer"
                    onClick={() => handlePageChange(paging.current_page - 1)}
                  />
                </PaginationItem>
              )}

              <PaginationItem>
                <PaginationLink
                  className={`hover:cursor-pointer ${
                    1 === paging.current_page && "font-bold"
                  }`}
                  onClick={() => handlePageChange(1)}
                >
                  <Button
                    variant={1 === paging.current_page ? "default" : "ghost"}
                  >
                    1
                  </Button>
                </PaginationLink>
              </PaginationItem>

              {paging.current_page > 4 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              {Array.from(
                { length: paging.total_page },
                (_, index) => index + 1,
              ).map(
                (pageNumber) =>
                  pageNumber !== 1 &&
                  pageNumber !== paging.total_page &&
                  pageNumber >= paging.current_page - 1 &&
                  pageNumber <= paging.current_page + 1 && (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink
                        className={`hover:cursor-pointer ${
                          pageNumber === paging.current_page && "font-bold"
                        }`}
                        onClick={() => handlePageChange(pageNumber)}
                      >
                        <Button
                          variant={
                            pageNumber === paging.current_page
                              ? "default"
                              : "ghost"
                          }
                        >
                          {pageNumber}
                        </Button>
                      </PaginationLink>
                    </PaginationItem>
                  ),
              )}

              {paging.current_page <= paging.total_page - 4 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              <PaginationItem>
                <PaginationLink
                  className={`hover:cursor-pointer ${
                    paging.total_page === paging.current_page && "font-bold"
                  }`}
                  onClick={() => handlePageChange(paging.total_page)}
                >
                  <Button
                    variant={
                      paging.total_page === paging.current_page
                        ? "default"
                        : "ghost"
                    }
                  >
                    {paging.total_page}
                  </Button>
                </PaginationLink>
              </PaginationItem>

              {paging.current_page !== paging.total_page && (
                <PaginationItem>
                  <PaginationNext
                    className="hover:cursor-pointer"
                    onClick={() => handlePageChange(paging.current_page + 1)}
                  />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </section>
      )}

      {/* Consultant */}
      <Consultant className="bg-white pt-5 md:pt-28 lg:pt-48" />

      {/* Trend News */}
      <TrendNews className="pb-14" />

      {/* Chatbot */}
      <ChatBot />

      <Footer />
    </main>
  ) : (
    <Navigate to={"/"} />
  );
};
