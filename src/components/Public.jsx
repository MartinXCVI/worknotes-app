// React router imports
import { Link } from "react-router-dom";

// Font awesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";



const Public = () => {

  const content = (
    <section className="public-section">
			<header>
				<h1>Welcome to <span className="nowrap">WorkNotes</span></h1>
			</header>
			<main className="public-main">
				<p>This is simply and nothing more than just a brief and effective description of what the company is actually about</p>
				<address className="public-address">
					Company Name<br />
					Street Name, 123<br />
					City Name, State - Postal Code<br />
					<a href="tel:+15555555555">(123) 456-7890</a>
				</address>
				<br />
				<p>Owner: MartinXCVI</p>
			</main>
			<footer>
				<Link to="/login" className="login-btn">Employee Login <FontAwesomeIcon icon={faRightToBracket} /></Link>
			</footer>
    </section>

  )
  return content
}

export default Public