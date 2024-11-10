"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[597,718],{87597:(e,t,s)=>{s.r(t),s.d(t,{default:()=>c});var a=s(65043),l=s(92823),n=s.n(l),r=(s(25884),s(67718)),d=s(70579);const c=e=>{let{emails:t,onClose:s,showPopup:l}=e;const[c,o]=(0,a.useState)(""),[i,m]=(0,a.useState)(""),[u,h]=(0,a.useState)([]),[p,b]=(0,a.useState)(!1),[x,g]=(0,a.useState)({}),{post:j,loading:f,error:N}=(0,r.default)("/send-email"),[w,y]=(0,a.useState)("now"),S=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}T${String(e.getHours()).padStart(2,"0")}:${String(e.getMinutes()).padStart(2,"0")}`,[v,C]=(0,a.useState)(S(new Date));return(0,d.jsx)("div",{className:"fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center",children:(0,d.jsxs)("div",{className:"bg-white w-11/12 md:w-2/3 lg:w-1/2 p-4 rounded-lg",children:[(0,d.jsxs)("div",{className:"flex justify-between items-center mb-4",children:[(0,d.jsx)("h2",{className:"text-lg font-bold",children:"Draft Email"}),(0,d.jsx)("button",{onClick:s,className:"text-xl font-bold",children:"\xd7"})]}),(0,d.jsxs)("div",{className:"mb-4",children:[(0,d.jsx)("label",{className:"block text-sm font-bold mb-2",children:"To:"}),(0,d.jsx)("div",{className:"border p-2 rounded",children:t.join(", ")})]}),(0,d.jsxs)("div",{className:"mb-4",children:[(0,d.jsx)("label",{className:"block text-sm font-bold mb-2",children:"Subject:"}),(0,d.jsx)("input",{type:"text",value:c,required:!0,onChange:e=>o(e.target.value),className:"w-full border border-gray-300 p-2 rounded"})]}),(0,d.jsxs)("div",{className:"mb-4",children:[(0,d.jsx)("label",{className:"block text-sm font-bold mb-2",children:"Body:"}),(0,d.jsx)(n(),{value:i,onChange:m}),x.content&&(0,d.jsxs)("p",{className:"text-red-300",children:[" ",x.content]})]}),(0,d.jsxs)("div",{className:"mb-4",children:[(0,d.jsx)("label",{className:"block text-sm font-bold mb-2",children:"Attach Files:"}),(0,d.jsx)("input",{type:"file",multiple:!0,onChange:e=>{h(Array.from(e.target.files))},className:"w-full border border-gray-300 p-2 rounded"}),u.length>0&&(0,d.jsxs)("div",{children:[(0,d.jsx)("h3",{className:"font-semibold mt-2",children:"Selected Files:"}),(0,d.jsx)("ul",{children:u.map(((e,t)=>(0,d.jsx)("li",{children:e.name},t)))})]})]}),(0,d.jsxs)("div",{className:"mb-4",children:[(0,d.jsx)("label",{className:"block text-sm font-bold mb-2",children:"Schedule Email:"}),(0,d.jsxs)("select",{value:w,onChange:e=>y(e.target.value),className:"w-full border border-gray-300 p-2 rounded",children:[(0,d.jsx)("option",{value:"now",children:"Send Now"}),(0,d.jsx)("option",{value:"schedule",children:"Schedule for Later"})]}),"schedule"===w&&(0,d.jsxs)("div",{className:"mt-2",children:[(0,d.jsx)("label",{className:"block text-sm font-bold mb-2",children:"Schedule Date & Time:"}),(0,d.jsx)("input",{type:"datetime-local",min:S(new Date),value:v,onChange:e=>C(e.target.value),className:"w-full border border-gray-300 p-2 rounded"})]})]}),(0,d.jsxs)("div",{className:"flex justify-end mt-4",children:[(0,d.jsx)("button",{onClick:s,className:"bg-red-500 text-white px-4 py-2 rounded mr-2",children:"Cancel"}),(0,d.jsx)("button",{onClick:async()=>{const e={};if(!i)return e.content="cant send empty email",void g(e);g(e),b(!0);const a=new FormData;if(a.append("subject",c),a.append("message",i),a.append("to",JSON.stringify(t)),u.forEach((e=>{a.append("files",e)})),"schedule"===w){const e=new Date,t=new Date(v),s=198e5,l=(new Date(t.getTime()-s),t.getTime()-e.getTime());a.append("startDelay",l),console.log(l)}else a.append("startDelay",0);try{await j(a),l({success:!0,message:"email sent"}),s()}catch(N){console.error("Failed to send emails:",N),l({success:!1,message:"Couldnt send email"})}finally{b(!1)}},className:"bg-blue-500 text-white px-4 py-2 rounded "+(f||p?"opacity-50 cursor-not-allowed":""),disabled:f||p,children:f||p?"Sending...":"Send"})]}),N&&(0,d.jsxs)("p",{className:"text-red-500 mt-2",children:["Error: ",N.message]})]})})}},67718:(e,t,s)=>{s.r(t),s.d(t,{default:()=>n});var a=s(65043),l=s(86213);const n=e=>{const[t,s]=(0,a.useState)(!1),[n,r]=(0,a.useState)(null);return{post:async t=>{s(!0),r(null);try{const a=t instanceof FormData,n=await l.A.post(e,t,{withCredentials:!0,headers:a?{"Content-Type":"multipart/form-data"}:{"Content-Type":"application/json"}});return s(!1),n.data}catch(a){throw r(a),s(!1),a}},loading:t,error:n}}}}]);
//# sourceMappingURL=597.74664a80.chunk.js.map