import MainPage from './Components/MainPage/MainPage';
import store from './Store/store';
import { Provider } from 'react-redux';
import ErrorBoundary from './Components/ErrorBoundary/ErrorBoundary';
export default function App() {
  return (
    <Provider store={store}>
      <ErrorBoundary fallback={'Something went wrong!'} >
        <MainPage />
      </ErrorBoundary>
    </Provider>
  );
}