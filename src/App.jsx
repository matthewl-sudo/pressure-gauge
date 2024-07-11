import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import {
  allSysInfo,
  AllSystemInfo,
} from "tauri-plugin-system-info-api";
import Chart from "./Chart";
import TempGauge from "./TempGauge";
import CpusGraph from "./CpusGraph";
import Processes from "./Processes";
export const toGB = 1024 * 1024 * 1024;

console.log('AllSYS', AllSystemInfo.parse(await allSysInfo()));

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  const [sysInfo, setSysInfo] = useState({});
  const [proArray, setProArray] = useState([]);

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

    
    // let sortedProcesses = (processes) => {
    //   return processes.sort((a, b) => {
    //     return a.memory - b.memory
    //   })
    // }
    let sortedProcesses = sysInfo.processes?.sort(
      (a, b) => (a.memory < b.memory) ? 
        1 : (a.memory > b.memory) ?
        -1 : 0
    );


  useEffect(() => {
      getSysInfo()
      
  }, [])
  
  return (
    <div className="container bg-slate-700/25 backdrop-blur-xs">
      <h1>Welcome to Tauri!</h1>

      <div className="mx-auto flex">
        <CpusGraph cpus={sysInfo.cpus}/>

        <Chart 
            label1={"Free Memory"}
            label2={"Used Memory"}
            totalRam={sysInfo.total_memory}
            usedRam={sysInfo.used_memory}
            />
        
        {sysInfo.components &&
        <TempGauge 
          label={"CPU Temp"}
          value={sysInfo.components[0].temperature}
          />}
      </div>
      <p>Click on the Tauri, Vite, and React logos to learn more.</p>
     
      {!isLoading && sysInfo.components.map((comp, key)=>{
        return (<p key={key}>Temp {comp.label}: {Math.round(comp.temperature)}degrees</p>)
      })}
      <p>Top 50 processes</p>
        <Processes>
          <tbody className="">
            {sysInfo.processes && 
            sortedProcesses
              .slice(0, 50)
              .map((process, key)=>{
                return (
                <tr className='odd:bg-neutral-900 even:bg-gray-800' key={key}>
                  <td className='text-neutral-300'>
                    {process.name}
                  </td>
                  <td className='text-neutral-300'>
                    {((process.memory/toGB)*1024).toFixed(2)+'MB'}
                  </td>
                </tr>)
            })}
          </tbody>
      </Processes>
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
