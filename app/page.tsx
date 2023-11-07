"use client";

import { Provider } from "react-redux";

import App from "@/components/App";

import store from "@/store/store";

export default function Page() {
  return (
    <>
      <Provider store={store}>
        <App />
      </Provider>
    </>
  );
}
