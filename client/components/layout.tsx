import React from "react";
import { useMeQuery, User } from "../generated/graphql";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { clearUser, loadUserFromGraphQLModel } from "../lib/redux/user/reducer";
import Header from "./header";

const Layout: React.FC = ({ children }) => {
  const modal = useAppSelector((state) => state.ui.modal);
  const drawer = useAppSelector((state) => state.ui.drawer);
  const dispatch = useAppDispatch();
  const { data, error } = useMeQuery({
    fetchPolicy: "no-cache",
    pollInterval: 5000,
  });

  React.useEffect(() => {
    if (!data) return;
    dispatch(loadUserFromGraphQLModel((data.me as User) ?? undefined));
  }, [data, dispatch]);

  React.useEffect(() => {
    if (!error) return;
    dispatch(clearUser());
  }, [error, dispatch]);

  return (
    <div className="w-full min-h-screen bg-neutral-50 text-neutral-900 overflow-hidden">
      {modal}
      {drawer}
      <Header />
      <main className="container mx-auto py-6 px-2">{children}</main>
    </div>
  );
};

export default Layout;
