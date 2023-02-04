import PopupWithForm from "./PopupWithForm";

function DeleteConfirmPopup(props) {
	const { isOpen, onClose, selectedIdCard, onCardDelete } = props;

	function handleSubmit(e) {
		e.preventDefault();
		onCardDelete(selectedIdCard);
	};

	return (
		<PopupWithForm
			title="Вы уверены?"
			name="confir-delete"
			buttonText="Да"
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit}
		/>
	)
}

export default DeleteConfirmPopup;