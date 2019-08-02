// Frameworks
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as AppActions from '../actions/AppActions'
import styled from 'styled-components'
import { uport } from '../utilities/uportSetup'
import SignaturePad from 'react-signature-pad-wrapper'
import { Stage, Layer, Rect, Text } from 'react-konva';
import Konva from 'konva';

const WelcomeWrap = styled.section``
const ConnectUport = styled.button``
const SubText = styled.p`
  margin: 0 auto 3em auto;
  font-size: 18px;
`

const SpanSpace = styled.span`
  padding-right:10px;
`

const NextButton = styled.button`
  margin-top: 20px;
`

const SingatureBox = styled.div`
  margin: 0 auto 3em auto;
  width: 300px;
  border:1px solid red;
`

const PreviewSig = styled.div`
  margin: 0 auto 3em auto;
  width: 300px;
  border:1px solid green;
`

const PreviewButton = styled.button``


class Welcome extends Component {

  constructor (props) {
    super(props)
    this.connectUport = this.connectUport.bind(this)
    this.state = {};
    
  }

  connectUport () {
    uport.requestCredentials(
      { requested: ['name', 'phone', 'country', 'avatar'],
        notifications: true }
    ).then((credentials) => {
        console.log({credentials})
        this.props.actions.connectUport(credentials)
    })
  }
  
  logSig = () => {
    console.log(this.props)
    const data = this.signaturePad.toDataURL();
    this.setState({previewImg : data } )
    console.log(data);
  }

  render () {
    if(this.state.previewImg) {
            var thumbnail = (<img src={ this.state.previewImg } />);
     }
    return (
      <WelcomeWrap>
      <SingatureBox>
      <SignaturePad clearButton="true" ref={ref => this.signaturePad = ref} options={{minWidth: 1, maxWidth: .5, penColor: 'rgb(255,255,255)'}} />
      </SingatureBox>
      { thumbnail ? <PreviewSig> { thumbnail } </PreviewSig> : null }
       <PreviewButton onClick={this.logSig}>Preview signature</PreviewButton>
        <h4>Build a Better dApp</h4>
        <SubText>Identity and transaction infrastructure for Ethereum</SubText>
        <ConnectUport
          onClick={this.connectUport}>
          Connect with uPort
        </ConnectUport>
      </WelcomeWrap>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    uport: state.App.uport
  }
}
const mapDispatchToProps = (dispatch) => {
  return { actions: bindActionCreators(AppActions, dispatch) }
}
export default connect(mapStateToProps, mapDispatchToProps)(Welcome)
