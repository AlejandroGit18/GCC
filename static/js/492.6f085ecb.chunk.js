"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[492],{492:(e,r,a)=>{a.r(r),a.d(r,{default:()=>c});var t=a(43),n=a(64),s=a.n(n),o=(a(421),a(670)),i=a(579);const c=()=>{const[e,r]=(0,t.useState)(!1),[a,n]=(0,t.useState)(null),c=()=>{const e=new URLSearchParams(window.location.search),r=e.get("id"),a=e.get("campana");if(!r||!a)throw new Error("Faltan par\xe1metros en la URL.");return{id:r,campana:a}},l=async e=>{if(!e||""===e.trim())throw new Error("El valor encriptado est\xe1 vac\xedo o es inv\xe1lido.");const r=await fetch("http://192.52.242.238:8000/api/decrypt",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({encrypted_value:e})});if(!r.ok){const e=await r.text();throw new Error(`Error al desencriptar: ${e}`)}const a=await r.json();if(!a.decrypted_value)throw new Error("La API no devolvi\xf3 un valor desencriptado.");return a.decrypted_value};return(0,i.jsx)("div",{className:"container mt-5",children:(0,i.jsxs)("div",{className:"card",children:[(0,i.jsxs)("div",{className:"card-header text-center",children:[(0,i.jsx)("h4",{children:"Carga de Saldos"}),(0,i.jsx)("button",{className:"btn btn-warning",onClick:()=>{const e=c();window.location.href=`./modulos?id=${e.id}&campana=${e.campana}`},children:"Regresar al panel de modulos"})]}),(0,i.jsxs)("div",{className:"card-body",children:[(0,i.jsx)("div",{className:"mb-3",children:(0,i.jsx)("button",{className:"btn btn-primary",onClick:()=>{const e=document.createElement("a");e.href=o,e.download="plantilla_carga_saldos.xlsx",e.click()},children:"Descargar Plantilla"})}),(0,i.jsxs)("form",{children:[(0,i.jsxs)("div",{className:"mb-3",children:[(0,i.jsx)("label",{htmlFor:"fileInput",className:"form-label",children:"Subir archivo Excel"}),(0,i.jsx)("input",{type:"file",className:"form-control",id:"fileInput",accept:".xlsx",onChange:e=>{n(e.target.files[0])}})]}),(0,i.jsx)("button",{type:"button",className:"btn btn-success",onClick:async()=>{if(!a)return s().fire("Error","Debe seleccionar un archivo.","error");if(!a.name.endsWith(".xlsx"))return s().fire("Error","El archivo debe ser un archivo Excel (.xlsx).","error");r(!0);try{const e=c(),t=await l(e.campana),n=await l(e.id),o=new FileReader;o.onload=async e=>{const a=new Uint8Array(e.target.result),o=window.XLSX.read(a,{type:"array"}),i=o.SheetNames[0],c=window.XLSX.utils.sheet_to_json(o.Sheets[i],{header:1});if(!c||c.length<=1)return r(!1),s().fire("Error","El archivo Excel no contiene filas de datos.","error");const l=c.slice(1).filter((e=>e.some((e=>null!==e&&void 0!==e&&""!==e.toString().trim()))));if(0===l.length)return r(!1),s().fire("Error","El archivo Excel no contiene datos v\xe1lidos.","error");for(let r of l){const e={id_campana:parseInt(t)||null,usuario_operacion:parseInt(n)||null},r=await fetch("http://192.52.242.238:8000/api/gestiones",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});if(!r.ok)throw new Error(`Error en la carga: ${r.statusText}`)}r(!1),s().fire("\xc9xito","Archivo procesado correctamente.","success")},o.readAsArrayBuffer(a)}catch(e){r(!1),s().fire("Error",e.message,"error")}},children:"Cargar"})]}),e&&(0,i.jsx)("div",{className:"loader mt-3"})]})]})})}},670:(e,r,a)=>{e.exports=a.p+"static/media/plantilla_carga_gestiones.b216914b417bda56b03f.xlsx"}}]);
//# sourceMappingURL=492.6f085ecb.chunk.js.map