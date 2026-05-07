import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import { ErrorBoundary } from "./components/common/ErrorPage";
import { router } from "./routes/AppRouter";

function App() {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
      <Toaster />
    </ErrorBoundary>
  );
}

export default App;
