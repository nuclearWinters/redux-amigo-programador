import React, { useState } from "react";
import moment from "moment";
import { TextExpanded } from "./TextExpanded";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faTimes } from "@fortawesome/free-solid-svg-icons";
import { ComentarioInput } from "./ComentarioInput";
import { OutsideAlerter } from "./WrapperFocus";

type Props = {
  id: string;
  name: string;
  created: string;
  comment: string;
  iconSize: number;
  fontSize: number;
  likes: number;
  liked: boolean;
  commentInputFunction: (
    message: string,
    username: string,
    _id: string,
    parent_comment_id: string
  ) => void;
  onDeleteComment: Function;
  idParentComment: string;
};

export const ComentarioBody = ({
  name,
  created,
  comment,
  iconSize,
  fontSize,
  likes,
  liked,
  id,
  commentInputFunction,
  onDeleteComment,
  idParentComment,
}: Props) => {
  const [likesState, setLikesState] = useState<number>(likes);
  const [likedState, setLikedState] = useState<boolean>(liked);
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
  return (
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
          height: iconSize,
          width: iconSize,
          borderRadius: "100%",
          backgroundColor: "rgba(0,0,0,0.3)",
          fontWeight: "bold",
          fontSize: fontSize,
          color: "white",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
        }}
      >
        {name.slice(0, 1)}
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
          {name === "Armando Rueda" && (showDots || modalIsOpen) && (
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
                      onClick={() => {
                        fetch("http://localhost:4000/graphql", {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                          },
                          body: JSON.stringify({
                            query: `mutation {
                            removeComment(id: "${id}") {
                              id
                            }
                          }`,
                            variables: null,
                          }),
                        })
                          .then((r) => r.json())
                          .then((data) => {
                            console.log("data returned:", data);
                            onDeleteComment(data.data.removeComment.id);
                          })
                          .catch((err) => {
                            console.log(err);
                          });
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
            {name}
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
        <TextExpanded text={comment} />
        <div style={{ display: "flex" }}>
          <FontAwesomeIcon
            icon={faThumbsUp}
            size="sm"
            color={likedState ? "#065fd4" : "rgba(0,0,0,0.4)"}
            style={{ fontSize: 16, cursor: "pointer", paddingRight: 8 }}
            onClick={() => {
              if (likedState === false) {
                setLikedState(true);
                setLikesState(likesState + 1);
                fetch("http://localhost:4000/graphql", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                  },
                  body: JSON.stringify({
                    query: `mutation {
                      addLike(idComment: "${id}", name: "Armando Rueda", created: "${moment().toISOString()}") {
                        id
                        idComment
                        name
                        created
                      }
                    }`,
                    variables: null,
                  }),
                })
                  .then((r) => r.json())
                  .then((data) => {
                    console.log("data returned:", data);
                  });
              } else {
                setLikedState(false);
                setLikesState(likesState - 1);
                fetch("http://localhost:4000/graphql", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                  },
                  body: JSON.stringify({
                    query: `mutation {
                      removeLike(idComment: "${id}", name: "Armando Rueda") {
                        id
                        idComment
                        name
                        created
                      }
                    }`,
                    variables: null,
                  }),
                })
                  .then((r) => r.json())
                  .then((data) => {
                    console.log("data returned:", data);
                  });
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
            {likesState !== 0 ? likesState : ""}
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
              onComment={(comment: string) => {
                setShowCommentInput(false);
                commentInputFunction(comment, name, id, idParentComment);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
