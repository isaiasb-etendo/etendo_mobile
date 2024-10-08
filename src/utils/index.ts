import packages from '../components/packages';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isTablet } from '../../hook/isTablet';
import Orientation from 'react-native-orientation-locker';
import { storeKey } from './KeyStorage';
import NetInfo from '@react-native-community/netinfo';
import { References } from '../constants/References';
import {
  show,
  setAlertDefaultDuration,
} from 'etendo-ui-library/dist-native/components/alert/AlertManager';
import locale from '../i18n/locale';

function getParsedModule(code: any, moduleName: any, packages: any) {
  try {
    const _this = Object.create(packages);
    function require(name) {
      try {
        if (!(name in _this) && moduleName === name) {
          let module = { exports: {} };
          _this[name] = () => module;
          let wrapper = Function('require, exports, module', code);
          wrapper(require, module.exports, module);
        } else if (!(name in _this)) {
          console.error(`Module '${name}' not found`);
          throw `Module '${name}' not found`;
        }
        return _this[name]().exports;
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
    return require(moduleName);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function fetchComponent(id: any, url: any, navigation: any) {
  setAlertDefaultDuration(7000);
  const fullUrl = `${url}/${id}?timestamp=${+new Date()}`;
  async function isConnected() {
    try {
      const response = await fetch(fullUrl);
      return response.ok;
    } catch (error) {
      return false;
    }
  }
  const connection = await isConnected();
  if (!connection) {
    return {
      default: () => {
        navigation.navigate('Home');
        show(locale.t('LoginScreen:NetworkError'), 'error');
      },
    };
  }
  try {
    const responseChange = await fetch(fullUrl, { method: 'HEAD' });
    const lastModifiedNew = responseChange.headers.get('last-modified');

    const dateLastDownBundleKey = `dateLastDownBundle-${id}`;
    const dateLastDownBundle = await AsyncStorage.getItem(
      dateLastDownBundleKey,
    );

    let component;
    if (!dateLastDownBundle || dateLastDownBundle < lastModifiedNew) {
      const response = await fetch(fullUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.text();
      await AsyncStorage.setItem(id, data);
      const date = responseChange.headers.get('date');
      await AsyncStorage.setItem(dateLastDownBundleKey, date);
      storeKey(dateLastDownBundleKey);
      component = { default: getParsedModule(data, id, packages) };
    } else {
      const existingCode = await AsyncStorage.getItem(id);
      if (existingCode) {
        component = {
          default: getParsedModule(existingCode, id, packages),
        };
      } else {
        throw new Error('Component not found in storage');
      }
    }
    return component.default;
  } catch (error) {
    return () => {
      navigation.navigate('Home');
      show(locale.t('LoginScreen:NetworkError'), 'error');
    };
  }
}

export const deviceOrientation = () => {
  if (isTablet()) {
    Orientation.lockToLandscape();
  } else {
    Orientation.lockToPortrait();
  }
};

// Check if the internet is available
export const internetIsAvailable = async () => {
  const netInfo = await NetInfo.fetch();
  return netInfo.isConnected;
};

export const getBasePathContext = (
  isDemoTry: boolean,
  isDev: boolean,
): string => {
  if (isDemoTry) {
    return '';
  }

  return isDev ? References.SubappContextPath : References.EtendoContextPath;
};
