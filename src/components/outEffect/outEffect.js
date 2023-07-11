import React from 'react';
import { EffectComposer, SSAO, SMAA, Selection, Outline } from "@react-three/postprocessing"
import {PerspectiveCamera} from "@react-three/drei";

const OutLineEffects = ({children}) => {
     return (
          <>
               <Selection>
                    <EffectComposer multisampling={0} autoClear={true}
                    >
                         {/*<SSAO radius={0.05} intensity={150} luminanceInfluence={0.5} color="black" />*/}
                         <Outline visibleEdgeColor="white" hiddenEdgeColor="white" blur width={1000} edgeStrength={100} />
                         {/*<SMAA />*/}

                    </EffectComposer>
                    {children}
               </Selection>
          </>
     );
};

export default OutLineEffects;
