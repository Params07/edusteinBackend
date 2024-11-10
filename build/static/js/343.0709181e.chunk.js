"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[343,638,350,523,718],{80638:(e,t,a)=>{a.r(t),a.d(t,{default:()=>s});a(65043);var r=a(70579);const s=e=>{let{data:t,component:a,action:s}=e;if(!t||0===t.length)return(0,r.jsx)("p",{children:"No data available"});const o=["Action",...Object.keys(t[0])];return(0,r.jsx)("div",{className:"overflow-x-auto m-4",children:(0,r.jsx)("div",{className:"overflow-y-auto h-[500px] no-scrollbar",children:(0,r.jsxs)("table",{className:"min-w-full border border-collapse ",children:[(0,r.jsx)("thead",{className:"bg-gray-300 border-b w-full sticky top-0 z-5 h-16",children:(0,r.jsx)("tr",{children:o.map((e=>(0,r.jsx)("th",{className:"py-2 px-4 border-b border-gray-300 text-center bg-gray-200",children:"Action"===e?s:e},e)))})}),(0,r.jsx)("tbody",{children:t.map(((e,t)=>(0,r.jsx)("tr",{className:"py-2 px-4 border-b   border-gray-300 text-center",children:o.map((t=>"Action"===t?(0,r.jsx)("td",{className:"py-2 px-4 border-gray-300 border-b text-center",children:a(e)},t):(0,r.jsx)("td",{className:"py-2 px-4 border-gray-300 border-b text-center",children:e[t]},t)))},t)))})]})})})}},61343:(e,t,a)=>{a.r(t),a.d(t,{default:()=>i});var r=a(65043),s=a(90523),o=a(80638),c=a(67718),n=a(77350),l=a(23894),d=a(70579);const i=()=>{const[e,t]=(0,r.useState)(!1),[a,i]=(0,r.useState)(0),{data:p=[],fetchData:u}=(0,s.default)("/promocode/getPromoCodes"),{post:m,error:h}=(0,c.default)("/promocode/alterPromocode");const x=(0,r.useMemo)((()=>p.map((e=>({...e,expiration_date:new Date(e.expiration_date).toISOString().slice(0,10),is_active:(0,d.jsx)("span",{name:e.is_active?"Active":"Closed",className:"px-2 py-1 text-white rounded "+(e.is_active?"bg-green-500":"bg-red-500"),children:e.is_active?"Active":"Closed"})})))),[p]);return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)("div",{children:(0,d.jsx)(o.default,{data:x,component:e=>(console.log(e.is_active.props.name),(0,d.jsx)("button",{onClick:()=>{t(!0),i(e.id)},className:"text-white px-8 py-1 rounded text-sm "+("Active"==e.is_active.props.name?"bg-red-400":"bg-green-400 "),children:"Active"==e.is_active.props.name?"close":"set-active"})),action:"Action"})}),e?(0,d.jsx)(n.default,{message:"Do you want to change state of  the promocode",yesAction:async()=>{try{if(a>0){await m({promocodeID:a});(0,l.y)({success:!0,message:"updated"}),u()}}catch(e){console.error(e),(0,l.y)({success:!1,message:h})}finally{t(!1)}},noAction:()=>t(!1)}):""]})}},77350:(e,t,a)=>{a.r(t),a.d(t,{default:()=>s});a(65043);var r=a(70579);const s=e=>{let{message:t,yesAction:a,noAction:s}=e;return(0,r.jsx)("div",{className:"fixed  inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center  ",children:(0,r.jsxs)("div",{className:"bg-white w-max p-4 rounded-lg h-36 grid gap-6 ",children:[(0,r.jsx)("p",{className:"font-semibold text-lg px-4",children:t}),(0,r.jsxs)("p",{className:"w-full flex space-x-4",children:[(0,r.jsx)("button",{className:"w-full py-2 bg-red-500 border-2 border-red-500 hover:bg-red-400 text-white rounded-md",onClick:()=>a(),children:"Yes"}),(0,r.jsx)("button",{className:"w-full py-2 bg-gray-300  rounded-md border-2 border-gray-300 hover:bg-gray-200 ",onClick:()=>{s()},children:"No"})]})]})})}},90523:(e,t,a)=>{a.r(t),a.d(t,{default:()=>o});var r=a(65043),s=a(86213);const o=e=>{const[t,a]=(0,r.useState)(!1),[o,c]=(0,r.useState)([]),[n,l]=(0,r.useState)(null),d=(0,r.useCallback)((async function(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(e){a(!0),l(null);try{const a=await s.A.get(e,{params:t,withCredentials:!0});c(a.data)}catch(r){l(r)}finally{a(!1)}}}),[e]);return(0,r.useEffect)((()=>{e&&d()}),[d]),{fetchData:d,data:o,loading:t,error:n}}},67718:(e,t,a)=>{a.r(t),a.d(t,{default:()=>o});var r=a(65043),s=a(86213);const o=e=>{const[t,a]=(0,r.useState)(!1),[o,c]=(0,r.useState)(null);return{post:async t=>{a(!0),c(null);try{const r=t instanceof FormData,o=await s.A.post(e,t,{withCredentials:!0,headers:r?{"Content-Type":"multipart/form-data"}:{"Content-Type":"application/json"}});return a(!1),o.data}catch(r){throw c(r),a(!1),r}},loading:t,error:o}}}}]);
//# sourceMappingURL=343.0709181e.chunk.js.map