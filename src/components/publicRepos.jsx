import React from 'react';
import { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';

const PublicRepos = (props) => {
    const [reposData, setReposData] = useState([])

    let [isLoaded, setIsLoaded] = useState(false);
    let [err, setErr] = useState(null);

    useEffect(() => {
        const getUsers = () => {
            let url = props.url;
            fetch(url)
                .then(
                    res => {
                        if (res.status >= 400) {
                            throw new Error("Server responds with error!")
                        }
                        return res.json()
                    }
                )
                .then(
                    users => {
                        setReposData(users)
                        setIsLoaded(true)
                    },
                    err => {
                        setErr(err)
                        setIsLoaded(true)
                    }
                )
        };
        getUsers()
    }, [props.url]);

    //pagination

    const [pageNumber, setPageNumber] = useState(0);

    const reposPerPage = 10;
    const reposVisited = pageNumber * reposPerPage;
    const displayRepos = reposData
        .slice(reposVisited, reposVisited + reposPerPage)
        .map((publicRepo, i) => {
            return (
                <div className="repo-container">
                    <div className="repo-name">{publicRepo.name}</div>
                    <div className="repo-link"><a href={publicRepo.svn_url}>Github repo link</a></div>
                </div>
            )
        });

    const pageCount = Math.ceil(reposData.length / reposPerPage);
    const changePage = ({ selected }) => {
        setPageNumber(selected)
    };

    console.log(reposData);

    if (props.url.length > 0) {
        return (
            <div className="repos-container">
                <div className="project-container"><h2>Projects</h2></div>
                <div>{displayRepos}</div>
                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={"paginateButtons"}
                    previousLinkClassName={"prevBtn"}
                    nextLinkClassName={"nextBtn"}
                    disabledClassName={"paginationDisabled"}
                    activeClassName={"paginationActive"}
                />
            </div>
        )
    }
    else {
        return null;
    }

}
export default PublicRepos;