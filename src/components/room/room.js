import React from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import {useGLTF} from "@react-three/drei";
// const gltf = useLoader(GLTFLoader, './model/grass.gltf');

const Decoration = () => {
     const mode = useGLTF('./models/room.glb');

     return (
          <>
               <primitive
                    object={mode.scene}
                    position={[0, -0.1, 0]}
                    children-0-castShadow
               />
          </>
     );
};

export default Decoration;
