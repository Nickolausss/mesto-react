function PopupWithForm(props) {
	const { title, name, buttonText, isOpen, onClose, onSubmit, isLoading } = props;

	return (
		<div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}>
			<div className="popup__contant">
				<button onClick={onClose} type="button" aria-label="Закрыть" className="popup__close-button"></button>
				<form name={name} onSubmit={onSubmit} className="popup__container">
					<h2 className="popup__title">{title}</h2>
					{props.children}
					<button type="submit" className="popup__save-button" /*disabled*/>{
						!isLoading ? buttonText : 'Сохранение...'
					}</button>
				</form>
			</div>
		</div>
	)
}

export default PopupWithForm;