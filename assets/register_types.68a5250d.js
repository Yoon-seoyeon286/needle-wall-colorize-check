var p=Object.defineProperty;var C=(a,r,e)=>r in a?p(a,r,{enumerable:!0,configurable:!0,writable:!0,value:e}):a[r]=e;var i=(a,r,e)=>(C(a,typeof r!="symbol"?r+"":r,e),e);import{serializable as f,Behaviour as u,TypeStore as b}from"./needle-engine@4.11.5.js";import{x as c}from"./three@0.169.11.js";import"./gltf-progressive.c237dbf7.js";import"./three-examples.83c9f420.js";import"./three-mesh-ui.9f930f69.js";import"./three-quarks.0224a333.js";import"./postprocessing.21e89a04.js";var P=Object.defineProperty,x=Object.getOwnPropertyDescriptor,k=(a,r,e,o)=>{for(var n=o>1?void 0:o?x(r,e):r,t=a.length-1,s;t>=0;t--)(s=a[t])&&(n=(o?s(r,e,n):s(n))||n);return o&&n&&P(r,e,n),n};class w extends u{constructor(){super(...arguments);i(this,"serverUrl","https://neville-uncorruptible-wendy.ngrok-free.dev");i(this,"isSending",!1);i(this,"overlayCanvas");i(this,"overlayCtx");i(this,"maskImage");i(this,"currentColor",new c(1,0,0))}start(){console.log("=".repeat(50)),console.log("🎨 WallPaintClient 초기화"),console.log(`📡 서버 URL: ${this.serverUrl}`),console.log("=".repeat(50)),this.createOverlay()}createOverlay(){console.log("🖼️  오버레이 캔버스 생성 중...");const e=document.getElementById("wall-mask-overlay");e&&e.remove(),this.overlayCanvas=document.createElement("canvas"),this.overlayCanvas.id="wall-mask-overlay",this.overlayCanvas.style.cssText=`
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
            z-index: 1000;
            opacity: 0;
        `,document.body.appendChild(this.overlayCanvas),this.overlayCtx=this.overlayCanvas.getContext("2d",{willReadFrequently:!0})||void 0,this.resizeOverlay(),window.addEventListener("resize",()=>this.resizeOverlay()),console.log(`✅ 오버레이 캔버스 생성 완료
`)}resizeOverlay(){this.overlayCanvas&&(this.overlayCanvas.width=window.innerWidth,this.overlayCanvas.height=window.innerHeight,this.maskImage&&this.drawMask())}async onClickRequestMask(){if(console.log(`
`+"=".repeat(50)),console.log("%c[🎯 UI] 마스크 요청 버튼 클릭","color: yellow; font-size: 14px; font-weight: bold"),console.log("=".repeat(50)),this.isSending){console.warn("%c[⏳] 이미 전송 중입니다.","color: orange");return}if(!this.serverUrl||this.serverUrl.trim()===""){console.error("%c[❌] serverUrl이 비어있습니다!","color: red"),alert("❌ 서버 URL을 설정해주세요!");return}console.log(`✅ 검증 통과. 캡처 시작...
`),await this.captureSend()}async captureSend(){this.isSending=!0;try{console.log("%c[📸 STEP 1] 화면 캡처...","color: cyan; font-weight: bold");const e=this.context.domElement;if(!e)throw new Error("Canvas를 찾을 수 없습니다!");const o=await new Promise((d,y)=>{e.toBlob(m=>{m?d(m):y(new Error("캡처 실패"))},"image/png",.95)});console.log(`✅ 캡처 완료: ${e.width}x${e.height}
`),console.log("%c[🔄 STEP 2] 리사이징...","color: cyan; font-weight: bold");const n=await this.resizeImage(o,640);console.log(`✅ 리사이징 완료
`),console.log("%c[📦 STEP 3] FormData 생성...","color: cyan; font-weight: bold");const t=new FormData;t.append("file",n,"frame.png"),console.log(`✅ FormData 완료
`);const s=this.serverUrl.replace(/\/$/,"")+"/segment_wall_mask";console.log("%c[🚀 STEP 4] POST 요청","color: lime; font-weight: bold"),console.log(`→ ${s}
`);const l=await fetch(s,{method:"POST",body:t,headers:{Accept:"image/png","ngrok-skip-browser-warning":"69420"},mode:"cors"});if(console.log(`%c[📥] 응답: ${l.status} ${l.statusText}`,`color: cyan; font-weight: bold
`),!l.ok){const d=await l.text();console.error(`%c[❌] HTTP 오류: ${l.status}`,"color: red; font-weight: bold"),console.error(d),l.status===422?alert(`⚠️ 벽면을 찾을 수 없습니다!

카메라를 벽 쪽으로 향해주세요.`):alert(`❌ 서버 오류 (${l.status})

Colab이 실행 중인지 확인하세요.`);return}console.log("%c[🖼️  STEP 6] 마스크 이미지 로딩...","color: cyan; font-weight: bold");const g=await l.arrayBuffer();if(console.log(`✅ PNG 수신: ${(g.byteLength/1024).toFixed(1)}KB
`),g.byteLength===0)throw new Error("빈 응답!");console.log("%c[✨ STEP 7] 마스크 적용...","color: cyan; font-weight: bold");const h=new Blob([g],{type:"image/png"}),v=URL.createObjectURL(h);await this.loadAndApplyMask(v),URL.revokeObjectURL(v),console.log(`
`+"=".repeat(50)),console.log("%c[🎉] ★ 마스크 적용 완료! ★","color: lime; font-size: 16px; font-weight: bold"),console.log("=".repeat(50)+`
`)}catch(e){console.error(`
`+"=".repeat(50)),console.error("%c[💥] 오류 발생","color: red; font-size: 14px; font-weight: bold"),console.error("=".repeat(50)),console.error(e);let o="알 수 없는 오류";e.message.includes("fetch")&&(o=`서버 연결 실패

• Colab 서버 확인
• ngrok URL 확인`),alert(`❌ ${o}

콘솔(F12) 확인`)}finally{this.isSending=!1,console.log(`%c[🏁] 작업 종료
`,"color: gray")}}async loadAndApplyMask(e){return new Promise((o,n)=>{const t=new Image;t.crossOrigin="anonymous",t.onload=()=>{this.maskImage=t,this.drawMask(),console.log("✅ 마스크 이미지 적용 완료"),o()},t.onerror=()=>{n(new Error("이미지 로드 실패"))},t.src=e})}drawMask(){if(!this.overlayCanvas||!this.overlayCtx||!this.maskImage)return;const e=this.overlayCtx,o=this.overlayCanvas;e.clearRect(0,0,o.width,o.height),e.drawImage(this.maskImage,0,0,o.width,o.height),e.globalCompositeOperation="source-in",e.fillStyle=`rgb(${this.currentColor.r*255}, ${this.currentColor.g*255}, ${this.currentColor.b*255})`,e.fillRect(0,0,o.width,o.height),e.globalCompositeOperation="source-over",this.overlayCanvas.style.opacity="0.6",console.log(`🎨 마스크 그리기 완료 (색상: ${this.currentColor.getHexString()})`)}async resizeImage(e,o){return new Promise((n,t)=>{const s=new Image;s.onload=()=>{const l=o/s.width,g=Math.round(s.height*l),h=document.createElement("canvas");h.width=o,h.height=g;const v=h.getContext("2d");v.imageSmoothingEnabled=!0,v.imageSmoothingQuality="high",v.drawImage(s,0,0,o,g),h.toBlob(d=>{d?n(d):t(new Error("리사이징 실패"))},"image/png",.95)},s.onerror=()=>t(new Error("이미지 로드 실패")),s.src=URL.createObjectURL(e)})}onClickRed(){console.log(`
🔴 빨강`),this.setPaintColor(new c(1,0,0))}onClickGreen(){console.log(`
🟢 초록`),this.setPaintColor(new c(0,1,0))}onClickBlue(){console.log(`
🔵 파랑`),this.setPaintColor(new c(0,0,1))}onClickPurple(){console.log(`
🟣 보라`),this.setPaintColor(new c(1,0,1))}onClickYellow(){console.log(`
🟡 노랑`),this.setPaintColor(new c(1,1,0))}onClickWhite(){console.log(`
⚪ 하양`),this.setPaintColor(new c(1,1,1))}setPaintColor(e){this.currentColor=e,this.maskImage&&this.drawMask(),console.log(`✅ 색상 변경: #${e.getHexString().toUpperCase()}
`)}onClickClear(){console.log(`
🧹 Clear`),this.overlayCanvas&&(this.overlayCanvas.style.opacity="0",this.overlayCtx&&this.overlayCtx.clearRect(0,0,this.overlayCanvas.width,this.overlayCanvas.height)),this.maskImage=void 0,console.log(`✅ 초기화 완료
`)}onDestroy(){this.overlayCanvas&&this.overlayCanvas.remove(),window.removeEventListener("resize",()=>this.resizeOverlay())}}k([f()],w.prototype,"serverUrl",2);b.add("WallPaintClient",w);
