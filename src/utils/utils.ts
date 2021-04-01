import axios from "axios";

export const getRefreshToken = (): string => {
  const refreshToken = localStorage.getItem("refreshToken");
  return refreshToken || "";
};

export const postAxios = <T>(
  url: string,
  data: { [argName: string]: any } = {}
) =>
  axios.post<T>(
    url,
    { ...data, refreshToken: localStorage.getItem("refreshToken") || "" },
    {
      headers: {
        Authorization: localStorage.getItem("accessToken") || "",
      },
    }
  );
