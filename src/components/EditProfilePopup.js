import { useEffect, useContext } from 'react';
import { useForm } from '../hooks/useForm.js';

import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup(props) {
	const { isOpen, onClose, onUpdateUser, onChangeSavingButton, isLoading } = props;
	const currentUser = useContext(CurrentUserContext);

	const { values, handleChange, setValues } = useForm({});
	const { name, description } = values;

	useEffect(() => {
		setValues({
			name: currentUser.name,
			description: currentUser.about
		});
	}, [currentUser, isOpen]);

	function handleSubmit(e) {
		e.preventDefault();
		onChangeSavingButton(true);

		onUpdateUser({
			name: name,
			description: description,
		});
	};

	return (
		<PopupWithForm
			title="Редактировать профиль"
			name="profile-edit"
			buttonText="Сохранить"
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit}
			isLoading={isLoading}
		>
			(
			<input id="name-input" type="text" value={name || ''} onChange={handleChange} name="name" placeholder="Ваше имя" required
				className="popup__item popup__item_input_name" minLength="2" maxLength="40" />
			<span className="name-input-error popup__item-error"></span>
			<input id="description-input" type="text" value={description || ''} onChange={handleChange} name="description" placeholder="Род деятельности" required
				className="popup__item popup__item_input_description" minLength="2" maxLength="200" />
			<span className="description-input-error popup__item-error"></span>
			)
		</PopupWithForm>
	)
};

export default EditProfilePopup;