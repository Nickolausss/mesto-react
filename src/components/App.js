import React from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({});

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
  }

  return (
    <div className="page">
      <Header />
      <Main
        onEditProfile={openEditProfilePopup}
        onAddPlace={openAddPlacePopupOpen}
        onEditAvatar={openEditAvatarPopupOpen}
        onImage={openImagePopupOpen}

        isOpenEditProfile={isEditProfilePopupOpen}
        isOpenAddPlace={isAddPlacePopupOpen}
        isOpenEditAvatar={isEditAvatarPopupOpen}
        isOpenImage={isImagePopupOpen}

        card={selectedCard}
        onCardClick={handleCardClick}

        onClose={closeAllPopups}
      />
      <Footer />
    </div>
  );
}

export default App;
