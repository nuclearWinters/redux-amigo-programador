interface IState {
  _id: string;
  username: string;
  email: string;
  currentTopic: string;
  arrayLikedComments: string[];
  topicsAndModules: {
    _id: string;
    step: number;
    name: string;
    url: string;
    type: string;
    modules: {
      _id: string;
      title: string;
      description: string;
      thumbnail: string;
      files: { name: string; defaultCode: string }[];
      instructions: string;
    }[];
  }[];
  topicsAndModulesData: {
    _id: string;
    name: string;
    currentModule: number;
    modulesCompleted: {
      id: string;
      tareaURL: { fileName: string; url: string }[];
    }[];
  }[];
}

const initialState: IState = {
  _id: "",
  username: "",
  email: "",
  currentTopic: "Inicio rápido",
  topicsAndModules: [],
  topicsAndModulesData: [],
  arrayLikedComments: [],
};

const SET_USER = "SET_USER";

interface SetUser {
  type: typeof SET_USER;
  payload: IState;
}

const MODULE_COMPLETED = "MODULE_COMPLETED";

interface ModuleCompleted {
  type: typeof MODULE_COMPLETED;
  payload: {
    name: string;
    moduleCompleted: {
      id: string;
      tareaURL: { fileName: string; url: string }[];
    };
  };
}

const CHANGE_TOPIC = "CHANGE_TOPIC";

interface ChangeTopic {
  type: typeof CHANGE_TOPIC;
  payload: string;
}

const CHANGE_MODULE = "CHANGE_MODULE";

interface ChangeModule {
  type: typeof CHANGE_MODULE;
  payload: {
    name: string;
    currentModule: number;
  };
}

const SET_ID = "SET_ID";

interface SetID {
  type: typeof SET_ID;
  payload: string;
}

const REMOVE_LIKE = "REMOVE_LIKE";

interface RemoveLike {
  type: typeof REMOVE_LIKE;
  payload: string;
}

const ADD_LIKE = "ADD_LIKE";

interface AddLike {
  type: typeof ADD_LIKE;
  payload: string;
}

export type TopicsAndModulesActions =
  | SetUser
  | ModuleCompleted
  | ChangeTopic
  | ChangeModule
  | SetID
  | RemoveLike
  | AddLike;

export const user = (
  state = initialState,
  action: TopicsAndModulesActions
): IState => {
  switch (action.type) {
    case SET_USER:
      return action.payload;
    case MODULE_COMPLETED:
      const indexModule = state.topicsAndModulesData.findIndex(
        (item) => item.name === action.payload.name
      );
      if (indexModule === -1) {
        return state;
      } else {
        const newModules = [...state.topicsAndModulesData];
        newModules[indexModule].modulesCompleted.push(
          action.payload.moduleCompleted
        );
        return {
          ...state,
          topicsAndModulesData: newModules,
        };
      }
    case CHANGE_TOPIC:
      return {
        ...state,
        currentTopic: action.payload,
      };
    case CHANGE_MODULE:
      const indexModuleData = state.topicsAndModulesData.findIndex(
        (item) => item.name === action.payload.name
      );
      if (indexModuleData === -1) {
        return state;
      } else {
        const newModules = [...state.topicsAndModulesData];
        newModules[indexModuleData].currentModule =
          action.payload.currentModule;
        return {
          ...state,
          topicsAndModulesData: newModules,
        };
      }
    case SET_ID:
      return {
        ...state,
        _id: action.payload,
      };
    case REMOVE_LIKE:
      return {
        ...state,
        arrayLikedComments: state.arrayLikedComments.filter(
          (item) => item !== action.payload
        ),
      };
    case ADD_LIKE:
      return {
        ...state,
        arrayLikedComments: [...state.arrayLikedComments, action.payload],
      };
    default:
      return state;
  }
};
