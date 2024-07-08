import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import {
  allSysInfo,
  AllSystemInfo,
} from "tauri-plugin-system-info-api";

console.log('AllSYS', AllSystemInfo.parse(await allSysInfo()));

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  const [sysInfo, setSysInfo] = useState({});

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }
  async function getSysInfo() {
    try{
      setIsLoading(true)
      // const{cpus, components} = AllSystemInfo.parse(await allSysInfo());
      setSysInfo(AllSystemInfo.parse(await allSysInfo()))
      console.log('actual set', sysInfo);
    } catch (error) {
      console.log(error);
    }finally{
      setIsLoading(false)
    }
  }

  useEffect(() => {
      getSysInfo()
      

  }, [])
  
  
  return (
    <div className="container bg-slate-700/25 backdrop-blur-sm">
      <h1>Welcome to Tauri!</h1>

      

      <p>Click on the Tauri, Vite, and React logos to learn more.</p>
      {/* {isLoading ? "Loading" : "no longer loading"} */}
      {!isLoading && sysInfo.cpus.map((cpu, key)=>{
        return (<p key={key}>Core {cpu.name}: {Math.round(cpu.cpu_usage)}%</p>)
      })}
      {!isLoading && sysInfo.components.map((comp, key)=>{
        return (<p key={key}>Temp {comp.label}: {Math.round(comp.temperature)}degrees</p>)
      })}
      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          getSysInfo();
        }}
      >
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button className=" bg-green-500" type="submit">Greet</button>
      </form>

      <p>{greetMsg}</p>
    </div>
  );
}

export default App;
