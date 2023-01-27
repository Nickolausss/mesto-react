import { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
	const { isOpen, onClose, onUpdateAvatar } = props;
	const inputElement = useRef();

	function handleSubmit(e) {
		e.preventDefault();

		onUpdateAvatar({
			avatar: inputElement.current.value,
		});
	};

	return (
		<PopupWithForm
			title="Обновить аватар"
			name="change-avatar"
			buttonText="Сохранить"
			isOpen={isOpen}
			onClose={onClose}
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