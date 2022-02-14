import { Icon24ReplyOutline } from "@vkontakte/icons";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import React from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import Linkify from "react-linkify";
import { Ordermessage, useReadMessageMutation } from "../../generated/graphql";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import useBreakpoints from "../../hooks/useBreakpoints";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import { setModal } from "../../lib/redux/ui/reducer";
import AttachmentCard from "../attachment";
import Avatar from "../avatar";
import Button from "../button";
import Modal from "../modal";
import ModalContent from "../modal/content";
import ModalHeader from "../modal/header";
import Paper from "../paper";

const ChatMessage: React.FC<{
  chatMessage: Ordermessage;
  prevMessage?: Ordermessage;
  nextMessage?: Ordermessage;
  setReply: React.Dispatch<React.SetStateAction<number | undefined>>;
}> = ({ chatMessage, nextMessage, prevMessage, setReply }) => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, {});
  const [mouseOver, setMouseOver] = React.useState(false);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const discordId = useAppSelector((state) => state.user.discordId);
  const breakpoints = useBreakpoints();
  const isOwner = discordId === chatMessage.ownerId;
  const prevMessageIsSameOwner = prevMessage
    ? prevMessage.ownerId === chatMessage.ownerId
    : false;
  const nextMessageIsSameOwner = nextMessage
    ? nextMessage.ownerId === chatMessage.ownerId
    : false;
  const [read] = useReadMessageMutation();

  React.useEffect(() => {
    const isVisible = !!entry?.isIntersecting;
    if (!isVisible) return;
    if (isOwner) return;
    if (chatMessage.readedUserIds?.includes(discordId as string)) return;
    read({ variables: { id: chatMessage.ordermessageId } });
  }, [entry, chatMessage, read]);

  const getSizeOfSpacer = () => {
    if (breakpoints.higherLG) {
      return "152px";
    } else if (breakpoints.higherSM) {
      return "96px";
    }
    return "48px";
  };

  const getIsOwnerClassName = () => {
    if (isOwner) {
      return "flex-row-reverse space-x-reverse";
    } else {
      return "";
    }
  };

  const getComputedClassName = () => {
    return [
      "flex items-end space-x-2 whitespace-pre-wrap rounded-2xl",
      isOwner && chatMessage.readedUserIds?.length === 0
        ? "bg-sky-500 bg-opacity-5"
        : "",
      getIsOwnerClassName(),
    ].join(" ");
  };

  const getComputedClassNameOfMessageBox = () => {
    return [
      "px-4 py-2 relative overflow-visible w-fit",
      isOwner ? "bg-neutral-100" : "bg-neutral-200",
      isOwner ? "rounded-l-2xl" : "rounded-r-2xl",
      prevMessageIsSameOwner ? "" : "rounded-b-2xl",
      nextMessageIsSameOwner ? "" : "rounded-t-2xl",
    ].join(" ");
  };

  const openAttachments = () => {
    dispatch(
      setModal(
        <Modal className="max-w-lg">
          <ModalHeader>Прикрепленные файлы</ModalHeader>
          <ModalContent>
            <ScrollContainer
              hideScrollbars={false}
              className="hide-scrollbars max-h-96 flex flex-col space-y-2"
              horizontal={false}
            >
              {chatMessage.attachments.map((a) => (
                <AttachmentCard href={a} key={a} />
              ))}
            </ScrollContainer>
          </ModalContent>
        </Modal>
      )
    );
  };

  return (
    <div
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
      ref={ref}
      className={getComputedClassName()}
    >
      {!isOwner && !prevMessageIsSameOwner && (
        <div className="cursor-pointer w-8 h-8" style={{ minWidth: "32px" }}>
          <Avatar
            src={chatMessage.owner.avatar}
            onClick={() => router.push("/u/" + chatMessage.ownerId)}
            size="small"
          />
        </div>
      )}
      {!isOwner && prevMessageIsSameOwner && (
        <div className="w-8 h-8" style={{ minWidth: "32px" }} />
      )}
      <div
        className={
          isOwner
            ? "space-y-2 flex flex-col items-end"
            : "space-y-2 flex flex-col items-start"
        }
      >
        {chatMessage.attachments.length !== 0 && (
          <Button onClick={openAttachments} variant="text" color="info">
            файлы
          </Button>
        )}
        {chatMessage.replyMessage && (
          <div
            className={
              isOwner
                ? "text-xs flex items-center flex-row-reverse space-x-1 space-x-reverse"
                : "text-xs flex items-center space-x-1"
            }
          >
            <Avatar
              src={chatMessage.replyMessage?.owner.avatar}
              width={24}
              height={24}
            />
            <span
              className="truncate"
              style={{
                maxWidth: "8rem",
              }}
            >
              {chatMessage.replyMessage?.message}
            </span>
          </div>
        )}
        <Paper
          elevation={2}
          disableBG
          disableRound
          withoutPadding
          className={getComputedClassNameOfMessageBox()}
        >
          <Linkify
            properties={{
              target: "_blank",
            }}
          >
            {chatMessage.message}
          </Linkify>
          <span className="select-none w-8 inline-block" />
          <span
            className={"absolute bottom-2 right-2 text-xs text-neutral-400"}
          >
            {isOwner && (
              <span
                data-tooltip={dayjs(chatMessage.createdAt).format(
                  "HH:mm DD.MM.YYYY"
                )}
                data-tooltip-left
                className="after:w-max cursor-default"
              >
                {dayjs(chatMessage.createdAt).format("HH:mm")}
              </span>
            )}
            {!isOwner && (
              <span
                data-tooltip={dayjs(chatMessage.createdAt).format(
                  "HH:mm DD.MM.YYYY"
                )}
                data-tooltip-right
                className="after:w-max cursor-default"
              >
                {dayjs(chatMessage.createdAt).format("HH:mm")}
              </span>
            )}
          </span>
        </Paper>
      </div>
      {!isOwner && !chatMessage.readedUserIds?.includes(discordId as any) && (
        <div className="relative flex justify-center items-center self-center">
          <div className="bg-sky-500 w-2 h-2 absolute rounded-full animate-ping" />
          <div className="bg-sky-500 w-2 h-2 rounded-full" />
        </div>
      )}
      {mouseOver && (
        <Button
          onClick={() => setReply(chatMessage.ordermessageId)}
          variant="text"
          color="info"
          icon
        >
          <Icon24ReplyOutline className="i-20 " />
        </Button>
      )}
      <div style={{ minWidth: getSizeOfSpacer(), flex: 1 }} />
    </div>
  );
};

export default ChatMessage;
