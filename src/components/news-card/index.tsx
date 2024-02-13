import { FC, ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { Button, Skeleton } from "..";
import { formatDate } from "@/lib";

interface NewsCardProps {
  key?: number;
  images: string;
  category: string;
  created_at: string | Date;
  title: string;
  description: string;
  views: number;
  href: string | number;
}

export const NewsCard: FC<NewsCardProps> = ({ ...props }): ReactElement => {
  const navigate = useNavigate();

  return (
    <section
      className="flex min-h-[300px] w-full flex-col justify-between md:w-[30%]"
      key={props.key}
    >
      <section className="flex flex-col pt-1">
        <img
          src={props.images}
          alt="news"
          className="h-[250px] w-full rounded-md object-cover md:h-[150px] xl:h-[250px]"
        />
        <section className="flex items-center gap-1">
          <img src="/icons/folder.png" alt="folder" />
          <p>{props.category}</p>
        </section>
        <h5 className="text-[#707075]">
          Posted - {formatDate(props.created_at)}{" "}
          {props.views === 0 ? "(Belum dilihat)" : `(${props.views}x dilihat)`}
        </h5>
      </section>
      <section className="flex flex-col gap-2 pt-2">
        <h3 className="line-clamp-2 break-words text-base font-bold text-font-black-1">
          {props.title}
        </h3>
        <p className="line-clamp-2 break-words text-sm">{props.description}</p>
        <div className="pt-1 md:pt-0">
          <Button
            onClick={() => navigate(`/news/${props.href}`)}
            className="flex items-center justify-center gap-2 bg-bright-2 font-bold text-font-black-3 hover:bg-green-400"
          >
            Lebih lengkap
            <FaArrowRightLong className="pt-1 text-[#1E212B]" />
          </Button>
        </div>
      </section>
    </section>
  );
};

export const LoadingNewsCard: FC = (): ReactElement => {
  return (
    <section className="flex min-h-[300px] w-full flex-col justify-between md:w-[30%]">
      <section className="flex flex-col pt-1">
        <Skeleton className="h-[250px] w-full rounded-md bg-slate-500 md:h-[150px] xl:h-[250px]" />
        <section className="flex items-center gap-1 py-1">
          <Skeleton className="h-[15px] w-[70px] bg-slate-500" />
          <Skeleton className="h-[15px] w-[100px] bg-slate-500" />
        </section>
        <h5 className="text-[#707075]">
          <Skeleton className="h-[15px] w-[150px] bg-slate-500" />
        </h5>
      </section>
      <section className="flex flex-col gap-2 pt-2">
        <Skeleton className="h-[30px] w-full bg-slate-500" />
        <Skeleton className="h-[35px] w-full bg-slate-500" />
        <div className="pt-1 md:pt-0">
          <Skeleton className="h-[30px] w-[100px] bg-slate-500" />
        </div>
      </section>
    </section>
  );
};
