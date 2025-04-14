import Cookies from "js-cookie";

export const withRegion = (path: string) => {
    const region = Cookies.get("region") || "";
    return `/${region}${path.startsWith("/") ? path : `/${path}`}`;
  };
  