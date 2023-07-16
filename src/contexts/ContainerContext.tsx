import { createStackNavigator } from "@react-navigation/stack";
import React, { useReducer } from "react";
import { Etendo, EtendoUtil } from "../helpers/Etendo";

export const DEV_URL = "http://10.0.2.2:3000";
const ContainerContext = React.createContext<{
  state: any;
  dispatch: any;
  Etendo: EtendoUtil;
}>({});

const ContainerProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const reducer = (state: any, action: any) => {
    if (action.appsData) {
      const mi = action.appsData.map((app: any) => {
        const path = app.path.split("/");
        const __id = app.etdappAppVersionIsDev
          ? path[path.length - 1]
          : app.path;
        return {
          name: app.etdappAppName,
          __id: __id,
          url: app.etdappAppVersionIsDev ? `${DEV_URL}` : state.url,
          isDev: app.etdappAppVersionIsDev
        };
      });
      return {
        ...state,
        appsData: [...state.appsData, ...action.appsData],
        menuItems: [...initialState.menuItems, ...mi]
      };
    }

    if (action.type === "SET_LOADING") {
      return { ...state, loading: action.loading };
    }
    if (action.type === "SET_BINDARY_PROFILE_IMG") {
      console.log("a", action.bindaryImg);
      return { ...state, bindaryImg: action.bindaryImg };
    }

    return state;
  };

  const initialState = {
    appsData: [],
    menuItems: [],
    url: "",
    logged: false,
    loading: false,
    bindaryImg: ""
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  Etendo.state = state;
  Etendo.dispatch = dispatch;
  Etendo.Stack = createStackNavigator();

  return (
    <ContainerContext.Provider value={{ state, dispatch, Etendo }}>
      {children}
    </ContainerContext.Provider>
  );
};

export { ContainerContext, ContainerProvider };
