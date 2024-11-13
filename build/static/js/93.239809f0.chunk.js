"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[93,960,376,638,823,363,523,718],{74960:(e,t,a)=>{a.r(t),a.d(t,{default:()=>c});var s=a(65043),n=a(81278),r=a(90523),l=a(70579);const c=e=>{let{selectedBootcamp:t,setSelectedBootcamp:a,isMulti:c=!1,isBootcampActive:o}=e;const[d,i]=(0,s.useState)([]);let u=`/bootcamps/bootcamp?isBootcampActive=${o}`;const{data:p=[]}=(0,r.default)(u);(0,s.useEffect)((()=>{if(p){const e=p.map((e=>({label:e.title,value:e.id})));i(e),!t&&e.length>0&&!c&&a(e[0])}}),[p,t,c,o]);return(0,l.jsx)(n.Ay,{className:"w-64 h-8",name:"bootcamp",value:t,options:d,isMulti:c,placeholder:"Bootcamp Name",onChange:e=>{a(e)}})}},17376:(e,t,a)=>{a.r(t),a.d(t,{default:()=>l});var s=a(65043),n=a(86213),r=a(23894);const l=e=>{const[t,a]=(0,s.useState)(!1);return{downloadExcelFile:async t=>{try{a(!0);const s=await n.A.post("/createExcel",t,{responseType:"blob"}),r=window.URL.createObjectURL(new Blob([s.data])),l=document.createElement("a");l.href=r,l.setAttribute("download",e+".xlsx"),document.body.appendChild(l),l.click(),document.body.removeChild(l),window.URL.revokeObjectURL(r),a(!1)}catch(s){a(!1),(0,r.y)({success:!1,message:"Error in downloading file"}),console.error("Error downloading file:",s)}},downloading:t}}},80638:(e,t,a)=>{a.r(t),a.d(t,{default:()=>n});a(65043);var s=a(70579);const n=e=>{let{data:t,component:a,action:n}=e;if(!t||0===t.length)return(0,s.jsx)("p",{children:"No data available"});const r=["Action",...Object.keys(t[0])];return(0,s.jsx)("div",{className:"overflow-x-auto m-4",children:(0,s.jsx)("div",{className:"overflow-y-auto h-[500px] no-scrollbar",children:(0,s.jsxs)("table",{className:"min-w-full border border-collapse ",children:[(0,s.jsx)("thead",{className:"bg-gray-300 border-b w-full sticky top-0 z-5 h-16",children:(0,s.jsx)("tr",{children:r.map((e=>(0,s.jsx)("th",{className:"py-2 px-4 border-b border-gray-300 text-center bg-gray-200",children:"Action"===e?n:e},e)))})}),(0,s.jsx)("tbody",{children:t.map(((e,t)=>(0,s.jsx)("tr",{className:"py-2 px-4 border-b   border-gray-300 text-center",children:r.map((t=>"Action"===t?(0,s.jsx)("td",{className:"py-2 px-4 border-gray-300 border-b text-center",children:a(e)},t):(0,s.jsx)("td",{className:"py-2 px-4 border-gray-300 border-b text-center",children:e[t]},t)))},t)))})]})})})}},60823:(e,t,a)=>{a.r(t),a.d(t,{default:()=>p});var s=a(65043),n=a(90523),r=a(74960),l=a(80638),c=a(67718),o=a(23894),d=a(49342),i=a(17376),u=a(70579);const p=()=>{const[e,t]=(0,s.useState)([]),[a,p]=(0,s.useState)([]),[x,m]=(0,s.useState)(!1),[h,f]=(0,s.useState)(null),[b,g]=(0,s.useState)(0),[y,j]=(0,s.useState)([]),[N,v]=(0,s.useState)(!1),[w,k]=(0,s.useState)(0),[S,C]=(0,s.useState)(0),{downloadExcelFile:A,downloading:E}=(0,i.default)("refundAll_data"),[I,D]=(0,s.useState)([]),R=(0,s.useMemo)((()=>{if(k(0),e.length<1)return null;return`/refundInitiator/getData?bootcampIds=${e.map((e=>e.value)).join(",")}`}),[b]),{data:B,loading:F,error:M}=(0,n.default)(R),{post:L,loading:P,error:z}=(0,c.default)("/refundInitiator/refundInitiateAll");(0,s.useEffect)((()=>{if(k(0),N&&a){const e=a.map((e=>e.id));j(e)}else j([])}),[N]),(0,s.useEffect)((()=>{D([]),v(!1),B&&(p(B),m(F),f(M))}),[B,F,M]);return(0,u.jsxs)("div",{className:"flex flex-col space-y-8",children:[(0,u.jsxs)("div",{className:"flex space-x-4 items-start",children:[(0,u.jsx)(r.default,{selectedBootcamp:e,setSelectedBootcamp:t,isMulti:!0}),(0,u.jsx)("button",{className:"px-5 py-2 bg-black text-white rounded border-2 hover:bg-gray-700 "+(x?"opacity-50 cursor-not-allowed":""),onClick:()=>g(b+1),disabled:x,children:x?"Fetching":"Fetch Data"}),y&&y.length>0&&(0,u.jsx)("button",{className:"px-5 py-2 bg-green-600 text-white rounded border-2 border-green-600 hover:bg-green-400",onClick:()=>(async()=>{k(0);const e=a.filter((e=>y.includes(e.id))).map((e=>({...e,razorPayID:e.paymentid})));if(e.length>0)try{const t=await L({userDetails:e}),{results:a}=t,s=a.reduce(((e,t)=>Number(e)+Number("success"==t.status?1:0)),0);C(s),k(a.length),D(a)}catch(h){(0,o.y)({success:!1,message:"an error occured"}),k(0),D([])}})(),disabled:P,children:P?"Refunding":"Refund All"}),0!==w&&(0,u.jsxs)("div",{className:"flex flex-col space-y-2 h-full",children:[(0,u.jsxs)("p",{children:["Processed Refund Requests: ",w]}),(0,u.jsxs)("p",{className:"flex space-x-2",children:[(0,u.jsxs)("p",{children:["Number of Refunds Success: ",S]}),(0,u.jsx)(d.RXm,{className:"text-green-600 text-xl"})]}),(0,u.jsxs)("p",{className:"flex space-x-2 items-center h-4 ",children:[(0,u.jsxs)("p",{className:"",children:["Number of Refunds Failed: ",w-S]}),(0,u.jsx)("p",{className:"text-lg font-semibold text-red-600 ",children:"X"})]})]}),I&&I.length>0&&(0,u.jsx)("button",{className:"px-5 py-2 rounded-md hover:bg-gray-700 border-2 text-white bg-black",disabled:E,onClick:async()=>{A(I)},children:"Download record"})]}),(0,u.jsx)("div",{children:a&&a.length>0&&(0,u.jsx)(l.default,{data:a,component:e=>(0,u.jsx)("input",{className:"cursor-pointer",type:"checkbox",checked:y.includes(e.id),onChange:()=>{return t=e.id,k(0),void j((e=>e.includes(t)?e.filter((e=>e!==t)):[...e,t]));var t}}),action:(0,u.jsx)("input",{type:"checkbox",checked:N,onChange:()=>{k(0),D([]),v((e=>!e))}})})})]})}},19363:(e,t,a)=>{a.r(t),a.d(t,{default:()=>d});var s=a(80638),n=a(23894),r=a(67718),l=a(65043),c=a(90523),o=a(70579);const d=()=>{const[e,t]=(0,l.useState)(""),[a,d]=(0,l.useState)(""),[i,u]=(0,l.useState)(),[p,x]=(0,l.useState)(!1),{post:m,loading:h,error:f}=(0,r.default)("/refundInitiator/refundInitiate"),b=(0,l.useMemo)((()=>""==a.trim()?null:`/refundInitiator/checkData?razorPayID=${e}`),[a]),{data:g,loading:y,error:j}=(0,c.default)(b);return(0,l.useEffect)((()=>{g&&g.length>0?(x(!1),u(g)):(x(!0),u([]),d(""))}),[g]),(0,l.useEffect)((()=>{u([])}),[j]),(0,o.jsxs)("div",{children:[(0,o.jsxs)("div",{className:"flex space-x-4 items-center",children:[(0,o.jsx)("label",{className:"text-lg font-semibold",children:"Payment ID:"}),(0,o.jsx)("input",{type:"text",value:e,onChange:e=>t(e.target.value),required:!0,className:"px-5 py-2 border-2 border-gray-400 outline-none focus:border-2 focus:border-gray-500 rounded-md",placeholder:"Enter the payment ID"}),(0,o.jsx)("button",{className:"px-5 py-2 bg-black hover:bg-gray-700 text-white rounded-md border-2 border-black",onClick:()=>{e&&d(e)},children:"Check Valid"}),p?(0,o.jsx)("p",{}):""]}),y&&(0,o.jsx)("p",{children:"Loading..."}),i&&i.length>0&&(0,o.jsx)(s.default,{data:i,component:()=>(0,o.jsx)("button",{className:"px-5 py-2 text-white bg-green-600 rounded-md",disabled:h,onClick:()=>(async()=>{const e=new FormData;e.append("name",i[0].name||""),e.append("id",i[0].id||""),e.append("phone",i[0].phone||""),e.append("email",i[0].email||""),e.append("razorPayID",i[0].paymentid||"");try{const t=await m(e);(0,n.y)({success:!0,message:t.message})}catch(j){const t=j.response&&j.response.data&&j.response.data.message?j.response.data.message:"An unknown error occurred";(0,n.y)({success:!1,message:t})}})(),children:"Initiate Refund"}),action:"Action"}),p&&a&&(0,o.jsx)(o.Fragment,{children:"no matching data found"})]})}},90523:(e,t,a)=>{a.r(t),a.d(t,{default:()=>r});var s=a(65043),n=a(86213);const r=e=>{const[t,a]=(0,s.useState)(!1),[r,l]=(0,s.useState)([]),[c,o]=(0,s.useState)(null),d=(0,s.useCallback)((async function(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(e){a(!0),o(null);try{const a=await n.A.get(e,{params:t,withCredentials:!0});l(a.data)}catch(s){o(s)}finally{a(!1)}}}),[e]);return(0,s.useEffect)((()=>{e&&d()}),[d]),{fetchData:d,data:r,loading:t,error:c}}},67718:(e,t,a)=>{a.r(t),a.d(t,{default:()=>r});var s=a(65043),n=a(86213);const r=e=>{const[t,a]=(0,s.useState)(!1),[r,l]=(0,s.useState)(null);return{post:async t=>{a(!0),l(null);try{const s=t instanceof FormData,r=await n.A.post(e,t,{withCredentials:!0,headers:s?{"Content-Type":"multipart/form-data"}:{"Content-Type":"application/json"}});return a(!1),r.data}catch(s){throw l(s),a(!1),s}},loading:t,error:r}}},99093:(e,t,a)=>{a.r(t),a.d(t,{default:()=>c});var s=a(65043),n=(a(90523),a(19363)),r=a(60823),l=a(70579);const c=()=>{const e=["Single","Multiple"],[t,a]=(0,s.useState)(e[0]);return(0,s.useEffect)((()=>{a(e[0])}),[]),(0,l.jsxs)("div",{className:"flex flex-col w-full h-full space-y-8",children:[(0,l.jsx)("div",{className:"h-16 w-full flex justify-center items-center shadow-lg",children:(0,l.jsx)("p",{className:"text-xl font-bold",children:"Refund Initiator"})}),(0,l.jsxs)("div",{className:"flex flex-col px-8",children:[(0,l.jsx)("div",{className:"h-12",children:(0,l.jsxs)("div",{className:"flex  space-x-2",children:[(0,l.jsx)("p",{className:"text-xl font-semibold cursor-pointer "+(t==e[0]?"text-black font-bold":"text-gray-600"),onClick:()=>{a(e[0])},children:e[0]}),(0,l.jsx)("p",{className:"text-xl font-semibold",children:"/"}),(0,l.jsx)("p",{className:"text-xl font-semibold cursor-pointer "+(t==e[1]?"text-black font-bold":"text-gray-600"),onClick:()=>{a(e[1])},children:e[1]})]})}),t&&"Single"===t?(0,l.jsx)(n.default,{}):(0,l.jsx)(r.default,{})]})]})}}}]);
//# sourceMappingURL=93.239809f0.chunk.js.map