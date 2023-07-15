import React, {useEffect, useRef, useState} from 'react';
import {useFrame} from "@react-three/fiber";
import {MathUtils} from "three";
import {animated, easings, useSpring,useTrail} from "@react-spring/three";

const ButtonsMenu = ({ count, post,index,selectArr1,selectArr2,selectArr3 }) => {

     const ref = useRef();
     const [hovered, setHovered] = useState(false)


     useFrame((_, delta) => {
          ref.current.scale.y = ref.current.scale.x = ref.current.scale.z = MathUtils.lerp(ref.current.scale.y, hovered ? 1.2 : 1, 0.25)
          hovered && ref.current.rotateY(delta * 5)
     })

     const { scale } = useSpring({
          from: { scale:0.1 },
          to: [
               { scale:1 },
               { scale:1 },
          ],

          config: {
               duration: 700, // Animation duration in milliseconds
               easing: easings.easeOutBack, // Use the easeOutCirc easing function
          },
          delay: (el, i) => 45 * (i + 1),
          reset: false,
     });




     return (
          <>
               <animated.mesh scale={scale} ref={ref} position={[-6.5 + index * 4.7 + count, -0.4, 1]} key={index}
                     onClick={(e) => {
                          e.stopPropagation();
                          switch (count) {
                               case 0:
                                    selectArr1(index);
                                    break;
                               case 1:
                                    selectArr2(index);
                                    break;
                               case 2:
                                    selectArr3(index);
                                    break;
                               default:
                                    break;
                          }

                     }}

                     onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}
               >
                    <sphereGeometry args={[2]} />
                    <meshStandardMaterial    roughness={0.1} envMapIntensity={1.5} map={post} />
               </animated.mesh>
          </>
     );
};

export default ButtonsMenu;
