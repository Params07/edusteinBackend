"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[577],{64577:(e,a,s)=>{s.r(a),s.d(a,{default:()=>d});var t=s(65043),n=s(49613),l=s(73216),r=s(70579);const d=()=>{const{login:e,isAuthenticated:a}=(0,n.A)(),s=(0,l.Zp)(),[d,o]=(0,t.useState)(""),[i,c]=(0,t.useState)(""),[u,p]=(0,t.useState)("");(0,t.useEffect)((()=>{a&&s("/adminPage")}),[a,s]);return(0,r.jsx)("div",{className:"flex h-screen w-full justify-center items-center",children:(0,r.jsxs)("div",{className:"bg-white p-6 rounded-lg shadow-md",children:[(0,r.jsx)("h1",{className:"text-2xl font-bold mb-4",children:"Login"}),u&&(0,r.jsx)("p",{className:"text-red-500 mb-4",children:u}),(0,r.jsx)("input",{type:"text",value:d,onChange:e=>o(e.target.value),placeholder:"Username",className:"border p-2 mb-4 w-full rounded"}),(0,r.jsx)("input",{type:"password",value:i,onChange:e=>c(e.target.value),placeholder:"Password",className:"border p-2 mb-4 w-full rounded"}),(0,r.jsx)("button",{onClick:async()=>{if(d&&i)try{(await fetch("/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:d,password:i}),credentials:"include"})).ok?(e(),p("")):p("Invalid credentials, please try again.")}catch(a){console.error("Login failed:",a),p("An error occurred. Please try again.")}else p("Please enter both username and password.")},className:"bg-blue-500 text-white p-2 rounded w-full",children:"Login as Admin"})]})})}}}]);
//# sourceMappingURL=577.ed8222b8.chunk.js.map