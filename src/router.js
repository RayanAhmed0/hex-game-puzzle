import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import App from "./App";
import gamepage from "./gamepage";


const AppRouter =() =>{

    return(
        <Router>
            <Routes>
                <Route exact path="/" Component={App}/>
                <Route  path="/game" Component={gamepage}/>

            </Routes>
        </Router>
    )
}
export default AppRouter