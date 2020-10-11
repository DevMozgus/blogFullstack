import React from "react";
import { Link } from "react-router-dom";  


const Info = () => {
  return (
    <section className="welcome">
    <img alt="Hello There" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.giphy.com%2Fmedia%2FxTiIzJSKB4l7xTouE8%2Fgiphy.gif&f=1&nofb=1" id="helloThere"/>
    <h3>Welcome to my MERN stack application!</h3>
    <p>To create a blog you must sign up. However, a sign up doesn't require any personal information. Sign up and then test the app!</p>
    <Link to="/signup">Sign up</Link>
    <Link to="/blogs">Continue without signup</Link>
    </section>
    )
}

export default Info