const { createDfuseClient, waitFor } = require("@dfuse/client")



module.exports = {
    getTransactionStatusQuery(txId) {
        const client = createDfuseClient({
            apiKey: process.env.REACT_APP_DFUSE_API_KEY,
            network: process.env.REACT_APP_DFUSE_NETWORK
        });

        const txHashString = `hash: "${txId}"`;

        const txQuery = `subscription {
        transactionLifecycle(${txHashString}){
        previousState
        currentState
        transitionName
        transition {
            __typename

            ... on TrxTransitionInit {
                transaction {
                    ...TransactionFragment
                }
                blockHeader {
                    ...BlockHeaderFragment
                }
                trace {
                    ...TransactionTraceFragment
                }
                confirmations
                replacedById
            }

            ...on TrxTransitionPooled {
                transaction {
                    ...TransactionFragment
                }
            }

            ...on TrxTransitionMined {
                blockHeader {
                    ...BlockHeaderFragment
                }
                trace {
                    ...TransactionTraceFragment
                }
                
            }

            ...on TrxTransitionForked {
                transaction {
                    ...TransactionFragment
                }
            }

            ...on TrxTransitionConfirmed {
                confirmations
            }

            ...on TrxTransitionReplaced {
                replacedById
            }

            }
        }
    }
    
    fragment TransactionFragment on Transaction {
        hash
        from
        to
        nonce
        gasPrice
        gasLimit
        value
        inputData
        signature {
            v
            s
            r
        }
    }
    
    fragment TransactionTraceFragment on TransactionTrace {
        hash
        from
        to
        nonce
        gasPrice
        gasLimit
        value
        inputData
        signature {
            v
            s
            r
        }
        cumulativeGasUsed
        publicKey
        index
        create
        outcome
    }
    
    fragment BlockHeaderFragment on BlockHeader {
        parentHash
        unclesHash
        coinbase
        stateRoot
        transactionsRoot
        receiptRoot
        logsBloom
        difficulty
        number
        gasLimit
        gasUsed
        timestamp
        extraData
        mixHash
        nonce
        hash
    }`;
        return txQuery;
    },

    searchWalletHistory: function(walletAddress, type) {
        const client = createDfuseClient({
            apiKey: process.env.REACT_APP_DFUSE_API_KEY,
            network: process.env.REACT_APP_DFUSE_NETWORK
        });

        if (!type) {
            type = 'from'
        }

        const query = `${type}: ${walletAddress}`;
        const txQuery = `{
          searchTransactions(indexName:CALLS query: "${query}", limit: 10, sort: DESC) {
            edges { 
            node {
      value(encoding:ETHER)
      hash
      nonce
      gasLimit
      gasUsed
      gasPrice(encoding:WEI)
      to
      block {
        number
        hash
        header {
          timestamp
        }
      }
      flatCalls {
        index
        depth
        parentIndex
        callType
        from
        to
        value(encoding:WEI)
        gasConsumed
        inputData
        returnData
        logs {
          address
          topics
          data
        }
        balanceChanges{
          reason
          address
          oldValue(encoding:WEI)
          newValue
        }
      }
    } } 
          }
        }`;
        return client.graphql(txQuery).then(function(dataResponse) {
            return dataResponse;
        }).catch(function(err) {
            throw (err);
        })
    }
}
