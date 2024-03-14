import { configureStore } from "@reduxjs/toolkit";
import reducers from "./reducers";
import localSorage from "./localStorage"

class StoreServiceProvider {

  /**
   *
   */
  _storeConfig: ReturnType<typeof configureStore> | any;
  //   (this._storeConfig as ReturnType<typeof configureStore>).observable()

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
    if (!StoreServiceProvider.instance) {
      this._storeConfig = configureStore({
        reducer: reducers
      });
      StoreServiceProvider.instance = this;
    }
    return StoreServiceProvider.instance;
  }
}

const instance = new StoreServiceProvider();

const store = instance.storeConfig

store.subscribe(() =>
localSorage.saveLocalStorage(store.getState())
);

export {instance as default };
