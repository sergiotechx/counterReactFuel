
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect, useState } from "react";
import "./App.css";
//Liberria para cargar la wallet
import { Wallet } from "fuels";
// Import the contract factory -- you can find the name in index.ts.
// You can also do command + space and the compiler will suggest the correct name.
//Generado npx fuels typegen -i ../countersm/out/debug/*-abi.json -o ./src/types --contract
import { CountersmAbi__factory } from "./types/factories/CountersmAbi__factory";

// The address of the contract deployed the Fuel testnet
//dato obtenido al desplegar el contrato localmente forc deploy --unsigned
const CONTRACT_ID =
  "0x3edb96c23766b8504caaff042994efa18460e7ba27f60191394a6bcf5be8d7d8";

//the private key from createWallet.js
//billetera generada al ejecutar el nodo localmente en memoria fuel-core run --ip 127.0.0.1 --port 4000
const WALLET_SECRET =
  "0x37fa81c84ccd547c30c176b118d5cb892bdb113e8e80141f266519422ef9eefd";

// Create a Wallet from given secretKey in this case
// The one we configured at the chainConfig.json
//el segundo parámetro es el provider, en este caso es local
const wallet = Wallet.fromPrivateKey(
  WALLET_SECRET, "http://127.0.01:4000/graphql"
);

// Connects out Contract instance to the deployed contract
// address using the given wallet.
const contract = CountersmAbi__factory.connect(CONTRACT_ID, wallet);



function App() {
  const [count, setCount] = useState(0)

  //función que hace incrementa en 1 y luego trae el valor de la blockchain local!! :)
  async function fuel_power(){
    await contract.functions.increment().txParams({ gasPrice: 1 }).call();
    const { value } = await contract.functions.count().get();
    setCount(Number(value));
  }

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={fuel_power}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App