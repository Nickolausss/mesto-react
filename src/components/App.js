import React from 'react';
import { useState, useEffect } from 'react';

import { api } from '../utils/api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});

  const [currentUser, setCurrentUser] = useState({});

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const isOpen = isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen || isImagePopupOpen;

  useEffect(() => {
    Promise.all([api.getProfileInfo(), api.getInitialCards()])
      .then(([userData, cards]) => {
        setCurrentUser(userData);

        console.log(cards);
        setCards(cards);
      })
      .catch(err => {
        console.log(`Ошибка в Promise.all: getProfileInfo, getInitialCards: ${err}`);
      })
  }, []);

  useEffect(() => {
    function closeByEscape(e) {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen]);

  const openEditProfilePopup = () => setIsEditProfilePopupOpen(true);
  const openAddPlacePopupOpen = () => setIsAddPlacePopupOpen(true);
  const openEditAvatarPopupOpen = () => setIsEditAvatarPopupOpen(true);
  const openImagePopupOpen = () => setIsImagePopupOpen(true);

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

  function handleUpdateUser(data) {
    api.editProfileInfo(data)
      .then(dataUser => {
        setCurrentUser(dataUser);
        closeAllPopups();
      })
      .catch(err => {
        console.log(`Ошибка в методе editProfileInfo: ${err}`);
      })
      .finally(() => {
        renderLoading(false);
      })
  };

  function handleUpdateAvatar(data) {
    api.changeAvatar(data)
      .then(dataUser => {
        setCurrentUser(dataUser);
        closeAllPopups();
      })
      .catch(err => {
        console.log(`Ошибка в методе changeAvatar: ${err}`);
      })
      .finally(() => {
        renderLoading(false);
      })
  };

  function handleAddPlaceSubmit(data) {
    api.addNewCard(data)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => {
        console.log(`Ошибка в методе addNewCard: ${err}`);
      })
      .finally(() => {
        renderLoading(false);
      })
  };

  function renderLoading(state) {
    if (state) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          cards={cards}

          onEditProfile={openEditProfilePopup}
          onAddPlace={openAddPlacePopupOpen}
          onEditAvatar={openEditAvatarPopupOpen}
          onImage={openImagePopupOpen}

          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          onChangeSavingButton={renderLoading}
          isLoading={isLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          onChangeSavingButton={renderLoading}
          isLoading={isLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          onChangeSavingButton={renderLoading}
          isLoading={isLoading}
        />
        <PopupWithForm
          title="Вы уверены?"
          name="confir-delete"
          buttonText="Да"
        />
        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
