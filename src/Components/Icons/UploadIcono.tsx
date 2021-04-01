import React, { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";

interface IProps {
  active: boolean;
}

export const UploadIcono: FC<IProps> = ({ active }) => {
  return (
    <FontAwesomeIcon
      icon={faCloudUploadAlt}
      size="4x"
      color={active ? "rgb(0,180,255)" : "rgba(0,0,0,0.3)"}
    />
  );
};
