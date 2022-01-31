import { ChakraProvider } from "@chakra-ui/react";
import AppContext from "../context/AppContext";
import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";
import { useState, useEffect } from "react";
import theme from "../styles/theme";
import '@fontsource/poppins/300.css';
import '@fontsource/poppins/700.css';
const abi = require("../abi/KaliDAO.json");
import { createToast } from "../utils/toast";
import { correctNetwork } from "../utils/network";
import { getNetworkName } from "../utils/formatters";
import { supportedChains } from "../constants/supportedChains";
import "../styles/style.css";

function MyApp({ Component, pageProps }) {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [daoChain, setDaoChain] = useState(null);
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [visibleView, setVisibleView] = useState(1);
  const [remount, setRemount] = useState(0);
  const [dao, setDao] = useState(null);
  const [proposals, setProposals] = useState(null);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      typeof window.ethereum !== "undefined"
    ) {
      ethereum.on("accountsChanged", function (accounts) {
        changeAccount();
      });

      ethereum.on("chainChanged", () => {
        changeChain();
      });

      ethereum.on("connect", () => {});

      ethereum.on("disconnect", () => {
        console.log("disconnected");
      });
    }
  }, []);

  useEffect(() => {
    connectToInfura();
  }, [address]);

  useEffect(() => {
    if (chainId != null) {
      isCorrectChain();
    }
  }, [chainId]);

  const connectToInfura = async () => {
    let result = await correctNetwork(address);
    setWeb3(result["web3"]);
    setDaoChain(result["chainId"]);
    setChainId(result["chainId"]);
    setAccount(null);
  };

  const connect = async () => {
    try {
      if (
        typeof window !== "undefined"
      ) {
        const providerOptions = {
          walletconnect: {
            package: WalletConnectProvider, // required
            options: {
              infuraId: "26e178ea568e492983f2431ad6a31e74" // required
            }
          }
        };
        // We are in the browser and metamask is running.
        const web3Modal = new Web3Modal({
          providerOptions
        });

        const provider = await web3Modal.connect();

        let web3 = new Web3(provider);

        setWeb3(web3);

        const chainId_ = await web3.eth.getChainId();
        console.log("chainId", chainId_)

        const accounts = await web3.eth.getAccounts();

        const account = accounts[0];

        setAccount(accounts[0]);
        setChainId(parseInt(chainId_));

        provider.on("accountsChanged", function (accounts) {
          changeAccount();
        });

        provider.on("chainChanged", () => {
          changeChain();
        });

        provider.on("connect", () => {});

        provider.on("disconnect", () => {
          console.log("disconnected");
        });
      }
    } catch (e) {
      toast(e);
    }
  };

  const changeAccount = async () => {

    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        if (accounts.length !== 0) {
          setAccount(ethereum.selectedAddress);
          connect();
        } else {
          console.log("No authorised account found");
          return;
        }
      } catch (error) {
        if (error.code === 4001) {
          console.log("Metamask Connection Cancelled");
        }
      }
    } else {
      console.log("Make sure you have MetaMask!");
    }
  };

  const changeChain = async () => {
    console.log("change chain");
    let chainId_ = await window.ethereum.request({ method: "eth_chainId" });
    setChainId(parseInt(chainId_));
  };

  const isCorrectChain = async () => {
    if (address != null) {
      if (chainId != daoChain) {
        let name = getNetworkName(daoChain);
        toast("Please connect to the " + name + " network.");
      }
    } else {
      var supported = false;
      for (var i = 0; i < supportedChains.length; i++) {
        if (supportedChains[i]["chainId"] == chainId) {
          supported = true;
        }
      }
      if (supported == false) {
        toast("This network is not currently supported.");
      }
    }
  };

  const toast = (props) => {
    createToast(props);
  };

  return (
    <ChakraProvider theme={theme}>
      <AppContext.Provider
        value={{
          state: {
            web3: web3,
            account: account,
            chainId: chainId,
            daoChain: daoChain,
            loading: loading,
            address: address,
            abi: abi,
            visibleView: visibleView,
            dao: dao,
            proposals: proposals,
            remount: remount
          },
          setWeb3: setWeb3,
          setAccount: setAccount,
          setChainId: setChainId,
          setDaoChain: setDaoChain,
          setLoading: setLoading,
          setAddress: setAddress,
          connect: connect,
          setVisibleView: setVisibleView,
          setDao: setDao,
          setProposals: setProposals,
          toast: toast,
          setRemount: setRemount
        }}
      >
        <Component {...pageProps} />
      </AppContext.Provider>
    </ChakraProvider>
  );
}

export default MyApp;
