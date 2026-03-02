import { useEffect, useState } from "react";
import "./App.css";
import { Signin, Signup } from "./components";

const handleFormData = (data: FormData) => {
  const newData: Record<string, string> = {};

  for (const [key, value] of data.entries()) {
    newData[key] = value instanceof File ? value.name : value;
  }
  return newData;
};

function App() {
  const [formData, setFormData] = useState<Record<string, string> | null>(null);

  const handleSubmitSignin = (data: FormData) => {
    const newData = handleFormData(data);

    setFormData(newData);

    console.log("### - newData", newData);
  };

  const handleSubmitSignup = (data: FormData) => {
    const newData = handleFormData(data);

    setFormData(newData);

    console.log("### - newData", newData);
  };

  useEffect(() => {
    console.log("### - formData", formData);
  }, [formData]);

  return (
    <>
      <div></div>
      <div>
        <Signin onSubmit={handleSubmitSignin} />
        <Signup onSubmit={handleSubmitSignup} />
      </div>
    </>
  );
}

export default App;
