"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[872],{872:(a,e,n)=>{n.r(e),n.d(e,{default:()=>l});var t=n(43),c=n(213),r=n(64),s=n.n(r),i=(n(421),n(579));const l=function(){const[a,e]=(0,t.useState)([]),[n,r]=(0,t.useState)("");return(0,t.useEffect)((()=>{(async()=>{const a=new URLSearchParams(window.location.search).get("id");if(a){r(a);try{const n=(await c.A.post("http://192.52.242.238:8000/api/decrypt",{encrypted_value:a})).data.decrypted_value,t=(await c.A.get(`http://192.52.242.238:8000/api/campanas/${n}`)).data,r=await Promise.all(t.map((async a=>{if(a.estado){const e=await c.A.post("http://192.52.242.238:8000/api/encrypt",{value:a.id_campana.toString()});return{...a,encryptedCampaignId:e.data.encrypted_value}}return null})));e(r.filter(Boolean))}catch(n){s().fire({icon:"error",title:"Error",text:"Hubo un problema al cargar los datos"}).then((()=>{window.location.href="/"}))}}else s().fire({icon:"error",title:"Error",text:"No se encontr\xf3 el ID del usuario"}).then((()=>{window.location.href="/"}))})()}),[]),(0,i.jsx)("div",{children:(0,i.jsx)("div",{className:"container mt-5",children:(0,i.jsxs)("div",{className:"card",children:[(0,i.jsxs)("div",{className:"card-header d-flex justify-content-between align-items-center",children:[(0,i.jsx)("h1",{className:"h3",children:"Campa\xf1as"}),(0,i.jsx)("button",{className:"btn btn-danger",onClick:()=>{window.location.href="/"},children:"Cerrar Sesi\xf3n"})]}),(0,i.jsxs)("div",{className:"card-body",children:[(0,i.jsx)("p",{className:"text-center",children:"Selecciona una campa\xf1a"}),(0,i.jsx)("div",{className:"row row-cols-1 row-cols-md-2 g-4",children:a.map((a=>(0,i.jsx)("div",{className:"col",children:(0,i.jsx)("div",{className:"card h-100",children:(0,i.jsxs)("button",{className:"btn btn-light btn-campaign d-flex align-items-center",onClick:()=>{return e=a.encryptedCampaignId,void(window.location.href=`modulos?id=${n}&campana=${e}`);var e},children:[(0,i.jsx)("img",{src:`data:image/png;base64,${a.imagen}`,alt:a.nombre}),(0,i.jsx)("span",{children:a.nombre})]})})},a.id_campana)))})]})]})})})}}}]);
//# sourceMappingURL=872.268006c6.chunk.js.map