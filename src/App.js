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

               <Canvas camera={{position: [0, 0, -2]}}
                       onCreated={({ camera }) => camera.position.z = -10}>
               >

                    <pointLight/>

                    <ambientLight intensity={0.1} color="#eaeaea"/>
                    <Teleport />
                    <Decoration />
                    {/*<OutLineEffects />*/}

                    {/*<OrbitControls/>*/}
                    {/*<mesh >*/}
                    {/*     <ringGeometry args={[0, 0.4,32]} />*/}
                    {/*     <meshBasicMaterial color={'red'} transparent opacity={1} />*/}
                    {/*</mesh>*/}
                    {/*<color attach="background" args={['red']}/>*/}

                    <group helpers>
                         {/*<gridHelper args={[10, 10, "blue", "hotpink"]} onClick={() => setState(!state)}/>*/}
                         {/*<gridHelper args={[10, 10, "blue", "hotpink"]}/>*/}
                         {/*<axesHelper args={[5, 5]}/>*/}

                         <Perf position="top-left"/>
                    </group>
               </Canvas>

          </>
     );
}

export default App;

