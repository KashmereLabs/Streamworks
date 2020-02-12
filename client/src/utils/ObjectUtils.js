module.exports = {
  isNonEmptyObject: function(obj) {
    if (!verifyEmpty(obj)) {
      return true;
    }
    return false;
  },
  isEmptyObject(obj) {
    if (verifyEmpty(obj)) {
      return true;
    }
    return false;
  },
  isNonEmptyArray: function(arr) {
    if (verifyEmptyArray(arr)) {
      return false;
    }
    return true;
  },
  checkIfPaymentStatusUpdate: function(currentInvoiceList, previousInvoiceList) {
    let pendingTxnList = [];

    currentInvoiceList.forEach(function(item, idx) {
      let prevInv = previousInvoiceList.find((pi) => (pi._id.toString() === item._id.toString()));
      if (prevInv && prevInv.transaction_hash === undefined && item.transaction_hash !== undefined) {
        pendingTxnList.push(item.transaction_hash);
      }
    });
    return pendingTxnList;

  }
}

function verifyEmpty(obj) {
  if (obj === null || typeof obj === "undefined" || Object.keys(obj).length === 0) {
    return true;
  }
  return false;
}

function verifyEmptyArray(arr) {
  if (arr === null || typeof arr === "undefined" || arr.length === 0) {
    return true;
  }
  return false;
}
