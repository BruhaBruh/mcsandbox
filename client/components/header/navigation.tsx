import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setDrawer, setModal } from "../../lib/redux/ui/reducer";
import Alert from "../alert";
import Button from "../button";

interface props {
  forDrawer?: boolean;
}

const Navigation: React.FC<props & React.HTMLAttributes<HTMLUListElement>> = ({
  className,
  forDrawer,
  ...props
}) => {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const discordId = useAppSelector((state) => state.user.discordId);
  const dispatch = useAppDispatch();

  const openAlertToLogout = () => {
    dispatch(
      setModal(
        <Alert
          description="Вы выйдете из своего аккаунта."
          acceptContent="Выйти"
          onAccept={() => {
            dispatch(setDrawer(null));
            window.open("/api/auth/logout", "_self");
          }}
        />
      )
    );
  };

  if (forDrawer) {
    return (
      <ul {...props} className={className + " flex flex-col space-y-2 text-lg"}>
        <li>
          <Button
            onClick={() => dispatch(setDrawer(null))}
            className="w-full"
            variant="text"
            to="/about"
          >
            О нас
          </Button>
        </li>
	<li>
          <Button
            onClick={() => dispatch(setDrawer(null))}
            className="w-full"
            variant="text"
            skipAlert
	    href="https://vk.com/topic-197052814_46674651"
          >
            Отзывы
          </Button>
        </li>
        <li>
          <Button
            onClick={() => dispatch(setDrawer(null))}
            className="w-full"
            variant="text"
            to="/ex"
          >
            Исполнители
          </Button>
        </li>
        <li>
          <Button
            onClick={() => dispatch(setDrawer(null))}
            className="w-full"
            variant="text"
            to="/"
          >
            Товары
          </Button>
        </li>
        {isLoggedIn && (
          <li>
            <Button
              onClick={() => dispatch(setDrawer(null))}
              className="w-full"
              variant="text"
              to={"/u/" + discordId}
            >
              Ваш Профиль
            </Button>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <Button
              className="w-full"
              color="error"
              onClick={openAlertToLogout}
              skipAlert
              variant="outlined"
            >
              Выход
            </Button>
          </li>
        )}
        {!isLoggedIn && (
          <li>
            <Button
              onClick={() => dispatch(setDrawer(null))}
              className="w-full"
              color="accent"
              href="/api/auth/login"
              target={"_self"}
              skipAlert
              variant="outlined"
            >
              Войти
            </Button>
          </li>
        )}
      </ul>
    );
  }

  return (
    <ul {...props} className={className + " flex space-x-4 text-lg"}>
      <li>
        <Button variant="text" to="/about">
          О нас
        </Button>
      </li>
      <li>
        <Button variant="text" skipAlert href="https://vk.com/topic-197052814_46674651">
          Отзывы
        </Button>
      </li>
      <li>
        <Button variant="text" to="/ex">
          Исполнители
        </Button>
      </li>
      <li>
        <Button variant="text" to="/">
          Товары
        </Button>
      </li>
      {isLoggedIn && (
        <li>
          <Button variant="text" to={"/u/" + discordId}>
            Ваш Профиль
          </Button>
        </li>
      )}
      {isLoggedIn && (
        <li>
          <Button
            color="error"
            onClick={openAlertToLogout}
            skipAlert
            variant="outlined"
          >
            Выход
          </Button>
        </li>
      )}
      {!isLoggedIn && (
        <li>
          <Button
            color="accent"
            href="/api/auth/login"
            target={"_self"}
            skipAlert
            variant="outlined"
          >
            Войти
          </Button>
        </li>
      )}
    </ul>
  );
};

export default Navigation;
