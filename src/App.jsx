import React from 'react';
import "./Css.scss";
import Header from './components/header';
import SearchBar from './components/searchProfile';


const App = () => {
    return (
        <div className="main-container">
            <Header />
            <SearchBar />
            
        </div>
    )
}

export default App;
