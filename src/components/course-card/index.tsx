import { FC, ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { UserRound } from "lucide-react";
import { Skeleton } from "..";
import { formatDate } from "@/lib";

interface CourseCardProps {
  key?: number;
  video: string;
  author: string;
  created_at: string | Date;
  title: string;
  description: string;
  views: number;
  href: string | number;
  className?: string;
}

interface CourseCardLoadingProps {
  key?: number;
  className?: string;
}

export const CourseCard: FC<CourseCardProps> = ({ ...props }): ReactElement => {
  const navigate = useNavigate();

  return (
    <section
      className={twMerge(
        "group flex w-full flex-col rounded-md border bg-light-2 p-3 py-3 shadow-lg hover:cursor-pointer hover:border-emerald-300 hover:bg-emerald-100 md:w-[29.5%]",
        props.className,
      )}
      onClick={() => {
        navigate(`/courses/${props.href}`);
      }}
      key={props.key}
    >
      <section className="flex flex-col py-2">
        <video
          controls
          onContextMenu={(e) => e.preventDefault()}
          controlsList="nodownload"
          className="h-[200px] w-full rounded-md md:h-[170px] lg:h-[200px]"
          preload="metadata"
        >
          <source src={props.video} />
        </video>
        <section className="flex items-center gap-1">
          <UserRound className="p-1" />
          <p className="text-sm">{props.author}</p>
        </section>
        <h5 className="text-xs text-[#707075]">
          Posted - {formatDate(props.created_at)}{" "}
        </h5>
        <h5 className="text-xs text-[#707075]">
          {props.views === 0
            ? "(Belum ditonton)"
            : `(${props.views}x ditonton)`}
        </h5>
      </section>
      <section className="flex flex-col gap-2 pt-2">
        <h3 className="line-clamp-2 break-words text-base font-bold text-font-black-1 md:text-base">
          {props.title}
        </h3>
        <p className="line-clamp-2 break-words text-sm">{props.description}</p>
      </section>
    </section>
  );
};

export const LoadingCourseCard: FC<CourseCardLoadingProps> = ({
  className,
  key,
}): ReactElement => {
  return (
    <section
      key={key}
      className={
        (twMerge(
          "flex min-h-[300px] w-full flex-col justify-between md:w-[30%]",
        ),
        className)
      }
    >
      <section className="flex flex-col pt-1">
        <Skeleton className="h-[200px] w-full rounded-md bg-slate-500 md:h-[150px] xl:h-[250px]" />
        <section className="flex items-center gap-1 py-1">
          <Skeleton className="h-[15px] w-[20px] bg-slate-500" />
          <Skeleton className="h-[15px] w-[50px] bg-slate-500" />
        </section>
        <h5 className="text-[#707075]">
          <Skeleton className="h-[15px] w-[100px] bg-slate-500" />
        </h5>
        <Skeleton className="mt-1 h-[30px] w-4/5 bg-slate-500" />
      </section>
    </section>
  );
};
