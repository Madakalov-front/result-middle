import {  useState } from "react";
import "./App.css";
import { AuthForm, WelcomeBack } from "./components";



function App() {
    const [isAuth, setIsAuth] = useState<boolean>(false);
    
  return (
    <>
      {isAuth ? (
        <WelcomeBack />
      ) : (
        <AuthForm setIsAuth={setIsAuth} />
      )}
    </>
  );
}

export default App;
