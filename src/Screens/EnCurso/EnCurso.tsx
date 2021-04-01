import React, { FC, useEffect, useRef, useState } from "react";
import { RouteComponentProps } from "@reach/router";
import YouTube from "react-youtube";
import Info from "./test.json";
import Switch from "react-switch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import quickstart from "../../imgs/Play6.svg";
import html from "../../imgs/Html6.svg";
import css from "../../imgs/Css6.svg";
import js from "../../imgs/Javascript6.svg";
import react from "../../imgs/React6.svg";
import node from "../../imgs/Node6.svg";
import express from "../../imgs/Express6.svg";
import mongodb from "../../imgs/Mongodb6.svg";
import { ComentarioInput } from "./ComentarioInput";
import {
  EnviarButton,
  TijerasIcono,
  LupaIcono,
  UploadIcono,
  HeaderBar,
  EntregarTareaButton,
  ModalTarea,
} from "../../Components";
import { useTypedSelector, AppDispatch } from "../../Redux";
import { useDispatch } from "react-redux";
import { highlight, languages } from "prismjs";
import "./prism.css";
import Editor from "react-simple-code-editor";
import { html_ejercicios } from "./Ejercicios";
import { IComments } from "../../Hooks";
import { BounceLoader } from "react-spinners";
import { ParentComment } from "./ParentComment";
import { postAxios } from "../../utils";
import moment from "moment";

export const EnCurso: FC<RouteComponentProps> = () => {
  const opts = {
    height: "507",
    width: "832",
  };
  const user = useTypedSelector((state) => state.user);
  const currentTopicData = user.topicsAndModulesData.find(
    (item) => item.name === user.currentTopic
  );
  const currentTopic = user.topicsAndModules.find(
    (item) => item.name === user.currentTopic
  );
  const [selected, setSelected] = useState<number>(
    currentTopicData?.currentModule || 0
  );
  const [code, setCode] = useState<string[]>(
    currentTopic?.modules[selected].files.map((item) => item.defaultCode) || [
      "<div>Modifica este texto</div>",
    ]
  );
  const [modeSchoolOn, setModeSchoolOn] = useState<boolean>(true);
  const [fileName, setFileName] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const [showTarea, setShowTarea] = useState(false);
  const [fileSelected, setFileSelected] = useState(0);

  const [loading, setLoading] = useState(false);
  const [skip, setSkip] = useState(0);

  const { hasMore, comments, error } = useTypedSelector(
    (state) => state.comments
  );

  const errorMessageRef = useRef(error);

  useEffect(() => {
    errorMessageRef.current = error;
  }, [error]);

  const hasMoreRef = useRef(hasMore);

  useEffect(() => {
    hasMoreRef.current = hasMore;
  }, [hasMore]);

  const [scrolledToEnd, setScrolledToEnd] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return () => window.removeEventListener("scroll", listenToScroll);
  }, []);

  const listenToScroll = () => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;

    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    const scrolled = winScroll / height;

    if (scrolled === 1) {
      if (errorMessageRef.current === "") {
        setScrolledToEnd(true);
      }
    } else {
      setScrolledToEnd(false);
    }
  };

  useEffect(() => {
    if (scrolledToEnd) {
      setLoading(false);
      const loadMore = async () => {
        try {
          const response = await postAxios<{
            hasMore: boolean;
            comments: IComments[];
            error: string;
          }>("http://localhost:4000/getComments", {
            module_id: currentTopic?.modules[selected]._id || "",
            skip,
            order: "popular",
          });
          dispatch({
            type: "ADD_PARENT_COMMENTS",
            payload: {
              comments: response.data.comments.map((item) => ({
                ...item,
                subComments: [],
                hasMore: true,
              })),
              hasMore: response.data.hasMore,
            },
          });
          setSkip((skip) => skip + 10);
          setLoading(false);
        } catch (e) {
          if (e.message === "Network Error") {
            dispatch({
              type: "SET_ERROR",
              payload: "Hay problemas con la conexión.",
            });
          } else {
            if (e.response?.data) {
              dispatch({
                type: "SET_ERROR",
                payload: e.response?.data,
              });
            } else {
              dispatch({
                type: "SET_ERROR",
                payload: "Error.",
              });
            }
          }
        }
      };
      if (hasMoreRef.current) {
        loadMore();
      }
    }
  }, [scrolledToEnd]);

  useEffect(() => {
    setFileSelected(0);
    setCode(
      currentTopic?.modules[selected].files.map((item) => item.defaultCode) || [
        "<div>Modifica este texto</div>",
      ]
    );
  }, [currentTopicData?.currentModule, selected, currentTopic]);

  const renderModules = () => {
    return (
      currentTopic &&
      currentTopic.modules.map((module, index) => {
        return (
          <div
            onClick={() => {
              setSelected(index);
              setSkip(0);
              dispatch({
                type: "CLEAN",
              });
              dispatch({
                type: "CHANGE_MODULE",
                payload: {
                  name: user.currentTopic,
                  currentModule: index,
                },
              });
            }}
            key={index}
            style={{
              display: "flex",
              flexDirection: "row",
              paddingBottom: 6,
              paddingTop: 6,
              backgroundColor: selected === index ? "rgba(0,0,0,0.06)" : "#fff",
            }}
          >
            <div
              style={{
                width: 28,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "dimgray",
              }}
            >
              {selected === index ? (
                <FontAwesomeIcon
                  icon={faCaretRight}
                  size="2x"
                  color="rgba(0,0,0,0.6)"
                />
              ) : (
                index + 1
              )}
            </div>
            <img
              src={module.thumbnail}
              height="60"
              width="80"
              alt="Girl in a jacket"
            />
            <div
              style={{
                paddingTop: 3,
                paddingLeft: 10,
                paddingRight: 10,
                flex: 1,
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              {module.title}
            </div>
          </div>
        );
      })
    );
  };
  return (
    <div>
      <HeaderBar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={container}>
          <div style={{ position: "relative", height: 507, width: 832 }}>
            <YouTube
              videoId="2g811Eo7K8U"
              opts={opts}
              //onStateChange={_onStateChange}
            />
          </div>
          <div style={playlistContainer}>
            <div style={headerPlayList}>
              <div style={title}>{user.currentTopic}</div>
              <img
                src={(() => {
                  switch (user.currentTopic) {
                    case "Inicio rápido":
                      return quickstart;
                    case "HTML":
                      return html;
                    case "CSS":
                      return css;
                    case "Javascript":
                      return js;
                    case "React":
                      return react;
                    case "Node":
                      return node;
                    case "Express":
                      return express;
                    case "MongoDB":
                      return mongodb;
                    default:
                      return quickstart;
                  }
                })()}
                alt=""
                height="18"
                width="18"
                style={{ marginLeft: 10 }}
              />
              <label style={modo}>
                <span style={{ paddingRight: 10 }}>Modo Escuela</span>
                <Switch
                  onChange={() => setModeSchoolOn(!modeSchoolOn)}
                  checked={modeSchoolOn}
                />
              </label>
            </div>
            {renderModules()}
          </div>
        </div>
        <div style={bottomVideoContainer}>
          <div style={comentariosContainer}>
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex" }}>
                <div style={{ flex: 1, display: "flex" }}>
                  {Info.items[selected].snippet.title}
                </div>
                <TijerasIcono />
                <LupaIcono />
              </div>
              <div style={descripcionVideo}>
                {Info.items[selected].snippet.description}
              </div>
              <div style={linea} />
              <div style={{ height: 40 }}></div>
              <ComentarioInput
                iconSize={40}
                autofocus={false}
                onComment={async (message) => {
                  const response = await postAxios<{
                    message: string;
                    accessToken: string;
                    comment: {
                      _id: string;
                      likes: number;
                      message: string;
                      user_id: string;
                      created: string;
                      totalSubcomments: number;
                      module_id: string;
                      username: string;
                    };
                  }>("http://localhost:4000/postComment", {
                    module_id: currentTopic?.modules[selected]._id || "",
                    message,
                    user_id: user._id,
                    username: user.username,
                  });
                  dispatch({
                    type: "POST_PARENT_COMMENT",
                    payload: {
                      ...response.data.comment,
                      hasMore: true,
                      subComments: [],
                    },
                  });
                }}
              />
              {loading && (
                <div
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                  }}
                >
                  <BounceLoader
                    size={36}
                    color={"forestgreen"}
                    loading={true}
                  />
                </div>
              )}
              <div style={{ paddingTop: 24 }}>
                {comments.map((item) => (
                  <ParentComment
                    key={item._id}
                    _id={item._id}
                    created={item.created}
                    message={item.message}
                    totalSubcomments={item.totalSubcomments}
                    username={item.username}
                    likes={item.likes}
                    module_id={currentTopic?.modules[selected]._id || ""}
                    user_id={item.user_id}
                    subComments={item.subComments}
                    hasMore={item.hasMore}
                  />
                ))}
                {error && <div style={{ textAlign: "center" }}>{error}</div>}
                {!hasMore && (
                  <div style={{ textAlign: "center" }}>
                    No hay más comentarios
                  </div>
                )}
                <div style={{ height: 100 }} />
              </div>
            </div>
          </div>
          <div style={tareaContainer}>
            <EntregarTareaButton
              onClick={() => {
                setShowTarea(true);
              }}
            />
            <div style={nombreArchivo(!!fileName)}>
              {fileName || `No realizado`}
            </div>
            {/*<div style={instruciones}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam
              consequatur ad saepe, earum velit atque magni inventore qui totam
              reiciendis doloribus aspernatur culpa ipsum architecto soluta fuga
              placeat. Necessitatibus, tempora!
            </div>
            <div {...getRootProps()} style={dropContainer(isDragActive)}>
              <input {...getInputProps()} />
              <UploadIcono active={isDragActive} />
              <div style={arrastraAqui(isDragActive)}>
                Arrastra archivos aquí
              </div>
              <div style={nombreArchivo(!!fileName)}>
                {fileName ? fileName : `ó`}
              </div>
              <div style={explora(isDragActive)}>Explora tus carpetas</div>
            </div>
            <EnviarButton disabled={!file} onClick={() => {}} />*/}
          </div>
        </div>
      </div>
      {showTarea && (
        <ModalTarea
          toggle={() => {
            setShowTarea(false);
          }}
        >
          <>
            <div style={{ flex: 1 }}>
              <div>Instruciones: </div>
              <div style={instruciones}>
                {currentTopic && currentTopic.modules[selected].instructions}
              </div>
            </div>
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                }}
              >
                {currentTopic &&
                  currentTopic.modules[selected].files.map((item, idx) => {
                    return (
                      <div
                        key={idx}
                        onClick={() => {
                          setFileSelected(idx);
                        }}
                        style={{
                          display: "flex",
                          borderTopLeftRadius: 6,
                          borderTopRightRadius: 6,
                          padding: "0px 6px",
                          margin: "0px 4px",
                          borderTopWidth: 1,
                          borderLeftWidth: 1,
                          borderRightWidth: 1,
                          borderBottomWidth: 0,
                          borderStyle: "solid",
                          borderColor: "black",
                          borderBottomColor: "white",
                          marginBottom: -1,
                          zIndex: 10,
                          backgroundColor:
                            idx === fileSelected ? "white" : "rgba(0,0,0,0.3)",
                          cursor: "pointer",
                        }}
                      >
                        {item.name}
                      </div>
                    );
                  })}
              </div>
              <Editor
                value={code[fileSelected]}
                onValueChange={(code) => {
                  setCode((codes) => {
                    codes[fileSelected] = code;
                    return [...codes];
                  });
                }}
                highlight={(code) =>
                  highlight(
                    code,
                    (() => {
                      switch (user.currentTopic) {
                        case "HTML":
                          return languages.html;
                        case "CSS":
                          return languages.css;
                        case "Javascript":
                          return languages.js;
                        default:
                          return languages.html;
                      }
                    })(),
                    (() => {
                      switch (user.currentTopic) {
                        case "HTML":
                          return "html";
                        case "CSS":
                          return "css";
                        case "Javascript":
                          return "js";
                        default:
                          return "html";
                      }
                    })()
                  )
                }
                style={{ flex: 1, border: "1px solid black" }}
              />
            </div>
            <div style={{ flex: 1, display: "flex" }}>
              <iframe
                style={{ flex: 1 }}
                title="iframe_amigo_programador"
                srcDoc={html_ejercicios(
                  currentTopic?.modules[selected]._id || "",
                  code
                )}
              ></iframe>
            </div>
          </>
          {/*<div
            style={{
              display: "flex",
              flex: 1,
              borderWidth: 1,
              flexDirection: "row",
            }}
          >
            <div style={instruciones}>
              {currentTopic && currentTopic.modules[selected].instructions}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              {currentTopic &&
                currentTopic.modules[selected].fileNames.map((item, idx) => {
                  return (
                    <div
                      key={idx}
                      onClick={() => {
                        setFileSelected(idx);
                      }}
                      style={{
                        display: "flex",
                        borderTopLeftRadius: 6,
                        borderTopRightRadius: 6,
                        padding: "0px 6px",
                        margin: "0px 4px",
                        borderTopWidth: 1,
                        borderLeftWidth: 1,
                        borderRightWidth: 1,
                        borderBottomWidth: 0,
                        borderStyle: "solid",
                        borderColor: "black",
                        borderBottomColor: "white",
                        marginBottom: -1,
                        zIndex: 10,
                        backgroundColor:
                          idx === fileSelected ? "white" : "rgba(0,0,0,0.3)",
                        cursor: "pointer",
                      }}
                    >
                      {item}
                    </div>
                  );
                })}
            </div>
            <Editor
              value={code[fileSelected]}
              onValueChange={(code) => {
                setCode((codes) => {
                  codes[fileSelected] = code;
                  return [...codes];
                });
              }}
              highlight={(code) => highlight(code, languages.html, "html")}
              style={{ height: 400, width: 400, border: "1px solid black" }}
            />
          </div>
          <iframe
            title="iframe_amigo_programador"
            srcDoc={html_ejercicios(
              currentTopic?.modules[selected]._id || "",
              code
            )}
          ></iframe>*/}
          {/*<div style={tareaContainer}>
            <div style={tarea}>Tarea: </div>
            <div style={instruciones}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam
              consequatur ad saepe, earum velit atque magni inventore qui totam
              reiciendis doloribus aspernatur culpa ipsum architecto soluta fuga
              placeat. Necessitatibus, tempora!
            </div>
            <div {...getRootProps()} style={dropContainer(isDragActive)}>
              <input {...getInputProps()} />
              <UploadIcono active={isDragActive} />
              <div style={arrastraAqui(isDragActive)}>
                Arrastra archivos aquí
              </div>
              <div style={nombreArchivo(!!fileName)}>
                {fileName ? fileName : `ó`}
              </div>
              <div style={explora(isDragActive)}>Explora tus carpetas</div>
            </div>
            <EnviarButton disabled={!file} onClick={() => {}} />
          </div>*/}
        </ModalTarea>
      )}
    </div>
  );
};

const {
  explora,
  nombreArchivo,
  arrastraAqui,
  dropContainer,
}: Record<
  "explora" | "nombreArchivo" | "arrastraAqui" | "dropContainer",
  (active: boolean) => React.CSSProperties
> = {
  explora: (active) => ({
    border: active ? "2px rgba(0,0,0,0.3) solid" : "2px rgb(0,180,255) solid",
    backgroundColor: "white",
    color: active ? "rgba(0,0,0,0.3)" : "rgb(0,180,255)",
    fontSize: 20,
    fontWeight: "bold",
    borderRadius: 4,
    padding: "8px 24px",
  }),
  nombreArchivo: (active) => ({
    color: active ? "rgba(0,0,0,0.8)" : "rgba(0,0,0,0.3)",
    fontSize: 16,
    fontWeight: "bold",
    padding: "8px 0px",
    textAlign: "center",
  }),
  arrastraAqui: (active) => ({
    color: active ? "rgb(0,180,255)" : "rgba(0,0,0,0.3)",
    fontSize: 20,
    fontWeight: "bold",
  }),
  dropContainer: (active) => ({
    height: 200,
    flex: 1,
    margin: "14px",
    border: active ? "3px rgb(0,180,255) dashed" : "3px rgba(0,0,0,0.4) dashed",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
  }),
};

const {
  tarea,
  instruciones,
  tareaContainer,
  totalComentarios,
  linea,
  descripcionVideo,
  comentariosContainer,
  bottomVideoContainer,
  modo,
  title,
  headerPlayList,
  playlistContainer,
  container,
}: Record<
  | "tarea"
  | "instruciones"
  | "tareaContainer"
  | "totalComentarios"
  | "linea"
  | "descripcionVideo"
  | "comentariosContainer"
  | "bottomVideoContainer"
  | "modo"
  | "title"
  | "headerPlayList"
  | "playlistContainer"
  | "container",
  React.CSSProperties
> = {
  tarea: {
    padding: "8px 12px",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  instruciones: {
    padding: "0px 12px",
    fontSize: 16,
    border: "1px solid black",
  },
  tareaContainer: {
    width: 410,
    marginLeft: 30,
    border: "1px rgba(0,0,0,0.15) solid",
    backgroundColor: "white",
  },
  totalComentarios: { paddingTop: 14, paddingBottom: 24 },
  linea: {
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.1)",
    height: 1,
    marginTop: 24,
    alignSelf: "center",
  },
  descripcionVideo: { display: "flex", fontSize: 16, marginTop: 16 },
  comentariosContainer: {
    width: 832,
    display: "flex",
  },
  bottomVideoContainer: {
    paddingTop: 14,
    fontSize: 20,
    fontWeight: 500,
    display: "flex",
    backgroundColor: "rgba(0,0,0,0.03)",
    justifyContent: "center",
  },
  modo: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingRight: 20,
    backgroundColor: "white",
  },
  title: {
    fontWeight: "bold",
    paddingRight: 4,
    paddingLeft: 12,
    alignSelf: "center",
    fontSize: 20,
    color: "rgba(0,0,0,0.8)",
  },
  headerPlayList: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    height: 40,
  },
  playlistContainer: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.15)",
    borderStyle: "solid",
    display: "flex",
    flexDirection: "column",
    width: 410,
    marginLeft: 30,
  },
  container: {
    flexDirection: "row",
    flex: 1,
    display: "flex",
    backgroundColor: "rgba(0,0,0,0.03)",
    justifyContent: "center",
    paddingTop: 30,
  },
};
