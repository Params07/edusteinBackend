"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[864,776,523,483],{82776:(e,t,a)=>{a.r(t),a.d(t,{default:()=>c});var s=a(65043),l=a(90523);const c=e=>{const[t,a]=(0,s.useState)(null),c=0!==e?`/bootcamps/bootcampById?id=${e}`:null,{fetchData:i,data:n,loading:d,error:r}=(0,l.default)(c);return(0,s.useEffect)((()=>{c&&i()}),[c,i]),(0,s.useEffect)((()=>{n&&a(n)}),[n]),{bootcampData:t,loading:d,error:r}}},90523:(e,t,a)=>{a.r(t),a.d(t,{default:()=>c});var s=a(65043),l=a(86213);const c=e=>{const[t,a]=(0,s.useState)(!1),[c,i]=(0,s.useState)([]),[n,d]=(0,s.useState)(null),r=(0,s.useCallback)((async function(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(e){a(!0),d(null);try{const a=await l.A.get(e,{params:t,withCredentials:!0});i(a.data)}catch(s){d(s)}finally{a(!1)}}}),[e]);return(0,s.useEffect)((()=>{e&&r()}),[r]),{fetchData:r,data:c,loading:t,error:n}}},22483:(e,t,a)=>{a.r(t),a.d(t,{default:()=>n});var s=a(65043),l=(a(82776),a(45394)),c=a(90523),i=a(70579);const n=e=>{let{id:t,action:a}=e;const n=(0,s.useMemo)((()=>`/bootcamps/bootcampById?id=${t}`),[t]),{data:d,loading:r,error:o}=(0,c.default)(n);return(0,i.jsx)("div",{className:"fixed  inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center  h-full",children:(0,i.jsxs)("div",{className:"bg-white w-11/12 md:w-2/3 lg:w-1/2 p-4 rounded-lg h-5/6 overflow-y-auto ",children:[(0,i.jsxs)("span",{className:" w-full flex justify-end ",children:[" ",(0,i.jsx)(l.$8F,{onClick:()=>{a(!0)},className:"cursor-pointer text-4xl text-red-500 "})]}),(0,i.jsx)("div",{className:"px-4",children:d&&d.length>0&&(0,i.jsxs)("div",{className:"grid gap-6 w-full justify-center",children:[(0,i.jsxs)("div",{className:"text-xl font-semibold",children:["Title :",d[0].title]}),(0,i.jsx)("div",{className:"w-full flex justify-center",children:(0,i.jsx)("img",{className:"object-contain w-36 h-36",src:d[0].image_path})}),(0,i.jsxs)("div",{className:"flex space-x-4",children:[(0,i.jsx)("div",{className:"text-xl",children:"About:"}),(0,i.jsx)("div",{className:"text-sm",dangerouslySetInnerHTML:{__html:d[0].additional_info}})]})]})})]})})}}}]);
//# sourceMappingURL=864.1a0f1695.chunk.js.map