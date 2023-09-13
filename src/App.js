import "./App.css";
import Loader from "./components/Loader/Loader";
import { useState } from "react";

function App() {
  const [modalShow, setModalShow] = useState(true);
  return (
    <div className="App">
      <Loader />
    </div>
  );
}

export default App;
