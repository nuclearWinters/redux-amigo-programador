import React, { useState } from "react";
import ReactTextMoreLess from "react-text-more-less";

type TextExpandedProps = {
  text: string;
};

export const TextExpanded = ({ text }: TextExpandedProps) => {
  const [collapsed, setCollapsed] = useState<boolean>(true);
  return (
    <div
      style={{
        fontSize: 15,
        position: "relative",
        marginBottom: 10,
        marginRight: 40,
        whiteSpace: "pre-wrap",
      }}
    >
      <ReactTextMoreLess
        collapsed={collapsed}
        text={`${text}`}
        lessHeight={72}
        showMoreText="..."
        showMoreElement={
          <>
            <div style={{ paddingBottom: 24 }}>...</div>
            <span
              onClick={() => {
                setCollapsed(!collapsed);
              }}
              style={{
                cursor: "pointer",
                color: "rgba(0,0,0,0.5)",
                fontSize: 14,
                fontWeight: "bold",
                position: "absolute",
                height: 20,
                display: "flex",
                alignItems: "center",
                bottom: 0,
                left: 0,
              }}
            >
              Mostrar más
            </span>
          </>
        }
        showLessElement={
          <>
            <div style={{ marginBottom: 24 }}></div>
            <span
              onClick={() => {
                setCollapsed(!collapsed);
              }}
              style={{
                cursor: "pointer",
                color: "rgba(0,0,0,0.5)",
                fontSize: 14,
                fontWeight: "bold",
                position: "absolute",
                height: 20,
                display: "flex",
                alignItems: "center",
                bottom: 0,
                left: 0,
              }}
            >
              Mostrar menos
            </span>
          </>
        }
      />
    </div>
  );
};
