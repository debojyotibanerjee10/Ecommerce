import './App.css';
import Footer from './layout/Footer';
import Header from "./layout/Header"
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Home from "./components/Home"
function App() {
  return (
  <>
  <Router>
      <Header/>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
      </Routes>
      <Footer/>
  </Router>
  </>
  );
}

export default App;
