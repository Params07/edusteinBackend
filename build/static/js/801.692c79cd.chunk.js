"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[801,718],{67718:(e,t,s)=>{s.r(t),s.d(t,{default:()=>o});var a=s(65043),r=s(86213);const o=e=>{const[t,s]=(0,a.useState)(!1),[o,c]=(0,a.useState)(null);return{post:async t=>{s(!0),c(null);try{const a=t instanceof FormData,o=await r.A.post(e,t,{withCredentials:!0,headers:a?{"Content-Type":"multipart/form-data"}:{"Content-Type":"application/json"}});return s(!1),o.data}catch(a){throw c(a),s(!1),a}},loading:t,error:o}}},99801:(e,t,s)=>{s.r(t),s.d(t,{default:()=>c});s(65043);var a=s(67718),r=s(23894),o=s(70579);const c=e=>{let{id:t,action:s}=e;const{post:c,error:l}=(0,a.default)("/bootcamps/deleteBootcamp");return(0,o.jsx)("div",{className:"fixed  inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center  ",children:(0,o.jsxs)("div",{className:"bg-white w-max p-4 rounded-lg h-36 grid gap-6 ",children:[(0,o.jsx)("p",{className:"font-semibold text-lg px-4",children:"Do you want delete this bootcamp?"}),(0,o.jsxs)("p",{className:"w-full flex space-x-4",children:[(0,o.jsx)("button",{className:"w-full py-2 bg-red-500 border-2 border-red-500 hover:bg-red-400 text-white rounded-md",onClick:()=>(async()=>{try{await c({id:t}),(0,r.y)({success:!0,message:"Bootcamp deleted successfully!"}),s(!0)}catch(e){console.error(e),(0,r.y)({success:!1,message:l})}})(),children:"Yes"}),(0,o.jsx)("button",{className:"w-full py-2 bg-gray-300  rounded-md border-2 border-gray-300 hover:bg-gray-200 ",onClick:()=>{s(!0)},children:"No"})]})]})})}}}]);
//# sourceMappingURL=801.692c79cd.chunk.js.map