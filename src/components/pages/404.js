import ErrorMessage from "../errorMessage/ErrorMessage"
import { Link } from 'react-router-dom';

const Page404 = () => {
    return (
        <div>
            <ErrorMessage />
            <p style={{ 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px' }}>Page doesn't exist</p>
            <Link to='/Marvel'
                style={{
                    'display': 'block', 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px',
                    'margin': '30px auto', 'background': 'none', 'border': 'none', 'cursor': 'pointer'
                }}>Back to main page</Link>
        </div >
    )
}

export default Page404;