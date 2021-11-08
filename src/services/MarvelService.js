import { useHttp } from './../hooks/http.hook';

const useMarvelService = () => {
    const { loading, request, error, clearError } = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=79716fd15a414c8591c4ad962265a56d';
    const _baseOffset = 210;

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);//что бы переменная сформировалась т.к. асинхронная операция, указываем async/await
        return res.data.results.map(_transformCharacter);//в map передаем callback ф-цию, которая будет чтото делать с каждым эл который приходит к ней по очеди с res и формировать массив с объектами
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getAllComics = async (offset = 0) => {
        const res = await request(`${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    }

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0]);
    }

    const _transformCharacter = (char) => {
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

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            thumbnail: `${comics.thumbnail.path}.${comics.thumbnail.extension}`,
            prices: comics.prices[0].price === 0 ? 'NOT AVAILABLE' : `${comics.prices[0].price}$`,
            description: comics.description || 'There is no description',
            pageCount: comics.pageCount || 'No information about the number of pages',
            language: comics.textObjects.language || 'en-us'
        }
    }

    return { loading, error, clearError, getAllCharacters, getCharacter, getAllComics, getComic };
}

export default useMarvelService;