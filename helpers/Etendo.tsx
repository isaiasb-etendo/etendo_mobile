import React, { useMemo } from 'react';
import { useContext } from 'react';
import { ContainerContext, globalState } from '../contexts/ContainerContext';

export class EtendoUtil {
  private _state: any;
  private _dispatch: any;
  private _screens: any = [];

  public set state(state: any) {
    this._state = state;
  }
  public set dispatch(dispatch: any) {
    this._dispatch = dispatch;
  }

  public addMenuItem(menuItems: [{
    name: string;
    __id: string;
    url: string;
    isDev: boolean;
    component: any;
  }]) {
    console.log('menuItems // PRE', this._state.menuItems);
    const add: any[] = []
    menuItems.map(menuItem => {
      console.log('menuItems // ADD', menuItem);
      if (
        this._state.menuItems.filter(it => {
          return it.name === menuItem.name;
        }).length == 0
      ) {
        add.push(menuItem)
      }
    })
    this._dispatch({ menuItems: [...this._state.menuItems, ...add] });
  }

  public register(name: string, component: any) {
    console.log('Etendo::register name', name);
    console.log('Etendo::register component', component);
    this._screens = component;
  }

  public render(name: string) {
    const Component = useMemo(() => {
      return React.lazy(async () => { return this._screens.default })
    }, [name]);
    return (<Component />);
  }

  public screen = "Screen2"
}

const Etendo = new EtendoUtil();

export { Etendo };
