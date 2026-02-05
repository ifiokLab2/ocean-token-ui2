"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, ArrowDownLeft, Clock, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useOcean } from "@/app/context/OceanContext";

export function RecentTransactions() {
  const { wallet } = useOcean();
  const [txs, setTxs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      console.log('Fetching transactions for wallet:', wallet);
      if (!wallet) return;
      try {
        // Sepolia Etherscan API URL
        const response = await fetch(
          `https://api.etherscan.io/v2/api?chainid=11155111&module=account&action=tokentx&contractaddress=${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}&address=${wallet}&page=1&offset=5&sort=desc&apikey=${process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY}`
        );

        const data = await response.json();
        console.log('Etherscan response data:', data);
        if (data.status === "1") {
          console.log('transactions:',data.result);
          setTxs(data.result.slice(0, 5)); // Get last 5
        }
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [wallet]);

  if (loading) return <div className="p-4 text-center">Loading history...</div>;

  return (
    <Card className="p-6 bg-card border-border/50">
      <h3 className="text-lg font-semibold mb-6">Recent Transactions</h3>
      <div className="space-y-4">
        {txs.length === 0 ? (
          <p className="text-muted-foreground text-sm">No transactions found.</p>
        ) : (
          txs.map((tx) => {
            const isSent = tx.from.toLowerCase() === wallet.toLowerCase();
            return (
              <div key={tx.hash} className="flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-border/30">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${isSent ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'}`}>
                    {isSent ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownLeft className="w-4 h-4" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      {isSent ? `Sent to ${tx.to.slice(0,6)}...` : `Received from ${tx.from.slice(0,6)}...`}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {new Date(tx.timeStamp * 1000).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-bold ${isSent ? 'text-red-500' : 'text-green-500'}`}>
                    {isSent ? '-' : '+'}{(parseFloat(tx.value) / 1e18).toFixed(2)} OCT
                  </p>
                  <a 
                    href={`https://sepolia.etherscan.io/tx/${tx.hash}`}
                    target="_blank"
                    className="text-[10px] text-primary flex items-center justify-end gap-1 hover:underline"
                  >
                    View <ExternalLink className="w-2 h-2" />
                  </a>
                </div>
              </div>
            );
          })
        )}
      </div>
    </Card>
  );
}