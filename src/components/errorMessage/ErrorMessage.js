import img from './error.gif';

const ErrorMessage = () => {
    return (
        <img src={img} alt="Error" style={{ display: 'block', margin: 'auto' }} /> //process.env.PUBLIC_URL + '/erroe.gif'переменная окружения(сылка на папку public + картинка)
    )
}

export default ErrorMessage;