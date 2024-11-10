(self.webpackChunkapp=self.webpackChunkapp||[]).push([[510,638,523],{80638:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>a});s(65043);var r=s(70579);const a=e=>{let{data:t,component:s,action:a}=e;if(!t||0===t.length)return(0,r.jsx)("p",{children:"No data available"});const n=["Action",...Object.keys(t[0])];return(0,r.jsx)("div",{className:"overflow-x-auto m-4",children:(0,r.jsx)("div",{className:"overflow-y-auto h-[500px] no-scrollbar",children:(0,r.jsxs)("table",{className:"min-w-full border border-collapse ",children:[(0,r.jsx)("thead",{className:"bg-gray-300 border-b w-full sticky top-0 z-5 h-16",children:(0,r.jsx)("tr",{children:n.map((e=>(0,r.jsx)("th",{className:"py-2 px-4 border-b border-gray-300 text-center bg-gray-200",children:"Action"===e?a:e},e)))})}),(0,r.jsx)("tbody",{children:t.map(((e,t)=>(0,r.jsx)("tr",{className:"py-2 px-4 border-b   border-gray-300 text-center",children:n.map((t=>"Action"===t?(0,r.jsx)("td",{className:"py-2 px-4 border-gray-300 border-b text-center",children:s(e)},t):(0,r.jsx)("td",{className:"py-2 px-4 border-gray-300 border-b text-center",children:e[t]},t)))},t)))})]})})})}},90523:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>n});var r=s(65043),a=s(86213);const n=e=>{const[t,s]=(0,r.useState)(!1),[n,o]=(0,r.useState)([]),[l,c]=(0,r.useState)(null),i=(0,r.useCallback)((async function(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(e){s(!0),c(null);try{const s=await a.A.get(e,{params:t,withCredentials:!0});o(s.data)}catch(r){c(r)}finally{s(!1)}}}),[e]);return(0,r.useEffect)((()=>{e&&i()}),[i]),{fetchData:i,data:n,loading:t,error:l}}},64510:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>i});var r=s(65043),a=s(70579);const n=e=>{let{value:t,options:s,onOptionClick:n,id:o}=e;const[l,c]=(0,r.useState)(!1),[i,d]=(0,r.useState)({top:0,left:0}),u=(0,r.useRef)(null),p=(0,r.useRef)(null);return(0,r.useEffect)((()=>{const e=e=>{!u.current||u.current.contains(e.target)||p.current.contains(e.target)||c(!1)};return document.addEventListener("mousedown",e),()=>{document.removeEventListener("mousedown",e)}}),[]),(0,r.useEffect)((()=>{if(p.current){const e=p.current.getBoundingClientRect();d({top:e.bottom+window.scrollY,left:e.left+window.scrollX})}}),[l]),(0,a.jsxs)("div",{className:"relative",children:[(0,a.jsx)("button",{onClick:()=>{c(!l)},className:"text-gray-600 hover:text-gray-900",ref:p,children:t}),l&&(0,a.jsx)("div",{className:"fixed bg-white border rounded-lg border-gray-300 shadow-lg w-48 max-h-60 overflow-y-auto",style:{top:`${i.top}px`,left:`${i.left}px`},ref:u,children:s.map(((e,t)=>(0,a.jsx)("button",{onClick:()=>(e=>{n(e,o),c(!1)})(e),className:"block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left",children:e},t)))})]})};var o=s(31462);var l=s(90523),c=s(80638);const i=()=>{const e=["Edit","Delete","View"],[t,i]=(0,r.useState)(null),[d,u]=(0,r.useState)(null),{data:p=[],fetchData:x}=(0,l.default)("/bootcamps/bootcamp"),[f,h]=(0,r.useState)({});(0,r.useEffect)((()=>{x()}),[x]),(0,r.useEffect)((()=>{const e=p.reduce(((e,t)=>(e[t.id]=t.registration_status,e)),{});h(e)}),[p]);const m=(0,r.useCallback)(((e,t)=>{u(t);const n=(o=e,(0,r.lazy)((()=>s(82788)(`./${o}`).catch((()=>(console.error(`Component ${o} not found`),{default:()=>null}))))));var o;n&&i((()=>(0,a.jsx)(n,{id:t,action:e=>{i(null),x()}})))}),[]),b=(0,r.useMemo)((()=>p.map((e=>({...e,registration_status:(0,a.jsx)("span",{className:"px-2 py-1 text-white rounded "+(e.registration_status?"bg-green-500":"bg-red-500"),children:e.registration_status?"Open":"Closed"})})))),[p]);return(0,a.jsxs)("div",{className:"",children:[(0,a.jsx)("div",{className:"w-full flex items-center justify-between shadow-md py-6 px-4 h-24 mb-6",children:(0,a.jsx)("p",{className:"text-xl font-semibold",children:"My BootCamps"})}),(0,a.jsx)("div",{children:(0,a.jsx)(c.default,{data:b,component:t=>{const s=f[t.id],r=[...e,s?"CloseRegistration":"OpenRegistration"];return(0,a.jsx)(n,{value:(0,a.jsx)(o.mqA,{}),options:r,onOptionClick:m,id:t.id})},action:"Action"})}),t&&(0,a.jsx)("div",{children:(0,a.jsx)(r.Suspense,{fallback:(0,a.jsx)("div",{children:"Loading..."}),children:t})})]})}},82788:(e,t,s)=>{var r={"./CloseRegistration":[69077,77],"./CloseRegistration.js":[69077,77],"./Delete":[99801,801],"./Delete.js":[99801,801],"./Edit":[86198,198],"./Edit.js":[86198,198],"./OpenRegistration":[53951,951],"./OpenRegistration.js":[53951,951],"./View":[22483,483],"./View.js":[22483,483]};function a(e){if(!s.o(r,e))return Promise.resolve().then((()=>{var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=r[e],a=t[0];return s.e(t[1]).then((()=>s(a)))}a.keys=()=>Object.keys(r),a.id=82788,e.exports=a}}]);
//# sourceMappingURL=510.07096148.chunk.js.map