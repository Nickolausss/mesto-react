import React from 'react';
import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

import Card from './Card';

function Main(props) {
	const {
		cards,
		onEditProfile,
		onAddPlace,
		onEditAvatar,
		onImage,
		onDeleteConfirm,
		onCardDeleteClick,
		onCardClick,
		onCardLike,
		onCardDelete,
	} = props;

	const currentUser = useContext(CurrentUserContext);

	return (
		<main className="main">
			<section className="profile page__profile">
				<div className="profile__wrapper">
					<button onClick={onEditAvatar} type="button" aria-label="Сменить аватар" className="profile__button-change-avatar"></button>
					<img src={`${currentUser.avatar}`} alt="Фото пользователя" className="profile__avatar" />
					<div className="profile__profile-info">
						<div className="profile__profile-top">
							<h1 className="profile__title">{currentUser.name}</h1>
							<button onClick={onEditProfile} type="button" aria-label="Редактировать профиль" className="profile__edit-button"></button>
						</div>
						<p className="profile__subtitle">{currentUser.about}</p>
					</div>
				</div>
				<button onClick={onAddPlace} type="button" aria-label="Добавить" className="profile__add-button"></button>
			</section>
			<section className="elements page__elements">
				{cards.map(card => (
					<Card key={card._id}
						card={card}
						onCardDeleteClick={onCardDeleteClick}
						onCardClick={onCardClick}
						onCardLike={onCardLike}
						onCardDelete={onCardDelete}
						onImage={onImage}
						onDeleteConfirm={onDeleteConfirm}
					/>
				))}
			</section>
		</main>
	)
}

export default Main;