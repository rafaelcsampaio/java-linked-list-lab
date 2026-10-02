import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home/Home";
import Theory from "./pages/Theory/Theory";
import Simulator from "./pages/Simulator/Simulator";
import CodeVisualizer from "./pages/CodeVisualizer/CodeVisualizer";
import Generics from "./pages/Generics/Generics";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/teoria" element={<Theory />} />
                <Route path="/simulador" element={<Simulator />} />
                <Route path="/codigo" element={<CodeVisualizer />} />
                <Route path="/generics" element={<Generics />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;