import React, {Component} from "react";
import {LineChart} from "./linechart";
import {fetchAppsIfNeeded, getPageData} from "../redux/actions";
import {connect} from "react-redux";

class Footer extends Component {

    constructor(props){
        super(props);
    }

     getNextPage = () =>{
         let { hits, dispatch, pageNumber } = this.props;
        dispatch(getPageData(pageNumber+1))
    };

    getPrevPage = () =>{
        let { hits, dispatch, pageNumber } = this.props;
        if(pageNumber>1)
            dispatch(getPageData(pageNumber-1))
    };

    render()
    {
        let { hits, dispatch, pageNumber } = this.props;
        return (
            <>
                <div className={'button-container'}>
                    <button className={"page-button"} onClick={this.getPrevPage}> prev  |</button>
                    <button className={"page-button"} onClick={this.getNextPage}> next</button>
                </div>
                <hr className="solid"/>
                <LineChart data={hits}/>
                <hr className="solid"/>
                <p>Guidelines | FAQ | Support | API | Security | Lists | Bookmarklet | Legal | Apply to YC | Contact</p>
            </>
        );
    }
}

function mapStateToProps({ isFetching, hits, pageNumber }) {
    return {
        isFetching,
        hits,
        pageNumber
    }
}

export default connect(mapStateToProps)(Footer);


