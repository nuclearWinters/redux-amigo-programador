import React, { FC, useEffect } from "react";
import { RouteComponentProps } from "@reach/router";
import { useSpring, animated } from "react-spring";
import { Topic } from "./Topic";
import { HeaderBar } from "../../Components";
import { useTypedSelector } from "../../Redux";

export const TechTree: FC<RouteComponentProps> = () => {
  const user = useTypedSelector((state) => state.user);
  const modules = user.topicsAndModules;
  const modulesData = user.topicsAndModulesData;
  const frontend = modules.filter((item) => item.type === "frontend");
  const backend = modules.filter((item) => item.type === "backend");
  const react = frontend.find((item) => item.name === "React");
  const reactData = modulesData.find((item) => item.name === "React");
  const completado =
    (reactData?.modulesCompleted.length || 0) === (react?.modules.length || 1);
  const startLine = completado ? 0 : 64;
  const [propsLine, setLine] = useSpring(() => ({
    x: startLine,
    config: { duration: 750 },
  }));
  useEffect(() => {
    if (completado) {
      setLine({ x: 0 });
    }
  }, [setLine, completado]);
  return (
    <div>
      <HeaderBar />
      <div style={{ height: 8 }}></div>
      <div>
        {frontend.map(({ name, modules }, index) => {
          return (
            <Topic
              key={index}
              name={name}
              isLast={index === frontend.length - 1}
              backgroundColor={"rgb(150,225,255)"}
              total={modules.length}
            />
          );
        })}
        <div
          style={{
            backgroundColor: "white",
            height: 10,
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 50,
              right: 140,
              top: 0,
              bottom: 0,
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <animated.svg
              height="64"
              width="10"
              viewBox="0 0 10 64"
              stroke="#239b56"
              strokeWidth="10"
              strokeDasharray="64"
              strokeDashoffset={propsLine.x}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line
                x1="50%"
                y1="0"
                x2="50%"
                y2="64"
                stroke="white"
                fill="transparent"
                strokeDasharray="64"
                strokeDashoffset="0"
                strokeWidth="10"
              />
              <line x1="50%" y1="0" x2="50%" y2="64" />
            </animated.svg>
          </div>
        </div>
        {backend.map(({ name, modules }, index) => {
          return (
            <Topic
              key={index}
              name={name}
              isLast={index === backend.length - 1}
              backgroundColor={"rgb(255, 182, 150)"}
              total={modules.length}
            />
          );
        })}
      </div>
    </div>
  );
};
