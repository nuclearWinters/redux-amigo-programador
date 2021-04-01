interface IState {
  hasMore: boolean;
  error: string;
  comments: {
    _id: string;
    likes: number;
    message: string;
    user_id: string;
    created: string;
    totalSubcomments: number;
    username: string;
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
  }[];
}

const initialState: IState = {
  hasMore: true,
  comments: [],
  error: "",
};

const ADD_PARENT_COMMENTS = "ADD_PARENT_COMMENTS";

interface SetParentComments {
  type: typeof ADD_PARENT_COMMENTS;
  payload: {
    hasMore: boolean;
    comments: {
      _id: string;
      likes: number;
      message: string;
      user_id: string;
      created: string;
      totalSubcomments: number;
      username: string;
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
    }[];
  };
}

const CLEAN = "CLEAN";

interface Clean {
  type: typeof CLEAN;
}

const POST_PARENT_COMMENT = "POST_PARENT_COMMENT";

interface PostParentComment {
  type: typeof POST_PARENT_COMMENT;
  payload: {
    _id: string;
    likes: number;
    message: string;
    user_id: string;
    created: string;
    totalSubcomments: number;
    username: string;
    hasMore: boolean;
    module_id: string;
    subComments: {
      _id: string;
      likes: number;
      message: string;
      user_id: string;
      created: string;
      username: string;
      parent_comment_id: string;
    }[];
  };
}

const DELETE_PARENT_COMMENT = "DELETE_PARENT_COMMENT";

interface DeleteParentComment {
  type: typeof DELETE_PARENT_COMMENT;
  payload: string;
}

const EDIT_PARENT_COMMENT = "EDIT_PARENT_COMMENT";

interface EditParentComment {
  type: typeof EDIT_PARENT_COMMENT;
  payload: {
    message: string;
    comment_id: string;
  };
}

const LIKE_PARENT_COMMENT = "LIKE_PARENT_COMMENT";

interface LikeParentComment {
  type: typeof LIKE_PARENT_COMMENT;
  payload: string;
}

const UNLIKE_PARENT_COMMENT = "UNLIKE_PARENT_COMMENT";

interface UnlikeParentComment {
  type: typeof UNLIKE_PARENT_COMMENT;
  payload: string;
}

const POST_CHILD_COMMENT = "POST_CHILD_COMMENT";

interface PostChildComment {
  type: typeof POST_CHILD_COMMENT;
  payload: {
    parent_comment_id: string;
    child_comment: {
      _id: string;
      likes: number;
      message: string;
      user_id: string;
      created: string;
      username: string;
      parent_comment_id: string;
    };
  };
}

const ADD_CHILD_COMMENTS = "ADD_CHILD_COMMENTS";

interface AddChildComments {
  type: typeof ADD_CHILD_COMMENTS;
  payload: {
    parent_comment_id: string;
    hasMore: boolean;
    child_comments: {
      _id: string;
      likes: number;
      message: string;
      user_id: string;
      created: string;
      username: string;
      parent_comment_id: string;
    }[];
  };
}

const LIKE_CHILD_COMMENT = "LIKE_CHILD_COMMENT";

interface LikeChildComments {
  type: typeof LIKE_CHILD_COMMENT;
  payload: {
    parent_comment_id: string;
    child_comment_id: string;
  };
}

const UNLIKE_CHILD_COMMENT = "UNLIKE_CHILD_COMMENT";

interface UnlikeChildComments {
  type: typeof UNLIKE_CHILD_COMMENT;
  payload: {
    parent_comment_id: string;
    child_comment_id: string;
  };
}

const EDIT_CHILD_COMMENT = "EDIT_CHILD_COMMENT";

interface EditChildComment {
  type: typeof EDIT_CHILD_COMMENT;
  payload: {
    message: string;
    child_comment_id: string;
    parent_comment_id: string;
  };
}

const DELETE_CHILD_COMMENT = "DELETE_CHILD_COMMENT";

interface DeleteChildComment {
  type: typeof DELETE_CHILD_COMMENT;
  payload: {
    child_comment_id: string;
    parent_comment_id: string;
  };
}

const SET_ERROR = "SET_ERROR";

interface SetError {
  type: typeof SET_ERROR;
  payload: string;
}

export type TopicsAndModulesActions =
  | SetParentComments
  | Clean
  | PostParentComment
  | DeleteParentComment
  | EditParentComment
  | LikeParentComment
  | UnlikeParentComment
  | PostChildComment
  | AddChildComments
  | LikeChildComments
  | UnlikeChildComments
  | EditChildComment
  | DeleteChildComment
  | SetError;

export const comments = (
  state = initialState,
  action: TopicsAndModulesActions
): IState => {
  switch (action.type) {
    case ADD_PARENT_COMMENTS:
      return {
        ...state,
        hasMore: action.payload.hasMore,
        comments: [...state.comments, ...action.payload.comments],
      };
    case CLEAN:
      return {
        hasMore: true,
        comments: [],
        error: "",
      };
    case POST_PARENT_COMMENT:
      return {
        ...state,
        comments: [action.payload, ...state.comments],
      };
    case DELETE_PARENT_COMMENT:
      return {
        ...state,
        comments: state.comments.filter((item) => item._id !== action.payload),
      };
    case EDIT_PARENT_COMMENT:
      return {
        ...state,
        comments: state.comments.map((item) =>
          item._id === action.payload.comment_id
            ? {
                ...item,
                message: action.payload.message,
              }
            : item
        ),
      };
    case LIKE_PARENT_COMMENT:
      return {
        ...state,
        comments: state.comments.map((item) =>
          item._id === action.payload
            ? {
                ...item,
                likes: item.likes + 1,
              }
            : item
        ),
      };
    case UNLIKE_PARENT_COMMENT:
      return {
        ...state,
        comments: state.comments.map((item) =>
          item._id === action.payload
            ? {
                ...item,
                likes: item.likes - 1,
              }
            : item
        ),
      };
    case POST_CHILD_COMMENT:
      return {
        ...state,
        comments: state.comments.map((item) =>
          item._id === action.payload.parent_comment_id
            ? {
                ...item,
                subComments: [
                  ...item.subComments,
                  action.payload.child_comment,
                ],
                totalSubcomments: item.totalSubcomments + 1,
              }
            : item
        ),
      };
    case ADD_CHILD_COMMENTS:
      return {
        ...state,
        comments: state.comments.map((item) =>
          item._id === action.payload.parent_comment_id
            ? {
                ...item,
                hasMore: action.payload.hasMore,
                subComments: [
                  ...item.subComments,
                  ...action.payload.child_comments.filter(
                    (comment) =>
                      !item.subComments
                        .map(({ _id }) => _id)
                        .includes(comment._id)
                  ),
                ],
              }
            : item
        ),
      };
    case LIKE_CHILD_COMMENT:
      return {
        ...state,
        comments: state.comments.map((item) =>
          item._id === action.payload.parent_comment_id
            ? {
                ...item,
                subComments: item.subComments.map((item) =>
                  item._id === action.payload.child_comment_id
                    ? { ...item, likes: item.likes + 1 }
                    : item
                ),
              }
            : item
        ),
      };
    case UNLIKE_CHILD_COMMENT:
      return {
        ...state,
        comments: state.comments.map((item) =>
          item._id === action.payload.parent_comment_id
            ? {
                ...item,
                subComments: item.subComments.map((item) =>
                  item._id === action.payload.child_comment_id
                    ? { ...item, likes: item.likes - 1 }
                    : item
                ),
              }
            : item
        ),
      };
    case EDIT_CHILD_COMMENT:
      return {
        ...state,
        comments: state.comments.map((item) =>
          item._id === action.payload.parent_comment_id
            ? {
                ...item,
                subComments: item.subComments.map((item) =>
                  item._id === action.payload.child_comment_id
                    ? { ...item, message: action.payload.message }
                    : item
                ),
              }
            : item
        ),
      };
    case DELETE_CHILD_COMMENT:
      return {
        ...state,
        comments: state.comments.map((item) =>
          item._id === action.payload.parent_comment_id
            ? {
                ...item,
                subComments: item.subComments.filter(
                  (item) => item._id !== action.payload.child_comment_id
                ),
                totalSubcomments: item.totalSubcomments - 1,
              }
            : item
        ),
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
