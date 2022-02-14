import {
  Icon20FreezeOutline,
  Icon24AddOutline,
  Icon24Chats,
  Icon24HistoryBackwardOutline,
  Icon24PenOutline,
  Icon24RoubleBadgeOutline,
  Icon28StatisticsOutline,
  Icon28UserCircleOutline,
  Icon32Spinner,
} from "@vkontakte/icons";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import toast from "react-hot-toast";
import Avatar from "../../components/avatar";
import Paper from "../../components/paper";
import DonateForm from "../../components/qiwi/donateForm";
import EditUserForm from "../../components/user/editForm";
import { useGetUserLazyQuery, User, UserStatus } from "../../generated/graphql";
import userStatusToString from "../../helpers/userStatusToString";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import useBreakpoints from "../../hooks/useBreakpoints";
import { setModal } from "../../lib/redux/ui/reducer";

const User: NextPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { id } = router.query;
  const [getUser, { data, error, loading }] = useGetUserLazyQuery({
    fetchPolicy: "network-only",
  });
  const discordId = useAppSelector((state) => state.user.discordId);
  const status = useAppSelector((state) => state.user.status);
  const isOwner = discordId === data?.user?.discordId;
  const isAdmin =
    status === UserStatus.Admin || status === UserStatus.SuperAdmin;
  const { higherSM } = useBreakpoints();

  React.useEffect(() => {
    if (!id) return;
    getUser({ variables: { id: id?.toString() ?? "" } });
  }, [getUser, id]);

  React.useEffect(() => {
    if (!error) return;
    toast.error(error.message);
  }, [error]);

  return (
    <div
      className="grid auto-cols-auto gap-4"
      style={{ gridTemplateColumns: higherSM ? "max-content 1fr" : "1fr" }}
    >
      <Head>
        <title>Песочница › Профиль {data?.user?.nickname}</title>
      </Head>
      {loading && (
        <Icon32Spinner className="text-orange-500 mx-auto animate-spin" />
      )}
      {data?.user && (
        <Paper
          withoutPadding
          className="flex items-center justify-center aspect-square relative transition w-full sm:max-w-xs"
          style={{ minWidth: 128 }}
        >
          <Avatar
            className="object-contain object-center absolute"
            src={data?.user.avatar as any}
            width={1024}
            height={1024}
            size="large"
            variant="square"
          />
        </Paper>
      )}
      {data?.user && (
        <div className="w-full grid auto-rows-max grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
          <Paper className="flex flex-col justify-center transition">
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-medium">Discord</h2>
              <div role="presentation">
                <svg
                  className="text-indigo-500"
                  width="71"
                  height="55"
                  viewBox="0 0 71 55"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0)">
                    <path
                      d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z"
                      fill="currentColor"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0">
                      <rect width="71" height="55" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
            <h3 className="text-md">{data?.user.tag ?? data.user.discordId}</h3>
          </Paper>
          <Paper className="flex flex-col justify-center transition">
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-medium">Рейтинг</h2>
              <Icon28StatisticsOutline className="text-green-500" />
            </div>
            <h3
              className={
                (data?.user.rating ?? 0) < 100
                  ? "text-red-500 text-md"
                  : "text-green-500 text-md"
              }
            >
              {data?.user.rating}
            </h3>
          </Paper>
          <Paper className="flex flex-col justify-center transition">
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-medium">Статус</h2>
              <Icon28UserCircleOutline className="text-orange-500" />
            </div>
            <h3 className="text-md">{userStatusToString(data?.user.status)}</h3>
          </Paper>
          {isOwner && (
            <Paper className="flex flex-col justify-center transition">
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-medium">Баланс</h2>
                <Icon24RoubleBadgeOutline className="text-orange-500" />
              </div>
              <h3 className="text-md">{data?.user.money} ₽</h3>
            </Paper>
          )}
          {isOwner && (
            <Paper
              onClick={() => dispatch(setModal(<DonateForm />))}
              className="flex justify-between cursor-pointer items-center border border-orange-500 space-x-2 transition"
            >
              <div className="flex flex-col justify-center">
                <h2 className="text-xl font-medium">Пополнить баланс</h2>
                <h3 className="text-md">С помощью Qiwi</h3>
              </div>
              <Icon24AddOutline className="text-orange-500" />
            </Paper>
          )}
          {isOwner && (
            <Paper className="flex flex-col justify-center transition">
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-medium">Замороженно</h2>
                <Icon20FreezeOutline className="text-sky-500" />
              </div>
              <h3 className="text-md">{data?.user.frozenMoney} ₽</h3>
            </Paper>
          )}
          {isOwner && (
            <Paper
              to="/history"
              className="flex justify-between items-center space-x-2 cursor-pointer transition"
            >
              <div className="flex flex-col justify-center">
                <h2 className="text-xl font-medium">История заказов</h2>
                <h3 className="text-md">Все ваши заказы</h3>
              </div>
              <Icon24HistoryBackwardOutline className="text-sky-500" />
            </Paper>
          )}
          {isOwner && (
            <Paper
              to="/chats"
              className="flex justify-between items-center space-x-2 cursor-pointer transition"
            >
              <div className="flex flex-col justify-center">
                <h2 className="text-xl font-medium">Чаты</h2>
                <h3 className="text-md">Чаты по вашим заказам</h3>
              </div>
              <Icon24Chats className="text-sky-500" />
            </Paper>
          )}
          {isAdmin && (
            <Paper
              onClick={() =>
                dispatch(setModal(<EditUserForm user={data.user} />))
              }
              className="flex justify-between items-center space-x-2 cursor-pointer transition"
            >
              <div className="flex flex-col justify-center">
                <h2 className="text-xl font-medium">[A] Редактировать</h2>
                <h3 className="text-md">Редактирование профиля</h3>
              </div>
              <Icon24PenOutline className="text-orange-500" />
            </Paper>
          )}
        </div>
      )}
    </div>
  );
};

export default User;
