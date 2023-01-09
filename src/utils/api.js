class Api {
	constructor(config) {
		this._baseUrl = config.baseUrl;
		this._headers = config.headers;
	};

	_request(url, options) {
		return fetch(url, options).then(this._checkResponse);
	}

	_checkResponse(res) {
		return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
	}

	getProfileInfo() {
		return this._request(
			`${this._baseUrl}/users/me`,
			{
				headers: this._headers
			}
		)
	};

	getInitialCards() {
		return this._request(
			`${this._baseUrl}/cards`,
			{
				headers: this._headers
			}
		)
	};

	editProfileInfo(inputsValue) {
		return this._request(
			`${this._baseUrl}/users/me`,
			{
				method: 'PATCH',
				headers: this._headers,
				body: JSON.stringify({
					name: inputsValue.name,
					about: inputsValue.description
				})
			}
		)
	};

	addNewCard(inputsValue) {
		return this._request(
			`${this._baseUrl}/cards`,
			{
				method: 'POST',
				headers: this._headers,
				body: JSON.stringify({
					name: inputsValue.title,
					link: inputsValue.place
				})
			}
		)
	};

	deleteCard(id) {
		return this._request(
			`${this._baseUrl}/cards/${id}`,
			{
				method: 'DELETE',
				headers: this._headers
			}
		)
	};

	addLike(id) {
		return this._request(
			`${this._baseUrl}/cards/${id}/likes`,
			{
				method: 'PUT',
				headers: this._headers
			}
		)
	};

	deleteLike(id) {
		return this._request(
			`${this._baseUrl}/cards/${id}/likes`,
			{
				method: 'DELETE',
				headers: this._headers
			}
		)
	};

	changeAvatar(inputValue) {
		return this._request(
			`${this._baseUrl}/users/me/avatar`,
			{
				method: 'PATCH',
				headers: this._headers,
				body: JSON.stringify({
					avatar: inputValue.avatar
				})
			}
		)
	};
};

export const api = new Api({
	baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-54',
	headers: {
		authorization: 'f6cef007-4eef-419c-ad73-606a47e7b588',
		'Content-Type': 'application/json'
	}
});