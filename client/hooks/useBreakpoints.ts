import { useEffect, useState } from "react";
import useMediaQuery from "./useMediaQuery";

export interface BreakpointMediaQuery {
  higherSM: boolean;
  higherMD: boolean;
  higherLG: boolean;
  higherXL: boolean;
  higher2XL: boolean;
}

function useBreakpoints(): BreakpointMediaQuery {
  const gt2xl = useMediaQuery("(min-width: 1536px)");
  const gtxl = useMediaQuery("(min-width: 1280px)");
  const gtlg = useMediaQuery("(min-width: 1024px)");
  const gtmd = useMediaQuery("(min-width: 768px)");
  const gtsm = useMediaQuery("(min-width: 640px)");

  const [breakpoints, setBreakpoints] = useState<BreakpointMediaQuery>({
    higherSM: false,
    higherMD: false,
    higherLG: false,
    higherXL: false,
    higher2XL: false,
  });

  useEffect(() => {
    setBreakpoints({
      higherSM: gtsm,
      higherMD: gtmd,
      higherLG: gtlg,
      higherXL: gtxl,
      higher2XL: gt2xl,
    });
  }, [gtsm, gtxl, gtlg, gtmd, gt2xl, setBreakpoints]);

  return breakpoints;
}

export default useBreakpoints;
