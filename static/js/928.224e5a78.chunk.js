"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[928],{928:(e,a,s)=>{s.r(a),s.d(a,{default:()=>r});var o=s(43),c=s(213),i=s(64),n=s.n(i),l=(s(421),s(885),s(579));const r=()=>{const[e,a]=(0,o.useState)({}),[s,i]=(0,o.useState)([]);(0,o.useEffect)((()=>{r();const e=new URLSearchParams(window.location.search).get("id_gestion");e?t(e).then((e=>{d(e)})):n().fire("Error","No se encontr\xf3 el ID de gesti\xf3n en la URL.","error")}),[]);const r=()=>{i([{tipoGestion:"Cobro",subtipologia:"Recordatorio",tipologia:"Pago parcial",observaciones:"Cliente promete pago para ma\xf1ana.",investigacion:"Se verific\xf3 informaci\xf3n financiera."},{tipoGestion:"Reclamo",subtipologia:"Error en factura",tipologia:"Error en monto",observaciones:"Cliente indica que el monto es incorrecto.",investigacion:"Se solicit\xf3 revisi\xf3n con contabilidad."}])},t=async e=>{try{return(await c.A.post("http://192.52.242.238:8000/api/decrypt",{encrypted_value:e})).data.decrypted_value}catch(a){throw n().fire({icon:"error",title:"Error de Desencriptado",text:"No se pudo desencriptar el valor."}),a}},d=async e=>{try{const s=await c.A.post("http://localhost:8000/api/gestiones",{opcion:4,id_gestiones:e});a(s.data[0])}catch(s){n().fire("Error","No se pudieron cargar los datos del formulario.","error")}};return(0,l.jsx)("div",{className:"container mt-4",children:(0,l.jsxs)("div",{className:"card",children:[(0,l.jsx)("div",{className:"card-header text-center",children:(0,l.jsx)("h3",{children:"Base clientes"})}),(0,l.jsxs)("div",{className:"card-body",children:[(0,l.jsxs)("div",{className:"d-flex justify-content-center mb-3",children:[(0,l.jsx)("button",{className:"btn btn-success me-2",onClick:()=>window.location.href="/registrar_gestion",children:"Agregar Gesti\xf3n"}),(0,l.jsx)("button",{className:"btn btn-primary me-2",onClick:async()=>{try{const a={...e};await c.A.post("http://192.52.242.238:8000/api/gestiones",a),n().fire("\xc9xito","Los cambios se han guardado correctamente.","success")}catch(a){n().fire("Error","No se pudieron guardar los cambios.","error")}},children:"Guardar Cambios"}),(0,l.jsx)("button",{className:"btn btn-warning me-2",onClick:()=>window.location.href="/registrar_pago",children:"Registrar Pago"}),(0,l.jsx)("button",{className:"btn btn-secondary",onClick:()=>window.history.back(),children:"Regresar"})]}),(0,l.jsxs)("div",{className:"accordion",id:"gestionAccordion",children:[(0,l.jsxs)("div",{className:"accordion-item",children:[(0,l.jsx)("h2",{className:"accordion-header",id:"headingInfoDeudor",children:(0,l.jsx)("button",{className:"accordion-button",type:"button","data-bs-toggle":"collapse","data-bs-target":"#collapseInfoDeudor","aria-expanded":"true","aria-controls":"collapseInfoDeudor",children:"Informaci\xf3n Deudor"})}),(0,l.jsx)("div",{id:"collapseInfoDeudor",className:"accordion-collapse collapse show","aria-labelledby":"headingInfoDeudor","data-bs-parent":"#gestionAccordion",children:(0,l.jsx)("div",{className:"accordion-body",children:(0,l.jsx)("form",{id:"gestionForm",children:(0,l.jsx)("div",{className:"row",children:["Nombre","NIT","DPI","Fecha de Nacimiento","Direcci\xf3n Casa","Direcci\xf3n Trabajo","Lugar de Trabajo","Email"].map(((e,a)=>(0,l.jsx)("div",{className:"col-md-6",children:(0,l.jsxs)("div",{className:"mb-3",children:[(0,l.jsx)("label",{htmlFor:e.toLowerCase().replace(/ /g,""),className:"form-label",children:e}),(0,l.jsx)("input",{type:"Email"===e?"email":"Fecha de Nacimiento"===e?"date":"text",id:e.toLowerCase().replace(/ /g,""),className:"form-control",readOnly:"Email"!==e})]})},a)))})})})})]}),(0,l.jsxs)("div",{className:"accordion-item",children:[(0,l.jsx)("h2",{className:"accordion-header",id:"headingInfoContacto",children:(0,l.jsx)("button",{className:"accordion-button collapsed",type:"button","data-bs-toggle":"collapse","data-bs-target":"#collapseInfoContacto","aria-expanded":"false","aria-controls":"collapseInfoContacto",children:"Informaci\xf3n de Contacto"})}),(0,l.jsx)("div",{id:"collapseInfoContacto",className:"accordion-collapse collapse","aria-labelledby":"headingInfoContacto","data-bs-parent":"#gestionAccordion",children:(0,l.jsx)("div",{className:"accordion-body",children:(0,l.jsx)("div",{className:"row",children:["Tel\xe9fono Celular","Tel\xe9fono Casa","Tel\xe9fono Alterno","Tel\xe9fono Trabajo"].map(((e,a)=>(0,l.jsx)("div",{className:"col-md-6",children:(0,l.jsxs)("div",{className:"mb-3",children:[(0,l.jsx)("label",{htmlFor:e.toLowerCase().replace(/ /g,""),className:"form-label",children:e}),(0,l.jsx)("input",{type:"text",id:e.toLowerCase().replace(/ /g,""),className:"form-control"})]})},a)))})})})]}),(0,l.jsxs)("div",{className:"accordion-item",children:[(0,l.jsx)("h2",{className:"accordion-header",id:"headingInfoFinanciera",children:(0,l.jsx)("button",{className:"accordion-button collapsed",type:"button","data-bs-toggle":"collapse","data-bs-target":"#collapseInfoFinanciera","aria-expanded":"false","aria-controls":"collapseInfoFinanciera",children:"Informaci\xf3n Financiera"})}),(0,l.jsx)("div",{id:"collapseInfoFinanciera",className:"accordion-collapse collapse","aria-labelledby":"headingInfoFinanciera","data-bs-parent":"#gestionAccordion",children:(0,l.jsx)("div",{className:"accordion-body",children:(0,l.jsx)("div",{className:"row",children:Array.from({length:5}).map(((e,a)=>(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)("div",{className:"col-md-4",children:(0,l.jsxs)("div",{className:"mb-3",children:[(0,l.jsxs)("label",{htmlFor:`tipoCuenta${a+1}`,className:"form-label",children:["Tipo de Moneda ",a+1]}),(0,l.jsx)("input",{type:"text",id:`tipoCuenta${a+1}`,className:"form-control",readOnly:!0})]})},`tipoCuenta${a}`),(0,l.jsx)("div",{className:"col-md-4",children:(0,l.jsxs)("div",{className:"mb-3",children:[(0,l.jsxs)("label",{htmlFor:`noCuenta${a+1}`,className:"form-label",children:["No. Cuenta ",a+1]}),(0,l.jsx)("input",{type:"text",id:`noCuenta${a+1}`,className:"form-control",readOnly:!0})]})},`noCuenta${a}`),(0,l.jsx)("div",{className:"col-md-4",children:(0,l.jsxs)("div",{className:"mb-3",children:[(0,l.jsxs)("label",{htmlFor:`saldo${a+1}`,className:"form-label",children:["Saldo ",a+1]}),(0,l.jsx)("input",{type:"text",id:`saldo${a+1}`,className:"form-control",readOnly:!0})]})},`saldo${a}`)]})))})})})]}),(0,l.jsxs)("div",{className:"accordion-item",children:[(0,l.jsx)("h2",{className:"accordion-header",id:"headingConceptos",children:(0,l.jsx)("button",{className:"accordion-button collapsed",type:"button","data-bs-toggle":"collapse","data-bs-target":"#collapseConceptos","aria-expanded":"false","aria-controls":"collapseConceptos",children:"Conceptos y Descripciones"})}),(0,l.jsx)("div",{id:"collapseConceptos",className:"accordion-collapse collapse","aria-labelledby":"headingConceptos","data-bs-parent":"#gestionAccordion",children:(0,l.jsx)("div",{className:"accordion-body",children:(0,l.jsx)("div",{className:"row",children:Array.from({length:4}).map(((e,a)=>(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)("div",{className:"col-md-6",children:(0,l.jsxs)("div",{className:"mb-3",children:[(0,l.jsxs)("label",{htmlFor:`concepto${a+1}`,className:"form-label",children:["Concepto ",a+1]}),(0,l.jsx)("input",{type:"text",id:`concepto${a+1}`,className:"form-control",readOnly:!0})]})},`concepto${a}`),(0,l.jsx)("div",{className:"col-md-6",children:(0,l.jsxs)("div",{className:"mb-3",children:[(0,l.jsxs)("label",{htmlFor:`descripcion${a+1}`,className:"form-label",children:["Descripci\xf3n ",a+1]}),(0,l.jsx)("textarea",{id:`descripcion${a+1}`,className:"form-control",readOnly:!0})]})},`descripcion${a}`)]})))})})})]})]}),(0,l.jsx)("div",{className:"card-header text-center mt-3",children:(0,l.jsx)("h3",{children:"Tipologias Registradas"})}),(0,l.jsxs)("table",{className:"table table-striped",children:[(0,l.jsx)("thead",{children:(0,l.jsxs)("tr",{children:[(0,l.jsx)("th",{children:"Tipo de Gesti\xf3n"}),(0,l.jsx)("th",{children:"Subtipolog\xeda"}),(0,l.jsx)("th",{children:"Tipolog\xeda"}),(0,l.jsx)("th",{children:"Observaciones"}),(0,l.jsx)("th",{children:"Investigaci\xf3n"})]})}),(0,l.jsx)("tbody",{children:s.map(((e,a)=>(0,l.jsxs)("tr",{children:[(0,l.jsx)("td",{children:e.tipoGestion}),(0,l.jsx)("td",{children:e.subtipologia}),(0,l.jsx)("td",{children:e.tipologia}),(0,l.jsx)("td",{children:e.observaciones}),(0,l.jsx)("td",{children:e.investigacion})]},a)))})]})]})]})})}}}]);
//# sourceMappingURL=928.224e5a78.chunk.js.map