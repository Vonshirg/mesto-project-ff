const config ={
  adress:'https://nomoreparties.co/v1/wff-cohort-9/',
  headers: {
    authorization:'0b5f05b3-1357-4268-9928-448ed3a20ff3',
    'Content-Type': 'application/json',
  }
};

function requestVerification(res){
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка:${res.status}`);
};

export function getCards(){
 return fetch(`${config.adress}cards`, {
  headers: config.headers
})
.then(requestVerification)
};

export function getUser(){
  return fetch(`${config.adress}users/me`, {
    headers: config.headers
  })
  .then(requestVerification)
  };

  export function  editProfile(name, description){
    return fetch(`${config.adress}users/me`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        name: `${name}`,
        about: `${description}`
      })
   })
   .then(requestVerification)
   };

   export function  postCard(name, adress){
    return fetch(`${config.adress}cards`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify({
        name: `${name}`,
        link: `${adress}`
      })
   })
   .then(requestVerification)
   };

   export const deleteServerCard = (cardId) => {
    return fetch(`${config.adress}cards/${cardId}`, {
      method: 'DELETE',
      headers: config.headers
    })
      .then(requestVerification)
  }




