import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import {App} from './App'
import PlaceHolder from './basicComponent/PlaceHolder'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    )
    , document.getElementById('root'));
ReactDOM.render(<PlaceHolder otherElementHeight={document.getElementById('root').clientHeight}/>
    ,document.getElementById('padding')
);
registerServiceWorker();