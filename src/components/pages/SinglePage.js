import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useMarvelService from './../../services/MarvelService';

import AppBanner from '../appBanner/AppBanner';
import ErrorMessage from './../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

const SinglePage = ({ Component, dataType }) => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const { loading, error, getComic, clearError, getCharacter } = useMarvelService();

    useEffect(() => {
        updateData();
    }, [id]);

    const updateData = () => {
        clearError();

        switch (dataType) {
            case 'comic':
                return getComic(id)
                    .then(onDataLoaded)
            case 'character':
                return getCharacter(id)
                    .then(onDataLoaded)
            default:
                break;
        }
    }

    const onDataLoaded = (data) => {
        setData(data);
    }
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(error || loading || !data) ? <Component data={data} /> : null;

    return (
        <>
            <AppBanner />
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}


export default SinglePage;