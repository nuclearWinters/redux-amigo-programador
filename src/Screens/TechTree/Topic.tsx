import React, { useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { useNavigate } from "@reach/router";
import { getRefreshToken } from "../../utils";
import quickstart from "../../imgs/Play6.svg";
import html from "../../imgs/Html6.svg";
import css from "../../imgs/Css6.svg";
import js from "../../imgs/Javascript6.svg";
import react from "../../imgs/React6.svg";
import node from "../../imgs/Node6.svg";
import express from "../../imgs/Express6.svg";
import mongodb from "../../imgs/Mongodb6.svg";
import { AppDispatch, useTypedSelector } from "../../Redux";
import { useDispatch } from "react-redux";

interface IProps {
  isLast: boolean;
  name: string;
  total: number;
  backgroundColor: string;
}

export const Topic: React.FC<IProps> = ({
  isLast,
  name,
  total,
  backgroundColor,
}) => {
  const navigate = useNavigate();
  const topicsAndModulesData = useTypedSelector(
    (state) => state.user.topicsAndModulesData
  );
  const current =
    topicsAndModulesData.find((item) => item.name === name)?.modulesCompleted
      .length || 0;
  const start = 283 - Math.round((current / total) * 283);
  const [props, set] = useSpring(() => ({
    x: start,
    config: { duration: 750 },
  }));
  const completed = total === current;
  const startLine = completed ? 0 : 54;
  const [propsLine, setLine] = useSpring(() => ({
    x: startLine,
    config: { duration: 750 },
  }));
  useEffect(() => {
    const end = 283 - Math.round((current / total) * 283);
    set({ x: end });
  }, [current, total]);
  useEffect(() => {
    if (completed) {
      setLine({ x: 0 });
    }
  }, [completed]);

  const dispatch = useDispatch<AppDispatch>();
  const changeTopic = (payload: string) => {
    dispatch({
      type: "CHANGE_TOPIC",
      payload,
    });
    dispatch({
      type: "CLEAN",
    });
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        backgroundColor: backgroundColor,
        alignItems: "center",
        justifyContent: "center",
        height: 150,
      }}
    >
      <div
        onClick={() => {
          changeTopic(name);
          navigate("/encurso");
        }}
        style={{
          position: "relative",
          marginLeft: 50,
          height: 100,
          display: "flex",
          cursor: "pointer",
        }}
      >
        <animated.svg
          fill="transparent"
          width="100"
          height="100"
          viewBox="0 0 100 100"
          strokeDashoffset={props.x}
          strokeWidth="10"
          stroke="#239b56"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="283"
          style={{ zIndex: 10 }}
        >
          <circle
            r="45"
            cx="50%"
            cy="50"
            fill="transparent"
            strokeDasharray="283"
            strokeDashoffset="0"
            stroke="white"
            strokeWidth="10"
          />
          <circle r="45" cx="50%" cy="50" fill="transparent" />
          <image
            href={(() => {
              switch (name) {
                case "Inicio rápido":
                  return quickstart;
                case "HTML":
                  return html;
                case "CSS":
                  return css;
                case "Javascript":
                  return js;
                case "React":
                  return react;
                case "Node":
                  return node;
                case "Express":
                  return express;
                case "MongoDB":
                  return mongodb;
                default:
                  return quickstart;
              }
            })()}
            height="50"
            width="50"
            x="50"
            y="50"
            transform="translate(-25,-25)"
          />
        </animated.svg>
        {!isLast && (
          <animated.svg
            height="54"
            width="10"
            style={{ position: "absolute", top: 98, left: 45 }}
            viewBox="0 0 10 54"
            stroke="#239b56"
            strokeWidth="10"
            strokeDasharray="54"
            strokeDashoffset={propsLine.x}
          >
            <line
              x1="50%"
              y1="0"
              x2="50%"
              y2="54"
              stroke="white"
              fill="transparent"
              strokeDasharray="54"
              strokeDashoffset="0"
              strokeWidth="10"
            />
            <line x1="50%" y1="0" x2="50%" y2="54" />
          </animated.svg>
        )}
      </div>
      <div
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginLeft: 20,
          width: 120,
        }}
      >
        {name}
      </div>
    </div>
  );
};
