import React from 'react';
import {Documentation} from "./components/Documentation";
import {Route} from "react-router-dom";
import {Main} from "./components/Main";

const App = () => {
    return <div>
        <Route exact path={'/'} render={() => <Documentation/>}/>
        <Route exact path={'/main'} render={() => <Main/>}/>
    </div>
}

export default App;
