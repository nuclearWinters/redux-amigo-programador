import { useState, useEffect, useRef } from "react";
import { postAxios } from "./utils";
import { AppDispatch, useTypedSelector } from "./Redux";
import { useDispatch } from "react-redux";
import moment from "moment";

export const useUserQuery = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const _id = useTypedSelector((state) => state.user._id);
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const response = await postAxios<RootObject>(
        "http://localhost:4000/getUser"
      );
      localStorage.setItem("accessToken", response.data.accessToken);
      dispatch({
        type: "SET_USER",
        payload: response.data,
      });
      setLoading(false);
    };
    fetchUser();
  }, [_id, dispatch]);
  return { loading } as const;
};

export interface Module {
  title: string;
  _id: string;
  description: string;
  thumbnail: string;
  files: { name: string; defaultCode: string }[];
  instructions: string;
}

export interface TopicAndModule {
  _id: string;
  step: number;
  name: string;
  url: string;
  type: string;
  modules: Module[];
}

export interface TopicsAndModulesData {
  _id: string;
  name: string;
  currentModule: number;
  modulesCompleted: {
    id: string;
    tareaURL: { fileName: string; url: string }[];
  }[];
}

export interface RootObject {
  _id: string;
  username: string;
  email: string;
  currentTopic: string;
  arrayLikedComments: string[];
  topicsAndModules: TopicAndModule[];
  topicsAndModulesData: TopicsAndModulesData[];
  accessToken: string;
}

export const useGetParentComments = (module_id: string) => {
  const [sortBy, setSortBy] = useState<"popular" | "last">("popular");
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState<IComments[]>([]);
  const [skip, setSkip] = useState(0);
  const [moduleId, setModuleId] = useState(module_id);
  const [error, setError] = useState("");
  const [count, setCount] = useState(-1);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = async () => {
    try {
      setLoading(true);
      const response = await postAxios<CommentsResponse>(
        "http://localhost:4000/getComments",
        { module_id: moduleId, skip, order: sortBy }
      );
      const prevCommentsIds = comments.map((item) => item._id);
      const newComments = response.data.comments.filter(
        (item) => !prevCommentsIds.includes(item._id)
      );
      setLoading(false);
      setComments(newComments);
      setSkip((skip) => skip + 20);
    } catch (e) {
      setLoading(false);
      if (e.response?.data === "No hay más comentarios.") {
        if (skip === 0) {
          setError("No hay comentarios");
          setCount(0);
          setHasMore(false);
        } else {
          setError("No hay más comentarios");
          setHasMore(false);
        }
      }
    }
  };

  const firstTick = useRef(true);

  useEffect(() => {
    if (!firstTick.current) {
      loadMore();
    } else {
      firstTick.current = false;
    }
  }, [sortBy]);

  const refetch = (mode: "popular" | "last") => {
    setComments([]);
    setSkip(0);
    setError("");
    setSortBy(mode);
    setCount(-1);
    setHasMore(true);
  };

  const clean = (module_id: string) => {
    setComments([]);
    setSkip(0);
    setSortBy("popular");
    setError("");
    setModuleId(module_id);
    setCount(-1);
    setHasMore(true);
  };

  const deleteComment = async (_id: string) => {
    setComments((comments) => comments.filter((item) => item._id !== _id));
    await postAxios<CommentsResponse>("http://localhost:4000/deleteComment", {
      comment_id: _id,
    });
  };

  const postComment = async (
    module_id: string,
    message: string,
    user_id: string,
    username: string
  ) => {
    setComments((comments) => [
      {
        _id: "",
        likes: 0,
        message,
        user_id,
        created: moment().toISOString(),
        totalSubcomments: 0,
        parent_comment_id: null,
        username,
      },
      ...comments,
    ]);
    await postAxios<CommentsResponse>("http://localhost:4000/postComment", {
      module_id,
      message,
      user_id,
      username,
    });
  };

  const editComment = async (comment_id: string, message: string) => {
    setComments((comments) =>
      comments.map((item) =>
        item._id !== comment_id ? item : { ...item, message }
      )
    );
    await postAxios<CommentsResponse>("http://localhost:4000/editComment", {
      comment_id,
      message,
    });
  };

  const likeComment = async (comment_id: string, user_id: string) => {
    setComments((comments) =>
      comments.map((item) =>
        item._id !== comment_id ? item : { ...item, likes: item.likes + 1 }
      )
    );
    await postAxios<CommentsResponse>("http://localhost:4000/likeComment", {
      comment_id,
      user_id,
    });
  };

  const unlikeComment = async (comment_id: string, user_id: string) => {
    setComments((comments) =>
      comments.map((item) =>
        item._id !== comment_id ? item : { ...item, likes: item.likes - 1 }
      )
    );
    await postAxios<CommentsResponse>("http://localhost:4000/unlikeComment", {
      comment_id,
      user_id,
    });
  };

  return {
    loading,
    comments,
    refetch,
    loadMore,
    clean,
    error,
    count,
    hasMore,
    deleteComment,
    postComment,
    editComment,
    likeComment,
    unlikeComment,
  } as const;
};

export interface IComments {
  _id: string;
  likes: number;
  message: string;
  user_id: string;
  created: string;
  totalSubcomments: number;
  parent_comment_id: string | null;
  username: string;
}

export interface CommentsResponse {
  comments: IComments[];
  hasMore: boolean;
}

export const useGetChildComments = (parent_comment_id: string) => {
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState<IComments[]>([]);
  const [skip, setSkip] = useState(0);
  const [error, setError] = useState("");
  const [count, setCount] = useState(-1);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = async () => {
    try {
      setLoading(true);
      const response = await postAxios<CommentsResponse>(
        "http://localhost:4000/getComments",
        { parent_comment_id, skip, order: "first" }
      );
      const prevCommentsIds = comments.map((item) => item._id);
      const newComments = response.data.comments.filter(
        (item) => !prevCommentsIds.includes(item._id)
      );
      setLoading(false);
      setComments(newComments);
      setSkip((skip) => skip + 20);
    } catch (e) {
      setLoading(false);
      if (e.response?.data === "No hay más comentarios.") {
        if (skip === 0) {
          setError("No hay comentarios");
          setCount(0);
          setHasMore(false);
        } else {
          setError("No hay más comentarios");
          setHasMore(false);
        }
      }
    }
  };

  const refetch = (mode: "popular" | "last") => {
    setComments([]);
    setSkip(0);
    setError("");
    setCount(-1);
    setHasMore(true);
  };

  const deleteComment = async (_id: string) => {
    setComments((comments) => comments.filter((item) => item._id !== _id));
    await postAxios<CommentsResponse>("http://localhost:4000/deleteComment", {
      comment_id: _id,
    });
  };

  const postComment = async (
    module_id: string,
    parent_comment_id: string,
    message: string,
    user_id: string,
    username: string
  ) => {
    setComments((comments) => [
      {
        _id: "",
        likes: 0,
        message,
        user_id,
        created: moment().toISOString(),
        totalSubcomments: 0,
        parent_comment_id,
        username,
      },
      ...comments,
    ]);
    await postAxios<CommentsResponse>("http://localhost:4000/postComment", {
      module_id,
      message,
      user_id,
      username,
      parent_comment_id,
    });
  };

  const editComment = async (comment_id: string, message: string) => {
    setComments((comments) =>
      comments.map((item) =>
        item._id !== comment_id ? item : { ...item, message }
      )
    );
    await postAxios<CommentsResponse>("http://localhost:4000/editComment", {
      comment_id,
      message,
    });
  };

  return {
    loading,
    comments,
    refetch,
    loadMore,
    error,
    count,
    hasMore,
    deleteComment,
    postComment,
    editComment,
  } as const;
};
