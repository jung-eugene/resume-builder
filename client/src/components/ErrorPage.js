// shown when users navigate directly to the resume page
import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className='app'>
            <h3>
                You have not provided your details. Kindly head back to the{" "}
                <Link to='/'>home page</Link>.
            </h3>
        </div>
    )
}