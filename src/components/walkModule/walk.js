import React, {useEffect, useMemo, useRef, useState} from 'react';
import { useFrame } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import { Vector2, Vector3 } from 'three'


const Teleport = () => {

     const ref = useRef()
     const circleRef = useRef()
     const circleEffectRef = useRef()
     const to = useMemo(() => new Vector3(0, 1, 10), [])
     const dragVector = useMemo(() => new Vector2(), [])

     let dragONS = false
     const [hovered, setHovered] = useState(false);
     useEffect(() => {
          document.body.style.cursor = hovered ? 'pointer' : 'auto'
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
               (ref.current.rotation.y += ((dragVector.x / 10) * Math.PI) / 180) &&
               (ref.current.children[0].rotation.x += ((dragVector.y / 10) * Math.PI) / 180)
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
          ref.current.position.lerp(to, delta * 2)
          circleEffectRef.current.scale.x = circleEffectRef.current.scale.y += delta * 50
          circleEffectRef.current.material.opacity -= delta * 1
     })


     const [mouseState, setMouseState] = useState(false);
     let clickTimeout;
     let timeStone = true;
     let circleVisible = false;


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
               document.body.style.cursor = 'pointer'
          }
     };



     const PressClick = (event) => {
          if (!mouseState && timeStone) {
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
          console.log("grap");
          document.body.style.cursor = 'grab';
          timeStone = false;
          circleVisible = true;
     };


     const handleMouseClick = ({point}) => {
          console.log('Клик выполнен -- движение');
          // console.log(event);
          to.set(point.x, 1, point.z)
          circleEffectRef.current.position.copy(circleRef.current.position)
          circleEffectRef.current.scale.set(1, 1, 1)
          circleEffectRef.current.material.opacity = 1
     };


     return (
          <>
               <group ref={ref} position={[0, 1, 10]}>
                    <PerspectiveCamera makeDefault />
               </group>
               <mesh
                    // visible={false}
                    rotation-x={-Math.PI / 2}
                    position={[0, 0, 0]}
                    onPointerMove={({ point }) => {
                         circleRef.current.position.z = point.z
                         circleRef.current.position.x = point.x
                    }}

                    onPointerUp={PressUp}
                    onPointerDown={PressDown}
                    onClick={ PressClick}
                    onPointerOver={() => setHovered(true)}
                    onPointerOut={() => setHovered(false)}
                    // onPointerMove={}

               >
                    <planeGeometry args={[19.4, 19.4]} />
               </mesh>
               <mesh ref={circleRef} rotation-x={-Math.PI / 2} position-y={0.01}>
                    <ringGeometry args={[0.3, 0.4]} />
                    <meshBasicMaterial color={'black'} transparent opacity={0.25} />
               </mesh>
               <mesh ref={circleEffectRef} rotation-x={-Math.PI / 2} position-y={0.03}>
                    <ringGeometry args={[0.39, 0.4]} />
                    <meshBasicMaterial color={'black'} transparent />
               </mesh>
          </>
     );
};

export default Teleport;
