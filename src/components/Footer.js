function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer className="footer page__footer">
			<p className="footer__author">&copy;&nbsp;{`${year}`} Николай</p>
		</footer>
	)
}

export default Footer;