Необходимо получить данные от сервера .json (fetch)
Вывести фильмы (в json файле массив results) в виде таблицы или списка:
Название
  свойство title
Рейтинг
  свойство vote_average
Картинка
  свойство posterPath 
  адрес картинки posterCommonPath+posterPath
  const posterCommonPath = 'http://image.tmdb.org/t/p/w300';
Описание:
  свойство overview
Посмотреть позже:
  чекбокс, который можно выбрать
По нажатию на чекбокс Посмотреть позже в LocalStorage сохраняются отобранные фильмы (id-шники)
При перезагрузке страницы фильмы остаются выбранными (данные берется из LocalStorage)

Запустить сервер:
node server.js

LocalStorage
https://tproger.ru/articles/localstorage/
Fetch (получение данных)
https://learn.javascript.ru/fetch
# lb5
