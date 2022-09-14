import {
    Environment,
    Float,
    OrbitControls,
    useCubeTexture,
    useTexture,
} from '@react-three/drei'
import { Canvas, Vector3 } from '@react-three/fiber'
import { Box, Flex } from '@react-three/flex'
import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { MeshMatcapMaterial, MeshNormalMaterial } from 'three'
import { useData } from '../../hooks/use-data'
import doorAlphaImage from './textures/door/alpha.jpg'
import doorAmbientOcclusionImage from './textures/door/ambientOcclusion.jpg'
import doorColorImage from './textures/door/color.jpg'
import doorHeightImage from './textures/door/height.jpg'
import doorMetalnessImage from './textures/door/metalness.jpg'
import doorNormalImage from './textures/door/normal.jpg'
import doorRoughnessImage from './textures/door/roughness.jpg'
import environmentMapNxImage from './textures/environmentMaps/0/nx.jpg'
import environmentMapNyImage from './textures/environmentMaps/0/ny.jpg'
import environmentMapNzImage from './textures/environmentMaps/0/nz.jpg'
import environmentMapPxImage from './textures/environmentMaps/0/px.jpg'
import environmentMapPyImage from './textures/environmentMaps/0/py.jpg'
import environmentMapPzImage from './textures/environmentMaps/0/pz.jpg'

import matCapImage from './textures/matcaps/8.png'

const padding = 1

const Boxes = (props: { position: Vector3 }) => {
    const matcapTexture = useTexture(matCapImage)

    return (
        <Flex
            position={props.position}
            width={6}
            height={3}
            centerAnchor
            justifyContent="center"
            flexDirection="row"
            flexWrap="wrap"
        >
            <Box padding={padding} centerAnchor>
                <Float>
                    <mesh>
                        <boxBufferGeometry args={[1, 1, 1]} />
                        <meshNormalMaterial />
                    </mesh>
                </Float>
            </Box>
            <Box padding={padding} centerAnchor>
                <Float>
                    <mesh>
                        <boxBufferGeometry args={[1, 1, 1]} />
                        <meshMatcapMaterial matcap={matcapTexture} />
                    </mesh>
                </Float>
            </Box>
            <Box padding={padding} centerAnchor>
                <Float>
                    <mesh>
                        <boxBufferGeometry args={[1, 1, 1]} />
                        <meshLambertMaterial color={0x4444ff} />
                    </mesh>
                </Float>
            </Box>
            <Box padding={padding} centerAnchor>
                <Float>
                    <mesh>
                        <boxBufferGeometry args={[1, 1, 1]} />
                        <meshPhongMaterial
                            shininess={10}
                            specular={0x0000ff}
                            color={0xff0000}
                        />
                    </mesh>
                </Float>
            </Box>
            <Box padding={padding} centerAnchor>
                <Float>
                    <mesh>
                        <boxBufferGeometry args={[1, 1, 1]} />
                        <meshStandardMaterial
                            metalness={0.45}
                            roughness={0.65}
                            color={0xff0000}
                        />
                    </mesh>
                </Float>
            </Box>
        </Flex>
    )
}

const Door = (props: { position: Vector3 }) => {
    const doorAlpha = useTexture(doorAlphaImage)
    const doorAmbientOcclusion = useTexture(doorAmbientOcclusionImage)
    const doorColor = useTexture(doorColorImage)
    const doorHeight = useTexture(doorHeightImage)
    const doorMetalness = useTexture(doorMetalnessImage)
    const doorNormal = useTexture(doorNormalImage)
    const doorRoughness = useTexture(doorRoughnessImage)

    const plane = useData(() => {
        const material = new THREE.MeshStandardMaterial()

        material.map = doorColor

        material.aoMap = doorAmbientOcclusion
        material.aoMapIntensity = 2

        material.displacementMap = doorHeight
        material.displacementScale = 0.2

        material.normalMap = doorNormal

        material.metalnessMap = doorMetalness
        material.roughnessMap = doorRoughness

        material.transparent = true
        material.alphaMap = doorAlpha

        const mesh = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(4, 4, 100, 100),
            material
        )

        mesh.geometry.setAttribute(
            'uv2',
            new THREE.BufferAttribute(mesh.geometry.attributes.uv.array, 2)
        )

        return mesh
    })

    return (
        <>
            <Float floatIntensity={5} position={props.position}>
                <mesh>
                    <meshStandardMaterial
                        map={doorColor}
                        aoMap={doorAmbientOcclusion}
                        aoMapIntensity={2}
                        displacementMap={doorHeight}
                        displacementScale={0.2}
                        normalMap={doorNormal}
                        metalnessMap={doorMetalness}
                        roughnessMap={doorRoughness}
                        transparent
                        alphaMap={doorAlpha}
                    />
                    <planeBufferGeometry args={[4, 4, 100, 100]}>
                        <bufferAttribute attach="uv2" />
                    </planeBufferGeometry>
                </mesh>
            </Float>
        </>
    )
}

const Lights = () => {
    const directionalLight = useRef<THREE.DirectionalLight>(null!)

    useEffect(() => {
        directionalLight.current.lookAt(0, 0, 0)
    }, [])

    return (
        <>
            <directionalLight
                ref={directionalLight}
                intensity={0.3}
                position={[-3, 0, 5]}
            />
            <ambientLight intensity={0.5} />
        </>
    )
}

export default () => {
    const cubeTexture = useCubeTexture(
        [
            environmentMapNxImage,
            environmentMapNyImage,
            environmentMapNzImage,
            environmentMapPxImage,
            environmentMapPyImage,
            environmentMapPzImage,
        ],
        { path: '' }
    )

    return (
        <>
            <h1>Journey 12 - Materials</h1>
            <Canvas camera={{ position: [0, 0, 10], fov: 40 }}>
                <Boxes position={[-2.5, 0, 0]} />
                <Door position={[2.5, -0.5, 0]} />

                <Lights />

                <Environment>
                    <primitive object={cubeTexture} attach="background" />
                </Environment>

                <OrbitControls target={[0, -0.5, 0]} />
            </Canvas>
        </>
    )
}
