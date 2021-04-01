import React, { useState } from "react";
import { useSpring, animated } from "react-spring";

type ComentarioInputProps = {
  autofocus: boolean;
  onCancel?: () => void;
  onComment: (message: string) => void;
  iconSize: number;
  showIcon?: boolean;
  defaultText?: string;
};

export const ComentarioInput = ({
  autofocus,
  onCancel,
  onComment,
  iconSize,
  showIcon,
  defaultText,
}: ComentarioInputProps) => {
  const [props, setProps] = useSpring(() => ({
    left: "50%",
    right: "50%",
    opacity: 0,
  }));
  const [comment, setComment] = useState<string>(defaultText || "");
  const [showButtonsComment, setShowButtonsComment] = useState<boolean>(false);
  const [rows, setRows] = useState<number>(1);
  const [minRows] = useState<number>(1);
  const [maxRows] = useState<number>(100);
  return (
    <div style={{ display: "flex" }}>
      {showIcon !== false && (
        <div
          style={{
            border: "2px black solid",
            borderRadius: "100%",
            height: iconSize,
            width: iconSize,
          }}
        ></div>
      )}
      <div
        style={{
          flex: 1,
          margin: showIcon === false ? "0px" : "0px 16px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            position: "relative",
            alignItems: "center",
          }}
        >
          <textarea
            rows={rows}
            autoFocus={autofocus}
            onFocus={() => {
              setProps({ left: "0%", right: "0%", opacity: 1 });
              setShowButtonsComment(true);
            }}
            onBlur={() => {
              setProps({ left: "50%", right: "50%", opacity: 0 });
            }}
            onChange={(event) => {
              const textareaLineHeight = 20;

              const previousRows = event.target.rows;
              event.target.rows = minRows; // reset number of rows in textarea

              const currentRows = ~~(
                event.target.scrollHeight / textareaLineHeight
              );

              if (currentRows === previousRows) {
                event.target.rows = currentRows;
              }

              if (currentRows >= maxRows) {
                event.target.rows = maxRows;
                event.target.scrollTop = event.target.scrollHeight;
              }
              setComment(event.target.value);
              setRows(currentRows < maxRows ? currentRows : maxRows);
            }}
            value={comment}
            placeholder="Escribe un comentario..."
            style={{
              padding: "0px 0px 6px 0px",
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.0)",
              boxSizing: "border-box",
              border: "none",
              borderBottom: "2px rgba(0,0,0,0.05) solid",
              borderRadius: 3,
              resize: "none",
              fontSize: "16px",
              lineHeight: "20px",
              overflow: "auto",
              height: "auto",
              outline: "none",
            }}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                if (event.shiftKey) {
                } else {
                  onComment(comment);
                  setShowButtonsComment(false);
                  setComment("");
                  setRows(1);
                }
              }
            }}
          ></textarea>
          <animated.div
            style={{
              position: "absolute",
              bottom: 0,
              backgroundColor: "#5ab0db",
              height: 2,
              ...props,
            }}
          ></animated.div>
        </div>
        {showButtonsComment && (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "flex-end",
              marginTop: 8,
            }}
          >
            <button
              onClick={() => {
                setShowButtonsComment(false);
                setComment("");
                onCancel && onCancel();
                setRows(1);
              }}
              style={{
                borderRadius: 2,
                border: "none",
                height: 40,
                backgroundColor: "rgba(0,0,0,0)",
                fontSize: 20,
                margin: "0px 16px",
                cursor: "pointer",
              }}
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                onComment(comment);
                setShowButtonsComment(false);
                setComment("");
                setRows(1);
              }}
              style={{
                borderRadius: 2,
                border: "none",
                height: 40,
                fontSize: 20,
                padding: "0px 12px",
                color: "white",
                backgroundColor: comment !== "" ? "#167ac6" : "rgba(0,0,0,0.2)",
                cursor: comment !== "" ? "pointer" : "default",
              }}
            >
              Comentar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
