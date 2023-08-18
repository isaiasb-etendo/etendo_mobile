import { OBRest } from "etrest";
import { useAppDispatch, useAppSelector } from "../redux";
import {
  selectSelectedLanguage,
  selectStoredEnviromentsUrl,
  selectToken,
  selectUser,
  setData,
  setLanguage,
  setStoredEnviromentsUrl,
  setStoredLanguages,
  setToken,
  setUser
} from "../redux/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLanguages } from "../src/helpers/getLanguajes";
import { Language } from "../src/interfaces";
import { ADWindow } from "../src/ob-api/objects";
import { setWindows } from "../redux/window";
import { useWindow } from "./useWindow";

export const useUser = () => {
  const dispatch = useAppDispatch();
  const { loadWindows } = useWindow();
  const selectedLanguage = useAppSelector(selectSelectedLanguage);
  const storedEnviromentsUrl = useAppSelector(selectStoredEnviromentsUrl);
  const token = useAppSelector(selectToken);
  const user = useAppSelector(selectUser);

  // Important: this method is called in App.tsx,
  // all that is setted here is available in the whole app (redux)
  const atAppInit = async (user: string, languages: Language[]) => {
    const currentLanguage = await AsyncStorage.getItem("selectedLanguage");
    const currentEnviromentsUrl = await loadEnviromentsUrl();
    await reloadUserData(user);
    dispatch(setLanguage(currentLanguage));
    dispatch(setStoredLanguages(languages));
    dispatch(setStoredEnviromentsUrl(currentEnviromentsUrl));
  };

  const login = async (user, pass) => {
    try {
      await OBRest.loginWithUserAndPassword(user, pass);
    } catch (ignored) {}
    const token = OBRest.getInstance()
      .getAxios()
      .defaults.headers.Authorization.replace("Bearer ", "");
    await reloadUserData(null, user);
    dispatch(setToken(token));
    dispatch(setUser(user));
    await AsyncStorage.setItem("token", token);
    await AsyncStorage.setItem("user", user);
    await loadWindows();
  };

  const reloadUserData = async (storedToken?: string, username?: string) => {
    if (storedToken) {
      dispatch(setToken(storedToken));
      OBRest.loginWithToken(storedToken);
    }

    let context = OBRest.getInstance().getOBContext();

    dispatch(
      setData({
        username: username ? username : user,
        userId: context?.getUserId(),
        defaultRoleId: context?.getRoleId(),
        defaultWarehouseId: context?.getWarehouseId(),
        roleId: context?.getRoleId(),
        warehouseId: context?.getWarehouseId(),
        organization: context?.getOrganizationId(),
        client: context?.getClientId()
      })
    );
  };

  // Savings
  const saveEnviromentsUrl = async (storedEnviromentsUrl) => {
    if (storedEnviromentsUrl && storedEnviromentsUrl.length) {
      dispatch(setStoredEnviromentsUrl(storedEnviromentsUrl));
      await AsyncStorage.setItem(
        "storedEnviromentsUrl",
        JSON.stringify(storedEnviromentsUrl)
      );
    }
  };

  const saveToken = async (tokenP?, userP?) => {
    await AsyncStorage.setItem("token", tokenP ? tokenP : token);
    await AsyncStorage.setItem("user", userP ? userP : user);
  };

  // Loaders
  const loadEnviromentsUrl = () => {
    return storedEnviromentsUrl;
  };

  const loadLanguage = () => {
    return selectedLanguage;
  };

  const setCurrentLanguage = (value: string) => {
    dispatch(setLanguage(value));
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("data");
    dispatch(setToken(null));
    dispatch(setUser(null));
    dispatch(setData(null));
  };

  return {
    login,
    reloadUserData,
    saveEnviromentsUrl,
    saveToken,
    loadEnviromentsUrl,
    loadLanguage,
    setCurrentLanguage,
    atAppInit,
    logout
  };
};
