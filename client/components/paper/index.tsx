import { useRouter } from "next/router";
import React from "react";
import { Url } from "url";
import { useAppDispatch } from "../../hooks/redux";
import { setModal } from "../../lib/redux/ui/reducer";
import Alert from "../alert";

export interface PaperProps {
  elevation?: 1 | 2 | 3;
  withoutPadding?: boolean;
  href?: string;
  to?: string | Url;
  skipAlert?: boolean;
  target?: React.HTMLAttributeAnchorTarget;
  disableBG?: boolean;
  disableRound?: boolean;
}

const Paper: React.FC<PaperProps & React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  elevation,
  withoutPadding,
  href,
  to,
  onClick,
  skipAlert,
  target,
  disableBG,
  disableRound,
  ...props
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const getElevationClassName = () => {
    switch (elevation) {
      case 1:
        return (
          (disableBG ? "" : "bg-neutral-100 ") + (withoutPadding ? "" : "p-4")
        );
      case 2:
        return (
          (disableBG ? "" : "bg-neutral-200 ") + (withoutPadding ? "" : "p-4")
        );
      case 3:
        return (
          (disableBG ? "" : "bg-neutral-300 ") + (withoutPadding ? "" : "p-4")
        );
    }
  };

  const getComputedClassName = () => {
    const defaultClassName =
      "shadow-md overflow-hidden max-h-max hover:shadow-lg transition";
    return [
      defaultClassName,
      disableRound ? "" : "rounded-2xl",
      getElevationClassName(),
      href || to ? "cursor-pointer" : "",
      className,
    ].join(" ");
  };

  const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (onClick) onClick(e);
    if (to) return router.push(to);
    if (href) {
      if (skipAlert) return window.open(href, target);
      dispatch(
        setModal(
          <Alert
            description={
              <>
                Вы перейдете на <span className="text-orange-500">{href}</span>.
              </>
            }
            onAccept={() => window.open(href, target)}
            onDecline={() => {}}
          />
        )
      );
    }
  };

  return (
    <div
      {...props}
      className={getComputedClassName()}
      onClick={handleClick}
    ></div>
  );
};

Paper.defaultProps = {
  elevation: 1,
  target: "_blank",
};

export default Paper;
