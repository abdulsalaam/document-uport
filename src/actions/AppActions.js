// //////////////////////////////////////////////
// Connect uPort
// //////////////////////////////////////////////

export const connectUport = (data) => {
  return {
    type: 'CONNECT_UPORT',
    data
  }
}

// //////////////////////////////////////////////
// Get Current Shares
// //////////////////////////////////////////////

export const getCurrentSharesREQUEST = () => {
  return {
    type: 'GET_CURRENT_SHARES_REQUEST'
  }
}
export const getCurrentSharesSUCCESS = (data) => {
  return {
    type: 'GET_CURRENT_SHARES_SUCCESS',
    data
  }
}
export const getCurrentSharesERROR = (data) => {
  return {
    type: 'GET_CURRENT_SHARES_ERROR',
    data
  }
}

export const updatesharesInput = (data) => {
  return {
    type: 'UPDATE_SHARES_INPUT',
    data
  }
}

// //////////////////////////////////////////////
// Buy Shares
// //////////////////////////////////////////////

export const buySharesREQUEST = (tx, amount) => {
  return {
    type: 'BUY_SHARES_REQUEST',
    amount: amount,
    buyingInProgress: true
  }
}
export const buySharesPENDING = () => {
  return {
    type: 'BUY_SHARES_PENDING'
  }
}
export const buySharesSUCCESS = (tx, data) => {
  return {
    type: 'BUY_SHARES_SUCCESS',
    tx: tx,
    data
  }
}
export const buySharesERROR = (data) => {
  return {
    type: 'BUY_SHARES_ERROR',
    data
  }
}

// //////////////////////////////////////////////
// Complete Buy Shares Demo
// //////////////////////////////////////////////

export const buySharesDemoComplete = (data) => {
  return {
    type: 'BUY_SHARES_DEMO_COMPLETE'
  }
}

// //////////////////////////////////////////////
// Complete Credentials Demo
// //////////////////////////////////////////////

export const credentialsDemoComplete = (data) => {
  return {
    type: 'CREDENTIALS_DEMO_COMPLETE'
  }
}

// //////////////////////////////////////////////
// document upload and signing
// //////////////////////////////////////////////

export const documentUploadSigning = (data) => {
  return {
    type: 'DOCUMENT_UPLOAD_SINGNING'
  }
}

export const documentUploadSigningPENDING = () => {
  return {
    type: 'DOCUMENT_UPLOAD_SINGNING_PENDING'
  }
}
export const documentUploadSigningSUCCESS = (tx, data) => {
  return {
    type: 'DOCUMENT_UPLOAD_SINGNING_SUCCESS',
    tx: tx,
    data
  }
}
export const documentUploadSigningERROR = (data) => {
  return {
    type: 'DOCUMENT_UPLOAD_SINGNING_ERROR',
    data
  }
}

// //////////////////////////////////////////////
// document signing only
// //////////////////////////////////////////////

export const documentSigning = (data) => {
  return {
    type: 'DOCUMENT_SINGNING'
  }
}

export const documentSigningPENDING = () => {
  return {
    type: 'DOCUMENT_SINGNING_PENDING'
  }
}
export const documentSigningSUCCESS = (tx, data) => {
  return {
    type: 'DOCUMENT_SINGNING_SUCCESS',
    tx: tx,
    data
  }
}
export const documentSigningERROR = (data) => {
  return {
    type: 'DOCUMENT_SINGNING_ERROR',
    data
  }
}


// //////////////////////////////////////////////
// Register App Area Complete
// //////////////////////////////////////////////

export const registerAppAreaComplete = (data) => {
  return {
    type: 'LOGOUT'
  }
}
