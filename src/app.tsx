import { Fragment } from 'react'
import '@taroify/icons/index.scss'
import '@taroify/core/index.scss'
import './app.sass'

const App = (props) => {
  return (
    <Fragment>
      {props.children}
    </Fragment>
  )
}

export default App
