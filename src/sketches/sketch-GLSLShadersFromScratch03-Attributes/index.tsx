import { OrthographicCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Color } from 'three'

const vertexShader = /* glsl */ `
attribute vec3 myColors;

varying vec2 vUvs;
varying vec3 vColors;

void main() {
    vec4 localPosition = vec4(position, 1.0);

    gl_Position = projectionMatrix * modelViewMatrix * localPosition;
    vUvs = uv;
    vColors = myColors;
}
`

const fragmentShader = /* glsl */ `
varying vec2 vUvs;
varying vec3 vColors;

void main() {
    gl_FragColor = vec4(vColors, 1.0);
}
`

const colors = [
    new Color(0xff0000),
    new Color(0x00ff00),
    new Color(0x0000ff),
    new Color(0x00ffff),
]
const colorFloats = colors.map((c) => c.toArray()).flat()

const App = () => {
    return (
        <mesh position={[0.5, 0.5, 0]}>
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
            />
            <planeBufferGeometry args={[1, 1]}>
                <float32BufferAttribute
                    attach="attributes-myColors"
                    args={[colorFloats, 3]}
                />
            </planeBufferGeometry>
        </mesh>
    )
}

export default () => (
    <>
        <h1>SFS 03 - Attributes</h1>
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
