import {
    HashRouter,
    Route,
    Routes
} from "react-router-dom";

import Home from "./pages/Home/Home";
import LinkedLists from "./pages/LinkedLists/LinkedLists";
import Theory from "./pages/Theory/Theory";
import Simulator from "./pages/Simulator/Simulator";
import CodeVisualizer from "./pages/CodeVisualizer/CodeVisualizer";
import Generics from "./pages/Generics/Generics";

import Stack from "./pages/Stack/Stack";
import StackTheory from "./pages/Stack/StackTheory";
import StackSimulator from "./pages/Stack/StackSimulator";
import StackCode from "./pages/Stack/StackCode";
import StackGenerics from "./pages/Stack/StackGenerics";

import Queue from "./pages/Queue/Queue";
import QueueTheory from "./pages/Queue/QueueTheory";
import QueueSimulator from "./pages/Queue/QueueSimulator";
import QueueCode from "./pages/Queue/QueueCode";
import QueueGenerics from "./pages/Queue/QueueGenerics";

import Tree from "./pages/Tree/Tree";
import TreeTheory from "./pages/Tree/TreeTheory";
import TreeSimulator from "./pages/Tree/TreeSimulator";
import TreeCode from "./pages/Tree/TreeCode";
import TreeGenerics from "./pages/Tree/TreeGenerics";

function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/listas" element={<LinkedLists />} />
                <Route path="/teoria" element={<Theory />} />
                <Route path="/simulador" element={<Simulator />} />
                <Route path="/codigo" element={<CodeVisualizer />} />
                <Route path="/generics" element={<Generics />} />

                <Route path="/pilhas" element={<Stack />} />
                <Route path="/pilhas/teoria" element={<StackTheory />} />
                <Route path="/pilhas/simulador" element={<StackSimulator />} />
                <Route path="/pilhas/codigo" element={<StackCode />} />
                <Route path="/pilhas/generics" element={<StackGenerics />} />

                <Route path="/filas" element={<Queue />} />
                <Route path="/filas/teoria" element={<QueueTheory />} />
                <Route path="/filas/simulador" element={<QueueSimulator />} />
                <Route path="/filas/codigo" element={<QueueCode />} />
                <Route path="/filas/generics" element={<QueueGenerics />} />

                <Route path="/arvores" element={<Tree />} />
                <Route path="/arvores/teoria" element={<TreeTheory />} />
                <Route path="/arvores/simulador" element={<TreeSimulator />} />
                <Route path="/arvores/codigo" element={<TreeCode />} />
                <Route path="/arvores/generics" element={<TreeGenerics />} />
            </Routes>
        </HashRouter>
    );
}

export default App;
