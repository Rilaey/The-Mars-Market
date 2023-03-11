import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Profile from "./pages/Profile";
import NoPageFound from "./pages/NoPageFound";
import SignIn from "./pages/SignIn";

function App() {
  return (
    <BrowserRouter>
    <Header/>
    <div className="pt-[50px]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NoPageFound />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
      </div> 
    </BrowserRouter>
  );
}

export default App;
