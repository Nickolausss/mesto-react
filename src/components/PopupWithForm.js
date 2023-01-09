function PopupWithForm(props) {
	return (
		<div className={`popup popup_type_${props.name} ${props.isOpen}`}>
			<div className="popup__contant">
				<button onClick={props.onClose} type="button" aria-label="Закрыть" className="popup__close-button"></button>
				<form name={props.name} className="popup__container" noValidate>
					<h2 className="popup__title">{props.title}</h2>
					{props.children}
				</form>
			</div>
		</div>
	)
}

export default PopupWithForm;