import React, { FC, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faCaretUp,
  faTimes,
  faThumbsUp,
  faEdit,
  faLongArrowAltRight,
} from "@fortawesome/free-solid-svg-icons";
import { useTypedSelector } from "../../Redux";
import { OutsideAlerter } from "./WrapperFocus";
import moment from "moment";
import { TextExpanded } from "./TextExpanded";
import { ComentarioInput } from "./ComentarioInput";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../Redux";
import { postAxios } from "../../utils";
import { ChildComment } from "./ChildComment";

interface IProps {
  _id: string;
  created: string;
  message: string;
  totalSubcomments: number;
  username: string;
  likes: number;
  module_id: string;
  user_id: string;
  hasMore: boolean;
  subComments: {
    _id: string;
    likes: number;
    message: string;
    user_id: string;
    created: string;
    username: string;
    parent_comment_id: string;
  }[];
}

export const ParentComment: FC<IProps> = ({
  _id,
  created,
  message,
  totalSubcomments,
  username,
  likes,
  module_id,
  user_id,
  subComments,
  hasMore,
}) => {
  const user = useTypedSelector((state) => state.user);

  const dispatch = useDispatch<AppDispatch>();

  const [showComments, setShowComments] = useState(false);
  const liked = user.arrayLikedComments.includes(_id);
  const [showCommentInput, setShowCommentInput] = useState<boolean>(false);
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

  const [showEdit, setShowEdit] = useState(false);
  const [skip, setSkip] = useState(0);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        marginBottom: 18,
      }}
    >
      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
        }}
      >
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
              height: 32,
              width: 32,
              borderRadius: "100%",
              backgroundColor: "rgba(0,0,0,0.3)",
              fontWeight: "bold",
              fontSize: 20,
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
                                type: "DELETE_PARENT_COMMENT",
                                payload: _id,
                              });
                              const {
                                data: { accessToken },
                              } = await postAxios<{
                                message: string;
                                accessToken: string;
                              }>("http://localhost:4000/deleteComment", {
                                parent_comment_id: _id,
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
                      type: "EDIT_PARENT_COMMENT",
                      payload: {
                        comment_id: _id,
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
            <div style={{ display: "flex", marginBottom: 10 }}>
              <FontAwesomeIcon
                icon={faThumbsUp}
                size="sm"
                color={liked ? "#065fd4" : "rgba(0,0,0,0.4)"}
                style={{ fontSize: 16, cursor: "pointer", paddingRight: 8 }}
                onClick={async () => {
                  if (liked === false) {
                    dispatch({
                      type: "LIKE_PARENT_COMMENT",
                      payload: _id,
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
                      type: "UNLIKE_PARENT_COMMENT",
                      payload: _id,
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
              <div
                onClick={() => {
                  setShowCommentInput(true);
                }}
                style={{
                  fontSize: 14,
                  color: "rgba(0,0,0,0.6)",
                  marginLeft: 16,
                  alignSelf: "center",
                  cursor: "pointer",
                }}
              >
                RESPONDER
              </div>
            </div>
            {showCommentInput && (
              <div style={{ marginTop: 8 }}>
                <ComentarioInput
                  iconSize={24}
                  autofocus={true}
                  onCancel={() => {
                    setShowCommentInput(false);
                  }}
                  onComment={async (message) => {
                    try {
                      setShowCommentInput(false);
                      const response = await postAxios<{
                        message: string;
                        accessToken: string;
                        comment: {
                          _id: string;
                          likes: number;
                          message: string;
                          user_id: string;
                          created: string;
                          username: string;
                          parent_comment_id: string;
                        };
                      }>("http://localhost:4000/postComment", {
                        message,
                        user_id: user._id,
                        username: user.username,
                        parent_comment_id: _id,
                      });
                      localStorage.setItem(
                        "accessToken",
                        response.data.accessToken
                      );
                      dispatch({
                        type: "POST_CHILD_COMMENT",
                        payload: {
                          parent_comment_id: _id,
                          child_comment: response.data.comment,
                        },
                      });
                    } catch (e) {}
                  }}
                />
              </div>
            )}
          </div>
        </div>
        <div style={{ marginLeft: 44 }}>
          {totalSubcomments !== 0 && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 14,
              }}
            >
              <div
                onClick={async () => {
                  setShowComments(!showComments);
                  if (skip === 0) {
                    const response = await postAxios<{
                      message: boolean;
                      hasMore: boolean;
                      comments: {
                        _id: string;
                        likes: number;
                        message: string;
                        user_id: string;
                        created: string;
                        parent_comment_id: string;
                        username: string;
                      }[];
                    }>("http://localhost:4000/getComments", {
                      parent_comment_id: _id,
                      skip,
                      order: "first",
                    });
                    dispatch({
                      type: "ADD_CHILD_COMMENTS",
                      payload: {
                        parent_comment_id: _id,
                        child_comments: response.data.comments,
                        hasMore: response.data.hasMore,
                      },
                    });
                    setSkip((skip) => skip + 10);
                  }
                }}
                style={{
                  display: "flex",
                  cursor: "pointer",
                  alignItems: "center",
                }}
              >
                {showComments ? (
                  <FontAwesomeIcon
                    icon={faCaretUp}
                    size="sm"
                    color="#065fd4"
                    style={{ fontSize: 12, marginRight: 16 }}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faCaretDown}
                    size="sm"
                    color="#065fd4"
                    style={{ fontSize: 12, marginRight: 16 }}
                  />
                )}
                <div style={{ fontSize: 14, color: "#065fd4" }}>
                  {showComments ? "Ocultar" : "Mostrar"} {totalSubcomments}{" "}
                  comentarios
                </div>
              </div>
              <div style={{ flex: 1 }}></div>
            </div>
          )}
          {showComments && (
            <div>
              {subComments.map((item) => (
                <ChildComment
                  key={item._id}
                  _id={item._id}
                  likes={item.likes}
                  message={item.message}
                  username={item.username}
                  created={item.created}
                  parent_comment_id={item.parent_comment_id || ""}
                  user_id={item.user_id}
                />
              ))}
              {hasMore && (
                <div
                  onClick={async () => {
                    const response = await postAxios<{
                      message: boolean;
                      hasMore: boolean;
                      comments: {
                        _id: string;
                        likes: number;
                        message: string;
                        user_id: string;
                        created: string;
                        parent_comment_id: string;
                        username: string;
                      }[];
                    }>("http://localhost:4000/getComments", {
                      parent_comment_id: _id,
                      skip,
                      order: "first",
                    });
                    dispatch({
                      type: "ADD_CHILD_COMMENTS",
                      payload: {
                        hasMore: response.data.hasMore,
                        child_comments: response.data.comments,
                        parent_comment_id: _id,
                      },
                    });
                    setSkip((skip) => skip + 10);
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: 12,
                    cursor: "pointer",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faLongArrowAltRight}
                    color="#065fd4"
                    style={{ fontSize: 16, marginRight: 18 }}
                  />
                  <div
                    style={{
                      fontSize: 16,
                      color: "#065fd4",
                    }}
                  >
                    Cargar más
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
