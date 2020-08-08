<p align="center"><img src="https://raw.githubusercontent.com/gsimone/r3f-starter/master/public/logo.png" width="360" /></p>

### Included libs

- [three.js](https://github.com/mrdoob/three.js)
- [react-three-fiber](https://github.com/react-spring/react-three-fiber)
- [drei](https://github.com/react-spring/drei)
- [react-postprocessing](https://github.com/drcmda/react-postprocessing)

- [glsl-noise](https://github.com/hughsk/glsl-noise#readme)

### Build additions

- `glsify-loader` to use require in shaders (eg. `#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)`)
- react-spring v9

### Misc

- draco binaries in `public/draco-gltf/` (the default directory used by `useGLTFLoader` in `drei`)
- simple default shaders in `src/shaders/`
- Scene setup with OrbitControls and React-PostProcessing

### Dev stuff

- `eslint`
- `prettier` with `husky` & `pretty-quick`
- `react-fast-refresh`
  
## How to use

```
npx degit gsimone/r3f-starter my-project
cd my-project

yarn && yarn start
```

Or just fork this repository 🤷‍♂️
