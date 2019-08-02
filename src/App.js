// Frameworks
import React, { Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as AppActions from './actions/AppActions'
import { BrowserRouter as Router, Link, NavLink, Redirect, Prompt} from 'react-router-dom';
import Route from 'react-router-dom/Route';

import styled from 'styled-components'

// Components
import AppNavbar from './components/AppNavbar'
import Welcome from './components/Welcome'
import SignTransaction from './components/SignTransaction'
import CollectCredentials from './components/CollectCredentials'
import RegisterYourApp from './components/RegisterYourApp'
import LogOut from './components/LogOut'
import DocumentUploadSignTransaction from './components/DocumentUploadSignTransaction'
import DocumentSignTransaction from './components/DocumentSignTransaction'
import './App.css';


const AppWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`

const AppBody = styled.div`
  flex: 1 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  max-width: 100%;
  padding: 20px;
`

class App extends Component {
  render () {
    return (
    <Router>
      <AppWrap>
        <AppNavbar />
        
        <Route path="/" exact strict render={
          () => {
            return (
        <AppBody>
          {
            !this.props.uport &&
            !this.props.documentUploadSignTransactionPage &&
            !this.props.signTransactionPage
              ? <Welcome />
              : null
          }
          {
            this.props.documentUploadSignTransactionPage &&
            !this.props.logOutPage
              ? <DocumentUploadSignTransaction />
              : null
          }
          {
            this.props.documentSignTransactionPage &&
            !this.props.logOutPage
              ? <DocumentSignTransaction />
              : null
          }
          {
            this.props.signTransactionPage === true &&
            !this.props.collectCredentialsPage
              ? <SignTransaction />
              : null
          }
          {
            this.props.collectCredentialsPage &&
            !this.props.registerYourAppPage
              ? <CollectCredentials />
              : null
          }
          {
            this.props.registerYourAppPage &&
            !this.props.logOutPage
              ? <RegisterYourApp />
              : null
          }
          {
            this.props.logOutPage
              ? <LogOut />
              : null
          }
        </AppBody>
        )}
        }/>
      <Route path="/sign" exact component={DocumentSignTransaction} />
      </AppWrap>
      </Router>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    uport: state.App.uport,
    documentUploadSignTransactionPage: state.App.documentUploadSignTransactionPage,
    documentSignTransactionPage: state.App.documentSignTransactionPage,
    signTransactionPage: state.App.signTransactionPage,
    collectCredentialsPage: state.App.collectCredentialsPage,
    registerYourAppPage: state.App.registerYourAppPage,
    logOutPage: state.App.logOutPage
  }
}
const mapDispatchToProps = (dispatch) => {
  return { actions: bindActionCreators(AppActions, dispatch) }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
