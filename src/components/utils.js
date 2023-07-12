import React from "react";
import { Text } from "react-native";
import packages from "./packages";

function getParsedModule(code, moduleName, packages) {
  try {
    const _this = Object.create(packages);
    function require(name) {
      try {
        if (!(name in _this) && moduleName === name) {
          let module = { exports: {} };
          _this[name] = () => module;
          let wrapper = Function("require, exports, module", code);
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

export async function fetchComponent(id, url) {
  try {
    const urlToFetch = `${url}/${id}?timestamp=${+new Date()}`;
    const response = await fetch(urlToFetch);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.text();
    let component;
    try {
      component = { default: getParsedModule(data, id, packages) };
    } catch (e) {
      console.error(e);
      throw e;
    }
    return component.default;
  } catch (error) {
    return {
      default() {
        return <Text>Failed to Render url "{url}"</Text>;
      }
    };
  }
}
