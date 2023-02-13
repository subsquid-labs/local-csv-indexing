import * as ethers from 'ethers'
import {LogEvent, Func, ContractBase} from './abi.support'
import {ABI_JSON} from './matic.abi'

export const abi = new ethers.utils.Interface(ABI_JSON);

export const events = {
    Paused: new LogEvent<([account: string] & {account: string})>(
        abi, '0x62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258'
    ),
    Unpaused: new LogEvent<([account: string] & {account: string})>(
        abi, '0x5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa'
    ),
    PauserAdded: new LogEvent<([account: string] & {account: string})>(
        abi, '0x6719d08c1888103bea251a4ed56406bd0c3e69723c8a1686e017e7bbe159b6f8'
    ),
    PauserRemoved: new LogEvent<([account: string] & {account: string})>(
        abi, '0xcd265ebaf09df2871cc7bd4133404a235ba12eff2041bb89d9c714a2621c7c7e'
    ),
    Transfer: new LogEvent<([from: string, to: string, value: ethers.BigNumber] & {from: string, to: string, value: ethers.BigNumber})>(
        abi, '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'
    ),
    Approval: new LogEvent<([owner: string, spender: string, value: ethers.BigNumber] & {owner: string, spender: string, value: ethers.BigNumber})>(
        abi, '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925'
    ),
}

export const functions = {
    name: new Func<[], {}, string>(
        abi, '0x06fdde03'
    ),
    approve: new Func<[spender: string, value: ethers.BigNumber], {spender: string, value: ethers.BigNumber}, boolean>(
        abi, '0x095ea7b3'
    ),
    totalSupply: new Func<[], {}, ethers.BigNumber>(
        abi, '0x18160ddd'
    ),
    transferFrom: new Func<[from: string, to: string, value: ethers.BigNumber], {from: string, to: string, value: ethers.BigNumber}, boolean>(
        abi, '0x23b872dd'
    ),
    decimals: new Func<[], {}, number>(
        abi, '0x313ce567'
    ),
    increaseAllowance: new Func<[spender: string, addedValue: ethers.BigNumber], {spender: string, addedValue: ethers.BigNumber}, boolean>(
        abi, '0x39509351'
    ),
    unpause: new Func<[], {}, []>(
        abi, '0x3f4ba83a'
    ),
    isPauser: new Func<[account: string], {account: string}, boolean>(
        abi, '0x46fbf68e'
    ),
    paused: new Func<[], {}, boolean>(
        abi, '0x5c975abb'
    ),
    renouncePauser: new Func<[], {}, []>(
        abi, '0x6ef8d66d'
    ),
    balanceOf: new Func<[owner: string], {owner: string}, ethers.BigNumber>(
        abi, '0x70a08231'
    ),
    addPauser: new Func<[account: string], {account: string}, []>(
        abi, '0x82dc1ec4'
    ),
    pause: new Func<[], {}, []>(
        abi, '0x8456cb59'
    ),
    symbol: new Func<[], {}, string>(
        abi, '0x95d89b41'
    ),
    decreaseAllowance: new Func<[spender: string, subtractedValue: ethers.BigNumber], {spender: string, subtractedValue: ethers.BigNumber}, boolean>(
        abi, '0xa457c2d7'
    ),
    transfer: new Func<[to: string, value: ethers.BigNumber], {to: string, value: ethers.BigNumber}, boolean>(
        abi, '0xa9059cbb'
    ),
    allowance: new Func<[owner: string, spender: string], {owner: string, spender: string}, ethers.BigNumber>(
        abi, '0xdd62ed3e'
    ),
}

export class Contract extends ContractBase {

    name(): Promise<string> {
        return this.eth_call(functions.name, [])
    }

    totalSupply(): Promise<ethers.BigNumber> {
        return this.eth_call(functions.totalSupply, [])
    }

    decimals(): Promise<number> {
        return this.eth_call(functions.decimals, [])
    }

    isPauser(account: string): Promise<boolean> {
        return this.eth_call(functions.isPauser, [account])
    }

    paused(): Promise<boolean> {
        return this.eth_call(functions.paused, [])
    }

    balanceOf(owner: string): Promise<ethers.BigNumber> {
        return this.eth_call(functions.balanceOf, [owner])
    }

    symbol(): Promise<string> {
        return this.eth_call(functions.symbol, [])
    }

    allowance(owner: string, spender: string): Promise<ethers.BigNumber> {
        return this.eth_call(functions.allowance, [owner, spender])
    }
}
