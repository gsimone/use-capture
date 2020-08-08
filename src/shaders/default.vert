uniform float time;
uniform vec2 resolution;
uniform float distort;

varying vec3 vNormal;
varying vec2 vUv;
varying float vNoise;

varying vec3 vBarycentric;
varying vec3 vViewPosition;
varying vec3 vPosition;
attribute float even;

void main()	{
    vNormal = normal;
    vViewPosition = position.xyz;
    vUv = uv;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
}
