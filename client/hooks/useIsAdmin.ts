import { useRouter } from "next/router";
import React from "react";
import { UserStatus } from "../generated/graphql";
import { useAppSelector } from "./redux";

function useIsAdmin(redirectPath: string): boolean {
  const checkIsAdmin = (status: UserStatus | undefined) => {
    return status === UserStatus.Admin || status === UserStatus.SuperAdmin;
  };

  const status = useAppSelector((state) => state.user.status);
  const router = useRouter();
  const [isAdmin, setIsAdmin] = React.useState(checkIsAdmin(status));

  React.useEffect(() => {
    setIsAdmin(checkIsAdmin(status));
    if (!status || !router) return;
    if (!checkIsAdmin(status)) router.push(redirectPath);
  }, [status, router, redirectPath]);

  return isAdmin;
}

export default useIsAdmin;
