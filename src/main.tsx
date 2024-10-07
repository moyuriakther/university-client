import React from "react";
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { Toaster } from "sonner";
import { RouterProvider } from "react-router-dom";
import router from './routes/router.tsx';


const persistor = persistStore(store);

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
    <Toaster />
  </Provider>
</React.StrictMode>
)
