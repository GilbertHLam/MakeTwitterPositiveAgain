import React, { createContext, useContext, useReducer } from "react";
import { StateType, Action, StateProviderProps } from "../types/types";

export const initialState: StateType = {
  credentials: {
    oauth_token: "",
    oauth_token_secret: "",
    screen_name: "",
    user_id: ""
  },
  sortMethod: "recent"
};

export const StateContext = createContext<{
  state: StateType;
  dispatch: (action: Action) => void;
}>({
  state: initialState,
  dispatch: () => {}
});

export const reducer = (prevState: StateType, action: Action): StateType => {
  switch (action.type) {
    case "setCredentials":
      return {
        ...prevState,
        credentials: action.credentials
      };

    case "setSortMethod":
      return {
        ...prevState,
        sortMethod: action.sortMethod
      };

    default:
      return prevState;
  }
};

export const StateProvider: React.FC<StateProviderProps> = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return (
    <StateContext.Provider value={value}>
      {props.children}
    </StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);
