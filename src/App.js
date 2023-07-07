// import logo from './logo.svg';
import './App.css';
import {Canvas} from '@react-three/fiber'
import {OrbitControls, TrackballControls} from '@react-three/drei'
import {Perf} from "r3f-perf";
import {useControls} from 'leva'

import {useState} from "react";
import Teleport from "./components/walkModule/walk";



function App() {

     const [state, setState] = useState(true);

     return (

          <>

               <Canvas camera={{position: [0, 1, 2]}} >

                    <pointLight/>

                    <ambientLight intensity={0.1} color="#eaeaea"/>
                    <Teleport />
                    <group helpers>
                         <gridHelper args={[10, 10, "blue", "hotpink"]} onClick={() => setState(!state)}/>
                         {/*<gridHelper args={[10, 10, "blue", "hotpink"]}/>*/}
                         <axesHelper args={[5, 5]}/>
                         {/*<OrbitControls/>*/}
                         <Perf position="top-left"/>
                    </group>
               </Canvas>

          </>
     );
}

export default App;


