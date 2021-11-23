import { useCallback, useState } from "react";

export const useHttp = () => {
    const [process, setProcess] = useState('waiting'); //начальное состояние ожидающий

    const request = useCallback(async (url, method = 'GET', body = null, headers = { 'Content-Type': 'application/ json' }) => {

        setProcess('loading'); //загрузка данных

        try {
            const response = await fetch(url, { method, body, headers });

            if (!response.ok) {// если с запросом  что то не так пошло
                throw new Error(`Could not fetch ${url}, status:${response.status}`);// выкидываем ошибку
            }

            const data = await response.json();
            return data;
        } catch (e) {
            setProcess('error');
            throw e;
        }

    }, []);

    const clearError = useCallback(() => {
        setProcess('loading'); //получение новых данных
    }, []);

    return { request, clearError, process, setProcess };
}