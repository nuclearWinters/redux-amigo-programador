import React from "react";
import { Link, useLocation } from "@reach/router";

interface LinkOptionProps {
  title: string;
  link: string;
}

export const LinkOption: React.FC<LinkOptionProps> = ({ link, title }) => {
  const location = useLocation();
  return (
    <Link to={link} style={container(location.pathname, link)}>
      {title}
    </Link>
  );
};

const {
  container,
}: Record<
  "container",
  (path: string, location: string) => React.CSSProperties
> = {
  container: (path, location) => ({
    fontSize: 18,
    padding: "0px 16px",
    textAlign: "center",
    fontWeight: "normal",
    textDecoration: "none",
    color: location === path ? "rgba(44, 146, 219, 0.9)" : "gray",
  }),
};
