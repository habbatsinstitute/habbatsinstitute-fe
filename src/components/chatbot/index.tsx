import { FC, ReactElement, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { LuLoader2 } from "react-icons/lu";
import { Loader2 } from "lucide-react";
import { Button, Popover, PopoverContent, PopoverTrigger, Textarea } from "..";
import { formatDate, useGetUserMe, useSendQuestion } from "@/lib";

export const ChatBot: FC = (): ReactElement => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<
    { username: string; text: string }[]
  >([]);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  const { data } = useGetUserMe();
  const { mutate, isPending, isError } = useSendQuestion();

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

  return (
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
                  <div
                    className={`w-full whitespace-pre-wrap ${
                      message.username === data?.data.username
                        ? "text-right"
                        : "text-left"
                    } font-inter text-sm text-[#64748B]`}
                  >
                    {message.text}
                  </div>
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
                  <div
                    className={`flex w-full animate-pulse items-center gap-1 whitespace-pre-wrap text-left font-inter text-sm text-[#64748B]`}
                  >
                    Typing ... <LuLoader2 className="animate-spin" />
                  </div>
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
                  <div
                    className={`w-full whitespace-pre-wrap text-left font-inter text-sm text-red-400`}
                  >
                    Maaf kami tidak dapat memproses permintaan Anda, silahkan
                    cek kembali
                  </div>
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
  );
};
