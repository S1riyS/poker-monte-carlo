import "bootstrap/dist/css/bootstrap.min.css";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import AppRouter from "src/modules/common/utils/AppRouter";
import Navbar from "./modules/common/components/Navbar";
import store, { persistor } from "./store";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppRouter>
          <Navbar />
          <Toaster position="top-right" />
        </AppRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
