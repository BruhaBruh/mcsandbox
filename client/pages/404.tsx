import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import Paper from "../components/paper";

const Page404: NextPage = () => {
  return (
    <div className="h-hero flex items-center justify-center">
      <Head>
        <title>Ошибка 404</title>
      </Head>
      <Paper>
        <h1 className="text-2xl font-medium">
          Ошибка <span className="text-orange-500">404</span> - страница не
          найдена
        </h1>
        <h2 className="text-lg">Может быть вы не туда попали?</h2>
      </Paper>
    </div>
  );
};

export default Page404;
