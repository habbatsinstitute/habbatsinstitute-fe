import { AdminLayout } from "@/layouts";
import { FC, ReactElement } from "react";
import { Link } from "react-router-dom";
import { cards } from "./card";

export const Dashboard: FC = (): ReactElement => {
  return (
    <AdminLayout>
      <section className="flex h-[400px] w-full flex-wrap justify-between pt-7">
        {cards.map((card, index) => (
          <Link
            to={card.to}
            key={index}
            className="group flex h-40 w-[48%] flex-col justify-center gap-1 rounded-md border bg-[url('/backgrounds/white.jpg')] bg-cover px-5 py-3 shadow-md hover:cursor-pointer hover:bg-[url('/backgrounds/green.png')]"
          >
            {card.icon}
            <h1 className="font-bold">{card.title}</h1>
            <p className="text-xs text-font-black-2 group-hover:text-font-black-3">
              {card.desc}
            </p>
          </Link>
        ))}
      </section>
    </AdminLayout>
  );
};
