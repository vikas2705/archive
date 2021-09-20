import React, { useReducer, useContext, createContext, useState } from "react";

const reducer = (state, action) => {
  let newState = state.slice();
  switch (action.type) {
    case "PUSH":
      newState.push(action.payload.pagename);
      return newState;
    case "POP":
      newState.pop();
      return newState;
    case "CLEAR":
      newState = [];
      return newState;
    default:
      return state;
  }
};

const PageContext = createContext(null);
const NavigationContext = createContext(null);

export const NavigationProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, ["Default"]);
  const [openNav, setOpenNav] = useState(false);
  const showNav = (val) => {
    setOpenNav(val);
  }
  return (
    <NavigationContext.Provider
      value={{
        dispatch,
        showNav,
        openNav,
      }}
    >
      <PageContext.Provider value={state}>
        {props.children}
      </PageContext.Provider>
    </NavigationContext.Provider>
  );
};

export const usePages = () => useContext(PageContext);

export const useNavigation = () => useContext(NavigationContext);
