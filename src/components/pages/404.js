import ErrorMessage from "../errorMessage/ErrorMessage"
import { useHistory } from "react-router-dom"

const Page404 = () => {
    const history = useHistory();

    const goBack = () => {
        history.goBack();
    }

    return (
        <div>
            <ErrorMessage />
            <p style={{ 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px' }}>Page doesn't exist</p>
            <button
                onClick={goBack}
                style={{
                    'display': 'block', 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px',
                    'margin': '30px auto', 'background': 'none', 'border': 'none', 'cursor': 'pointer'
                }}
                to='/'>Back to main page</button>
        </div >
    )
}

export default Page404;