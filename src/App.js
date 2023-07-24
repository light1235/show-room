// import logo from './logo.svg';
import './App.css';
import {Canvas} from '@react-three/fiber'
import {OrbitControls, TrackballControls} from '@react-three/drei'
import {Perf} from "r3f-perf";
import {useControls} from 'leva'

import React, {useState} from "react";
import Teleport from "./components/walkModule/walk";
import Decoration from "./components/room/room";
import Product from "./components/product/product";
import OutLineEffects from "./components/outEffect/outEffect";



function App() {


     return (

          <>

               <Canvas camera={{position: [0, 0, 0]}}>
               >

                    <pointLight/>

                    <ambientLight intensity={0.5} />
                    <Teleport />
                    <Decoration />

                    <group helpers>
                         {/*<Perf position="top-left"/>*/}
                    </group>
               </Canvas>

          </>
     );
}

export default App;

