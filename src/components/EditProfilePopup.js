import { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup(props) {
	const { isOpen, onClose, onUpdateUser } = props;
	const currentUser = useContext(CurrentUserContext);

	const [name, setName] = useState('');
	const [description, setDescription] = useState('');

	useEffect(() => {
		setName(currentUser.name);
		setDescription(currentUser.about);
	}, [currentUser]);

	const handleNameChange = e => setName(e.target.value);
	const handleDescriptionChange = e => setDescription(e.target.value);

	function handleSubmit(e) {
		e.preventDefault();

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
		>
			(
			<input id="name-input" type="text" value={name || ''} onChange={handleNameChange} name="name" placeholder="Ваше имя" required
				className="popup__item popup__item_input_name" minLength="2" maxLength="40" />
			<span className="name-input-error popup__item-error"></span>
			<input id="description-input" type="text" value={description || ''} onChange={handleDescriptionChange} name="description" placeholder="Род деятельности" required
				className="popup__item popup__item_input_description" minLength="2" maxLength="200" />
			<span className="description-input-error popup__item-error"></span>
			)
		</PopupWithForm>
	)
};

export default EditProfilePopup;