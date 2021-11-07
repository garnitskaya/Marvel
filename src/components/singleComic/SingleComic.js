import { useEffect, useState } from 'react';
import useMarvelService from './../../services/MarvelService';

import './singleComic.scss';
import xMen from '../../resources/img/x-men.png';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

const SingleComic = (props) => {

    const [comic, setComic] = useState({});

    const { loading, error, getComic } = useMarvelService();

    useEffect(() => {
        onRequest();
    }, []);

    const onRequest = () => {
        //const id = Math.floor(Math.random() * (1011 - 1) + 1);
        //const { comicId } = props;
        //if (!comicId) {
        //    return;
        //}

        getComic()
            .then(updateComic)
    }

    const updateComic = (comic) => {
        setComic(comic);
    }

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(error || loading) ? <View comic={comic} /> : null;

    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const View = ({ comic }) => {
    const { thumbnail, title, description, prices, pageCount, language } = comic;

    return (
        <div className="single-comic">
            <img src={thumbnail} alt="x-men" className="single-comic__img" />
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount} pages</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{prices}</div>
            </div>
            <a href="#s" className="single-comic__back">Back to all</a>
        </div>
    )
}

export default SingleComic;