import * as THREE from "three";

export function createSpace(lowPower: boolean, dpr: number) {
  const group = new THREE.Group();
  const time = { value: 0 };
  const view = { value: new THREE.Vector2() };
  const aspect = { value: 1 };
  const backdrop = new THREE.ShaderMaterial({
    depthTest: false,
    depthWrite: false,
    uniforms: { uView: view, uAspect: aspect },
    vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=vec4(position.xy,0.9999,1.); }`,
    fragmentShader: `
      varying vec2 vUv; uniform vec2 uView; uniform float uAspect;
      float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
      float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+1.),f.x),f.y);}
      float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*noise(p);p=mat2(.8,-.6,.6,.8)*p*2.03+17.;a*=.5;}return v;}
      void main(){
        vec2 p=(vUv-.5)*vec2(uAspect,1.)+uView*.012;
        float haze=fbm(p*4.+vec2(12,4));
        float spine=p.y-.19-p.x*.27+.12*sin(p.x*2.);
        float band=exp(-spine*spine*24.);
        float wisps=pow(fbm(p*8.+haze*2.),2.4)*band;
        float dust=smoothstep(.4,.68,fbm(p*17.+8.));
        vec3 color=vec3(.0018,.003,.0065);
        color+=mix(vec3(.015,.021,.035),vec3(.028,.024,.019),haze)*wisps*(1.-dust*.83)*.65;
        color+=vec3(.015,.012,.007)*exp(-length((p-vec2(-.65,-.04))*vec2(1.,1.7))*7.);
        gl_FragColor=vec4(color,1.);
        #include <colorspace_fragment>
      }`,
  });
  const background = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), backdrop);
  background.frustumCulled = false;
  background.renderOrder = -100;
  group.add(background);
  let seed = 42;
  const random = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  const count = lowPower ? 1800 : 4800;
  const positions = new Float32Array(count * 3),
    sizes = new Float32Array(count),
    phases = new Float32Array(count),
    colors = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const depth = 55 + random() * 290;
    positions.set(
      [(random() - 0.5) * depth * 2.3, (random() - 0.5) * depth * 1.25, -depth],
      i * 3,
    );
    sizes[i] = random() > 0.985 ? 3.5 + random() * 2 : 0.8 + random() * 1.5;
    phases[i] = random() * Math.PI * 2;
    const tint = random();
    colors.set(
      tint < 0.2
        ? [0.8, 0.7, 0.52]
        : tint > 0.8
          ? [0.55, 0.68, 0.85]
          : [0.78, 0.8, 0.84],
      i * 3,
    );
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
  geo.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));
  geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  const starMaterial = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
    uniforms: { uTime: time, uDpr: { value: dpr } },
    vertexShader: `attribute float aSize;attribute float aPhase;varying vec3 vColor;varying float vPhase;varying float vSize;uniform float uDpr;void main(){vColor=color;vPhase=aPhase;vSize=aSize;vec4 p=modelViewMatrix*vec4(position,1.);gl_Position=projectionMatrix*p;gl_PointSize=aSize*uDpr;}`,
    fragmentShader: `uniform float uTime;varying vec3 vColor;varying float vPhase;varying float vSize;void main(){vec2 p=gl_PointCoord-.5;float r=length(p);float core=exp(-r*r*28.);float rays=(exp(-abs(p.x)*60.)+exp(-abs(p.y)*60.))*exp(-r*7.)*step(3.,vSize)*.22;float shimmer=.9+.1*sin(uTime*.55+vPhase);gl_FragColor=vec4(vColor,(core+rays)*shimmer*.72);}`,
  });
  const stars = new THREE.Points(geo, starMaterial);
  stars.frustumCulled = false;
  group.add(stars);
  return {
    group,
    time,
    view,
    aspect,
    dispose() {
      geo.dispose();
      starMaterial.dispose();
      background.geometry.dispose();
      backdrop.dispose();
    },
  };
}

export function atmosphere(color: string, thickness: number) {
  const material = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
    uniforms: { uTint: { value: new THREE.Color(color) } },
    vertexShader: `varying vec3 vWorld;varying vec3 vNormal;void main(){vec4 world=modelMatrix*vec4(position,1.);vWorld=world.xyz;vNormal=normalize(mat3(modelMatrix)*normal);gl_Position=projectionMatrix*viewMatrix*world;}`,
    fragmentShader: `uniform vec3 uTint;varying vec3 vWorld;varying vec3 vNormal;void main(){vec3 n=normalize(vNormal),v=normalize(cameraPosition-vWorld);float ndv=abs(dot(n,v));float rim=pow(clamp(1.-ndv,0.,1.),3.)*smoothstep(0.,.18,ndv);float sun=smoothstep(-.4,.8,dot(n,normalize(vec3(-.8,.6,.7))));gl_FragColor=vec4(uTint,rim*(.025+.19*sun));}`,
  });
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(1, 48, 32), material);
  mesh.scale.setScalar(thickness);
  return mesh;
}

export function createRings(lowPower: boolean) {
  const geometry = new THREE.RingGeometry(1.18, 2.16, lowPower ? 192 : 320, 1);
  const material = new THREE.ShaderMaterial({
    side: THREE.DoubleSide,
    transparent: true,
    depthWrite: false,
    vertexShader: `varying vec3 vLocal;void main(){vLocal=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
    fragmentShader: `varying vec3 vLocal;void main(){
      float r=length(vLocal.xy);float edge=smoothstep(1.18,1.27,r)*(1.-smoothstep(2.08,2.16,r));
      float cassini=1.-smoothstep(.018,.032,abs(r-1.82));float encke=1.-smoothstep(.002,.006,abs(r-2.045));
      float fine=(sin(r*680.)*.13+sin(r*1370.)*.07)*clamp(1.-fwidth(r)*500.,0.,1.);
      float bands=.58+sin(r*95.)*.1+sin(r*31.)*.13+fine;
      vec3 color=mix(vec3(.22,.18,.13),vec3(.66,.56,.39),bands);
      vec3 light=normalize(vec3(-.65,.6,-.46));float along=max(0.,-dot(vLocal,light));float distanceToPlanet=length(vLocal+light*along);
      float shadow=mix(.17,1.,smoothstep(.96,1.06,distanceToPlanet));
      float density=edge*bands*(1.-cassini*.98)*(1.-encke*.8);
      gl_FragColor=vec4(color*shadow,density*.88);
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }`,
  });
  return { geometry, material };
}
