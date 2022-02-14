import { Icon28LinkOutline } from "@vkontakte/icons";
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import Masonry from "../components/masonry";
import MasonryItem from "../components/masonry/item";
import Paper from "../components/paper";
import useBreakpoints from "../hooks/useBreakpoints";

const About: NextPage = () => {
  const breakpoints = useBreakpoints();

  const getColumnCount = () => {
    if (breakpoints.higherLG) {
      return 3;
    } else if (breakpoints.higherSM) {
      return 2;
    } else {
      return 1;
    }
  };

  return (
    <Masonry columns={getColumnCount()}>
      <Head>
        <title>Песочница › О нас</title>
      </Head>
      <MasonryItem>
        <Paper className="flex flex-col space-y-1 ">
          <h2 className="text-xl font-medium">
            Мы — «
            <span className="underline decoration-dashed decoration-orange-500">
              Песочница
            </span>
            »
          </h2>
          <h3 className="text-md">
            Группа, занимающаяся разработкой самых разных товаров и услуг.
          </h3>
        </Paper>
      </MasonryItem>
      <MasonryItem>
        <Paper
          href="https://vk.com/sandboxminecraft"
          skipAlert
          className="flex items-center justify-between space-x-2"
        >
          <div className="flex flex-col space-y-1">
            <h2 className="text-xl font-medium">Сообщество</h2>
            <h3 className="text-md">
              В нашем сообществе ВКонтакте ежедневно публикуются посты,
              связанные с нашей любимой игрой —{" "}
              <span className="font-medium">Minecraft</span>.
            </h3>
          </div>
          <Icon28LinkOutline className="text-sky-500" />
        </Paper>
      </MasonryItem>
      <MasonryItem>
        <Paper
          href="https://vk.com/pesochek_mine"
          skipAlert
          className="flex items-center justify-between space-x-2"
        >
          <h2 className="text-xl font-medium">Всё портфолио</h2>
          <Icon28LinkOutline className="text-sky-500" />
        </Paper>
      </MasonryItem>
      <MasonryItem>
        <Paper
          withoutPadding
          className="relative flex flex-col space-y-1"
          style={{ aspectRatio: "810 / 1080" }}
        >
          <Image
            className="absolute object-fill object-center"
            src={"/images/portfolio/e00O0Dh2XLM.jpg"}
            width={810}
            height={1080}
          />
        </Paper>
      </MasonryItem>
      <MasonryItem>
        <Paper
          withoutPadding
          className="relative flex flex-col space-y-1"
          style={{ aspectRatio: "1200 / 667" }}
        >
          <Image
            className="absolute object-fill object-center"
            src={"/images/portfolio/TmHYtyVknc4.jpg"}
            width={1200}
            height={667}
          />
        </Paper>
      </MasonryItem>
      <MasonryItem>
        <Paper
          withoutPadding
          className="relative flex flex-col space-y-1"
          style={{ aspectRatio: "1 / 1" }}
        >
          <Image
            className="absolute object-fill object-center"
            src={"/images/portfolio/iwhRzzU9h58.jpg"}
            width={1200}
            height={1200}
          />
        </Paper>
      </MasonryItem>
      <MasonryItem>
        <Paper
          withoutPadding
          className="relative flex flex-col space-y-1"
          style={{ aspectRatio: "800 / 400" }}
        >
          <Image
            className="absolute object-fill object-center"
            src={"/images/portfolio/4Oxc7RmDZ6o.jpg"}
            width={800}
            height={400}
          />
        </Paper>
      </MasonryItem>
      <MasonryItem>
        <Paper
          withoutPadding
          className="relative flex flex-col space-y-1"
          style={{ aspectRatio: "800 / 400" }}
        >
          <Image
            className="absolute object-fill object-center"
            src={"/images/portfolio/9V2UECER9V4.jpg"}
            width={800}
            height={400}
          />
        </Paper>
      </MasonryItem>
      <MasonryItem>
        <Paper
          withoutPadding
          className="relative flex flex-col space-y-1"
          style={{ aspectRatio: "418 / 538" }}
        >
          <Image
            className="absolute object-fill object-center"
            src={"/images/portfolio/thnl0DC3ZrU.jpg"}
            width={418 * 1.5}
            height={538 * 1.5}
          />
        </Paper>
      </MasonryItem>
    </Masonry>
  );
};

export default About;
