import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';

import useMarvelService from './../../services/MarvelService';
import Spinner from './../spinner/Spinner';
import ErrorMessage from './../errorMessage/ErrorMessage';

import './charList.scss';

const setContent = (process, Component, newItemLoading) => {
    switch (process) {
        case 'waiting':
            return <Spinner />;
        case 'loading':
            return newItemLoading ? <Component /> : <Spinner />;//если грузятся новые элементы, то рендерим компонент, если нет, то это первая загрузка и рендерим спиннер 
        case 'confirmed':
            return <Component />;
        case 'error':
            return <ErrorMessage />;
        default:
            throw new Error('Unexpected process state');
    }
}

const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    const { getAllCharacters, process, setProcess } = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
        // eslint-disable-next-line
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);

        getAllCharacters(offset)
            .then(onCharListLoaded)
            .then(() => setProcess('confirmed'));
    }

    const onCharListLoaded = (newCharList) => { //персонажи загрузились(успешная загрузка)
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        setCharList(charList => [...charList, ...newCharList]); //при первом запуске будет пустой массив, при последующих-к старым данным будут добавляться новые элементы, которые будут складываться в один массив
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 9);
        setCharEnded(charEnded => ended);
    }

    const itemRefs = useRef([]);

    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

    const renderItem = (arr) => {
        const items = arr.map((item, i) => {
            const { id, name, thumbnail } = item;
            let imgStyle = { 'objectFit': 'cover' };
            if (thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
                imgStyle = { 'objectFit': 'unset' };
            }

            return (
                <li
                    key={id}
                    className="char__item"
                    tabIndex={0}
                    ref={el => itemRefs.current[i] = el} //все элементы по порядку в этом массиве складываем в дом элемент
                    onClick={() => {
                        props.onCharSelected(id);
                        focusOnItem(i);
                    }}
                    onKeyPress={(e) => {
                        if (e.key === '' || e.key === 'Enter') {
                            props.onCharSelected(id);
                            focusOnItem(i);
                        }
                    }}>
                    <img src={thumbnail} alt="abyss" style={imgStyle} />
                    <Link to={`/characters/${id}`} className="char__name">{name}</Link>
                </li>
            )
        })
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    const elements = useMemo(() => {
        return setContent(process, () => renderItem(charList), newItemLoading);
        // eslint-disable-next-line 
    }, [process]);

    return (
        <div className="char__list">
            {elements}
            <button
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{ 'display': charEnded ? 'none' : 'block' }}
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div >
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;