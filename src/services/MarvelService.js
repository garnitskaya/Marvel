class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=79716fd15a414c8591c4ad962265a56d';
    _baseOffset = 210;

    getResource = async (url) => {//async показывает что это будет асинхронный код
        let res = await fetch(url);//посылаем запрос на сервер (await заставит интерпретатор JavaScript ждать до тех пор, пока промис справа от await не выполнится. )

        if (!res.ok) {// если с запросом  что то не так пошло 
            throw new Error(`Could not fetch ${url}, status:${res.status}`);// выкидываем ошибку
        }

        return await res.json(); // возвращаем промис и трасформируем объект в json
    }

    getAllCharacters = async (offset = this._baseOffset) => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);//что бы переменная сформировалась т.к. асинхронная операция, указываем async/await
        return res.data.results.map(this._transformCharacter);//в map передаем callback ф-цию, которая будет чтото делать с каждым эл который приходит к ней по очеди с res и формировать массив с объектами
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 200)}...` : 'There is no description for this character',
            thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }
}

export default MarvelService;