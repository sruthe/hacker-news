import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchAppsIfNeeded } from '../redux/actions'
// import {Header} from "./header";
import Content from "./content";
import Footer from "./footer";

class App extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAppsIfNeeded())
  }

  render() {
    return (
       <>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <meta name="description" content="Hacker News"/>
        </head>
        {/*<Header/>*/}
        <Content/>
        <Footer/>
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
 
export default connect(mapStateToProps)(App)
