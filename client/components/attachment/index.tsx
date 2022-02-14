import { Icon24PictureOutline, Icon24VideoOutline } from "@vkontakte/icons";
import React from "react";

const AttachmentCard: React.FC<{ href: string }> = ({ href }) => {
  const isImage = /\.(jpg|jpeg|png|webp|svg)$/i.test(href);
  const isVideo = /\.(webm|mp4|avi|gif)$/i.test(href);
  const name = href.split("/").pop();

  return (
    <a href={href} download>
      {isImage && <img src={href} width={"100%"} />}
      {isVideo && (
        <video
          width="100%"
          className="aspect-video"
          controls
          poster="https://archive.org/download/WebmVp8Vorbis/webmvp8.gif"
        >
          <source
            src="https://archive.org/download/WebmVp8Vorbis/webmvp8_512kb.mp4"
            type="video/mp4"
          />
          <source
            src="https://archive.org/download/WebmVp8Vorbis/webmvp8.ogv"
            type="video/ogg"
          />
          <source
            src="https://archive.org/download/WebmVp8Vorbis/webmvp8.webm"
            type="video/webm"
          />
          Your browser doesnt support HTML5 video tag.
        </video>
      )}
      <div className="space-x-2 flex items-center text-sky-500 justify-center">
        {isImage && <Icon24PictureOutline className="i-20" />}
        {isVideo && <Icon24VideoOutline className="i-20" />}
        <span>{name}</span>
      </div>
    </a>
  );
};

export default AttachmentCard;
