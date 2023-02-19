import "./App.css";
import { Route, Routes } from "react-router-dom";
import DefaultLayout from "./components/containers/default";
import NotFoundPage from "./pages/notFound";
import HomePage from "./pages/home";
import LoginPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/register";
import CreateProductPage from "./pages/product/productCreate";
import { useTypedSelector } from "./hooks/useTypedSelector";

function App() {
  const { isAuth } = useTypedSelector((store) => store.account);

  if (!isAuth) {
    return (
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="create" element={<CreateProductPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    );
  } else {
    return (
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<HomePage />} />
          <Route path="create" element={<CreateProductPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    );
  }
}

export default App;
