import React, { useContext } from "react";

export const initialState = {
  loading: false,
  userToken: "",
  allRecepies: [],
};

export const ActionTypes = {
  setLoading: "SET_LOADING",
  setUserToken: "SET_USER_TOKEN",
  setRecepies: "SET_RECEPIES",
};

export const reducer = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.setLoading: {
      return { ...state, loading: action.newValue };
    }
    case ActionTypes.setRecepies: {
      return { ...state, allRecepies: action.newValue };
    }
    case ActionTypes.setUserToken: {
      if (action.newValue === null) {
        return { ...state, userToken: "" };
      }
      return { ...state, userToken: action.newValue };
    }
    default: {
      return state;
    }
  }
};

export const inicialContext = {
  contextState: initialState,
  setContextState: () => {},
};

const Context = React.createContext(inicialContext);

export function ContextProvider({ children, initialState = initialState }) {
  const [contextState, setContextState] = React.useReducer(
    reducer,
    initialState
  );

    return ( <Context.Provider value={{contextState, setContextState}}>
    {children}
  </Context.Provider>)
}

export const useContextState = () => useContext(Context)
