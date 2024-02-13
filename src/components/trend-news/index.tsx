import { FC, Fragment, ReactElement, useEffect, useState } from "react";
import { LoadingNewsCard, NewsCard } from "..";
import { TGetNewsResponse, TNewsItems, api } from "@/lib";

export const TrendNews: FC = (): ReactElement => {
  const [news, setNews] = useState<TNewsItems[]>([]);
  const [loading, setLoading] = useState(false);

  const getNews = async () => {
    try {
      setLoading(true);
      const { data } = await api.get<TGetNewsResponse>("/news");
      setNews(data?.data);
    } catch (error) {
      setNews([]);
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
        News Trend
      </h1>
      <section className="container flex flex-wrap gap-10 md:gap-8 xl:gap-14">
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
            <p>Belum ada trending news</p>
          </div>
        ) : (
          news
            .slice(0, 3)
            .map((item, index) => (
              <NewsCard
                key={index}
                images={item.images}
                category={item.category}
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
