import { FC, ReactElement } from "react";
import { useNavigate } from "react-router-dom";
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
}

export const CourseCard: FC<CourseCardProps> = ({ ...props }): ReactElement => {
  const navigate = useNavigate();

  return (
    <section
      className="group flex w-full flex-col rounded-md bg-light-2 p-3 py-3 shadow-lg hover:cursor-pointer hover:bg-emerald-100 md:w-[29.5%]"
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
          className="rounded-mdl max-h-[200px] w-full"
          preload="metadata"
        >
          <source src={props.video} />
        </video>
        <section className="flex items-center gap-1">
          <UserRound className="p-1" />
          <p className="text-sm">{props.author}</p>
        </section>
        <h5 className="text-[#707075]">
          Posted - {formatDate(props.created_at)}
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

export const LoadingCourseCard: FC = (): ReactElement => {
  return (
    <section className="flex min-h-[300px] w-full flex-col justify-between md:w-[30%]">
      <section className="flex flex-col pt-1">
        <Skeleton className="h-[200px] w-full rounded-md bg-slate-500 md:h-[150px] xl:h-[250px]" />
        <section className="flex items-center gap-1 py-1">
          <Skeleton className="h-[15px] w-[20px] bg-slate-500" />
          <Skeleton className="h-[15px] w-[50px] bg-slate-500" />
        </section>
        <h5 className="text-[#707075]">
          <Skeleton className="h-[15px] w-[100px] bg-slate-500" />
        </h5>
      </section>
      <section className="flex flex-col gap-2 pt-2">
        <Skeleton className="h-[30px] w-4/5 bg-slate-500" />
      </section>
    </section>
  );
};
