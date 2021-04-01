import React, { FC, useState } from "react";
import { RouteComponentProps } from "@reach/router";
import { HeaderBar } from "../../Components";
import YouTube from "react-youtube";

export const Home: FC<RouteComponentProps> = ({}) => {
  const opts = {
    height: "390",
    width: "640",
  };

  let [yid, setYid] = useState<any>(false);

  const _onStateChange = (event: any) => {
    setYid(event);
  };
  return (
    <div>
      <HeaderBar />
      <div>
        <div>Inicio</div>
        <div style={{ position: "relative", height: 390, width: 640 }}>
          <YouTube
            videoId="2g811Eo7K8U"
            opts={opts}
            onStateChange={_onStateChange}
          />
        </div>
      </div>
    </div>
  );
};
