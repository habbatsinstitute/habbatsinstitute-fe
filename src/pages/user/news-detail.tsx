import { FC, Fragment, ReactElement, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import LoadingBar from "react-top-loading-bar";
import { FaArrowRightLong } from "react-icons/fa6";
import {
  Button,
  Navbar,
  Footer,
  TrendNews,
  Consultant,
  Skeleton,
} from "@/components";
import {
  TGetNewsByIdResponses,
  TGetNewsResponse,
  TNewsItems,
  api,
  formatDate,
} from "@/lib";

export const NewsDetail: FC = (): ReactElement => {
  const [newsById, setNewsById] = useState<TNewsItems>({
    category: "",
    created_at: "",
    description: "",
    id: 0,
    images: "",
    title: "",
    user_id: 0,
    views: 0,
  });
  const [news, setNews] = useState<TNewsItems[]>([]);
  const [loadingNews, setLoadingNews] = useState<boolean>(false);
  const [loadingNewsById, setLoadingNewsById] = useState<boolean>(false);
  const [progress, setProgress] = useState(0);

  const navigate = useNavigate();
  const id = useParams();

  const getNewsById = async () => {
    try {
      setProgress(30);
      setLoadingNewsById(true);
      const { data } = await api.get<TGetNewsByIdResponses>(`/news/${id?.id}`);
      setNewsById(data?.data);
      setProgress(70);
    } catch (error) {
      setNewsById({
        id: 0,
        title: "",
        category: "",
        description: "",
        created_at: "",
        images: "",
        user_id: 0,
        views: 0,
      });
    } finally {
      setLoadingNewsById(false);
      setProgress(100);
    }
  };

  const getNews = async () => {
    try {
      setLoadingNews(true);
      const { data } = await api.get<TGetNewsResponse>("/news");
      setNews(data?.data);
    } catch (error) {
      setNews([]);
    } finally {
      setLoadingNews(false);
    }
  };

  useEffect(() => {
    getNewsById();
  }, [id?.id]);

  useEffect(() => {
    getNews();
  }, []);

  return (
    <main className="flex flex-col overflow-x-visible font-inter">
      <Navbar className="bg-white" />

      {/* Header */}
      <section className="container mt-32 flex flex-col items-center gap-10">
        <div className="flex w-full flex-col gap-3 md:w-4/5 lg:w-1/2">
          {loadingNewsById ? (
            <Skeleton className="h-[250px] w-full rounded-md bg-emerald-200 xl:h-[350px]" />
          ) : (
            <img
              src={newsById.images}
              alt="news-cover"
              className="object-cover"
            />
          )}
          {loadingNewsById ? (
            <Skeleton className="h-[50px] w-4/5 bg-emerald-200" />
          ) : (
            <h1 className="break-words text-2xl font-bold text-font-black-1">
              {newsById.title}
            </h1>
          )}
          <div className="flex flex-col">
            <section className="flex items-center gap-1">
              {loadingNewsById ? (
                <Skeleton className="h-[30px] w-1/2 bg-emerald-200" />
              ) : (
                <Fragment>
                  <img src="/icons/folder.png" alt="folder" />
                  <p>{newsById.category}</p>
                </Fragment>
              )}
            </section>
            {loadingNewsById ? (
              <Skeleton className="mt-5 h-[30px] w-[30%] bg-emerald-200" />
            ) : (
              <h5 className="text-[#707075]">
                Posted - {formatDate(newsById.created_at as string)}{" "}
                {newsById.views === 0
                  ? "(Belum dilihat)"
                  : `(${newsById.views}x dilihat)`}
              </h5>
            )}
          </div>
        </div>
        <div className="h-[1px] w-full bg-dark-3" />
      </section>

      {/* Body */}
      <div className="container mt-10 flex justify-center">
        <div className="flex w-full flex-col gap-3 md:w-4/5 lg:w-1/2">
          {loadingNewsById ? (
            <Skeleton className="h-[300px] w-full bg-emerald-200" />
          ) : (
            <div className="whitespace-pre-wrap break-words font-inter">
              {newsById.description}
            </div>
          )}
        </div>
      </div>

      {news.length > 0 && (
        <div className="container mb-10 mt-10 flex justify-end xl:w-1/2">
          {loadingNews || loadingNewsById ? (
            <Skeleton className="h-[50px] w-1/2 bg-emerald-200" />
          ) : (
            news
              .filter((news) => news.id !== newsById.id)
              .slice(0, 1)
              .map((news, index) => (
                <Button
                  key={index}
                  variant={"outline"}
                  onClick={() => {
                    window.scrollTo({ top: 0 });
                    navigate(`/news/${news.id}`);
                  }}
                >
                  {news.title.substring(0, 30)}... <FaArrowRightLong />
                </Button>
              ))
          )}
        </div>
      )}

      <TrendNews />

      <Consultant className="pt-32 lg:pt-64" />

      <Footer className="z-10" />

      <LoadingBar
        color="#10b981"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
    </main>
  );
};
