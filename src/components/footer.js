const Footer = () => {
	return (
		<footer className="footer">
			<div className="container">
				<div className="row">
					<div className="col-lg-3 col-md-6 col-sm-6">
						<div className="footer__about">
							<div className="footer__logo">
								<a href="#">
									<img src="/img/footer-logo.png" alt="" />
								</a>
							</div>
							<p>
								Discover and unbox luxury products at exclusive prices on the
								world’s most entertaining shopping platform.
							</p>
							<a href="#">
								<img src="/img/payment.png" alt="" />
							</a>
						</div>
					</div>
					<div className="col-lg-2 offset-lg-3 col-md-3 col-sm-6">
						<div className="footer__widget">
							<h6>SOCIALS</h6>
							<ul>
								<li>
									<a href="#">Twitter</a>
								</li>
								<li>
									<a href="#">Instagram</a>
								</li>
								<li>
									<a href="#">Facebook</a>
								</li>
								<li>
									<a href="#">Discord</a>
								</li>
							</ul>
						</div>
					</div>
					<div className="col-lg-2 col-md-3 col-sm-6">
						<div className="footer__widget">
							<h6>Information</h6>
							<ul>
								<li>
									<a href="#">Help</a>
								</li>
								<li>
									<a href="#">Shipping</a>
								</li>
								<li>
									<a href="#">Returns</a>
								</li>
								<li>
									<a href="#">Contact</a>
								</li>
							</ul>
						</div>
					</div>
					<div className="col-lg-2 col-md-3 col-sm-6">
						<div className="footer__widget">
							<h6>Legal</h6>
							<ul>
								<li>
									<a href="#">Fairness</a>
								</li>
								<li>
									<a href="#">Terms Of Service</a>
								</li>
								<li>
									<a href="#">Privacy Policy</a>
								</li>
								<li>
									<a href="#">Cookies</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-12 text-center">
						<div className="footer__copyright__text">
							<p>Copyright © 2022 All rights reserved Luxy</p>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
