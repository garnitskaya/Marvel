import { Component } from 'react';
import { PropTypes } from 'prop-types';

import MarvelService from './../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './charList.scss';


class CharList extends Component {
    state = {
        charList: [],
        loading: true,//первичная загрузка
        error: false,
        newItemLoading: false, //дозагрузка новых персонажей
        offset: 1541,
        charEnded: false
    }
    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest();//вызываем первый раз когда компонент отрендерился 
    }

    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService.getAllCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError)
    }

    onCharListLoading = () => { // персонажи загружаются
        this.setState({
            newItemLoading: true
        })
    }

    onCharListLoaded = (newCharList) => { //персонажи загрузились(успешная загрузка)
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        this.setState(({ offset, charList }) => ({
            charList: [...charList, ...newCharList], //при первом запуске будет пустой массив, при последующих-к старым данным будут добавляться новые элементы, которые будут складываться в один массив
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended
        }))
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    rendetItem(arr) {
        const items = arr.map(item => {
            const { id, name, thumbnail } = item;
            let imgStyle = { 'objectFit': 'cover' };
            if (thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
                imgStyle = { 'objectFit': 'unset' };
            }

            return (
                <li
                    className="char__item"
                    key={id}
                    onClick={() => this.props.onCharSelected(id)}>
                    <img src={thumbnail} alt="abyss" style={imgStyle} />
                    <div className="char__name">{name}</div>
                </li>
            )
        })
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    render() {
        const { charList, loading, error, newItemLoading, offset, charEnded } = this.state;

        const items = this.rendetItem(charList);
        const spinner = loading ? <Spinner /> : null;
        const errorMessage = error ? <ErrorMessage /> : null;
        const content = !(loading, error) ? items : null;


        return (
            <div className="char__list">
                {spinner}
                {errorMessage}
                {content}
                <button
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{ 'display': charEnded ? 'none' : 'block' }}
                    onClick={() => this.onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div >
        )
    }
}

CharList.propTypes = {
    onCharSelected: PropTypes.func
}

export default CharList;