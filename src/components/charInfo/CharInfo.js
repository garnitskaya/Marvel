import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import useMarvelService from './../../services/MarvelService';
import Skeleton from './../skeleton/Skeleton';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './charInfo.scss';

const CharInfo = (props) => {

    const [char, setChar] = useState(null);

    const { loading, error, getCharacter, clearError } = useMarvelService();

    useEffect(() => {
        updateChar();
    }, [props.charId])

    const updateChar = () => {
        const { charId } = props;
        if (!charId) {
            return; //если нет id, то останавливаем метод updateChar
        }

        clearError();
        getCharacter(charId)
            .then(onCharLoaded)
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const skeleton = char || loading || error ? null : <Skeleton />;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(error || loading || !char) ? <View char={char} /> : null;

    return (
        <div className="char__info">
            {errorMessage}
            {spinner}
            {content}
            {skeleton}
        </div>
    )
}


const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki, comics } = char;

    const extractId = (item) => {
        const idRegExp = /\/([0-9]*)$/;
        return item.match(idRegExp)[1];
    }

    let imgStyle = { 'objectFit': 'cover' }
    if (thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
        imgStyle = { 'objectFit': 'unset' }
    }

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : 'There is no comics with this character'}
                {
                    comics.map(({ resourceURI, name }, i) => {
                        // eslint-disable-next-line
                        if (i > 9) return; //если i>9 то верстку не возвращаем

                        let comicId = extractId(resourceURI)

                        return (
                            <li key={i} className="char__comics-item">
                                <Link to={`/comics/${comicId}`}>{name}</Link>
                            </li>)
                    })
                }
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;