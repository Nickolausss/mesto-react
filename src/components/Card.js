function Card(props) {

	return (
		<article className="element">
			<button type="button" className="element__button-trash"></button>
			<img src={`${props.card.link}`} onClick={() => {
				props.onImage()
				props.onCardClick(props.card)
			}} alt={props.card.name} className="element__image" />
			<div className="element__wrapper">
				<h2 className="element__title">{props.card.name}</h2>
				<div className="element__like-wrapper">
					<button type="button" className="element__button-like"></button>
					<span className="element__like-counter">{props.card.likes.length}</span>
				</div>
			</div>
		</article>
	)
}

export default Card;