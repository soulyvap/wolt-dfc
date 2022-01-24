import {FC} from "react";
import Calculator from "./components/Calculator";
import './App.css';

const App: FC = () => {
  return (
    <>
      <img src={require("./assets/background-mobile.jpg")} alt="banner" />
      <Calculator />
    </>
  )
}

export default App