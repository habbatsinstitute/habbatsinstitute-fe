import { FC, ReactElement, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { FaArrowRightLong } from "react-icons/fa6";
import { Button, Navbar, Footer } from "@/components";
import {
  TGetNewsResponse,
  TNewsItems,
  api,
  formatDate,
  getAccessToken,
  useGetNewsById,
} from "@/lib";

export const NewsDetail: FC = (): ReactElement => {
  const [news, setNews] = useState<TNewsItems[]>([]);

  const id = useParams();

  const { data, refetch } = useGetNewsById(id?.id);

  const getNews = async () => {
    const { data } = await api.get<TGetNewsResponse>("/news");
    setNews(data?.data);
  };

  useEffect(() => {
    getNews();
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch, id.id]);

  const navigate = useNavigate();

  return (
    <main className="flex flex-col overflow-x-visible font-inter">
      <Navbar className="bg-white" />

      <section className="container mt-32 flex flex-col items-center gap-10">
        <div className="flex w-full flex-col gap-3 md:w-4/5 lg:w-1/2">
          <img
            src={data?.data.images}
            alt="news-cover"
            className="object-cover"
          />
          <h1 className="text-2xl font-bold text-font-black-1">
            {data?.data.title}
          </h1>
          <div className="flex flex-col">
            <section className="flex items-center gap-1">
              <img src="/icons/folder.png" alt="folder" />
              <p>{data?.data.category}</p>
            </section>
            <h5 className="text-[#707075]">
              Posted - {formatDate(data?.data.created_at as string)}
            </h5>
          </div>
        </div>
        <div className="h-[1px] w-full bg-dark-3" />
      </section>

      <div className="container mt-10 flex justify-center">
        <div className="flex w-full flex-col gap-3 md:w-4/5 lg:w-1/2">
          <div className="whitespace-pre-wrap font-inter">
            {data?.data.description}
          </div>
        </div>
      </div>

      {/* <div className="w-ful container mt-10 flex justify-end xl:w-1/2">
        <Button variant={"outline"}>
          Next News - Khasiat Kulit Manggis untuk.. <FaArrowRightLong />
        </Button>
      </div> */}

      {news.length > 0 && (
        <section className="flex min-h-[600px] flex-col justify-evenly gap-5 bg-white md:gap-0">
          <div className="container h-[1px] w-4/5 bg-[#36373C] md:w-[95%]" />
          <h1 className="container text-[2rem] font-bold text-font-black-1">
            News Trend
          </h1>
          <section className="container flex flex-wrap justify-between gap-10 md:gap-0">
            {news.slice(0, 3).map((news, index) => (
              <section
                className="flex min-h-[400px] w-full flex-col justify-between md:w-[30%]"
                key={index}
              >
                <section className="flex flex-col pt-1">
                  <img
                    src={news.images}
                    alt="news"
                    className="h-[250px] w-full rounded-md object-cover md:h-[150px] xl:h-[250px]"
                  />
                  <section className="flex items-center gap-1">
                    <img src="/icons/folder.png" alt="folder" />
                    <p>{news.category}</p>
                  </section>
                  <h5 className="text-[#707075]">
                    Posted - {formatDate(news.created_at)}
                  </h5>
                </section>
                <section className="flex flex-col gap-2 pt-2">
                  <h3 className="text-base font-bold text-font-black-1">
                    {news.title}
                  </h3>
                  <p className="text-sm">
                    {news.description.substring(0, 100)}...
                  </p>
                  <div className="pt-1 md:pt-0">
                    <Button
                      onClick={() => navigate(`/news/${news.id}`)}
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

      <section className="flex min-h-[200px] flex-col justify-end gap-5 bg-white pt-20 md:min-h-[400px] md:pt-0 lg:pt-48">
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
