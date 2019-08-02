let initialState = {
  sharesInput: 0 // Stupid FB warning about controlled inputs
}

export default(state = initialState, payload) => {
  switch (payload.type) {
    case 'CONNECT_UPORT':
      return {
        ...state,
        uport: payload.data,
        documentUploadSignTransactionPage : true
        //documentSignTransactionPage : true
        //signTransactionPage: true
      }
      
    case 'GET_CURRENT_SHARES_REQUEST':
      return {
        ...state,
        gettingShares: true
      }
    case 'GET_CURRENT_SHARES_SUCCESS':
      return {
        ...state,
        gettingShares: false,
        sharesTotal: payload.data
      }
    case 'GET_CURRENT_SHARES_ERROR':
      return {
        ...state,
        gettingShares: false,
        error: payload.data
      }
    case 'UPDATE_SHARES_INPUT':
      return {
        ...state,
        sharesInput: payload.data
      }

    case 'BUY_SHARES_REQUEST':
      return {
        ...state,
        confirmingInProgress: true
      }
    case 'BUY_SHARES_PENDING':
      return {
        ...state,
        buyingInProgress: true,
        confirmingInProgress: false
      }
    case 'BUY_SHARES_SUCCESS':
      return {
        ...state,
        transactionHash: payload.tx,
        buyingInProgress: false,
        sharesTotal: payload.data
      }
    case 'BUY_SHARES_ERROR':
      return {
        ...state,
        buyingInProgress: false,
        sharesTotal: payload.data
      }

    case 'BUY_SHARES_DEMO_COMPLETE':
      return {
        ...state,
        collectCredentialsPage: true
      }

    case 'CREDENTIALS_DEMO_COMPLETE':
      return {
        ...state,
        registerYourAppPage: true
      }
    case 'DOCUMENT_UPLOAD_SINGNING':
      return {
        ...state,
        documentSignTransactionPage: true
      }
    case 'DOCUMENT_UPLOAD_SINGNING_PENDING':
      return {
        ...state,
        confirmingInProgress: true,
        uploadInProgress: true
      }
    case 'DOCUMENT_UPLOAD_SINGNING_SUCCESS':
      return {
        ...state,
        transactionHash: payload.tx,
        uploadInProgress: false,
        sharesTotal: payload.data
      }
    case 'DOCUMENT_UPLOAD_SINGNING_ERROR':
      return {
        ...state,
        uploadInProgress: false,
        sharesTotal: payload.data
      }

    
    // signning document
    case 'DOCUMENT_SINGNING':
      return {
        ...state,
        documentSignTransactionPage: true
      }
    case 'DOCUMENT_SINGNING_PENDING':
      return {
        ...state,
        confirmingInProgress: true,
        uploadInProgress: true
      }
    case 'DOCUMENT_SINGNING_SUCCESS':
      return {
        ...state,
        transactionHash: payload.tx,
        uploadInProgress: false,
        sharesTotal: payload.data
      }
    case 'DOCUMENT_SINGNING_ERROR':
      return {
        ...state,
        uploadInProgress: false,
        sharesTotal: payload.data
      }      
    case 'LOGOUT':
      return {
        ...state,
        uport: null,
        logOutPage: true
      }
    default:
      return state
  }
}
