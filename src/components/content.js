import React, {useEffect} from "react";
import {connect} from "react-redux";
import {hide, upvote, receiveApps} from "../redux/actions";
import {useState} from "react";

function Content(props) {

    let {hits:data=[], pageNumber, dispatch } = props;
    let [updated, setUpdated] = useState(false);

    useEffect(()=>{
        let res=typeof window!=="undefined"?sessionStorage.getItem("page"+pageNumber):"{}";
        if(res!==null && res!=="{}"){
            let d=JSON.parse(res)
            dispatch(receiveApps(d.hits, d.pageNumber))
        }
    },[updated])


    function vote(index) {
        setUpdated((prevState)=>!prevState);
        dispatch(upvote(index))
    }

    function hideRow(index) {
        setUpdated((prevState)=>!prevState);
        dispatch(hide(index));
    }

    return(
        <>
            <table>
                <tr>
                <th>Comments</th>
                    <th>Vote Count</th>
                    <th>UpVote</th>
                    <th>News Details</th>
                </tr>
                {
                    data.map((hit,index) => {
                    let formattedURL = hit.url && hit.url.substring(
                        hit.url.indexOf("https://") + 8,
                        hit.url.indexOf("/",9)
                    );

                    return(
                        <tr key={index}>
                            <td>{hit.num_comments}</td>
                            <td>{hit.points}</td>
                            <td><button style={{border:'none'}} onClick={()=>{vote(index)}}>&#8710;</button></td>
                            <td>
                                <span>{hit.title}</span>
                                <a href={hit.url}>({formattedURL})</a>
                                <span> by {hit.author} </span>
                                <span onClick={()=>{hideRow(index)}}> [hide]</span>
                            </td>
                        </tr>
                    );
                    }
                )}
            </table>
        </>
    );
}

function mapStateToProps(state) {
    let { isFetching, hits, pageNumber }=state;
    return {
        isFetching,
        hits,
        pageNumber
    }
}

export default connect(mapStateToProps)(Content);