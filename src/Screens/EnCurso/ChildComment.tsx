import React, { useState } from "react";
import { useTypedSelector } from "../../Redux";
import { OutsideAlerter } from "./WrapperFocus";
import { TextExpanded } from "./TextExpanded";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faThumbsUp, faEdit } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../Redux";
import { postAxios } from "../../utils";
import { ComentarioInput } from "./ComentarioInput";

interface IProps {
  _id: string;
  message: string;
  username: string;
  parent_comment_id: string;
  created: string;
  likes: number;
  user_id: string;
}

export const ChildComment: React.FC<IProps> = ({
  _id,
  message,
  username,
  parent_comment_id,
  created,
  likes,
  user_id,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useTypedSelector((state) => state.user);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [backgroundColorDots, setBackgroundColorDots] = useState<string>(
    "rgba(0,0,0,0.5)"
  );
  const [showDots, setShowDots] = useState<boolean>(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const liked = user.arrayLikedComments.includes(_id);

  const [showEdit, setShowEdit] = useState(false);
  return (
    <div style={{ marginTop: 8 }}>
      <div
        style={{ display: "flex", flexDirection: "row" }}
        onMouseEnter={() => {
          setShowDots(true);
        }}
        onMouseLeave={() => {
          setShowDots(false);
        }}
      >
        <div
          style={{
            height: 24,
            width: 24,
            borderRadius: "100%",
            backgroundColor: "rgba(0,0,0,0.3)",
            fontWeight: "bold",
            fontSize: 14,
            color: "white",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          {username.slice(0, 1)}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            margin: "2px 12px",
          }}
        >
          <div
            style={{
              display: "flex",
              position: "relative",
            }}
          >
            {user_id === user._id && (showDots || modalIsOpen) && (
              <OutsideAlerter
                toggle={closeModal}
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                }}
              >
                <div
                  style={{
                    padding: "4px 16px",
                    cursor: "pointer",
                  }}
                  onClick={modalIsOpen ? closeModal : openModal}
                  onMouseEnter={() => {
                    setBackgroundColorDots("rgba(0,0,0,0.6)");
                  }}
                  onMouseLeave={() => {
                    setBackgroundColorDots("rgba(0,0,0,0.4)");
                  }}
                >
                  {modalIsOpen && (
                    <div
                      style={{
                        position: "absolute",
                        top: "36px",
                        left: "-8px",
                        backgroundColor: "white",
                        zIndex: 10,
                        borderRadius: "2px",
                        boxShadow: "1px 1px 4px 0px rgba(0,0,0,0.2)",
                      }}
                    >
                      <div
                        onClick={async () => {
                          try {
                            dispatch({
                              type: "DELETE_CHILD_COMMENT",
                              payload: {
                                parent_comment_id,
                                child_comment_id: _id,
                              },
                            });
                            const {
                              data: { accessToken },
                            } = await postAxios<{
                              message: string;
                              accessToken: string;
                            }>("http://localhost:4000/deleteComment", {
                              parent_comment_id,
                              child_comment_id: _id,
                            });
                            localStorage.setItem("accessToken", accessToken);
                          } catch (e) {}
                        }}
                        style={{
                          padding: "6px 30px",
                          margin: "10px 0px",
                          fontSize: 14,
                          color: "rgba(0,0,0,0.9)",
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faTimes}
                          size="sm"
                          color={"rgba(0,0,0,0.4)"}
                          style={{
                            fontSize: 16,
                            cursor: "pointer",
                            paddingRight: 8,
                          }}
                        />
                        Borrar
                      </div>
                      <div
                        onClick={() => {
                          setShowEdit(true);
                        }}
                        style={{
                          padding: "6px 30px",
                          margin: "10px 0px",
                          fontSize: 14,
                          color: "rgba(0,0,0,0.9)",
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faEdit}
                          size="sm"
                          color={"rgba(0,0,0,0.4)"}
                          style={{
                            fontSize: 16,
                            cursor: "pointer",
                            paddingRight: 8,
                          }}
                        />
                        Editar
                      </div>
                    </div>
                  )}
                  <div
                    style={{
                      borderRadius: "100%",
                      backgroundColor: backgroundColorDots,
                      width: 6,
                      height: 6,
                      margin: "2px 0px",
                    }}
                  ></div>
                  <div
                    style={{
                      borderRadius: "100%",
                      backgroundColor: backgroundColorDots,
                      width: 6,
                      height: 6,
                      margin: "2px 0px",
                    }}
                  ></div>
                  <div
                    style={{
                      borderRadius: "100%",
                      backgroundColor: backgroundColorDots,
                      width: 6,
                      height: 6,
                      margin: "2px 0px",
                    }}
                  ></div>
                </div>
              </OutsideAlerter>
            )}
            <div
              style={{
                fontSize: 14,
                fontWeight: "bold",
                marginBottom: 7,
              }}
            >
              {username}
            </div>
            <div
              style={{
                fontSize: 14,
                paddingLeft: 6,
                color: "rgba(0,0,0,0.6)",
              }}
            >
              {moment(created).fromNow()}
            </div>
          </div>
          {showEdit ? (
            <ComentarioInput
              autofocus
              onCancel={() => {
                setShowEdit(false);
              }}
              iconSize={20}
              onComment={async (message) => {
                try {
                  setShowEdit(false);
                  dispatch({
                    type: "EDIT_CHILD_COMMENT",
                    payload: {
                      child_comment_id: _id,
                      parent_comment_id,
                      message,
                    },
                  });
                  const {
                    data: { accessToken },
                  } = await postAxios<{
                    message: string;
                    accessToken: string;
                  }>("http://localhost:4000/editComment", {
                    comment_id: _id,
                    message,
                  });
                  localStorage.setItem("accessToken", accessToken);
                } catch (e) {}
              }}
              showIcon={false}
              defaultText={message}
            />
          ) : (
            <TextExpanded text={message} />
          )}
          <div style={{ display: "flex" }}>
            <FontAwesomeIcon
              icon={faThumbsUp}
              size="sm"
              color={liked ? "#065fd4" : "rgba(0,0,0,0.4)"}
              style={{ fontSize: 16, cursor: "pointer", paddingRight: 8 }}
              onClick={async () => {
                if (liked === false) {
                  dispatch({
                    type: "LIKE_CHILD_COMMENT",
                    payload: {
                      parent_comment_id,
                      child_comment_id: _id,
                    },
                  });
                  dispatch({
                    type: "ADD_LIKE",
                    payload: _id,
                  });
                  await postAxios<{ message: string; accessToken: string }>(
                    "http://localhost:4000/likeComment",
                    {
                      comment_id: _id,
                      user_id: user._id,
                    }
                  );
                } else {
                  dispatch({
                    type: "UNLIKE_CHILD_COMMENT",
                    payload: {
                      parent_comment_id,
                      child_comment_id: _id,
                    },
                  });
                  dispatch({
                    type: "REMOVE_LIKE",
                    payload: _id,
                  });
                  await postAxios<{ message: string; accessToken: string }>(
                    "http://localhost:4000/unlikeComment",
                    {
                      comment_id: _id,
                      user_id: user._id,
                    }
                  );
                }
              }}
            />
            <div
              style={{
                fontSize: 14,
                color: "rgba(0,0,0,0.6)",
                alignSelf: "center",
              }}
            >
              {likes !== 0 ? likes : ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
