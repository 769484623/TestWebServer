import React from 'react';
import ReactDOM from 'react-dom';
// import PlaceHolder from './basicComponent/PlaceHolder'
import registerServiceWorker from './registerServiceWorker';
import {App} from './App'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import {reduxStore} from './dataStore/ReduxStore'

ReactDOM.render((
        <Provider store={reduxStore}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
    )
    , document.getElementById('root'));
//
// ReactDOM.render(<PlaceHolder otherElementHeight={document.getElementById('root').clientHeight}/>
//     ,document.getElementById('padding')
// );
registerServiceWorker();