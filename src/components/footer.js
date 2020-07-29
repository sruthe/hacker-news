import React, {Component} from "react";
import {LineChart} from "./linechart";
import {connect} from "react-redux";


class Footer extends Component {

    constructor(props){
        super(props);
        this.state={
            changed: false
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({changed: !this.state.changed})
    }

    getNextPage = () =>{
         let { hits, dispatch, pageNumber } = this.props;
        let page= parseInt(pageNumber)+1;
        window.location.href = '/?page='+page;
    };

    getPrevPage = () =>{
        let { hits, dispatch, pageNumber } = this.props;
        if(pageNumber>1)
        {
            window.location.href = '/?page='+(pageNumber-1)
        }
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


