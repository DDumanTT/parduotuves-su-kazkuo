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
import { useLoadScript } from "@react-google-maps/api";
import AuctionPage from "./pages/auctions/AuctionPage.jsx";
import LotteryPage from "./pages/LotteryPage";

const libraries = ["places"];

// TODO: protect routes
// TODO: fix routes
export default function App() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY2,
    libraries,
  });

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  if (isLoaded) {
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
              path="shops"
              element={<RequireAuth allowedRoles={["Admin"]} />}
            >
              <Route index element={<ShopsPage />} />
              <Route path="create" element={<ShopsCreate />} />
              <Route path="edit/:shopId" element={<ShopsEdit />} />
            </Route>

            <Route
              path="users"
              element={<RequireAuth allowedRoles={["Admin"]} />}
            >
              <Route index element={<UsersPage />} />
              <Route path="create" element={<UsersCreate />} />
              <Route path="edit/:shopId" element={<UsersEdit />} />
            </Route>

            <Route
              path="auctions"
              element={<RequireAuth allowedRoles={["Admin", "User"]} />}
            >
              <Route index element={<AuctionPage />} />
            </Route>

            <Route path="lottery" element={<LotteryPage />} />
            <Route path="about" element={<AboutPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    );
  }
  return <></>;
}
