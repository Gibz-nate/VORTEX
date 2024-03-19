import { Navbar, Welcome, Footer, Services, Homecard} from "./components";
import { Home, Docs, Wallets, Analysis } from "./pages";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


const App = () => (
  
  <Router>
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Navbar />   
        
      </div>
      <div className="content">
        <Routes>
          <Route exact path="/" element={<Welcome />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Docs" element={<Docs />} />
          <Route path="/Wallets" element={<Wallets />} />
          <Route path="/Analysis" element={<Analysis />} />
          
        </Routes>
      </div>
      <Services /> 
     
      <Footer />
    </div>
  </Router>
);

export default App;






