import { FC, ReactElement, useEffect, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2, UserRound } from "lucide-react";
import { FaArrowRightLong } from "react-icons/fa6";
import {
  Button,
  Footer,
  Navbar,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
} from "@/components";
import {
  formatDate,
  getAccessToken,
  useGetUserMe,
  useSendQuestion,
} from "@/lib";

export const Course: FC = (): ReactElement => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<
    { username: string; text: string }[]
  >([]);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  const { data } = useGetUserMe();
  const { mutate, isPending, isError } = useSendQuestion();

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

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isPending]);

  useEffect(() => {
    if (isPopoverOpen) {
      lastMessageRef.current?.scrollIntoView({ behavior: "instant" });
    }
  }, [isPopoverOpen]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("message", text);

    messages.push({ username: data?.data.username as string, text: text });

    mutate(formData, {
      onSuccess: (response) => {
        setMessages([
          ...messages,
          { username: "admin", text: response?.data?.reply },
        ]);
      },
    });

    setText("");
  };

  const trends = [
    {
      title: "Si Kuning Kunyit Kaya Manfaat",
      description:
        "Kunyit telah dikenal untuk merawat kulit dan membantu menyembuhkan luka..",
      image: "/images/turmeric.png",
      label: "Tanaman Herbal",
      posted: "17 jan 2024",
    },
    {
      title: "Khasiat Kulit Manggis untuk Cegah Kanker, Benarkah?",
      description: "Masyarakat Indonesia sudah tidak asing..",
      image: "/images/mangosteen.png",
      label: "Diet dan Nutrisi",
      posted: "08 jan 2024",
    },
    {
      title: "Isolat Senyawa Aktif Mannotriose Alternatif Pengobatan Kanker.",
      description: "Tingkat keberhasilan pengobatan kanker..",
      image: "/images/mannotriose.png",
      label: "Teknologi Pengobatan",
      posted: "02 jan 2024",
    },
  ];

  const allVideos = [
    {
      title: "Si Kuning Kunyit Kaya Manfaat",
      description:
        "Kunyit telah dikenal untuk merawat kulit dan membantu menyembuhkan luka..",
      image: "/images/turmeric.png",
      label: "Tanaman Herbal",
      posted: "17 jan 2024",
    },
    {
      title: "Khasiat Kulit Manggis untuk Cegah Kanker, Benarkah?",
      description: "Masyarakat Indonesia sudah tidak asing..",
      image: "/images/mangosteen.png",
      label: "Diet dan Nutrisi",
      posted: "08 jan 2024",
    },
    {
      title: "Isolat Senyawa Aktif Mannotriose Alternatif Pengobatan Kanker.",
      description: "Tingkat keberhasilan pengobatan kanker..",
      image: "/images/mannotriose.png",
      label: "Teknologi Pengobatan",
      posted: "02 jan 2024",
    },
    {
      title: "Si Kuning Kunyit Kaya Manfaat",
      description:
        "Kunyit telah dikenal untuk merawat kulit dan membantu menyembuhkan luka..",
      image: "/images/turmeric.png",
      label: "Tanaman Herbal",
      posted: "17 jan 2024",
    },
    {
      title: "Khasiat Kulit Manggis untuk Cegah Kanker, Benarkah?",
      description: "Masyarakat Indonesia sudah tidak asing..",
      image: "/images/mangosteen.png",
      label: "Diet dan Nutrisi",
      posted: "08 jan 2024",
    },
    {
      title: "Isolat Senyawa Aktif Mannotriose Alternatif Pengobatan Kanker.",
      description: "Tingkat keberhasilan pengobatan kanker..",
      image: "/images/mannotriose.png",
      label: "Teknologi Pengobatan",
      posted: "02 jan 2024",
    },
    {
      title: "Si Kuning Kunyit Kaya Manfaat",
      description:
        "Kunyit telah dikenal untuk merawat kulit dan membantu menyembuhkan luka..",
      image: "/images/turmeric.png",
      label: "Tanaman Herbal",
      posted: "17 jan 2024",
    },
    {
      title: "Khasiat Kulit Manggis untuk Cegah Kanker, Benarkah?",
      description: "Masyarakat Indonesia sudah tidak asing..",
      image: "/images/mangosteen.png",
      label: "Diet dan Nutrisi",
      posted: "08 jan 2024",
    },
    {
      title: "Isolat Senyawa Aktif Mannotriose Alternatif Pengobatan Kanker.",
      description: "Tingkat keberhasilan pengobatan kanker..",
      image: "/images/mannotriose.png",
      label: "Teknologi Pengobatan",
      posted: "02 jan 2024",
    },
  ];

  return getAccessToken() ? (
    <main className="flex flex-col overflow-x-hidden overflow-y-hidden bg-[url('/backgrounds/white.jpg')] font-inter">
      <Navbar
        className={
          scrollPosition > 0 ? "bg-white duration-300 ease-in-out" : ""
        }
      />

      <section className="container mb-10 mt-24 flex min-h-[450px] flex-row-reverse md:mb-0 md:mt-16">
        <section className="flex w-full flex-col justify-center gap-3 md:gap-2 lg:w-[45%]">
          <h1 className="pb-0 text-[1.8rem] font-bold text-[#1E1E1E] md:pb-2 md:text-[2.7rem] lg:text-[2rem]">
            Perjalanan edukatif. <br />
            Mari baca dan pelajari.
          </h1>
          <h3 className="text-[1.3rem] font-bold text-font-black-1 md:text-[1.5rem] lg:text-[1rem]">
            Kategori pembahasan.
          </h3>
          <p className="w-5/6 text-xs text-font-black-2 md:w-[80%] md:text-base lg:text-[0.9rem]">
            Mari bergabung dalam perjalanan edukatif ini, dan temukan bagaimana
            gabungan antara alam dan teknologi dapat mengubah cara kita
            memandang kesehatan.
          </p>
          <div className="flex w-full flex-wrap gap-3 font-bold md:w-4/5 lg:w-11/12">
            <div className="grid place-items-center rounded-md border border-bright-2 px-2 py-2 text-sm text-font-black-3 lg:p-2 lg:text-base xl:p-3">
              Tanaman Herbal
            </div>
            <div className="grid place-items-center rounded-md border border-bright-2 px-2 py-2 text-sm text-font-black-3 lg:p-2 lg:text-base xl:p-3">
              Teknologi Pengobatan
            </div>
            <div className="grid place-items-center rounded-md border border-bright-2 px-2 py-2 text-sm text-font-black-3 lg:p-2 lg:text-base xl:p-3">
              Tips Kesehatan
            </div>
            <div className="grid place-items-center rounded-md border border-bright-2 px-2 py-2 text-sm text-font-black-3 lg:p-2 lg:text-base xl:p-3">
              Diet dan Nutrisi
            </div>
            <div className="grid place-items-center rounded-md border border-bright-2 px-2 py-2 text-sm text-font-black-3 lg:p-2 lg:text-base xl:p-3">
              Apa Kata Medis
            </div>
            <div className="grid place-items-center rounded-md border border-bright-2 px-2 py-2 text-sm text-font-black-3 lg:p-2 lg:text-base xl:p-3">
              Pengobatan Sunah
            </div>
          </div>
        </section>
        <section className="hidden w-1/2 place-items-center lg:grid">
          <img
            src="/illustrations/course.png"
            alt="doctor"
            className="relative left-[-170px] top-[30px] scale-150 object-cover xl:top-[10px] xl:scale-125"
          />
        </section>
      </section>

      <section className="z-10 flex min-h-[600px] flex-col justify-evenly gap-5 bg-white pt-20 md:gap-0 md:pt-0">
        <div className="container h-[1px] w-4/5 bg-[#36373C] md:w-[95%]" />
        <h1 className="container text-[2rem] font-bold text-font-black-1">
          Trending Course
        </h1>
        <section className="container flex flex-wrap justify-between gap-10 md:gap-0">
          {trends.map((trend, index) => (
            <section
              className="flex w-full flex-col justify-between rounded-md bg-light-2 p-3 py-3 shadow-lg md:w-[29.5%]"
              key={index}
            >
              <section className="flex flex-col py-2">
                <video
                  controls
                  onContextMenu={(e) => e.preventDefault()}
                  controlsList="nodownload"
                  className="h-full w-full rounded-md object-fill"
                  preload="metadata"
                >
                  <source src="https://res.cloudinary.com/ddudewmxj/video/upload/v1707146745/course/yx0nhf2blb4wbnwl1nfc.mp4" />
                </video>
                <section className="flex items-center gap-1">
                  <UserRound className="p-1" />
                  <p className="text-sm">{trend.label}</p>
                </section>
                <h5 className="text-[#707075]">Posted - {trend.posted}</h5>
              </section>
              <section className="flex flex-col gap-2 pt-2">
                <h3 className="text-lg font-bold text-font-black-1 md:text-base">
                  {trend.title}
                </h3>
                <p>{trend.description}</p>
              </section>
            </section>
          ))}
        </section>
      </section>

      <section className="flex min-h-[600px] flex-col justify-evenly gap-5 bg-white pt-10">
        <div className="container h-[1px] w-4/5 bg-[#36373C] md:w-[95%]" />
        <h1 className="container text-[2rem] font-bold text-font-black-1">
          All Course
        </h1>
        <section className="container flex flex-wrap justify-between gap-10">
          {allVideos.map((trend, index) => (
            <section
              className="flex w-full flex-col justify-between rounded-md bg-light-2 p-3 py-3 shadow-lg md:w-[29.5%]"
              key={index}
            >
              <section className="flex flex-col py-2">
                <video
                  controls
                  onContextMenu={(e) => e.preventDefault()}
                  controlsList="nodownload"
                  className="h-full w-full rounded-md object-fill"
                  preload="metadata"
                >
                  <source src="https://res.cloudinary.com/ddudewmxj/video/upload/v1707146745/course/yx0nhf2blb4wbnwl1nfc.mp4" />
                </video>
                <section className="flex items-center gap-1">
                  <UserRound className="p-1" />
                  <p className="text-sm">{trend.label}</p>
                </section>
                <h5 className="text-[#707075]">Posted - {trend.posted}</h5>
              </section>
              <section className="flex flex-col gap-2 pt-2">
                <h3 className="text-lg font-bold text-font-black-1 md:text-base">
                  {trend.title}
                </h3>
                <p>{trend.description}</p>
              </section>
            </section>
          ))}
        </section>
      </section>

      <section className="flex min-h-[200px] flex-col justify-end gap-5 bg-white pt-20 md:min-h-[400px] lg:pt-48 xl:pt-56">
        <div className="flex h-[250px] bg-[url('/backgrounds/green.png')] bg-cover lg:h-[300px]">
          <div className="container flex">
            <div className="flex w-full flex-col justify-center gap-3 md:w-1/2">
              <h3 className="text-base font-bold text-font-black-3 md:text-lg lg:text-2xl">
                Dapatkan konsultasi kesehatan yang terpercaya dengan tim ahli
                medis kami, siap membantu Anda menemukan solusi terbaik untuk
                kesehatan Anda.
              </h3>
              <div>
                <Button>Konsultasi Sekarang</Button>
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

      <section className="z-10 flex min-h-[600px] flex-col justify-evenly gap-5 bg-white pb-16 pt-10 md:gap-0 lg:gap-5">
        <div className="container h-[1px] w-4/5 bg-[#36373C] md:w-[95%]" />
        <h1 className="container text-[2rem] font-bold text-font-black-1">
          News Trend
        </h1>
        <section className="container flex flex-wrap justify-between gap-10 md:gap-0">
          {trends.map((trend, index) => (
            <section
              className="flex min-h-[400px] w-full flex-col justify-between md:w-[30%]"
              key={index}
            >
              <section className="flex flex-col pt-1">
                <img
                  src={trend.image}
                  alt="trend"
                  className=" rounded-md object-cover"
                />
                <section className="flex items-center gap-1">
                  <img src="/icons/folder.png" alt="folder" />
                  <p>{trend.label}</p>
                </section>
                <h5 className="text-[#707075]">Posted - {trend.posted}</h5>
              </section>
              <section className="flex flex-col gap-2 pt-2">
                <h3 className="text-lg font-bold text-font-black-1">
                  {trend.title}
                </h3>
                <p>{trend.description}</p>
                <div className="pt-1 md:pt-0">
                  <Button className="flex items-center justify-center gap-2 bg-bright-2 font-bold text-font-black-3 hover:bg-green-400">
                    Lebih lengkap
                    <FaArrowRightLong className="pt-1 text-[#1E212B]" />
                  </Button>
                </div>
              </section>
            </section>
          ))}
        </section>
      </section>

      <section className="fixed bottom-0 right-0 z-20 h-16 w-16 hover:cursor-pointer hover:opacity-90">
        <Popover onOpenChange={() => setIsPopoverOpen(!isPopoverOpen)}>
          <PopoverTrigger asChild>
            <img src="/icons/chat.png" alt="chat" />
          </PopoverTrigger>
          <PopoverContent className="flex min-h-[400px] w-screen flex-col font-inter md:w-[30rem]">
            <div className="flex h-[270px] justify-between">
              <div className="flex w-[40%] flex-col justify-center gap-3 rounded-md bg-[url('/backgrounds/green.png')] pl-5">
                <img src="/icons/chat.png" alt="chat" className="w-14" />
                <h1 className="font-bold text-font-white">Realtime chat</h1>
                <p className="w-11/12 text-[0.6rem] text-font-white md:text-xs">
                  Tanyakan apa saja seputar kesehatan kami akan membantu
                  mnjawabnya.
                </p>
              </div>
              <div className="flex w-[55%] flex-col gap-1 overflow-y-auto pr-5">
                {messages.length === 0 && (
                  <div className="flex h-full flex-col items-center justify-evenly">
                    <img
                      src="/illustrations/no-chat.jpg"
                      alt="Tidak ada chat"
                      className="w-32"
                    />
                    <h1>Tidak ada chat</h1>
                  </div>
                )}
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    className={`flex w-full flex-col gap-2 ${
                      message.username === data?.data.username
                        ? "items-end"
                        : "items-start"
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3>{message.username}</h3>
                    <pre
                      className={`w-full whitespace-pre-wrap break-words ${
                        message.username === data?.data.username
                          ? "text-right"
                          : "text-left"
                      } font-inter text-sm text-[#64748B]`}
                    >
                      {message.text}
                    </pre>
                    <p className="text-xs">{formatDate(new Date())}</p>
                    <div className="container h-[1px] bg-[#36373C]" />
                  </motion.div>
                ))}
                {isPending && (
                  <motion.div
                    className={`flex w-full flex-col gap-2`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h3>Admin</h3>
                    <pre
                      className={`w-full animate-pulse whitespace-pre-wrap break-words text-left font-inter text-sm text-[#64748B]`}
                    >
                      Typing ...
                    </pre>
                    <p className="text-xs">{formatDate(new Date())}</p>
                    <div className="container h-[1px] bg-[#36373C]" />
                  </motion.div>
                )}
                {isError && (
                  <motion.div
                    className={`flex w-full flex-col gap-2`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h3>Admin</h3>
                    <pre
                      className={`w-full whitespace-pre-wrap break-words text-left font-inter text-sm text-red-400`}
                    >
                      Maaf kami tidak dapat memproses permintaan Anda, silahkan
                      cek kembali
                    </pre>
                    <p className="text-xs">{formatDate(new Date())}</p>
                    <div className="container h-[1px] bg-[#36373C]" />
                  </motion.div>
                )}
                <div ref={lastMessageRef}></div>
              </div>
            </div>
            <form
              onSubmit={onSubmit}
              className="mt-5 flex h-[130px] flex-col gap-2"
            >
              <Textarea
                placeholder="Type your message here"
                className={`resize-none focus-visible:ring-1 focus-visible:ring-blue-300 focus-visible:ring-offset-0`}
                onChange={(e) => {
                  setText(e.target.value);
                }}
                value={text}
                disabled={isPending}
                onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
                  if (e.ctrlKey && e.key === "Enter") {
                    e.preventDefault();
                    const formEvent =
                      e as unknown as React.FormEvent<HTMLFormElement>;
                    onSubmit(formEvent);
                  }
                }}
              />
              <div>
                <Button
                  type="submit"
                  className="gap-2 bg-bright-2 font-black text-font-black-1 hover:bg-bright-1"
                  disabled={isPending || !text}
                >
                  {isPending && <Loader2 className="w-4 animate-spin" />}
                  Send Message
                </Button>
              </div>
            </form>
          </PopoverContent>
        </Popover>
      </section>

      <Footer />
    </main>
  ) : (
    <Navigate to={"/"} />
  );
};
