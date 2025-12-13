import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Details from "./pages/Detail"

function App() {
  return (
    <>
      <Routes>
        <Route path="/dashboard" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/detail" element={<Details />}/>
      </Routes>
    </>
  )
}

export default App
