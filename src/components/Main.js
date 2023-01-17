import React from 'react';
import { useState, useEffect } from 'react';

import { api } from '../utils/api.js';

import Card from './Card';

function Main(props) {

	const [userName, setUserName] = useState('');
	const [userDescription, setUserDescription] = useState('');
	const [userAvatar, setUserAvatar] = useState('');

	const [cards, setCards] = useState([]);

	useEffect(() => {
		Promise.all([api.getProfileInfo(), api.getInitialCards()])
			.then(([userData, cards]) => {
				setUserName(userData.name);
				setUserDescription(userData.about);
				setUserAvatar(userData.avatar);

				console.log(cards);
				setCards(cards);
			})
			.catch(error => {
				console.log(`Ошибка в Promose.all: getProfileInfo и getInitialCards: ${error}`);
			})
	}, [])

	return (
		<main className="main">
			<section className="profile page__profile">
				<div className="profile__wrapper">
					<button onClick={props.onEditAvatar} type="button" aria-label="Сменить аватар" className="profile__button-change-avatar"></button>
					<img src={`${userAvatar}`} alt="Фото пользователя" className="profile__avatar" />
					<div className="profile__profile-info">
						<div className="profile__profile-top">
							<h1 className="profile__title">{userName}</h1>
							<button onClick={props.onEditProfile} type="button" aria-label="Редактировать профиль" className="profile__edit-button"></button>
						</div>
						<p className="profile__subtitle">{userDescription}</p>
					</div>
				</div>
				<button onClick={props.onAddPlace} type="button" aria-label="Добавить" className="profile__add-button"></button>
			</section>
			<section className="elements page__elements">
				{cards.map(card => (
					<Card key={card._id}
						card={card}
						onCardClick={props.onCardClick}
						onImage={props.onImage}
					/>
				))}
			</section>
		</main>
	)
}

export default Main;