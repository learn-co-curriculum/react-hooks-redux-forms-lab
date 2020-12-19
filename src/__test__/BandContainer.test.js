import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import BandContainer from "../features/bands/BandsContainer";
import { bandsAdded } from "../features/bands/bandsSlice";
import store from "./store";

store.dispatch(bandsAdded("test 1"));
store.dispatch(bandsAdded("test 2"));

test("renders each band name from the store", () => {
  render(
    <Provider store={store}>
      <BandContainer />
    </Provider>
  );

  expect(screen.queryByText("test 1")).toBeInTheDocument();
  expect(screen.queryByText("test 2")).toBeInTheDocument();
});
