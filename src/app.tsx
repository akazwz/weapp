import {Fragment} from 'react';
import './app.less'

const App = (props) => {
    return (
        <Fragment>
            {props.children}
        </Fragment>
    )
}

export default App
