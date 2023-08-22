import React from "react";
import { Image, View, Text, ImageBackground, ScrollView } from "react-native";
import locale from "../../i18n/locale";
import { useNavigation } from "@react-navigation/native";
import { Etendo } from "../../helpers/Etendo";
import styles from "./styles";
import { INavigation } from "../../interfaces";
import { isTablet } from "../../../hook/isTablet";
import { deviceStyles } from "./deviceStyles";
import CardDropdown from "etendo-ui-library/dist-native/components/cards/cardDropdown/CardDropdown";
import { StarIcon } from "etendo-ui-library/dist-native/assets/images/icons/StarIcon";
import { isTabletSmall } from "../../helpers/IsTablet";
import LoadingHome from "../../components/LoadingHome";
import { selectData } from "../../../redux/user";
import { useAppSelector } from "../../../redux";
import { selectLoading, selectMenuItems } from "../../../redux/window";

const etendoBoyImg = require("../../../assets/etendo-bk-tablet.png");
const etendoBoyImgSmall = require("../../../assets/etendo-bk-tablet-small.png");
const etendoBoyMobile = require("../../../assets/etendo-bk-mobile.png");
const background = require("../../../assets/background.png");
const backgroundMobile = require("../../../assets/background-mobile.png");
interface Props {
  navigation: INavigation;
  appMinCoreVersion: string;
  coreVersion: string;
}
const HomeFunction = (props: Props) => {
  const data = useAppSelector(selectData);
  const loading = useAppSelector(selectLoading);
  const menuItems = useAppSelector(selectMenuItems);

  const getBackground = () => {
    return isTablet() ? background : backgroundMobile;
  };

  const getImageBackground = () => {
    if (isTablet()) {
      if (isTabletSmall()) {
        return etendoBoyImgSmall;
      }
      return etendoBoyImg;
    } else {
      return etendoBoyMobile;
    }
  };

  const getNameInBody = () => {
    return data?.username ? data?.username + "!" : null;
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={getBackground()} style={styles.imgBackground}>
        {isTablet() ? (
          <ScrollView horizontal style={styles.conteinerMed}>
            <>
              {menuItems.map((menuItem: any, index: number) => {
                return (
                  <View key={"CardDropdown" + index} style={{ marginLeft: 35 }}>
                    <CardDropdown
                      title={menuItem.name}
                      image={<StarIcon />}
                      onPress={() => props.navigation.navigate(menuItem.name)}
                    />
                  </View>
                );
              })}
            </>
            {loading && <LoadingHome />}
          </ScrollView>
        ) : (
          <View style={styles.welcomeMobile}>
            <Text style={styles.welcomeText}>
              {locale.t("WelcomeToEtendoHome")}
            </Text>
            <Text style={styles.welcomeName}>{getNameInBody()}</Text>
          </View>
        )}
        <Image
          style={deviceStyles.imageBackground}
          source={getImageBackground()}
        />
      </ImageBackground>
    </View>
  );
};

const Home = (props: any) => {
  const navigation = useNavigation();
  Etendo.globalNav = navigation;

  return <HomeFunction {...props} />;
};
export default Home;
