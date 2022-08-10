import { lazy } from 'react'

export const sketchList = [
    { title: 'Home', route: 'Home' },
    /* GLSL Shaders From Scratch */
    {
        title: 'Shaders From Scratch 1 - Varyings',
        route: 'GLSLShadersFromScratch01-Varyings',
    },
    {
        title: 'Shaders From Scratch 2 - Uniforms',
        route: 'GLSLShadersFromScratch02-Uniforms',
    },
    {
        title: 'Shaders From Scratch 3 - Attributes',
        route: 'GLSLShadersFromScratch03-Attributes',
    },
    {
        title: 'Shaders From Scratch 4 - Textures',
        route: 'GLSLShadersFromScratch04-Textures',
    },
    {
        title: 'Shaders From Scratch 5 - Alpha',
        route: 'GLSLShadersFromScratch05-Alpha',
    },
    {
        title: 'Shaders From Scratch 6 - Addressing',
        route: 'GLSLShadersFromScratch06-Addressing',
    },
    /* Three.js Journey */
    {
        title: 'Journey Lesson 3 - Basic',
        route: 'JourneyLesson03-Basic',
    },
    {
        title: 'Journey Lesson 5 - Transforms',
        route: 'JourneyLesson05-Transforms',
    },
    {
        title: 'Journey Lesson 6 - Animations',
        route: 'JourneyLesson06-Animations',
    },
    {
        title: 'Journey Lesson 7 - Cameras',
        route: 'JourneyLesson07-Cameras',
    },
    {
        title: 'Journey Lesson 9 - Geometries',
        route: 'JourneyLesson09-Geometries',
    },
    {
        title: 'Journey Lesson 11 - Textures',
        route: 'JourneyLesson11-Textures',
    },
    {
        title: 'Journey Lesson 12 - Materials',
        route: 'JourneyLesson12-Materials',
    },
    {
        title: 'Journey Lesson 13 - Text',
        route: 'JourneyLesson13-Text',
    },
    {
        title: 'Journey Lesson 15 - Lights',
        route: 'JourneyLesson15-Lights',
    },
    {
        title: 'Journey Lesson 16 - Shadows',
        route: 'JourneyLesson16-Shadows',
    },
    {
        title: 'Journey Lesson 17 - Haunted House',
        route: 'JourneyLesson17-HauntedHouse',
    },
    {
        title: 'Journey Lesson 18.1 - Particles',
        route: 'JourneyLesson18-1-Particles',
    },
    {
        title: 'Journey Lesson 18.2 - Particles',
        route: 'JourneyLesson18-2-Particles',
    },
    {
        title: 'Journey Lesson 19 - Galaxy Generator',
        route: 'JourneyLesson19-GalaxyGenerator',
    },
    {
        title: 'Journey Lesson 27 - Shaders',
        route: 'JourneyLesson27-Shaders',
    },
] as const

export type Sketch = typeof sketchList[number]

export const isSketchRoute = (v?: string): v is Sketch['route'] =>
    sketchList.some((s) => s.route === v)

export const sketches = sketchList.reduce((o, sketch) => {
    o[sketch.route] = {
        Component: lazy(() => import(`./sketch-${sketch.route}/index.tsx`)),
    }
    return o
}, {} as Record<Sketch['route'], { Component: React.ComponentType }>)
