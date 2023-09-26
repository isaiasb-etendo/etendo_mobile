import React, { useEffect } from "react";
import { LoadingScreen } from "./src/components";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { defaultTheme } from "./src/themes";

import HomeStack from "./src/navigation/HomeStack";
import LoginStack from "./src/navigation/LoginStack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Toast from "react-native-toast-message";
import { useAppDispatch, useAppSelector } from "./redux";
import { selectData, selectToken, selectUser, setDevUrl } from "./redux/user";
import { useUser } from "./hook/useUser";
import { languageDefault } from "./src/helpers/getLanguajes";
import { selectLoadingScreen, setIsDemo, setLoadingScreen } from "./redux/window";
import { Camera } from "react-native-vision-camera";
import { deviceOrientation } from "./src/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Props {}
type RootStackParamList = {
  HomeStack: any;
  LoginStack: any;
  LoadingScreen: any;
};
const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC<Props> = () => {
  const { atAppInit, getImageProfile } = useUser();
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectToken);
  const user = useAppSelector(selectUser);
  const data = useAppSelector(selectData);
  const loadingScreen = useAppSelector(selectLoadingScreen);

  useEffect(() => {
    const fetchInitialData = async () => {
      deviceOrientation();
      if (user) {
        await getImageProfile(data);
      }
      await languageDefault();
      dispatch(setLoadingScreen(false));
      const IsDemoTry = await AsyncStorage.getItem("isDemoTry");
      if (IsDemoTry === "Y"){
        dispatch(setIsDemo(true))
      }
      await atAppInit();
    };

    const fetchDevURL = async () => {
      try {
        const fetchedDevUrl = await AsyncStorage.getItem("debugURL");
        if (fetchedDevUrl) {
          dispatch(setDevUrl(fetchedDevUrl));
        } else {
          dispatch(setDevUrl("http://10.0.2.2:3000"));
        }
      } catch (error) {
        console.error("Error fetching debugURL:", error);
      }
    };

    fetchInitialData();
    checkPermission();
    fetchDevURL();
  }, []);

  const checkPermission = async () => {
    await Camera.requestCameraPermission();
  };

  return (
    <PaperProvider theme={defaultTheme}>
      <NavigationContainer>
        <Stack.Navigator>
          {loadingScreen ? (
            <Stack.Screen
              name="LoadingScreen"
              component={LoadingScreen}
              options={{ headerShown: false }}
            />
          ) : token ? (
            <Stack.Screen
              name="HomeStack"
              component={HomeStack}
              options={{ headerShown: false }}
            />
          ) : (
            <Stack.Screen
              name="LoginStack"
              component={LoginStack}
              options={{ headerShown: false }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </PaperProvider>
  );
};

export default App;
