import { FC, ReactElement, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import { FaArrowRightLong } from "react-icons/fa6";
import { Button, Navbar, Footer, TrendNews, Consultant } from "@/components";
import { formatDate, useGetNews, useGetNewsById } from "@/lib";

export const NewsDetail: FC = (): ReactElement => {
  const navigate = useNavigate();
  const id = useParams();

  const { data: getAllNews } = useGetNews();
  const { data, refetch } = useGetNewsById(id?.id);

  useEffect(() => {
    window.scrollTo(0, 0);
    refetch();
  }, [refetch, id.id]);

  if (id.id === data?.data.id.toString()) {
    window.scrollTo(0, 0);
  }

  const randomNews =
    getAllNews?.data[
      Math.floor(Math.random() * (getAllNews?.data?.length ?? 0))
    ];

  return (
    <main className="flex flex-col overflow-x-visible font-inter">
      <Navbar className="bg-white" />

      {/* Header */}
      <section className="container mt-32 flex flex-col items-center gap-10">
        <div className="flex w-full flex-col gap-3 md:w-4/5 lg:w-1/2">
          <img
            src={data?.data.images}
            alt="news-cover"
            className="object-cover"
          />
          <h1 className="break-words text-2xl font-bold text-font-black-1">
            {data?.data.title}
          </h1>
          <div className="flex flex-col">
            <section className="flex items-center gap-1">
              <img src="/icons/folder.png" alt="folder" />
              <p>{data?.data.category}</p>
            </section>
            <h5 className="text-[#707075]">
              Posted - {formatDate(data?.data.created_at as string)}{" "}
              {data?.data.views === 0
                ? "(Belum dilihat)"
                : `(${data?.data.views}x dilihat)`}
            </h5>
          </div>
        </div>
        <div className="h-[1px] w-full bg-dark-3" />
      </section>

      {/* Body */}
      <div className="container mt-10 flex justify-center">
        <div className="flex w-full flex-col gap-3 md:w-4/5 lg:w-1/2">
          <div className="whitespace-pre-wrap break-words font-inter">
            {data?.data.description}
          </div>
        </div>
      </div>

      {getAllNews && (
        <div className="container mb-10 mt-10 flex justify-end xl:w-1/2">
          <Button
            variant={"outline"}
            onClick={() => {
              navigate(`/news/${randomNews?.id}`);
            }}
          >
            {randomNews?.title.substring(0, 30)}... <FaArrowRightLong />
          </Button>
        </div>
      )}

      <TrendNews />

      <Consultant className="pt-32 lg:pt-64" />

      <Footer className="z-10" />
    </main>
  );
};
