import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Menu from "./pages/Menu.jsx";
import Customize from "./pages/CharacterCustomization.jsx"
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/customize/:gender" element={<Customize />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
