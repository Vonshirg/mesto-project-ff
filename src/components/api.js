const config ={
  baseUrl:'https://nomoreparties.co/v1/wff-cohort-9/',
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
 return fetch('https://nomoreparties.co/v1/wff-cohort-9/cards', {
  headers: config.headers
})
.then(requestVerification)
}

