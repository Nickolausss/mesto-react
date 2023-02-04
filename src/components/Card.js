import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card(props) {
	const { card, onCardDeleteClick, onCardClick, onCardLike, onImage, onDeleteConfirm } = props;
	const currentUser = useContext(CurrentUserContext);

	const isOwn = card.owner._id === currentUser._id;
	const isLiked = card.likes.some(i => i._id === currentUser._id);

	const cardLikeButtonClassName = (
		`element__button-like ${isLiked && 'button__like_active'}`
	);

	const handleLikeClick = () => onCardLike(card);
	const handleImageClick = () => {
		onImage();
		onCardClick(card);
	};
	const handleDeleteClick = () => {
		onDeleteConfirm();
		onCardDeleteClick(card._id);
	};

	return (
		<article className="element">
			{isOwn && <button type="button" className="element__button-trash" onClick={handleDeleteClick}></button>}
			<img src={`${card.link}`} onClick={handleImageClick} alt={card.name} className="element__image" />
			<div className="element__wrapper">
				<h2 className="element__title">{card.name}</h2>
				<div className="element__like-wrapper">
					<button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
					<span className="element__like-counter">{card.likes.length}</span>
				</div>
			</div>
		</article>
	)
}

export default Card;