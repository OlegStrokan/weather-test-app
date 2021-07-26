import React from 'react';
import {Documentation} from "./Components/Documentation";
import {Route} from "react-router-dom";
import {Main} from "./Components/Main";

const App = () => {
    return <div>
        <Route exact path={'/'} render={() => <Documentation/>}/>
        <Route exact path={'/main'} render={() => <Main/>}/>
    </div>
}

export default App;
