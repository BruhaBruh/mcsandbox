import { UserStatus } from "../generated/graphql";

const userStatusToString = (userStatus: UserStatus | undefined): string => {
  switch (userStatus) {
    case UserStatus.SuperAdmin:
      return "Разработчик";
    case UserStatus.Admin:
      return "Администратор";
    case UserStatus.Executor:
      return "Исполнитель";
    case UserStatus.Customer:
      return "Заказчик";
    default:
      return "Не определен";
  }
};

export default userStatusToString;
