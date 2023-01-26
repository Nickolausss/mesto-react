import React from 'react';
import { useState, useEffect } from 'react';

import { api } from '../utils/api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});

  const [currentUser, setCurrentUser] = useState({});

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);

  useEffect(() => {
    api.getProfileInfo()
      .then(result => {
        setCurrentUser(result);
      })
      .catch(error => {
        console.log(`Ошибка в методе getProfileInfo: ${error}`);
      })
  }, []);

  const openEditProfilePopup = () => setIsEditProfilePopupOpen(true);
  const openAddPlacePopupOpen = () => setIsAddPlacePopupOpen(true);
  const openEditAvatarPopupOpen = () => setIsEditAvatarPopupOpen(true);
  const openImagePopupOpen = () => setIsImagePopupOpen(true);

  function setCardsState(data) {
    setCards(data);
  };

  function handleCardClick(card) {
    setSelectedCard({
      link: card.link,
      name: card.name
    });
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then(newCard => {
        setCards((state) => state.map(c => c._id === card._id ? newCard : c));
      })
      .catch(err => {
        console.log(`Ошибка в методе changeLikeCardStatus: ${err}`);
      })
  };

  function handleCardDelete(id) {
    api.deleteCard(id)
      .then(res => {
        setCards((state) => state.filter(c => c._id !== id && c));
      })
      .catch(err => {
        console.log(`Ошибка в методе deleteCard: ${err}`);
      })
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          cards={cards}
          cardsStateChange={setCardsState}

          onEditProfile={openEditProfilePopup}
          onAddPlace={openAddPlacePopupOpen}
          onEditAvatar={openEditAvatarPopupOpen}
          onImage={openImagePopupOpen}

          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Footer />
        <PopupWithForm
          title="Редактировать профиль"
          name="profile-edit"
          buttonText="Сохранить"
          isOpen={isEditProfilePopupOpen && 'popup_opened'}
          onClose={closeAllPopups}
        >
          (
          <input id="name-input" type="text" name="name" placeholder="Ваше имя" required
            className="popup__item popup__item_input_name" minLength="2" maxLength="40" />
          <span className="name-input-error popup__item-error"></span>
          <input id="description-input" type="text" name="description" placeholder="Род деятельности" required
            className="popup__item popup__item_input_description" minLength="2" maxLength="200" />
          <span className="description-input-error popup__item-error"></span>
          )
        </PopupWithForm>
        <PopupWithForm
          title="Новое место"
          name="add-card"
          buttonText="Сохранить"
          isOpen={isAddPlacePopupOpen && 'popup_opened'}
          onClose={closeAllPopups}
        >
          (
          <input id="title-input" type="text" name="title" placeholder="Название" required
            className="popup__item popup__item_input_title" minLength="2" maxLength="30" />
          <span className="title-input-error popup__item-error"></span>
          <input id="place-input" type="url" name="place" placeholder="Ссылка на картинку" required
            className="popup__item popup__item_input_place" />
          <span className="place-input-error popup__item-error"></span>
          )
        </PopupWithForm>
        <PopupWithForm
          title="Обновить аватар"
          name="change-avatar"
          buttonText="Сохранить"
          isOpen={isEditAvatarPopupOpen && 'popup_opened'}
          onClose={closeAllPopups}
        >
          (
          <input id="avatar-input" type="url" name="avatar" placeholder="Ссылка на новый аватар" required
            className="popup__item popup__item_input_avatar" />
          <span className="avatar-input-error popup__item-error"></span>
          )
        </PopupWithForm>
        <PopupWithForm
          title="Вы уверены?"
          name="confir-delete"
        >
          (
          <button type="button" className="popup__save-button">Да</button>
          )
        </PopupWithForm>
        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen && 'popup_opened'}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
