import React from 'react';

import { api } from '../utils/api.js';

import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import Card from './Card';

function Main(props) {

	const [userName, setUserName] = React.useState('');
	const [userDescription, setUserDescription] = React.useState('');
	const [userAvatar, setUserAvatar] = React.useState('');

	const [cards, setCards] = React.useState([]);

	React.useEffect(() => {

		api.getProfileInfo()
			.then(result => {
				setUserName(result.name);
				setUserDescription(result.about);
				setUserAvatar(result.avatar);
			})
			.catch(error => {
				console.log(`Ошибка в getProfileInfo: ${error}`);
			})

		api.getInitialCards()
			.then(result => {
				console.log(result);
				setCards(result);
			})
			.catch(error => {
				console.log(`Ошибка в getInitialCards: ${error}`);
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
				<Card
					cards={cards}
					onCardClick={props.onCardClick}
					onImage={props.onImage}
				/>
			</section>
			<PopupWithForm
				title="Редактировать профиль"
				name="profile-edit"
				children={(
					<>
						<input id="name-input" type="text" name="name" placeholder="Ваше имя" required
							className="popup__item popup__item_input_name" minLength="2" maxLength="40" />
						<span className="name-input-error popup__item-error"></span>
						<input id="description-input" type="text" name="description" placeholder="Род деятельности" required
							className="popup__item popup__item_input_description" minLength="2" maxLength="200" />
						<span className="description-input-error popup__item-error"></span>
						<button type="submit" className="popup__save-button" disabled>Сохранить</button>
					</>
				)}
				isOpen={props.isOpenEditProfile && 'popup_opened'}
				onClose={props.onClose}
			/>
			<PopupWithForm
				title="Новое место"
				name="add-card"
				children={(
					<>
						<input id="title-input" type="text" name="title" placeholder="Название" required
							className="popup__item popup__item_input_title" minLength="2" maxLength="30" />
						<span className="title-input-error popup__item-error"></span>
						<input id="place-input" type="url" name="place" placeholder="Ссылка на картинку" required
							className="popup__item popup__item_input_place" />
						<span className="place-input-error popup__item-error"></span>
						<button type="submit" className="popup__save-button" disabled>Сохранить</button>
					</>
				)}
				isOpen={props.isOpenAddPlace && 'popup_opened'}
				onClose={props.onClose}
			/>
			<PopupWithForm
				title="Обновить аватар"
				name="change-avatar"
				children={(
					<>
						<input id="avatar-input" type="url" name="avatar" placeholder="Ссылка на новый аватар" required
							className="popup__item popup__item_input_avatar" />
						<span className="avatar-input-error popup__item-error"></span>
						<button type="submit" className="popup__save-button" disabled>Сохранить</button>
					</>
				)}
				isOpen={props.isOpenEditAvatar && 'popup_opened'}
				onClose={props.onClose}
			/>
			<PopupWithForm
				title="Вы уверены?"
				name="confir-delete"
				children={(
					<button type="button" className="popup__save-button">Да</button>
				)}
			/>
			<ImagePopup
				card={props.card}
				isOpen={props.isOpenImage && 'popup_opened'}
				onClose={props.onClose}
			/>
		</main>
	)
}

export default Main;