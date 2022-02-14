import { Icon28CancelAltOutline, Icon28SendOutline } from "@vkontakte/icons";
import { useRouter } from "next/router";
import React from "react";
import toast from "react-hot-toast";
import { useSendMessageMutation } from "../../generated/graphql";
import Button from "../button";
import Paper from "../paper";

const ChatForm: React.FC<{
  reply: number | undefined;
  clearReply: () => void;
}> = ({ reply, clearReply }) => {
  const router = useRouter();
  const { id } = router.query;
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);
  const [message, setMessage] = React.useState("");
  const [send, { error, loading }] = useSendMessageMutation();

  React.useEffect(() => {
    if (textAreaRef.current?.style) textAreaRef.current.style.height = "0px";
    if (textAreaRef.current?.style)
      textAreaRef.current.style.height = `${
        textAreaRef.current!.scrollHeight
      }px`;
  }, [message]);

  React.useEffect(() => {
    if (!error) return;
    toast.error(error.message);
  }, [error]);

  return (
    <Paper className="flex space-x-2 items-end">
      {reply && (
        <Button
          icon
          color="error"
          variant="text"
          size="medium"
          onClick={(e) => {
            clearReply();
          }}
        >
          <Icon28CancelAltOutline />
        </Button>
      )}
      <textarea
        ref={textAreaRef}
        rows={1}
        value={message}
        onChange={(e) => setMessage(e.currentTarget.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            if (e.shiftKey) return;
            e.preventDefault();
            send({
              variables: {
                id: Number(id),
                message: message,
                replyId: reply,
              },
            });
            setMessage("");
            clearReply();
          }
        }}
        className="rounded-xl focus:border-sky-500 w-full resize-none"
      />
      {message.trim() && (
        <Button
          icon
          color="info"
          variant="text"
          size="medium"
          onClick={(e) => {
            e.stopPropagation();
            send({
              variables: {
                id: Number(id),
                message: message,
                replyId: reply,
              },
            });
            setMessage("");
            clearReply();
          }}
          disabled={loading}
        >
          <Icon28SendOutline className="i-28" />
        </Button>
      )}
    </Paper>
  );
};

export default ChatForm;
