"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

type QrContextType = {
  urls: string[];
  addUrl: (url: string) => void;
};

const QrContext = createContext<QrContextType | undefined>(undefined);

export const QrProvider = ({ children }: { children: ReactNode }) => {
  const [urls, setUrls] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("qrHistory");
    if (saved) {
      setUrls(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("qrHistory", JSON.stringify(urls));
  }, [urls]);
  const addUrl = (url: string) => {
    setUrls((prev) => [...prev, url]);
  };

  return (
    <QrContext.Provider value={{ urls, addUrl }}>{children}</QrContext.Provider>
  );
};

export const useQr = () => {
  const context = useContext(QrContext);
  if (!context) throw new Error("useQr must be used inside QrProvider");
  return context;
};
