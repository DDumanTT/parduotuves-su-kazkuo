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
import UsersPage from "./pages/users/UsersPage";
import UsersCreate from "./pages/users/UsersCreate";
import UsersEdit from "./pages/users/UsersEdit";
import AuctionPage from "./pages/auctions/AuctionPage.jsx";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<LoginLayout />}>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route path="/*" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route
            path="auctions"
            element={
              <RequireAuth allowedRoles={["Admin", "User"]}>
                <AuctionPage />
              </RequireAuth>
            }
          />
          <Route path="shops">
            <Route
              index
              element={
                <RequireAuth allowedRoles={["Admin"]}>
                  <ShopsPage />
                </RequireAuth>
              }
            />
            <Route path="create" element={<ShopsCreate />} />
            <Route path="edit/:shopId" element={<ShopsEdit />} />
          </Route>
          <Route path="users">
            <Route
              index
              element={
                <RequireAuth allowedRoles={["Admin"]}>
                  <UsersPage />
                </RequireAuth>
              }
            />
            <Route path="create" element={<UsersCreate />} />
            <Route path="edit/:shopId" element={<UsersEdit />} />
          </Route>
          <Route path="about" element={<AboutPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
