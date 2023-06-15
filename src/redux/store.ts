import { Middleware, configureStore } from "@reduxjs/toolkit";
import favouritesReducer from "./features/favourites/favouritesSlice";

const localStorageMiddleware: Middleware = ({ getState }) => {
  return (next) => (action) => {
    const result = next(action);
    localStorage.setItem(
      "applicationFavourites",
      JSON.stringify(getState() as RootState)
    );
    return result;
  };
};
const reHydrateState = () => {
  if (localStorage.getItem("applicationFavourites") !== null) {
    return JSON.parse(localStorage.getItem("applicationFavourites")!);
  }
};

export const store = configureStore({
  preloadedState: reHydrateState(),
  reducer: { favourites: favouritesReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
