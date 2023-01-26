import React from 'react';
import { useEffect, useContext } from 'react';

import { api } from '../utils/api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

import Card from './Card';

function Main(props) {
	const currentUser = useContext(CurrentUserContext);

	useEffect(() => {
		api.getInitialCards()
			.then((cards) => {
				console.log(cards);
				props.cardsStateChange(cards);
			})
			.catch(error => {
				console.log(`Ошибка в методе: getInitialCards: ${error}`);
			})
	}, []);

	return (
		<main className="main">
			<section className="profile page__profile">
				<div className="profile__wrapper">
					<button onClick={props.onEditAvatar} type="button" aria-label="Сменить аватар" className="profile__button-change-avatar"></button>
					<img src={`${currentUser.avatar}`} alt="Фото пользователя" className="profile__avatar" />
					<div className="profile__profile-info">
						<div className="profile__profile-top">
							<h1 className="profile__title">{currentUser.name}</h1>
							<button onClick={props.onEditProfile} type="button" aria-label="Редактировать профиль" className="profile__edit-button"></button>
						</div>
						<p className="profile__subtitle">{currentUser.about}</p>
					</div>
				</div>
				<button onClick={props.onAddPlace} type="button" aria-label="Добавить" className="profile__add-button"></button>
			</section>
			<section className="elements page__elements">
				{props.cards.map(card => (
					<Card key={card._id}
						card={card}
						onCardClick={props.onCardClick}
						onCardLike={props.onCardLike}
						onCardDelete={props.onCardDelete}
						onImage={props.onImage}
					/>
				))}
			</section>
		</main>
	)
}

export default Main;