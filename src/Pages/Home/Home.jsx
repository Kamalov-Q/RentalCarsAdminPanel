import { Link } from "react-router-dom";
import "./Home.css";
/*token = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTczNzkzNTUtZDNjYi00NzY1LTgwMGEtNDZhOTU1NWJiOWQyIiwidG9rZW5fdHlwZSI6ImFjY2VzcyIsImlhdCI6MTcyMTYyOTQ3OCwiZXhwIjoxNzUzMTY1NDc4fQ.e-8zaLJznkHRDLrizMvuiFoMy6NvAFZjDNzSao5iRYs */
const Home = () => {
  return (
    <div className="Home container w-100 vh-100 d-flex justify-content-center align-items-center flex-column">
      <h1>Welcome To The Home Page</h1>
      <Link to={'..'} style={{textDecoration: "none", color: "blue", fontSize: "30px"}}>Go Back</Link>
    </div>
  );
};

export default Home;
