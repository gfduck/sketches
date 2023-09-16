/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'
import chestGlftUrl from './chest.glb?url'

type GLTFResult = GLTF & {
    nodes: {
        Mesh_chest: THREE.Mesh
        Mesh_chest_1: THREE.Mesh
        Mesh_lid: THREE.Mesh
        Mesh_lid_1: THREE.Mesh
    }
    materials: {
        wood: THREE.MeshStandardMaterial
        metal: THREE.MeshStandardMaterial
    }
}

export const Chest = (props: JSX.IntrinsicElements['group']) => {
    const { nodes, materials } = useGLTF(chestGlftUrl) as GLTFResult
    return (
        <group {...props} dispose={null}>
            <mesh castShadow receiveShadow geometry={nodes.Mesh_chest.geometry} material={materials.wood} />
            <mesh castShadow receiveShadow geometry={nodes.Mesh_chest_1.geometry} material={materials.metal} />
            <group position={[0, 0.25, 0.25]}>
                <mesh castShadow receiveShadow geometry={nodes.Mesh_lid.geometry} material={materials.metal} />
                <mesh castShadow receiveShadow geometry={nodes.Mesh_lid_1.geometry} material={materials.wood} />
            </group>
        </group>
    )
}

useGLTF.preload(chestGlftUrl)
