declare module "lenis/dist/lenis-react.mjs" {
  import { ReactNode, ComponentProps } from "react";

  interface LenisOptions {
    duration?: number;
    easing?: (t: number) => number;
    orientation?: string;
    gestureOrientation?: string;
    smoothWheel?: boolean;
    smoothTouch?: boolean;
    touchMultiplier?: number;
    [key: string]: any;
  }

  interface ReactLenisProps extends ComponentProps<"div"> {
    root?: boolean;
    options?: LenisOptions;
    children?: ReactNode;
  }

  export const ReactLenis: React.FC<ReactLenisProps>;
}
