// Frameworks
import React, { Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as AppActions from '../actions/AppActions'

import waitForMined from '../utilities/waitForMined'
import checkAddressMNID from '../utilities/checkAddressMNID'

import OpenSignContract from '../utilities/OpenSignContract'
import { setJSON, getJSON, addBuffer } from '../utilities/IPFS.js'
import {Table, Grid, Form } from 'react-bootstrap';
import { Container, Row, Col, Input, Button } from 'mdbreact';
import queryString from 'query-string'

import web3 from '../utilities/web3';
//import { web3 } from '../utilities/uportSetup'


import styled from 'styled-components'

const constants = {
  ipfs_url_base : 'https://gateway.ipfs.io/ipfs/',
  sign_page_url : 'sign'
};
const 
    state = {
      ipfsHash:null,
      buffer:'',
      ethAddress:'',
      blockNumber:'',
      transactionHash:'',
      gasUsed:'',
      txReceipt: '',
      signUrl:'',
      id : '',
      ipfs_hex : '',
      openDocUrl : '',
      signatures : '',
      documentData : ''
    };

const DocumentWrap = styled.section`
  @media only screen and (min-device-width : 320px) and (max-device-width : 480px) {
    position: inherit;
  }
`
const DocumentArea = styled.div``
const CurrentDocumentArea = styled.div`
  margin-bottom: 20px;
`

const FormDocument = styled.form`width:400px;margin-left:300px;`
const FormRow = styled.div`text-align:left`
const BtnStoreDoc = styled.button``
const NextButton = styled.button`
  margin-top: 10px;
`
const SubText = styled.p`
  margin: 0 auto 3em auto;
  font-size: 18px;
`
const SpanSpace = styled.span`
  padding-right:10px;
`

const BlueColor = styled.span`
  color:#F99940;
  font-size:16px;
  padding:2px 5px;
`

const PreviewSig = styled.div`
  margin-top:20px;
  width: 300px;
  border:1px solid green;
`

class DocumentSignTransaction extends Component {

  constructor (props) {
    super(props)
    this.state = {isMounted: false}
    this.onClickAgree = this.onClickAgree.bind(this)
    this.getSignatures = this.getSignatures.bind(this)
    //console.log(this.props);
  }

  
  captureFile =(event) => {
        event.stopPropagation()
        event.preventDefault()
        const file = event.target.files[0]
        let reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => this.convertToBuffer(reader)    
      };

    convertToBuffer = async(reader) => {
      //file is converted to a buffer to prepare for uploading to IPFS
        const buffer = await Buffer.from(reader.result);
      //set this buffer -using es6 syntax
        this.setState({buffer});
    };
  
  
  onClickAgree = async () => {

    try{
        const accounts = await web3.eth.getAccounts();
        const ethAddress= await OpenSignContract.address;
        console.log('OpenSignContract:',ethAddress)
        this.setState({ethAddress});
        let openDocUrl = constants.ipfs_url_base + this.state.ipfsHash;
        console.log('view doc url:',openDocUrl);
        this.setState({openDocUrl});
        
        console.log('id:',this.state.id);
        OpenSignContract.signDocument(this.state.id, (error, transactionHash) => {
          console.log('sign TX',transactionHash);
          this.setState({transactionHash});
        }); //sign document */   
      } //try
    catch(error){
        console.log(error);
      } //catch
  } //onClick
  
  getSignatures = async () => {

    try{
        const accounts = await web3.eth.getAccounts();
        console.log('id:',this.state.id);
        OpenSignContract.getSignatures(this.state.id, (error, signatures) => {
          console.log('signatures',signatures);
          this.setState({signatures});
        }); //sign document */   
      } //try
    catch(error){
        console.log(error);
      } //catch
  } //onClick
  
  getDocuments = async () => {

    try{
        //const addr = checkAddressMNID(this.props.uport.networkAddress)
        const accounts = await web3.eth.getAccounts();
        console.log('id:',this.state.id);
        OpenSignContract.getMyDocumentById(this.state.id,(error, documentData) => {
          console.log('documentData',documentData);
          this.setState({documentData});
          let ipfsHash = web3.utils.hexToAscii(documentData[1]);
          console.log('ipfsHash',ipfsHash);
          this.setState({ipfsHash} )
          let openDocUrl = constants.ipfs_url_base + this.state.ipfsHash;
          this.setState({previewImg : openDocUrl } )
        }); //sign document */   
      } //try
    catch(error){
        console.log(error);
      } //catch
  } //onClick
  
  onClick = async () => {

    try{
        this.setState({blockNumber:"waiting.."});
        this.setState({gasUsed:"waiting..."});

        // get Transaction Receipt in console on click
        // See: https://web3js.readthedocs.io/en/1.0/web3-eth.html#gettransactionreceipt
        await web3.eth.getTransactionReceipt(this.state.transactionHash, (err, txReceipt)=>{
          console.log(err,txReceipt);
          this.setState({txReceipt});
        }); //await for getTransactionReceipt

        await this.setState({blockNumber: this.state.txReceipt.blockNumber});
        await this.setState({gasUsed: this.state.txReceipt.gasUsed});    
      } //try
    catch(error){
        console.log(error);
      } //catch
  } //onClick

  componentDidMount () {
    // Populate existing shares
  this.getSignatures();  
  this.getDocuments();
  const values = queryString.parse(this.props.location.search)
  console.log(values.id) // "id"
  console.log(values.ipfs) // "ipfs"
  this.setState({ id:values.id });
  this.setState({ ipfsHash:values.ipfs });
  }

  componentWillUnmount() {
    
  } 
  
  render () {
   if(this.state.previewImg) {
            var thumbnail = (<img src={ this.state.previewImg } />);
     }
    return (
      <Container>
      <DocumentWrap>
        <h4>Sign a transaction</h4>
        <SubText>Sign a user documentation using uport</SubText>
        <DocumentArea>
        { thumbnail ? <PreviewSig> { thumbnail } </PreviewSig> : null }
           <h3>Signer list</h3> <br />
          {
              this.state.signatures
                ? this.state.signatures.map(function(d, idx){
                     return (<li key={idx}>{d}</li>)
                   })
                : null
            }
          
          <NextButton onClick={this.onClickAgree}> Agree ( sign document) </NextButton><SpanSpace></SpanSpace>
          <NextButton onClick={this.onClick}> Get Transaction Receipt </NextButton>
        </DocumentArea>
            {
              this.props.confirmingInProgress
                ? <div>Please confirm the transaction card on your phone</div>
                : null
            }
            { this.state
            ? <Grid> <br />
            <Table bordered responsive>
                <thead>
                  <tr>
                    <th>Tx Receipt Category</th>
                    <th>Values</th>
                  </tr>
                </thead>
               
                <tbody>
                  <tr>
                    <td>IPFS Hash # stored on Eth Contract</td>
                    <td>{this.state.ipfsHash}</td>
                  </tr>
                  <tr>
                    <td>Ethereum Contract Address</td>
                    <td>{this.state.ethAddress ? <a target="_blank" href={`${this.state.openDocUrl}`}><BlueColor>view document</BlueColor></a> : null }</td>
                  </tr>

                  <tr>
                    <td>Tx Hash # </td>
                    <td>{this.state.transactionHash}</td>
                  </tr>

                  <tr>
                    <td>Block Number # </td>
                    <td>{this.state.blockNumber}</td>
                  </tr>

                  <tr>
                    <td>Gas Used</td>
                    <td>{this.state.gasUsed}</td>
                  </tr>
                </tbody>
            </Table>
            </Grid>
           : null
        }
        
      </DocumentWrap>
      </Container>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    uport: state.App.uport,
    confirmingInProgress: state.App.confirmingInProgress,
    uploadInProgress: state.App.uploadInProgress,
    tx: state.App.tx,
    error: state.App.error
  }
}
const mapDispatchToProps = (dispatch) => {
  return { actions: bindActionCreators(AppActions, dispatch) }
}
export default connect(mapStateToProps, mapDispatchToProps)(DocumentSignTransaction)
