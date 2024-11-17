// React router imports
import { Link } from "react-router-dom";


const Public = () => {

  const content = (
    <section className="public-section">
			<header>
				<h1>Welcome to <span className="nowrap">Company!</span></h1>
			</header>
			<main className="public-main">
				<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut ducimus expedita labore tempora magnam temporibus.</p>
				<address className="public-address">
					Company Name<br />
					Street Name, 123<br />
					City Name, State - Postal Code<br />
					<a href="tel:+15555555555">(123) 456-7890</a>
				</address>
				<br />
				<p>Owner: Owner Name</p>
			</main>
			<footer>
				<Link to="/login">Employee Login</Link>
			</footer>
    </section>

  )
  return content
}

export default Public