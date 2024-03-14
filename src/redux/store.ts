import { configureStore } from "@reduxjs/toolkit";
import reducers from "./reducers";
import localSorage from "./localStorage";

class StoreServiceProvider {
  static _instance: StoreServiceProvider | null = null;

  /**
   *
   */
  _storeConfig: ReturnType<typeof configureStore> | any;

  /**
   *
   */
  get storeConfig() {
    return this._storeConfig;
  }

  /**
   *
   */
  constructor() {
    if (!StoreServiceProvider._instance) {
      this._storeConfig = configureStore({
        reducer: reducers
      });
      StoreServiceProvider._instance = this;
    }
    return StoreServiceProvider._instance;
  }
}

const instance = new StoreServiceProvider();

const store = instance.storeConfig;

store.subscribe(() => localSorage.saveLocalStorage(store.getState()));

export { instance as default };
