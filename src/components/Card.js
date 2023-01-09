function Card(props) {

	return (
		props.cards.map(card => (
			<article key={card._id} className="element">
				<button type="button" className="element__button-trash"></button>
				<img src={`${card.link}`} onClick={() => {
					props.onImage()
					props.onCardClick(card)
				}} className="element__image" />
				<div className="element__wrapper">
					<h2 className="element__title">{card.name}</h2>
					<div className="element__like-wrapper">
						<button type="button" className="element__button-like"></button>
						<span className="element__like-counter">{card.likes.length}</span>
					</div>
				</div>
			</article>
		))
	)
}

export default Card;