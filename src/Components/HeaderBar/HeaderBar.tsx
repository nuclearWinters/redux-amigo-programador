import React, { useState, useCallback } from "react";
import {
  Logo,
  LinkOption,
  IngresarButton,
  RegistrarButton,
  FormInput,
  IniciarButton,
  RegistrarseButton,
  Modal,
} from "../../Components";
import { useTypedSelector, AppDispatch } from "../../Redux";
import { postAxios } from "../../utils";
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";

export const HeaderBar: React.FC = () => {
  const user = useTypedSelector((state) => state.user);
  const [showIngresar, setShowIngresar] = useState(false);
  const [showRegistrarse, setShowRegistrarse] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dismissModal = () => {
    setShowIngresar(false);
    setShowRegistrarse(false);
    setEmail("");
    setPassword("");
    setUsername("");
  };
  const dispatch = useDispatch<AppDispatch>();
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.name) {
      case "Email":
        return setEmail(event.target.value);

      case "Username":
        return setUsername(event.target.value);
      default:
        return setPassword(event.target.value);
    }
  };
  const submitRegistrar = async () => {
    const response = await postAxios<TokensResponse>(
      "http://localhost:4000/signUp",
      {
        email,
        password,
        username,
      }
    );
    localStorage.setItem("refreshToken", response.data.refreshToken);
    localStorage.setItem("accessToken", response.data.accessToken);
    const _id = jwt_decode<{ _id: string }>(response.data.refreshToken)._id;
    dispatch({
      type: "SET_ID",
      payload: _id,
    });
  };
  const submitIngresar = async () => {
    const response = await postAxios<TokensResponse>(
      "http://localhost:4000/signIn",
      {
        email,
        password,
      }
    );
    localStorage.setItem("refreshToken", response.data.refreshToken);
    localStorage.setItem("accessToken", response.data.accessToken);
    const _id = jwt_decode<{ _id: string }>(response.data.refreshToken)._id;
    dispatch({
      type: "SET_ID",
      payload: _id,
    });
  };
  const onClickIngresar = useCallback(() => {
    setShowIngresar(true);
  }, []);
  const onClickRegistrarse = useCallback(() => {
    setShowRegistrarse(true);
  }, []);
  return (
    <div style={container}>
      <Logo />
      <LinkOption title="Inicio" link="/" />
      <LinkOption title="Árbol Tech" link="/techtree" />
      <LinkOption title="En curso" link="/encurso" />
      <Logo />
      <div>
        {!user.username ? (
          <div style={{ flexDirection: "row", display: "flex" }}>
            <IngresarButton onClick={onClickIngresar} />
            <RegistrarButton onClick={onClickRegistrarse} />
          </div>
        ) : (
          <>
            <div>{user.username}</div>
            <div
              onClick={() => {
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("accessToken");
                dispatch({
                  type: "SET_ID",
                  payload: "",
                });
              }}
            >
              Cerrar sesión
            </div>
          </>
        )}
      </div>
      {showIngresar && (
        <Modal toggle={dismissModal}>
          <div
            style={{
              fontSize: 24,
              color: "#1bbc9b",
              fontWeight: "bold",
              letterSpacing: 1,
              marginTop: 24,
            }}
          >
            INGRESAR
          </div>
          <FormInput placeholder="Email" onChange={handleInput} value={email} />
          <FormInput
            placeholder="Password"
            onChange={handleInput}
            value={password}
          />
          <IniciarButton onClick={submitIngresar} />
        </Modal>
      )}
      {showRegistrarse && (
        <Modal toggle={dismissModal}>
          <div
            style={{
              fontSize: 24,
              color: "#2c92db",
              fontWeight: "bold",
              letterSpacing: 1,
              marginTop: 24,
            }}
          >
            REGISTRARSE
          </div>
          <FormInput
            placeholder="Username"
            onChange={handleInput}
            value={username}
          />
          <FormInput placeholder="Email" onChange={handleInput} value={email} />
          <FormInput
            placeholder="Password"
            onChange={handleInput}
            value={password}
          />
          <RegistrarseButton onClick={submitRegistrar} />
        </Modal>
      )}
    </div>
  );
};

const { container }: Record<"container", React.CSSProperties> = {
  container: {
    height: 50,
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderBottom: "1px rgba(0, 0, 0, 0.1) solid",
  },
};

interface TokensResponse {
  accessToken: string;
  refreshToken: string;
}
