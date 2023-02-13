import { EvmBatchProcessor } from "@subsquid/evm-processor";
import { db } from "./db";
import { lookupArchive } from "@subsquid/archive-registry";
import { TableRecord } from "@subsquid/file-store";
import { events, Contract } from "./abi/matic";
import { Transfers } from "./tables";
import { BigDecimal } from "@subsquid/big-decimal";

export const contractAddress =
  "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0".toLowerCase();
// MATIC: https://etherscan.io/token/0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0

const processor = new EvmBatchProcessor()
  .setDataSource({
    archive: lookupArchive("eth-mainnet"),
    chain: process.env.RPC_ENDPOINT,
  })
  .addLog(contractAddress, {
    filter: [[events.Transfer.topic]],
    data: {
      evmLog: {
        topics: true,
        data: true,
      },
    } as const,
  });

type Record = TableRecord<typeof Transfers>;

processor.run(db, async (ctx) => {
  const transfers: Record[] = [];
  let decimals = 18;
  if (DecimalsRegistry.getRegistry().get() == -1) {
    const contract = new Contract(
      ctx,
      ctx.blocks[ctx.blocks.length - 1].header,
      contractAddress
    );
    try {
      decimals = await contract.decimals();
      DecimalsRegistry.getRegistry().set(decimals);
    } catch (error) {
      ctx.log.warn(`Contract API error`);
    }
  }
  for (let block of ctx.blocks) {
    for (let item of block.items) {
      if (item.address !== contractAddress) continue;
      if (item.kind !== "evmLog") continue;
      if (item.evmLog.topics[0] !== events.Transfer.topic) continue;

      const { from, to, value } = events.Transfer.decode(item.evmLog);
      transfers.push({
        blockNumber: block.header.height,
        timestamp: new Date(block.header.timestamp),
        contractAddress: item.address,
        from: from.toLowerCase(),
        to: to.toLowerCase(),
        amount: BigDecimal(value.toBigInt(), decimals).toNumber(),
      });
    }
  }

  ctx.store.Transfers.writeMany(transfers);
});

export class DecimalsRegistry {
  private static instance: DecimalsRegistry

  private decimals: number = -1;

  private constructor() {}

  static getRegistry(): DecimalsRegistry {
      if (this.instance == null) {
          this.instance = new DecimalsRegistry()
      }

      return this.instance
  }

  set(decimals: number) {
      this.decimals = decimals
      return this
  }

  get() {
      return this.decimals
  }
}