import React, { CSSProperties, FC, useEffect, useRef } from "react";

interface IProps {
  toggle: () => void;
}

export const Modal: FC<IProps> = ({ children, toggle }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const useOutsideAlerter = (
    ref: React.RefObject<HTMLDivElement>,
    toggle: () => void
  ) => {
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          toggle();
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref, toggle]);
  };

  useOutsideAlerter(wrapperRef, toggle);

  return (
    <div style={backgroundShadow}>
      <div ref={wrapperRef} style={container}>
        {children}
      </div>
    </div>
  );
};

const { container, backgroundShadow }: { [argName: string]: CSSProperties } = {
  container: {
    width: 300,
    display: "flex",
    backgroundColor: "white",
    borderRadius: 30,
    alignItems: "center",
    flexDirection: "column",
  },
  backgroundShadow: {
    display: "flex",
    position: "fixed",
    zIndex: 1,
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    overflow: "auto",
    backgroundColor: "rgba(0,0,0,0.4)",
    alignItems: "center",
    justifyContent: "center",
  },
};
