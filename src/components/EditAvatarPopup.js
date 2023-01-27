import { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
	const inputElement = useRef();

	function handleSubmit(e) {
		e.preventDefault();

		props.onUpdateAvatar({
			avatar: inputElement.current.value,
		});
	};

	return (
		<PopupWithForm
			title="Обновить аватар"
			name="change-avatar"
			buttonText="Сохранить"
			isOpen={props.isOpen}
			onClose={props.onClose}
			onSubmit={handleSubmit}
		>
			(
			<input id="avatar-input" type="url" ref={inputElement} name="avatar" placeholder="Ссылка на новый аватар" required
				className="popup__item popup__item_input_avatar" />
			<span className="avatar-input-error popup__item-error"></span>
			)
		</PopupWithForm>
	)
};

export default EditAvatarPopup;