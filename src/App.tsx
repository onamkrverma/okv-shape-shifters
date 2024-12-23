import { BrowserRouter, Route, Routes } from "react-router";
import Intro from "./pages/Intro";
import Game from "./pages/Game";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
