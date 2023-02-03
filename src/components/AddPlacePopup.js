import { useForm } from '../hooks/useForm';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
	const { isOpen, onClose, onAddPlace, onChangeSavingButton, isLoading } = props;

	const { values, handleChange, setValues } = useForm({});
	const { title, place } = values;

	function handleSubmit(e) {
		e.preventDefault();
		onChangeSavingButton(true);

		onAddPlace({
			name: title,
			link: place
		});

		setValues({});
	}

	return (
		<PopupWithForm
			title="Новое место"
			name="add-card"
			buttonText="Сохранить"
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit}
			isLoading={isLoading}
		>
			(
			<input id="title-input" type="text" value={title || ''} onChange={handleChange} name="title" placeholder="Название" required
				className="popup__item popup__item_input_title" minLength="2" maxLength="30" />
			<span className="title-input-error popup__item-error"></span>
			<input id="place-input" type="url" value={place || ''} onChange={handleChange} name="place" placeholder="Ссылка на картинку" required
				className="popup__item popup__item_input_place" />
			<span className="place-input-error popup__item-error"></span>
			)
		</PopupWithForm>
	)
};

export default AddPlacePopup;