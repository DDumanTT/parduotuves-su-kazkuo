import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./providers/AuthProvider";
import RequireAuth from "./components/RequireAuth";
import MainLayout from "./layouts/MainLayout";
import LoginLayout from "./layouts/LoginLayout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ShopsPage from "./pages/shops/ShopsPage";
import ShopsCreate from "./pages/shops/ShopsCreate";
import ShopsEdit from "./pages/shops/ShopsEdit";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<LoginLayout />}>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="shops">
            <Route
              index
              element={
                <RequireAuth allowedRole="Admin">
                  <ShopsPage />
                </RequireAuth>
              }
            />
            <Route path="create" element={<ShopsCreate />} />
            <Route path="edit/:shopId" element={<ShopsEdit />} />
          </Route>
          <Route path="about" element={<AboutPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
