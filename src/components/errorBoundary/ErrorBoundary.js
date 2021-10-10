import { Component } from 'react';
import ErrorMessage from './../errorMessage/ErrorMessage';

class ErrorBoundary extends Component {
    state = {
        error: false
    }

    //static getDelivedStateFromError(error) {//обновляет состояние
    //    return { error: true };
    //}

    componentDidCatch(err, errorInfo) {//err- ошибка, errorInfo- объект с ключом componentStack, содержащий информацию о компоненте, в котором произошла ошибка.
        console.log(err, errorInfo);
        this.setState({ error: true })
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage />
        }

        return this.props.children;
    }
}

export default ErrorBoundary;