export const abi = [
    {
        "type": "function",
        "name": "batchGetBills",
        "inputs": [
            {
                "name": "start",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "end",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "_bills",
                "type": "tuple[]",
                "internalType": "struct Persion.Bill[]",
                "components": [
                    {
                        "name": "owner",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "payToken",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "payAmount",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "payMonths",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "receiveStartMonth",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "receiveMonths",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "payedMonths",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "receivedMonths",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "startTime",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "closed",
                        "type": "bool",
                        "internalType": "bool"
                    }
                ]
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "billIndex",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "bills",
        "inputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "owner",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "payToken",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "payAmount",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "payMonths",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "receiveStartMonth",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "receiveMonths",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "payedMonths",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "receivedMonths",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "startTime",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "closed",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "closeBill",
        "inputs": [
            {
                "name": "_billIndex",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "createBill",
        "inputs": [
            {
                "name": "payToken",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "payAmount",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "payMonths",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "receiveStartMonth",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "receiveMonths",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "getNextPayTime",
        "inputs": [
            {
                "name": "_billIndex",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "payBill",
        "inputs": [
            {
                "name": "_billIndex",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "payable"
    },
    {
        "type": "function",
        "name": "receiveBill",
        "inputs": [
            {
                "name": "_billIndex",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "event",
        "name": "CloseBill",
        "inputs": [
            {
                "name": "billIndex",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "NewBill",
        "inputs": [
            {
                "name": "creater",
                "type": "address",
                "indexed": false,
                "internalType": "address"
            },
            {
                "name": "billIndex",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "ReceiveBill",
        "inputs": [
            {
                "name": "billIndex",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    }
] as const;