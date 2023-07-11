import React from 'react';
import {useGLTF} from "@react-three/drei";

const Product = ({show}) => {
     const { nodes, materials } = useGLTF('./models/product.glb')

     return (
          <group  dispose={null}  name='product' onPointerMove={show}>
               <group scale={0.01}>
                    <group position={[-52.694, 8.657, -217.254]} rotation={[-Math.PI / 2, 0, -0.768]} scale={100}>
                         <mesh geometry={nodes.Cube034_Fabric001_0001.geometry} material={materials['Fabric.003']} rotation={[1.484, 0, -Math.PI]}  name='product'/>
                    </group>
               </group>
               <group scale={0.01}>
                    <mesh geometry={nodes.Leather_Sofa_Fabric002_0001.geometry} material={materials['Fabric.004']} position={[-249.085, 9.573, -90.576]} rotation={[-Math.PI / 2, 0, Math.PI / 2]} scale={[119.566, 100, 100]} name='product' />
               </group>
               <group scale={0.01}>
                    <group position={[-52.694, 8.657, -217.254]} rotation={[-Math.PI / 2, 0, -0.768]} scale={100}>
                         <mesh geometry={nodes.Chair_Material010_0001.geometry} material={materials['Material.014']} name='product' />
                         <mesh geometry={nodes.Cylinder_Material012_0001.geometry} material={materials['Material.006']} name='product' />
                    </group>
               </group>
               <group scale={0.01}>
                    <mesh geometry={nodes.Cube021_Material009_0001.geometry} material={materials['Material.015']} position={[-99.936, 33.325, -53.904]} rotation={[-Math.PI / 2, 0, 0]} scale={100} name='product'/>
               </group>
          </group>
     );
};

export default Product;

useGLTF.preload('./models/product.glb')
