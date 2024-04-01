import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { Navbar, Welcome, Footer, Services, Homecard} from "./components";
import { Home, Docs, Wallets, Analysis } from "./pages";
import { AdminPanel } from "./admin";

const UserLayout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen">
      <Navbar /> 
      <div className="content">
        <Routes>
          <Route exact path="/" element={<Welcome />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Docs" element={<Docs />} />
          <Route path="/Wallets" element={<Wallets />} />
          <Route path="/Analysis" element={<Analysis />} />
        </Routes>
      </div>
      {location.pathname === "/" && <Services />}
      {location.pathname === "/" && <Footer />}
    </div>
  );
};

const AdminLayout = () => (
  <div>
    <Routes>
      <Route path="/" element={<AdminPanel />} />
    </Routes>
  </div>
);

const App = () => (
  <Router>
    <Routes>
      <Route path="/admin/*" element={<AdminLayout />} />
      <Route path="/*" element={<UserLayout />} />
    </Routes>
  </Router>
);

export default App;
