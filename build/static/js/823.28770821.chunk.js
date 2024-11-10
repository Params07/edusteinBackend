"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[823,960,376,638,523,718],{74960:(e,t,a)=>{a.r(t),a.d(t,{default:()=>c});var s=a(65043),l=a(81278),r=a(90523),o=a(70579);const c=e=>{let{selectedBootcamp:t,setSelectedBootcamp:a,isMulti:c=!1,isBootcampActive:n}=e;const[d,i]=(0,s.useState)([]);let u=`/bootcamps/bootcamp?isBootcampActive=${n}`;const{data:p=[]}=(0,r.default)(u);(0,s.useEffect)((()=>{if(p){const e=p.map((e=>({label:e.title,value:e.id})));i(e),!t&&e.length>0&&!c&&a(e[0])}}),[p,t,c,n]);return(0,o.jsx)(l.Ay,{className:"w-64 h-8",name:"bootcamp",value:t,options:d,isMulti:c,placeholder:"Bootcamp Name",onChange:e=>{a(e)}})}},17376:(e,t,a)=>{a.r(t),a.d(t,{default:()=>o});var s=a(65043),l=a(86213),r=a(23894);const o=e=>{const[t,a]=(0,s.useState)(!1);return{downloadExcelFile:async t=>{try{a(!0);const s=await l.A.post("/createExcel",t,{responseType:"blob"}),r=window.URL.createObjectURL(new Blob([s.data])),o=document.createElement("a");o.href=r,o.setAttribute("download",e+".xlsx"),document.body.appendChild(o),o.click(),document.body.removeChild(o),window.URL.revokeObjectURL(r),a(!1)}catch(s){a(!1),(0,r.y)({success:!1,message:"Error in downloading file"}),console.error("Error downloading file:",s)}},downloading:t}}},80638:(e,t,a)=>{a.r(t),a.d(t,{default:()=>l});a(65043);var s=a(70579);const l=e=>{let{data:t,component:a,action:l}=e;if(!t||0===t.length)return(0,s.jsx)("p",{children:"No data available"});const r=["Action",...Object.keys(t[0])];return(0,s.jsx)("div",{className:"overflow-x-auto m-4",children:(0,s.jsx)("div",{className:"overflow-y-auto h-[500px] no-scrollbar",children:(0,s.jsxs)("table",{className:"min-w-full border border-collapse ",children:[(0,s.jsx)("thead",{className:"bg-gray-300 border-b w-full sticky top-0 z-5 h-16",children:(0,s.jsx)("tr",{children:r.map((e=>(0,s.jsx)("th",{className:"py-2 px-4 border-b border-gray-300 text-center bg-gray-200",children:"Action"===e?l:e},e)))})}),(0,s.jsx)("tbody",{children:t.map(((e,t)=>(0,s.jsx)("tr",{className:"py-2 px-4 border-b   border-gray-300 text-center",children:r.map((t=>"Action"===t?(0,s.jsx)("td",{className:"py-2 px-4 border-gray-300 border-b text-center",children:a(e)},t):(0,s.jsx)("td",{className:"py-2 px-4 border-gray-300 border-b text-center",children:e[t]},t)))},t)))})]})})})}},60823:(e,t,a)=>{a.r(t),a.d(t,{default:()=>p});var s=a(65043),l=a(90523),r=a(74960),o=a(80638),c=a(67718),n=a(23894),d=a(49342),i=a(17376),u=a(70579);const p=()=>{const[e,t]=(0,s.useState)([]),[a,p]=(0,s.useState)([]),[h,x]=(0,s.useState)(!1),[m,b]=(0,s.useState)(null),[f,g]=(0,s.useState)(0),[y,j]=(0,s.useState)([]),[w,v]=(0,s.useState)(!1),[N,S]=(0,s.useState)(0),[k,C]=(0,s.useState)(0),{downloadExcelFile:A,downloading:R}=(0,i.default)("refundAll_data"),[E,B]=(0,s.useState)([]),D=(0,s.useMemo)((()=>{if(S(0),e.length<1)return null;return`/refundInitiator/getData?bootcampIds=${e.map((e=>e.value)).join(",")}`}),[f]),{data:F,loading:I,error:L}=(0,l.default)(D),{post:M,loading:U,error:O}=(0,c.default)("/refundInitiator/refundInitiateAll");(0,s.useEffect)((()=>{if(S(0),w&&a){const e=a.map((e=>e.id));j(e)}else j([])}),[w]),(0,s.useEffect)((()=>{B([]),v(!1),F&&(p(F),x(I),b(L))}),[F,I,L]);return(0,u.jsxs)("div",{className:"flex flex-col space-y-8",children:[(0,u.jsxs)("div",{className:"flex space-x-4 items-start",children:[(0,u.jsx)(r.default,{selectedBootcamp:e,setSelectedBootcamp:t,isMulti:!0}),(0,u.jsx)("button",{className:"px-5 py-2 bg-black text-white rounded border-2 hover:bg-gray-700 "+(h?"opacity-50 cursor-not-allowed":""),onClick:()=>g(f+1),disabled:h,children:h?"Fetching":"Fetch Data"}),y&&y.length>0&&(0,u.jsx)("button",{className:"px-5 py-2 bg-green-600 text-white rounded border-2 border-green-600 hover:bg-green-400",onClick:()=>(async()=>{S(0);const e=a.filter((e=>y.includes(e.id))).map((e=>({...e,razorPayID:e.paymentid})));if(e.length>0){console.log(e);try{const t=await M({userDetails:e}),{results:a}=t;console.log(a);const s=a.reduce(((e,t)=>Number(e)+Number("success"==t.status?1:0)),0);C(s),S(a.length),B(a)}catch(m){(0,n.y)({success:!1,message:"an error occured"}),console.log(m),S(0),B([])}}})(),disabled:U,children:U?"Refunding":"Refund All"}),0!==N&&(0,u.jsxs)("div",{className:"flex flex-col space-y-2 h-full",children:[(0,u.jsxs)("p",{children:["Processed Refund Requests: ",N]}),(0,u.jsxs)("p",{className:"flex space-x-2",children:[(0,u.jsxs)("p",{children:["Number of Refunds Success: ",k]}),(0,u.jsx)(d.RXm,{className:"text-green-600 text-xl"})]}),(0,u.jsxs)("p",{className:"flex space-x-2 items-center h-4 ",children:[(0,u.jsxs)("p",{className:"",children:["Number of Refunds Failed: ",N-k]}),(0,u.jsx)("p",{className:"text-lg font-semibold text-red-600 ",children:"X"})]})]}),E&&E.length>0&&(0,u.jsx)("button",{className:"px-5 py-2 rounded-md hover:bg-gray-700 border-2 text-white bg-black",disabled:R,onClick:async()=>{A(E)},children:"Download record"})]}),(0,u.jsx)("div",{children:a&&a.length>0&&(0,u.jsx)(o.default,{data:a,component:e=>(0,u.jsx)("input",{className:"cursor-pointer",type:"checkbox",checked:y.includes(e.id),onChange:()=>{return t=e.id,S(0),void j((e=>e.includes(t)?e.filter((e=>e!==t)):[...e,t]));var t}}),action:(0,u.jsx)("input",{type:"checkbox",checked:w,onChange:()=>{S(0),B([]),v((e=>!e))}})})})]})}},90523:(e,t,a)=>{a.r(t),a.d(t,{default:()=>r});var s=a(65043),l=a(86213);const r=e=>{const[t,a]=(0,s.useState)(!1),[r,o]=(0,s.useState)([]),[c,n]=(0,s.useState)(null),d=(0,s.useCallback)((async function(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(e){a(!0),n(null);try{const a=await l.A.get(e,{params:t,withCredentials:!0});o(a.data)}catch(s){n(s)}finally{a(!1)}}}),[e]);return(0,s.useEffect)((()=>{e&&d()}),[d]),{fetchData:d,data:r,loading:t,error:c}}},67718:(e,t,a)=>{a.r(t),a.d(t,{default:()=>r});var s=a(65043),l=a(86213);const r=e=>{const[t,a]=(0,s.useState)(!1),[r,o]=(0,s.useState)(null);return{post:async t=>{a(!0),o(null);try{const s=t instanceof FormData,r=await l.A.post(e,t,{withCredentials:!0,headers:s?{"Content-Type":"multipart/form-data"}:{"Content-Type":"application/json"}});return a(!1),r.data}catch(s){throw o(s),a(!1),s}},loading:t,error:r}}}}]);
//# sourceMappingURL=823.28770821.chunk.js.map