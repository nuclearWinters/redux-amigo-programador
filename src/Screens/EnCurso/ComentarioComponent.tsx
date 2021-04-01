import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { ComentarioBody } from "./ComentarioBody";
import moment from "moment";
import { ComentariosDeComentarios } from "./ComentariosDeComentarios";
//import AddCommentOnComment from "./AddCommentOnComment";
import { IComments } from "../../Hooks";

interface IProps {
  _id: string;
  created: string;
  message: string;
  totalSubcomments: number;
  username: string;
  likes: number;
}

export const ComentarioComponent: React.FC<IProps> = ({
  _id,
  created,
  message,
  totalSubcomments,
  username,
  likes,
}) => {
  const idParentComment = _id;
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<IComments[]>([]);
  const [hasCommentsState, setHasCommentsState] = useState<number>(
    totalSubcomments
  );
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
        }}
      >
        <ComentarioBody
          id={_id}
          fontSize={20}
          iconSize={32}
          name={username}
          created={created}
          comment={message}
          likes={likes}
          liked={false}
          idParentComment={idParentComment}
          onDeleteComment={(id: string) => {
            const newComments = comments.filter((item) => item._id !== id);
            setComments(newComments);
            //onDeleteComment(id);
            setHasCommentsState(hasCommentsState - 1);
          }}
          commentInputFunction={() => {}}
        />
        <div style={{ marginLeft: 44 }}>
          {totalSubcomments !== 0 && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: 8,
              }}
            >
              <div
                onClick={() => {
                  setShowComments(!showComments);
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
                  {showComments ? "Ocultar" : "Mostrar"} {hasCommentsState}{" "}
                  comentarios
                </div>
              </div>
              <div style={{ flex: 1 }}></div>
            </div>
          )}
          {showComments && (
            <>
              {comments.map((item) => (
                <ComentariosDeComentarios
                  _id={item._id}
                  key={item._id}
                  likes={item.likes}
                  message={item.message}
                  username={item.username}
                  created={item.created}
                  parent_comment_id={item.parent_comment_id || ""}
                />
              ))}
              {true && (
                <div
                  onClick={() => {
                    console.log("cargar más");
                  }}
                >
                  Cargar Más...
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
