import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import PublicRepos from './publicRepos';



const Profile = (props) => {
    const [data, setData] = useState([])

    let [isLoaded, setIsLoaded] = useState(false);
    let [err, setErr] = useState(null);
    useEffect(() => {
        const getUsers = () => {
            let url = `https://api.github.com/users/${props.userid}`
            fetch(url)
                .then(res => {
                    if (res.status >= 400) {
                        throw new Error("Server responds with error!")
                    }
                    return res.json()
                })
                .then(users => {
                    setData(users)
                    setIsLoaded(true)
                },
                    err => {
                        setErr(err)
                        setIsLoaded(true)
                    })
        };
        getUsers()
    }, [props.userid])    

    if (props.userid.length > 0) {
        return (
            <div className="profile-info">
                <div className="profile-img">
                    <img src={data.avatar_url} alt="user pic" />
                </div>
                <div className="profile-tag"><h2>Profile</h2></div>
                <div className="profile">
                    <div className="user-details">
                        <div className="tag">Name</div><div className="tag-value">{data.name}</div>
                    </div>
                    <div className="user-details">
                        <div className="tag">Email </div><div className="tag-value">{data.email}</div>
                    </div>
                    <div className="user-details">
                        <div className="tag">Company</div><div className="tag-value">{data.company}</div>
                    </div>
                    <div className="user-details">
                        <div className="tag">Location</div><div className="tag-value">{data.location}</div>
                    </div>
                    <div className="user-details">
                        <div className="tag">Public Repos</div><div className="tag-value">{data.public_repos}</div>
                    </div>
                    <div className="user-details">
                        <div className="tag">Followers</div><div className="tag-value">{data.followers}</div>
                    </div>
                    <div className="user-details">
                        <div className="tag">Repos Link </div>
                        <div className="tag-value">
                            <button
                                className="repo-btn"
                                onClick={() => {props.fetchRepos(data.repos_url); props.setDisplayRepo(true);}}
                            >
                                click here
                            </button>
                        </div>
                    </div>
                </div>
                <div className="profile-repo">
                {props.displayRepo && <PublicRepos url={props.reposUrl} />}
                </div>
            </div>
        )
    }
    else {
        return null
    }

}

export default Profile;
