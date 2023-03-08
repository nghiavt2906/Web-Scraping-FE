import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";

const MockProvider = ({ children, isAuth }) => {
  const initialState = {
    user: {
      authenticated: isAuth,
      username: isAuth ? "test" : "",
      accessToken: isAuth ? "abcd" : "",
      submittedReport: null,
      isProcessing: false,
    },
  };
  const mockStore = configureStore();
  const store = mockStore(initialState);

  return (
    <Provider store={store}>
      <Router>{children}</Router>
    </Provider>
  );
};

export default MockProvider;
