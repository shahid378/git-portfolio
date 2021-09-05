import React from 'react';
import Profile from './profile';
import { useState, useEffect } from 'react';

const SearchBar = () => {
    //updating the state of input
    const [user, setUser] = useState("");

    const onchange = (e) => {
        setUser(e.target.value)
    }

    //updating the username to be passed to api and then updating the state of input
    
    const [displayRepo, setDisplayRepo] = useState(false);
    const [reposUrl, setReposUrl] = useState("")
    const fetchRepos = (updateUrl) => {
        setReposUrl(updateUrl)
    }

    const [readUserName, setReadUserName] = useState("");
    
    const setInput = () => {
        setReadUserName(user)
        setUser("")
    }

    const clearInput = () => {
        setReadUserName("")
        setUser("")
        
    }
    return (
        <>
            <div className="search-container">
                <div className="input-container">
                    <input type="text"
                        placeholder="search for user"
                        value={user}
                        onChange={ onchange}
                    />
                </div>
                <div className="btn-container">
                    <div className="btns">
                        <button className="each-btn"
                            onClick={() => {setInput(); setDisplayRepo(false);} }
                        >
                            Search
                        </button>
                    </div>
                    <div className="btns">
                        <button className="each-btn"
                            onClick={clearInput}
                        >
                            clear</button>
                    </div>
                </div>
            </div>
            <Profile userid={readUserName}
                fetchRepos={fetchRepos}
                displayRepo={displayRepo}
                setDisplayRepo={setDisplayRepo}
                reposUrl={reposUrl}
            />
        </>
    )
}
export default SearchBar;
