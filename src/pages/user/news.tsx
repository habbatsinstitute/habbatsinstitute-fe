import { FC, ReactElement, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FaArrowRightLong } from "react-icons/fa6";
import {
  Button,
  Footer,
  Navbar,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  TrendNews,
} from "@/components";
import {
  TGetNewsResponse,
  TNewsItems,
  TPaging,
  api,
  formatDate,
  getAccessToken,
} from "@/lib";

export const News: FC = (): ReactElement => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [news, setNews] = useState<TNewsItems[]>([]);
  const [paging, setPaging] = useState<TPaging>({
    previous_page: 0,
    current_page: 1,
    next_page: 0,
    page_size: 9,
    total_page: 0,
    total_data: 0,
  });

  const getNews = async (
    page: number = paging.current_page || 1,
    pageSize: number = 9,
  ) => {
    try {
      const { data } = await api.get<TGetNewsResponse>("/news", {
        params: {
          page,
          page_size: pageSize,
        },
      });
      setNews(data?.data);
      setPaging(data?.pagination);
    } catch (error) {
      setNews([]);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    getNews();
  }, []);

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

  const handlePageChange = (page: number) => {
    getNews(page);
  };

  return (
    <main className="flex flex-col bg-[url('/backgrounds/white.jpg')]  font-inter">
      <Navbar
        className={
          scrollPosition > 0 ? "bg-white duration-300 ease-in-out" : ""
        }
      />

      {/* Category */}
      <section className="mt-32 flex flex-col justify-evenly gap-10 pb-10">
        <div className="container mt-3 flex flex-row-reverse flex-wrap-reverse justify-between gap-10 md:mt-0 md:flex-wrap md:gap-0">
          <div className="flex w-full flex-col justify-evenly gap-5 md:w-[45%] md:gap-3">
            <h1 className="text-2xl font-bold text-font-black-1">
              Kategori pembahasan.
            </h1>
            <p className="text-sm text-font-black-2 xl:text-base">
              Mari bergabung dalam perjalanan edukatif ini, dan temukan
              bagaimana gabungan antara alam dan teknologi dapat mengubah cara
              kita memandang kesehatan.
            </p>
            <div className="flex w-full flex-wrap gap-3 font-bold">
              <div className="grid place-items-center rounded-md border border-bright-2 p-2 text-sm text-font-black-3 xl:text-base">
                Tanaman Herbal
              </div>
              <div className="grid place-items-center rounded-md border border-bright-2 p-2 text-sm text-font-black-3 xl:text-base">
                Teknologi Pengobatan
              </div>
              <div className="grid place-items-center rounded-md border border-bright-2 p-2 text-sm text-font-black-3 xl:text-base">
                Tips Kesehatan
              </div>
              <div className="grid place-items-center rounded-md border border-bright-2 p-2 text-sm text-font-black-3 xl:text-base">
                Diet dan Nutrisi
              </div>
              <div className="grid place-items-center rounded-md border border-bright-2 p-2 text-sm text-font-black-3 xl:text-base">
                Apa Kata Medis
              </div>
              <div className="grid place-items-center rounded-md border border-bright-2 p-2 text-sm text-font-black-3 xl:text-base">
                Pengobatan Sunah
              </div>
            </div>
          </div>
          <div className="flex w-full items-end md:w-1/2">
            <h1 className="w-full text-[2rem] font-bold text-[#1E1E1E] md:text-[2.2rem] xl:w-3/4">
              Perjalanan edukatif. Mari baca dan pelajari.
            </h1>
          </div>
        </div>
      </section>

      {/* Trending News */}
      <TrendNews />

      {news.length && (
        <section className="flex min-h-[600px] flex-col justify-evenly gap-5 bg-white pt-10">
          <div className="container h-[1px] w-4/5 bg-[#36373C] md:w-[95%]" />
          <h1 className="container text-[2rem] font-bold text-font-black-1">
            All News
          </h1>
          <section className="container flex flex-wrap justify-between gap-10">
            {news.map((trend, index) => (
              <section
                className="flex min-h-[400px] w-full flex-col md:w-[29.5%]"
                key={index}
              >
                <section className="flex flex-col pt-1">
                  <img
                    src={trend.images}
                    alt="trend"
                    className="h-[250px] w-full rounded-md object-cover md:h-[150px] xl:h-[250px]"
                  />
                  <section className="flex items-center gap-1">
                    <img src="/icons/folder.png" alt="folder" />
                    <p>{trend.category}</p>
                  </section>
                  <h5 className="text-[#707075]">
                    Posted - {formatDate(trend.created_at)}
                  </h5>
                </section>
                <section className="flex flex-col gap-2 pt-2">
                  <h3 className="break-words text-base font-bold text-font-black-1">
                    {trend.title}
                  </h3>
                  <p className="break-words text-sm">
                    {trend.description.substring(0, 100)}...
                  </p>
                  <div className="pt-1 md:pt-0">
                    <Button
                      onClick={() => navigate(`/news/${trend.id}`)}
                      className="flex items-center justify-center gap-2 bg-bright-2 font-bold text-font-black-3 hover:bg-green-400"
                    >
                      Lebih lengkap
                      <FaArrowRightLong className="pt-1 text-[#1E212B]" />
                    </Button>
                  </div>
                </section>
              </section>
            ))}
          </section>
        </section>
      )}

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

      <section className="flex min-h-[200px] flex-col justify-end gap-5 bg-white pt-20 md:min-h-[400px] md:pt-0 lg:pt-64">
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
