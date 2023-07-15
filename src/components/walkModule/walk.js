import React, {useEffect, useMemo, useRef, useState} from 'react';
import { useFrame } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import { Vector2, Vector3 } from 'three'
import { MathUtils } from 'three'
import Product from "../product/product";
import {EffectComposer, Outline, Selection} from "@react-three/postprocessing";
import TextureModule from "../textureModule/textureModule";



const Teleport = () => {

     const ref = useRef()
     const circleRef = useRef()
     const circleRef1 = useRef();
     const circleEffectRef = useRef()
     const to = useMemo(() => new Vector3(0, 1, 0), [])
     const dragVector = useMemo(() => new Vector2(), [])

     let dragONS = false
     const [hovered, setHovered] = useState(false);
     useEffect(() => {
          document.body.style.cursor = hovered ? 'pointer' : 'grab'
     }, [hovered])


     useEffect(() => {
          const onPointerDown = () => {
               dragONS = true
          }
          const onPointerUp = () => {
               dragONS = false
          }
          const onPointerMove = (e) => {
               dragVector.set(e.movementX, e.movementY)
               dragONS &&
               (ref.current.rotation.y += ((dragVector.x / 20) * Math.PI) / 180) &&
               (ref.current.children[0].rotation.x += ((dragVector.y / 20) * Math.PI) / 180)
          }
          document.addEventListener('pointerdown', onPointerDown)
          document.addEventListener('pointerup', onPointerUp)
          document.addEventListener('pointermove', onPointerMove)
          return () => {
               document.removeEventListener('pointerdown', onPointerDown)
               document.removeEventListener('pointerup', onPointerUp)
               document.removeEventListener('pointermove', onPointerMove)
          }
     })

     useFrame((_, delta) => {
          ref.current.position.lerp(to, delta * 1.2)
          circleEffectRef.current.scale.x = circleEffectRef.current.scale.y += delta* 2
          MathUtils.lerp( circleEffectRef.current.scale.x, circleEffectRef.current.scale.y, delta* 20)
          MathUtils.lerp( circleEffectRef.current.scale.y, 200, delta* 20)
          circleEffectRef.current.material.opacity -= delta * 2
          if (circleEffectRef.current.material.opacity <= 0) {
               circleEffectRef.current.material.opacity = 0;
          }
     })
     //

     const [mouseState, setMouseState] = useState(false);
     const [access, setAccess] = useState(null);
     const [ShowMenu, setShowMenu] = useState(false);
     let clickTimeout;
     let timeStone = true;
     let circleVisible = false;
     let objAc;


     const PressDown = (event) => {

          if (event.button === 0) {
               startClickTimeout();

          }

     };



     const PressUp = (event) => {

          if (event.button === 0) {
               setMouseState(false);
               clearTimeout(clickTimeout);
          }

          if (circleVisible) {
               console.log("кнопка отжата появление кружка");
               setMouseState(false);
               circleRef.current.material.opacity = 0.25;
               circleRef1.current.material.opacity = 0.1;
               document.body.style.cursor = 'pointer'
               setTimeout( () => {
                    timeStone  = true
                    circleRef.current.material.opacity = 0.25;
                    circleRef1.current.material.opacity = 0.1;
               },200)
          }
     };



     const PressClick = (event) => {
          if (!mouseState && timeStone && access) {
               handleMouseClick(event);
          }

     };

     const startClickTimeout = () => {
          clickTimeout = setTimeout(function() {
               handleMousePress();
          }, 200);
     };


     const handleMousePress = () => {
          console.log('Кнопка мыши зажата -  пропажа кружка');
          circleRef.current.material.opacity = 0;
          circleRef1.current.material.opacity = 0;
          console.log("grap");
          document.body.style.cursor = 'grab';
          timeStone = false;
          circleVisible = true;
     };


     const handleMouseClick = ({point}) => {
          console.log('Клик выполнен -- движение');
          circleRef.current.material.opacity = 0.25;
          circleRef1.current.material.opacity = 0.1;
          // console.log(event);
          to.set(point.x, 1, point.z)
          circleEffectRef.current.position.copy(circleRef.current.position)
          circleEffectRef.current.scale.set(1, 1, 1)
          circleEffectRef.current.material.opacity = 1
          setShowMenu(false)
     };

     const showProduct = (e) => {
          e.stopPropagation();
          if (e.object.name !== 'floor') {
               objAc = false;
               setAccess(false);
          }
     };
     useEffect(() => {
          // console.log(access);
     },[access])


     return (
          <>
               <group ref={ref} position={[0, 1, 10]}>
                    <PerspectiveCamera makeDefault  />
               </group>
               <mesh
                    visible={false}
                    name='floor'
                    rotation-x={-Math.PI / 2}
                    position={[-0.3, 0.0, 0]}

                    onPointerMove={(e) => {
                         const { point } = e;
                         e.stopPropagation();
                         // console.log(e.object.name);
                         circleRef.current.position.z = point.z;
                         circleRef.current.position.x = point.x;

                         circleRef1.current.position.z = point.z;
                         circleRef1.current.position.x = point.x;
                         if (e.object.name === 'floor'){
                              objAc = true;
                              setAccess(true);
                         }
                    }}

                    onPointerUp={PressUp}
                    onPointerDown={PressDown}
                    onClick={ PressClick}
                    onPointerOver={() => setHovered(true)}
                    onPointerOut={() => setHovered(false)}
                    // onPointerMissed={() => console.log('missed')}

               >
                    <planeGeometry args={[5, 9]} />
               </mesh>
               <mesh ref={circleRef} rotation-x={-Math.PI / 2} position-y={0.01}>
                    <ringGeometry args={[0.15, 0.17]} />
                    <meshBasicMaterial color={'white'} transparent opacity={0.25} />
               </mesh>
               <mesh ref={circleRef1} rotation-x={-Math.PI / 2} position-y={0.009}>
                    <ringGeometry args={[0, 0.17,32]} />
                    <meshBasicMaterial color={'white'} transparent opacity={0.1} />
               </mesh>
               <mesh ref={circleEffectRef} rotation-x={-Math.PI / 2} position-y={0.03}>
                    <ringGeometry args={[0.2, 0.22]} />
                    <meshBasicMaterial color={'white'} transparent opacity={0.75} />
               </mesh>

               <Selection>
                    <EffectComposer multisampling={0} autoClear={false}>
                         <Outline visibleEdgeColor="white" hiddenEdgeColor="white" blur width={1000} edgeStrength={100} />
                    </EffectComposer>
                    <Product show={showProduct} showMenu={ShowMenu} setShowMenu={setShowMenu} />
                    {/*<TextureModule />*/}
               </Selection>

          </>
     );
};

export default Teleport;

