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
import { default as OverflowEllipsis } from 'react-overflow-ellipsis'

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
      openDocUrl : ''
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

const PreviewImg = styled.div`
  margin-top:20px;
  width: 300px;
  border:1px solid green;
`

const CredentialsWrap = styled.section`
  @media only screen and (min-device-width : 320px) and (max-device-width : 480px) {
    position: inherit;
  }
`
const CredentialsArea = styled.section`
  text-align: center;
`
const CredsLabel = styled.label`
  position: relative;
  top: 10px;
`

class DocumentUploadSignTransaction extends Component {

  constructor (props) {
    super(props)
    this.storeDocument = this.storeDocument.bind(this)
    console.log('props:',this.props.uport)
   
  }

  
  captureFile =(event) => {
        event.stopPropagation()
        event.preventDefault()
        const file = event.target.files[0]
        let reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => this.convertToBuffer(reader) 
        this.setState({previewImg : URL.createObjectURL(file) } )        
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

  storeDocument = async (e) => {
    e.preventDefault()
    console.log('storeDocument')

    const ethAddress= await OpenSignContract.address;
    console.log('OpenSignContract:',ethAddress)
    this.setState({ethAddress});
   
    const addr = checkAddressMNID(this.props.uport.networkAddress)
    //const addr = "0x4587205ccd15ceef2c09902a984ed411f44c58bf";
    const actions = this.props.actions
    console.log({addr, actions})
    this.setState({ loading: true });
    //const hash = await setJSON({ myData: this.state.buffer });
    const hash = await addBuffer(this.state.buffer);
    this.setState({ ipfsHash:hash });
    console.log('hash:',hash);
    console.log('address:',addr);
    try {
        //await setContractHash(addr, hash);
        console.log('hash2:',this.state.ipfsHash);
        console.log('web3:',web3);
        let ipfs_hex = web3.utils.asciiToHex(this.state.ipfsHash);
        console.log('IPFS:',this.state.ipfsHash);
        console.log('IPFS HEX:',ipfs_hex);
        let id = web3.utils.soliditySha3(ipfs_hex, Date.now());
        this.setState({id});
        this.setState({ipfs_hex});
        
        let openDocUrl = constants.ipfs_url_base + this.state.ipfsHash;
        console.log('view doc url:',openDocUrl);
        this.setState({openDocUrl});
        console.log("id=" + id);
        console.log("ipfs_hex=" + ipfs_hex);
        
      // const ipfs_url_base = 'https://gateway.ipfs.io/ipfs/';
       let signUrl = window.location.href + constants.sign_page_url + "/?id=" + this.state.id + "&ipfs=" + this.state.ipfsHash;
       this.setState({signUrl});
      OpenSignContract.addDocument(id, ipfs_hex, (error, transactionHash) => {
      this.setState({transactionHash});
      console.log('addDocument')
      if (error) { this.props.actions.documentSigningERROR(error) } 
      waitForMined(addr, transactionHash, { blockNumber: null }, actions,
        () => {
          this.props.actions.documentSigningPENDING()
        },
        (total) => {
          console.log('waitForMined complete',transactionHash)
          this.props.actions.documentSigningSUCCESS(transactionHash, total)
        }
      )
    })
    } catch (error) {
        this.setState({ loading: false });
        alert("There was an error with the transaction.");
        return;
    }
  }

  componentDidMount () {
    // Populate existing shares
    
  }

  render () {
    if(this.state && this.state.previewImg != undefined) {
            var thumbnail = (<img src={ this.state.previewImg } />);
     }  
    return (
      <Container>
      <CredentialsWrap>
      <CredentialsArea>
      <CredsLabel>Name: {this.props.uport.name}</CredsLabel> <br />
      <CredsLabel>Country: {this.props.uport.country}</CredsLabel>
      </CredentialsArea>
      </CredentialsWrap>
      <DocumentWrap>
        <h4>Sign a transaction</h4>
        <SubText>Upload user documentation</SubText>
        <DocumentArea>
          {
            this.props.uploadInProgress
              ? (
                <div>
                  <br />
                  <div className="spinner center">
                    {[...Array(12)].map((x,i) =>
                      <div className="spinner-blade"key={i}/>
                    )}
                  </div>
                  <br />
                </div>
              )
              : (
              <Row>
                <Col md="6">
               <FormDocument>
                  <FormRow>
                  { thumbnail ? <PreviewImg> { thumbnail } </PreviewImg> : null }
                   <br />
                  <input 
                      type="file"
                      onChange={this.captureFile}
                    />
                   </FormRow>
                  <FormRow>
                    <br />
                    <BtnStoreDoc
                      onClick={this.storeDocument}>
                      Store Document
                    </BtnStoreDoc>
                  </FormRow>
                  <FormRow>
                    <br />
                    {
                      this.props.uploadInProgress
                        ? <div>Please wait for transaction card on phone</div>
                        : null
                    }
                  </FormRow>
                </FormDocument>
                </Col>
                </Row>
              )
          }
         
          <NextButton onClick={this.onClickAgree}> Agree ( sign document) </NextButton><SpanSpace></SpanSpace>
          <NextButton onClick={this.onClick}> Get Transaction Receipt </NextButton>
          <NextButton
          onClick={this.props.actions.registerAppAreaComplete}>
          Logout
        </NextButton>
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
                    <td>{this.state.ethAddress} <a target="_blank" href={`${this.state.openDocUrl}`}>view document</a></td>
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
                  <tr>
                    <td>Link for Other Singer</td>
                    <td>
                  <p style={{overflow:'wrap'}}>
                    {this.state.signUrl}
                  </p>
                </td>
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
export default connect(mapStateToProps, mapDispatchToProps)(DocumentUploadSignTransaction)
