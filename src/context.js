import { createContext, useContext, useReducer } from "react";

const AppContext = createContext(null);

const initialState = {
  isDarkModeActive: false,
  isLoading: true,
};

const appActionTypes = {
  TOGGLE_LOADING: "toggle_loading",
  TOGGLE_DARK_MODE: "TOGGLE_DARK_MODE",
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case appActionTypes.TOGGLE_DARK_MODE:
      return { ...state, isDarkModeActive: action.isActive };
    case appActionTypes.TOGGLE_LOADING:
      return { ...state, isLoading: action.isLoading ?? !state.isLoading };

    default:
      return state;
  }
}

function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

function useAppContext() {
  return useContext(AppContext);
}

export { AppContext, AppProvider, useAppContext, appActionTypes };
