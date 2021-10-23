import {Fragment} from 'react';
import 'taro-ui/dist/style/index.scss'
import './app.less'


const App = (props) => {
    return (
        <Fragment>
            {props.children}
        </Fragment>
    )
}

export default App
