import { AppRegistry } from "react-native";
import AppContainer from "./AppContainer.tsx";
import { name as appName } from "./app.json";
AppRegistry.registerComponent(appName, () => AppContainer);
