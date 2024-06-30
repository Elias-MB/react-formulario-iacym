import React, { createContext, useContext, useRef } from 'react';

import { Toast } from "primereact/toast";

export const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const toastGlobal = useRef(null);

  const activarNotificacion = (response) => {
    const duracion = response.duracion || 4000;
    if (response && toastGlobal.current) {
      toastGlobal.current.show({
        severity: response["tipo"],
        summary: response["titulo"],
        detail: response["mensaje"],
        life: duracion,
      });
    }
  };

  return (
    <NotificationContext.Provider value={{ toastGlobal, activarNotificacion }}>
      {children}
      <Toast ref={toastGlobal} position='top-center' />
    </NotificationContext.Provider>
  );
};
