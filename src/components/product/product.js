import React, {useEffect, useState} from 'react';
import {OrbitControls, useGLTF} from "@react-three/drei";
import {EffectComposer, Outline, Select, Selection} from "@react-three/postprocessing"
import {useFrame, useLoader} from "@react-three/fiber";
import {TextureLoader} from "three";
import { Hud, OrthographicCamera, Environment,Center } from '@react-three/drei'
import ButtonsMenu from "../buttonsMenu/buttonsMenu";
import * as THREE from 'three'
import { Vector3 } from 'three'

const Product = ({show,showMenu,setShowMenu,to,pressClick,pressDown,pressUp}) => {
     const { nodes, materials } = useGLTF('./models/product.glb')
     const [hovered, hover] = useState();

     const [count, setCount] = useState(null);
     const [selected, setSelected] = useState(0);
     const [selectArr1, setSelectArr1] = useState(0);
     const [selectArr2, setSelectArr2] = useState(0);
     const [selectArr3, setSelectArr3] = useState(0);


     const Array1 = useLoader(TextureLoader, [
          './img/fabric_pattern_05.jpg',
          './img/leather_red.jpg',
          './img/fabric_pattern_07.jpg',
          './img/book_pattern.jpg',
          './img/denim_fabric_02.jpg'
     ])
     const Array2 = useLoader(TextureLoader, [
          './img/sofa/s1.jpg',
          './img/sofa/s2.jpg',
          './img/sofa/s3.jpg',
          './img/sofa/s4.jpg',
     ])
     const Array3 = useLoader(TextureLoader, [
          './img/table/1.jpg',
          './img/table/2.png',
          './img/table/3.jpg',
          './img/table/4.jpg',
     ])


     let fullArray = [];
     fullArray.push(Array1,Array2,Array3);

    useEffect(() => {
         // console.log(hovered);
         // console.log("123");
    },[hovered])

     const [colorMap, normalMap,displacementMap, aoMap,roughnessMap ] = useLoader(
          TextureLoader,
          [
               './img/texture/2.jpg',
               './img/texture/2.jpg',
               './img/texture/3.jpg',
               './img/texture/4.jpg',
               './img/texture/5.jpg',
          ]
     );

     normalMap.wrapS = THREE.RepeatWrapping;
     normalMap.wrapT = THREE.RepeatWrapping;
     aoMap.wrapS = THREE.RepeatWrapping;
     aoMap.wrapT = THREE.RepeatWrapping;
     roughnessMap.wrapS = THREE.RepeatWrapping;
     roughnessMap.wrapT = THREE.RepeatWrapping;
     colorMap.wrapS = THREE.RepeatWrapping;
     colorMap.wrapT = THREE.RepeatWrapping;

     const showSingUpModal = () => {
          // to.set(1, 1, 2)

     };





     return (
          <>
          <group  dispose={null}  name='product' onPointerMove={show} onPointerOver={(e) => hover(e.object.name)} onPointerOut={(e) => hover(null)}>
               <Select  enabled={hovered === "chair"} onClick={() => setCount(0)}>
                    <group scale={0.01} onClick={() => setShowMenu(true)}>
                         <group position={[-52.694, 8.657, -217.254]} rotation={[-Math.PI / 2, 0, -0.768]} scale={100} >
                              <mesh onPointerUp={pressUp}
                                    onPointerDown={pressDown}
                                    onClick={pressClick}
                                   geometry={nodes.Cube034_Fabric001_0001.geometry} rotation={[1.484, 0, -Math.PI]}  name='chair' >
                              <meshStandardMaterial map={Array1[selectArr1] }
                                                    normalMap={normalMap}
                                                    roughnessMap={roughnessMap}
                                                    aoMap={aoMap}
                                                    displacementMap={displacementMap}
                                                    displacementScale={0.01}
                                                    metalness={0.45}
                                                    rougness={0.1}
                                                    envMapIntensity={1.5}
                              />
                              </mesh>
                         </group>
                    </group>
               </Select>
               <Select  enabled={hovered === "sofa"} onClick={() => setCount(1)}>
                    <group scale={0.01} onClick={() => setShowMenu(true) }>
                         <mesh onPointerUp={pressUp}
                               onPointerDown={pressDown}
                               onClick={pressClick}
                              geometry={nodes.Leather_Sofa_Fabric002_0001.geometry}  position={[-249.085, 9.573, -90.576]} rotation={[-Math.PI / 2, 0, Math.PI / 2]} scale={[119.566, 100, 100]} name='sofa' >
                              <meshStandardMaterial map={ Array2[selectArr2]}
                                                    normalMap={normalMap}
                                                    roughnessMap={roughnessMap}
                                                    aoMap={aoMap}
                                                    displacementMap={displacementMap}
                                                    displacementScale={0.01}
                                                    metalness={0.45}
                                                    rougness={0.1}
                                                    envMapIntensity={1.5}
                              />
                         </mesh>
                    </group>
               </Select>

               <group scale={0.01}>
                    <group position={[-52.694, 8.657, -217.254]} rotation={[-Math.PI / 2, 0, -0.768]} scale={100}>
                         <mesh geometry={nodes.Chair_Material010_0001.geometry} material={materials['Material.014']} name='product' />
                         <mesh geometry={nodes.Cylinder_Material012_0001.geometry} material={materials['Material.006']} name='product' />
                    </group>
               </group>
               <Select  enabled={hovered === "table"} onClick={() => setCount(2)}>
                    <group scale={0.01} onClick={() => setShowMenu(true)}>
                         <mesh  onPointerUp={pressUp}
                                onPointerDown={pressDown}
                                onClick={pressClick}
                              geometry={nodes.Cube021_Material009_0001.geometry}  position={[-99.936, 33.325, -53.904]} rotation={[-Math.PI / 2, 0, 0]} scale={100} name='table'>
                         <meshStandardMaterial map={Array3[selectArr3] } roughness={0.01}
                                               normalMap={normalMap}
                                               roughnessMap={roughnessMap}
                                               aoMap={aoMap}
                         />
                         </mesh>
                    </group>
               </Select>

          </group>

           <>
                <Hud renderPriority={2}>
                     <OrthographicCamera makeDefault position={[0, 0, 20]} zoom={50} />
                     <Environment preset="forest" />

                     <Center cacheKey={count} bottom position={[0,-5.8,0]}>
                          {showMenu && fullArray[count].map((post, index) => {
                               return  <ButtonsMenu count={count} data={fullArray} index={index} post={post} setSelected={setSelected}
                                selectArr1={setSelectArr1}
                                selectArr2={setSelectArr2}
                                selectArr3={setSelectArr3}
                               />
                          })}

                     </Center>
                </Hud>
           </>

          </>
     );
};

export default Product;

useGLTF.preload('./models/product.glb')
