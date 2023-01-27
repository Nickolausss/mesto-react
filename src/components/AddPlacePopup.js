import { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
	const inputTitle = useRef();
	const inputPlace = useRef();

	function handleSubmit(e) {
		e.preventDefault();

		props.onAddPlace({
			name: inputTitle.current.value,
			link: inputPlace.current.value
		})
	}

	return (
		<PopupWithForm
			title="Новое место"
			name="add-card"
			buttonText="Сохранить"
			isOpen={props.isOpen}
			onClose={props.onClose}
			onSubmit={handleSubmit}
		>
			(
			<input id="title-input" type="text" ref={inputTitle} name="title" placeholder="Название" required
				className="popup__item popup__item_input_title" minLength="2" maxLength="30" />
			<span className="title-input-error popup__item-error"></span>
			<input id="place-input" type="url" ref={inputPlace} name="place" placeholder="Ссылка на картинку" required
				className="popup__item popup__item_input_place" />
			<span className="place-input-error popup__item-error"></span>
			)
		</PopupWithForm>
	)
};

export default AddPlacePopup;