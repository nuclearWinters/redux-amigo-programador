import React, { useRef, useEffect, FunctionComponent } from "react";
import CSS from "csstype";

/**
 * Hook that alerts clicks outside of the passed ref
 */

type Props = {
  style: CSS.Properties;
  toggle: Function;
};

function useOutsideAlerter(
  ref: React.RefObject<HTMLDivElement>,
  toggle: Function
) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        toggle();
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, toggle]);
}

/**
 * Component that alerts if you click outside of it
 */
export const OutsideAlerter: FunctionComponent<Props> = ({
  style,
  children,
  toggle,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  useOutsideAlerter(wrapperRef, toggle);

  return (
    <div ref={wrapperRef} style={{ ...style }}>
      {children}
    </div>
  );
};
