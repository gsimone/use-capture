varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vViewPosition;

void main()	{

    vec3 normall = normalize( cross( dFdx( vViewPosition ), dFdy( vViewPosition ) ) );

    gl_FragColor = vec4(normall, 1.);
}
