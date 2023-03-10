function ImagePopup(props) {
	const { card, isOpen, onClose } = props;

	return (
		<div className={`popup popup_type_image ${isOpen && 'popup_opened'}`}>
			<div className="popup__image-content">
				<button onClick={onClose} type="button" aria-label="Закрыть" className="popup__close-button"></button>
				<img src={card.link} alt={card.name} className="popup__image" />
				<p className="popup__image-subtitle">{card.name}</p>
			</div>
		</div>
	)
}

export default ImagePopup;