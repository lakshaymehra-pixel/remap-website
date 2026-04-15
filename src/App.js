import React, { useEffect, createContext, useState, useContext } from "react";
import "./App.css";
import AOS from "aos";
import "aos/dist/aos.css";
import Router from "./Router";
import { HelmetProvider } from "react-helmet-async";

// Global site settings context
export const SiteCtx = createContext({ logoUrl: '', faviconUrl: '' });
export const useSiteSettings = () => useContext(SiteCtx);

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:4500';

const App = () => {
  const [siteSettings, setSiteSettings] = useState({ logoUrl: '', faviconUrl: '' });

  useEffect(() => {
    AOS.init();
    // Fetch site settings (logo + favicon)
    fetch(`${API_BASE}/api/site-settings/public`)
      .then(r => r.json())
      .then(data => {
        setSiteSettings({ logoUrl: data.logoUrl || '', faviconUrl: data.faviconUrl || '' });
        // Dynamically set favicon
        if (data.faviconUrl) {
          const link = document.querySelector("link[rel='icon']") || document.createElement('link');
          link.rel = 'icon';
          link.href = data.faviconUrl;
          document.head.appendChild(link);
        }
      })
      .catch(() => {});
  }, []);

  const showmessage = async (message) => {
    try {
      var x = document.getElementById("snackbar");
      x.className = "show";
      x.innerText = message;
      setTimeout(function () {
        x.className = x.className.replace("show", "");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SiteCtx.Provider value={siteSettings}>
      <HelmetProvider>
        <Router />
      </HelmetProvider>
    </SiteCtx.Provider>
  );
};

export default App;
