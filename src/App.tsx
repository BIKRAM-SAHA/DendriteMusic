import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar/Navbar";
import Search from "./pages/Search";
import Favourites from "./pages/Favourites";
import useAuth from "./utils/keycloak/useAuth";
import styles from "./App.module.scss";

function App() {
  const isLoggedIn = useAuth();
  return (
    <div className={styles.appContainer}>
      {isLoggedIn && (
        <Router>
          <div className={styles.sidebar}>
            <Navbar />
          </div>
          <div className={styles.main}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/favourites" element={<Favourites />} />
            </Routes>
          </div>
        </Router>
      )}
    </div>
  );
}

export default App;
