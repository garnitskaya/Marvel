import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useMarvelService from './../../services/MarvelService';

import AppBanner from '../appBanner/AppBanner';
import setContent from './../../utils/setContent';

const SinglePage = ({ Component, dataType }) => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const { getComic, clearError, getCharacter, process, setProcess } = useMarvelService();

    useEffect(() => {
        updateData();
        // eslint-disable-next-line
    }, [id]);

    const updateData = () => {
        clearError();

        switch (dataType) {
            case 'comic':
                return getComic(id)
                    .then(onDataLoaded)
                    .then(() => setProcess('confirmed'))
            case 'character':
                return getCharacter(id)
                    .then(onDataLoaded)
                    .then(() => setProcess('confirmed'))
            default:
                break;
        }
    }

    const onDataLoaded = (data) => {
        setData(data);
    }

    return (
        <>
            <AppBanner />
            {setContent(process, Component, data)}
        </>
    )
}


export default SinglePage;