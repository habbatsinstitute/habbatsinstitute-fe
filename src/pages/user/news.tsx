import { FC, Fragment, ReactElement, useEffect, useState } from "react";
import {
  Button,
  Consultant,
  Footer,
  LoadingNewsCard,
  Navbar,
  NewsCard,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  TrendNews,
} from "@/components";
import { TGetNewsResponse, TNewsItems, TPaging, api } from "@/lib";

export const News: FC = (): ReactElement => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [news, setNews] = useState<TNewsItems[]>([]);
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

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

      {/* All News */}
      <section className="flex min-h-[600px] flex-col justify-evenly gap-5 bg-white pt-10">
        <div className="container h-[1px] w-4/5 bg-[#36373C] md:w-[95%]" />
        <h1 className="container text-[2rem] font-bold text-font-black-1">
          All News
        </h1>
        <section className="container flex flex-wrap justify-between gap-10">
          {loading ? (
            <Fragment>
              <LoadingNewsCard />
              <LoadingNewsCard />
              <LoadingNewsCard />
            </Fragment>
          ) : news.length === 0 ? (
            <div className="flex min-h-[400px] w-full flex-col items-center justify-center">
              <img
                src="/illustrations/news-not-found.png"
                alt="news not found"
                className="h-[300px]"
              />
              <p>Belum ada news</p>
            </div>
          ) : (
            news
              .slice(0, 9)
              .map((item, index) => (
                <NewsCard {...item} href={item.id} key={index} />
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
      <Consultant className="bg-white pt-32 lg:pt-64" />

      <Footer className="z-10" />
    </main>
  );
};
