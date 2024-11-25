"use client";
import FinanceContextProvider from "@/store/finance-context";

import React from "react";
import "@/styles/globals.css";

import Nav from "@/components/Navigation";

export default function App({ Component, pageProps }) {
  return (
    <FinanceContextProvider>
      <Nav />
      <Component {...pageProps} />
    </FinanceContextProvider>
  );
}
