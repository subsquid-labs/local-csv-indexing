import {Table, Column, Types} from '@subsquid/file-store-csv'

export const Transfers = new Table(
    'transfers.csv',
    {
        blockNumber: Column(Types.Integer()),
        timestamp: Column(Types.DateTime()),
        contractAddress: Column(Types.String()),
        from: Column(Types.String()),
        to: Column(Types.String()),
        amount: Column(Types.Decimal()),
    },
    {
        header: false,
    }
)