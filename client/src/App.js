import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Resume from "./components/Resume";

const App = () => {
    // React state that holds result sent from Node.js server
    const [result, setResult] = useState({});

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    {/*-- setResult updates the value of result once the form is submitted and request is successful --*/}
                    <Route path='/' element={<Home setResult = {setResult}/>} />
                    {/*-- result contains the response retrieved from server --*/}
                    <Route path='/resume' element={<Resume result = {result}/>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;