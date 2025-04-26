import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/globals.css";
import { registerSW } from 'virtual:pwa-register'

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm('has new version, update now?')) {
      updateSW()
    }
  },
  onOfflineReady() {
    console.log('app is ready for offline work')
  },
})

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <App />
);
