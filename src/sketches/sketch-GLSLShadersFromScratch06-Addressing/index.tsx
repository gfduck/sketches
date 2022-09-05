import { OrthographicCamera, useTexture } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import dogImage from './dog.jpeg'

const vertexShader = /* glsl */ `
varying vec2 vUvs;

void main() {
    vec4 localPosition = vec4(position, 1.0);

    gl_Position = projectionMatrix * modelViewMatrix * localPosition;
    vUvs = uv;
}
`

const fragmentShader = /* glsl */ `
varying vec2 vUvs;

uniform sampler2D diffuse;
uniform sampler2D overlay;

void main() {
    vec2 uvs = vUvs * -2.0;
    vec4 diffuseSample = texture2D(diffuse, uvs);
    gl_FragColor = diffuseSample;
}
`

const App = () => {
    const dogTexture = useTexture(dogImage)

    // address modes
    dogTexture.wrapS = THREE.MirroredRepeatWrapping;
    dogTexture.wrapT = THREE.MirroredRepeatWrapping;
    
    return (
        <mesh position={[0.5, 0.5, 0]}>
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={{
                    diffuse: { value: dogTexture }, 
                    tint: { value: new THREE.Vector4(1, 0.5, 0.5) },
                }}
            />
            <planeBufferGeometry args={[1, 1]} />
        </mesh>
    )
}

export default () => (
    <>
        <h1 style={{ zIndex: 1 }}>SFS 06 - Addressing</h1>
        <Canvas>
            <App />
            <OrthographicCamera
                makeDefault
                manual
                args={[0, 1, 1, 0, 0.1, 1000]}
                position={[0, 0, 1]}
            />
        </Canvas>
    </>
)