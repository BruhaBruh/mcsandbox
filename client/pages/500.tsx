import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import Paper from "../components/paper";

const Page500: NextPage = () => {
  return (
    <div className="h-hero flex items-center justify-center">
      <Head>
        <title>Ошибка 500</title>
      </Head>
      <Paper>
        <h1 className="text-2xl font-medium">
          Ошибка <span className="text-red-500">500</span> - ошибка на стороне
          сервера
        </h1>
        <h2 className="text-lg">Попробуйте позже</h2>
      </Paper>
    </div>
  );
};

export default Page500;
