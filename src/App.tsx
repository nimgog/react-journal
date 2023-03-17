import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";

function App() {
  return (
  <Routes>
    <Route path="/" element={<h1>Hi</h1>}/>
    <Route path="/new" element={<h1>New</h1>}/>
    <Route path="/:id">
      <Route index element={ <h1>Show</h1> }></Route>
      <Route path="edit" element={ <h1>Edit</h1>}></Route>
    </Route>
    <Route path="*" element={<Navigate to={"/"} />}/>
  </Routes>
  )
}

export default App;
