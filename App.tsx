import { Provider } from "react-redux";
import { ScreenSelector } from "./src/components/ScreenSelector";
import { store } from "./src/redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <ScreenSelector />
    </Provider>
  );
}
