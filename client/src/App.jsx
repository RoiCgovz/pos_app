import { BrowserRouter, Routes, Route } from "react-router-dom";

// Customer Pages
import Home from "./pages/customer/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Customer */}
        <Route path="/" element={<Home />} />
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;