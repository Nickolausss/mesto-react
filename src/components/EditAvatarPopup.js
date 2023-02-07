import { useEffect } from 'react';
import { useForm } from '../hooks/useForm';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
	const { isOpen, onClose, onUpdateAvatar, onChangeSavingButton, isLoading } = props;

	const { values, handleChange, setValues } = useForm({});
	const { avatar } = values;

	useEffect(() => {
		setValues({});
	}, [isOpen]);

	function handleSubmit(e) {
		e.preventDefault();
		onChangeSavingButton(true);

		onUpdateAvatar({
			avatar: avatar,
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
			isLoading={isLoading}
		>
			(
			<input id="avatar-input" type="url" value={avatar || ''} onChange={handleChange} name="avatar" placeholder="Ссылка на новый аватар" required
				className="popup__item popup__item_input_avatar" />
			<span className="avatar-input-error popup__item-error"></span>
			)
		</PopupWithForm>
	)
};

export default EditAvatarPopup;