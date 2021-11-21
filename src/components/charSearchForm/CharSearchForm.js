import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ErrorMessage as FormikErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

import useMarvelService from './../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charSearchForm.scss';

const CharSearchForm = () => {
    const [char, setChar] = useState(null);
    const { loading, error, clearError, getCharacterByName } = useMarvelService();

    const updateChar = (name) => {
        clearError();

        getCharacterByName(name)
            .then(onCharLoaded)
    }

    const onCharLoaded = (char) => {
        setChar(char)
    }

    const errorMessage = error ? <div className="char__search-error"><ErrorMessage /></div> : null;
    const results = !char ? null : char.length > 0 ?
        <div className="char__search-wrapper">
            <div className="char__search-suspense ">There is! Visit {char[0].name} page? </div>
            <Link to={`/characters/${char[0].id}`} className="button button__secondary">
                <div className="inner">To pace</div>
            </Link>
        </div> :
        <div className="char__search-error">
            The character was not found. Check the name and try agein
        </div>;

    return (
        <div className="char__search-form">
            <Formik
                initialValues={{
                    charName: ''
                }}
                validationSchema={Yup.object({
                    charName: Yup.string().required('This field is required')

                })}
                onSubmit={({ charName }) => {
                    updateChar(charName);
                }}>
                <Form>
                    <label htmlFor="charName" className="char__search-label">Or find a character by name:</label>
                    <div className="char__search-wrapper">
                        <Field
                            id="charName"
                            type="text"
                            name="charName"
                            placeholder="Enter name" />
                        <button
                            className="button button__main"
                            type="submit"
                            disabled={loading}>
                            <div className="inner">find</div>
                        </button>
                    </div>
                    <FormikErrorMessage name="charName" component="div" className="char__search-error" />
                </Form>
            </Formik>
            {results}
            {errorMessage}
        </div>
    )
}

export default CharSearchForm;