import { useState, useEffect } from "react";
import axios from "axios";
export const useEthToUsd = (ethAmount) => {
  const [usdValue, setUsdValue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (typeof ethAmount !== "number" || ethAmount <= 0) {
      setUsdValue(0);
      setLoading(false);
      return;
    }

    const abortController = new AbortController();
    const fetchConversion = async () => {
      try {
        setLoading(true);
        setError(null);
        const apiUrl =
          "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd";
        const response = await axios.get(apiUrl, {
          signal: abortController.signal,
        });
        const exchangeRate = response.data?.ethereum?.usd;

        if (exchangeRate) {
          setUsdValue(ethAmount * exchangeRate);
        } else {
          throw new Error("Invalid API response format");
        }
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Request canceled:", err.message);
          return;
        }
        setError("Could not fetch conversion rate.");
        console.error("Fetching error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchConversion();
    return () => {
      abortController.abort();
    };
  }, [ethAmount]);

  return { usdValue, loading, error };
};
