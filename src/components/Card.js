import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card(props) {
	const currentUser = useContext(CurrentUserContext);

	const isOwn = props.card.owner._id === currentUser._id;
	const isLiked = props.card.likes.some(i => i._id === currentUser._id);

	const cardLikeButtonClassName = (
		`element__button-like ${isLiked && 'button__like_active'}`
	);

	const handleLikeClick = () => props.onCardLike(props.card);
	const handleImageClick = () => {
		props.onImage();
		props.onCardClick(props.card);
	};
	const handleDeleteClick = () => props.onCardDelete(props.card._id);

	return (
		<article className="element">
			{isOwn && <button type="button" className="element__button-trash" onClick={handleDeleteClick}></button>}
			<img src={`${props.card.link}`} onClick={handleImageClick} alt={props.card.name} className="element__image" />
			<div className="element__wrapper">
				<h2 className="element__title">{props.card.name}</h2>
				<div className="element__like-wrapper">
					<button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
					<span className="element__like-counter">{props.card.likes.length}</span>
				</div>
			</div>
		</article>
	)
}

export default Card;