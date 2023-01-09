function ImagePopup(props) {

	return (
		<div className={`popup popup_type_image ${props.isOpen}`}>
			<div className="popup__image-content">
				<button onClick={props.onClose} type="button" aria-label="Закрыть" className="popup__close-button"></button>
				<img src={props.card.link} className="popup__image" />
				<p className="popup__image-subtitle">{props.card.name}</p>
			</div>
		</div>
	)
}

export default ImagePopup;