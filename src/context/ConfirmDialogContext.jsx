// ConfirmDialogContext.jsx
import React, { createContext, useContext, useRef } from 'react';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Button } from 'primereact/button';

import { useNotification } from './NotificationContext.jsx';

export const ConfirmDialogContext = createContext();

export const useConfirmDialog = () => useContext(ConfirmDialogContext);

export const ConfirmDialogProvider = ({ children }) => {
  const { activarNotificacion } = useNotification();

  const showConfirmDialog = (options) => {
    const elemento = options.elemento
    confirmDialog({
      ...options,
      group: 'global',
      accept: () => {
        options.accept();
        if (options.toastOnAccept) {
          activarNotificacion({ tipo: 'info', titulo: 'Confirmado', mensaje: `${elemento.idoneo.nombres} y ${elemento.idonea.nombres}, han enviado su solicitud de registro exitosamente.` });
        }
      },
      reject: () => {
        if (options.reject) {
          options.reject();
        }
        if (options.toastOnReject) {
          activarNotificacion({ tipo: 'warn', titulo: 'Rechazado', mensaje: `${elemento.idoneo.nombres} y ${elemento.idonea.nombres}, han cancelado su registro` });
        }
      },
      
    });
  };

  return (
    <ConfirmDialogContext.Provider value={{ showConfirmDialog }}>
      {children}
      <ConfirmDialog group="global" />
    </ConfirmDialogContext.Provider>
  );
};
