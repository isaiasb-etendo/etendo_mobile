import { Dimensions, StyleSheet } from "react-native";
import { defaultTheme } from "../../themes";
import { GREY_BLUE, NEUTRAL_60, PRIMARY_100, WHITE } from "../../styles/colors";

const win = Dimensions.get("window");

const styles = StyleSheet.create({
  containerMobile: {
    paddingHorizontal: 30,
    paddingVertical: 50,
    backgroundColor: defaultTheme.colors.background,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    height: "60%"
  },
  keyboardAvoiding: {
    flex: 1,
    display: "flex",
    backgroundColor: "white"
  },
  buttonsContainers: {
    flex: 1
  },
  configurationImage: {
    height: 16,
    width: 16,
    marginRight: 8
  },
  etendoLogotypeMobile: {
    resizeMode: "contain",
    width: 80,
    height: 80,
    alignSelf: "center"
    // top: -100
  },
  backgroundContainerTablet: {
    flex: 1,
    flexDirection: "row"
  },
  backgroundContainerMobile: {
    flex: 1,
    flexDirection: "column"
  },
  credentialsTextTabletM: {
    marginTop: -55,
    color: NEUTRAL_60,
    fontSize: 14,
    fontWeight: "500",
    top: -50,
    paddingRight: 25,
    paddingLeft: 25,
    display: "flex",
    alignSelf: "stretch",
    fontFamily: "Inter",
    alignItems: "center",
    textAlign: "center"
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: defaultTheme.colors.primary,
    borderRadius: 4
  },
  dividerStyle: {
    padding: 1,
    flexGrow: 1
  },
  orTextStyle: {
    textAlignVertical: "center",
    margin: 20
  },
  showAddUrlContainer: {
    marginRight: 20
  },
  buttonSaveUrl: {
    width: 110,
    backgroundColor: defaultTheme.colors.backgroundSecondary
  },
  buttonDemoTry: {
    width: 150,
    backgroundColor: defaultTheme.colors.backgroundSecondary
  },
  credentialsTextMobile: {
    color: NEUTRAL_60,
    fontSize: 16,
    fontWeight: "500",
    paddingRight: 25,
    paddingLeft: 25,
    display: "flex",
    alignSelf: "stretch",
    fontFamily: "Inter",
    alignItems: "center",
    textAlign: "center",
    marginBottom: 30
  },
  containerTablet: {
    position: "absolute",
    display: "flex",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: defaultTheme.colors.background,
    borderRadius: 20,
    width: 600,
    height: "90%"
  },
  generalContainerTablet: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: WHITE,
    alignItems: "center",
    justifyContent: "center"
  },
  generalContainerMobile: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: WHITE
    // paddingBottom: 350
  },
  backgroundLoginImageContainer: {
    position: "relative",
    width: "100%"
  },
  backgroundHeaderImage: {
    position: "relative",
    width: "100%",
    height: "90%",
    bottom: "auto"
  },
  backgroundLoginImage: {
    width: "100%",
    height: "100%",
    resizeMode: "stretch"
  },
  settingsText: {
    fontFamily: "Inter-Regular",
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    left: -5
  },
  buttonsDemoSettingsTablet: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 80,
    left: -10,
    top: 40,
    justifyContent: "space-between"
  },
  buttonsDemoSettings: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  settingsImageContainerMobile: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Inter-Regular",
    lineHeight: 24,
    fontSize: 16,
    borderRadius: 8
  },
  changePasswordTablet: {
    marginTop: 0
  },
  showAddUrl: {
    width: 110,
    backgroundColor: defaultTheme.colors.accent,
    marginRight: 10
  },
  changePasswordMobile: {
    marginTop: 25
  },
  ShowLoadUrlContainer: {
    marginTop: 20
  },
  itemListText: {
    textAlignVertical: "center",
    margin: 10,
    fontSize: 15
  },
  itemListContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10
  },
  ShowLoadUrlCloseButton: {
    width: 120,
    backgroundColor: defaultTheme.colors.backgroundSecondary
  },
  ShowLoadUrlAddButton: {
    backgroundColor: defaultTheme.colors.accent,
    width: 120,
    marginRight: 10
  },
  settingsImageContainerTablet: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Inter-Regular",
    lineHeight: 24,
    fontSize: 16,
    borderRadius: 8,
    top: -48,
    width: 112,
    height: 40,
    right: -15
  },
  settingsImage: {
    display: "flex",
    resizeMode: "contain",
    height: 24,
    width: 24,
    left: -10,
    tintColor: defaultTheme.colors.primary,
    alignSelf: "center",
    justifyContent: "flex-start"
  },
  etendoLogotypeTablet: {
    display: "flex",
    resizeMode: "contain",
    width: 76,
    height: 76,
    alignContent: "center",
    justifyContent: "center",
    top: -100,
    marginTop: 40
  },
  etendoLogoContainerTablet: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  etendoLogoContainerMobile: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30
  },
  credentialsTextTablet: {
    color: NEUTRAL_60,
    fontSize: 14,
    textAlign: "center",
    fontWeight: "500"
  },
  welcomeTitleContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 20
  },
  welcomeTitleSmallContainer: {
    flexDirection: "row",
    alignSelf: "center",
    top: -100,
    marginTop: 48
  },
  welcomeTitle: {
    color: PRIMARY_100,
    fontWeight: "700",
    fontSize: 30,
    height: 40,
    marginBottom: 4,
    lineHeight: 36
  },
  starsImage: {
    position: "absolute",
    resizeMode: "contain",
    right: 0,
    width: 27,
    height: 27,
    marginRight: -30
  },
  scrollViewContainer: {
    height: 200
  },
  generalView: {
    flex: 1,
    flexDirection: "column",
    paddingBottom: 16
  },
  viewStyle: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%"
  },
  appbarStyle: {
    paddingTop: 28,
    paddingLeft: 8
  },
  containerLogo: {
    height: "15%"
  },
  logo: {
    flex: 1,
    alignSelf: "stretch",
    width: win.width,
    height: win.height
  },
  containerInputs: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center"
  },
  containerInputsMobile: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center"
  },
  containerCopyrightMobile: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center"
  },
  buttonDemo: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Inter-Regular"
  },
  textInputsHolders: {
    fontFamily: "Inter-Regular",
    fontStyle: "normal",
    fontSize: 14,
    lineHeight: 22,
    color: GREY_BLUE,
    paddingLeft: 5
  },
  textInputStyle: {
    justifyContent: "flex-end",
    height: 45,
    marginBottom: 28,
    marginTop: 20,
    width: "100%"
  },
  textInputIconStyle: {
    paddingTop: 10
  },
  buttonLogin: {
    height: 45,
    paddingVertical: 0,
    fontSize: 1
  },
  copyRightStyle: {
    paddingTop: 24,
    color: NEUTRAL_60,
    textAlign: "center"
  },
  copyRightStyleMobile: {
    fontSize: 12,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    color: NEUTRAL_60
  },
  containerCopyright: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  copyrightStyle: {
    textAlign: "center",
    color: defaultTheme.colors.primary,
    fontSize: 14,
    backgroundColor: defaultTheme.colors.background
  },
  picker: {
    height: 44,
    borderColor: defaultTheme.colors.primary,
    borderWidth: 1
  },
  pickerItem: {
    height: 44
  }
});

export default styles;
