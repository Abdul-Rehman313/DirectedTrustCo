import{j as a}from"./index-gjjTZoHP.js";import{u as F,F as f}from"./DynamicFormBuilder-Dhcn-Ki1.js";import"./index--QnvDjh3.js";import"./_commonjsHelpers-D6-XlEtG.js";import"./index-CNM0t4mB.js";import"./schemas-CPWKuVEn.js";import"./Tooltip-DWDCxKoe.js";const x={id:"fullName",type:"text",label:"Full Name",placeholder:"Enter full name",required:!0},S={id:"document",type:"file",label:"Upload Document",accept:".pdf,.png,.jpg",maxSizeMb:5},h=({fieldSchema:i})=>{const{control:d,watch:n,setValue:p,formState:u}=F({defaultValues:{}});return a.jsx("div",{className:"max-w-xl",children:a.jsx(f,{fieldSchema:i,control:d,errors:u.errors,setValue:p,watch:n})})},v={title:"Forms / FormField",component:h},e={args:{fieldSchema:x}},r={args:{fieldSchema:S}};var t,o,s;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`{
  args: {
    fieldSchema: textFieldSchema
  }
}`,...(s=(o=e.parameters)==null?void 0:o.docs)==null?void 0:s.source}}};var m,l,c;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    fieldSchema: fileFieldSchema
  }
}`,...(c=(l=r.parameters)==null?void 0:l.docs)==null?void 0:c.source}}};const y=["TextInput","FileUpload"];export{r as FileUpload,e as TextInput,y as __namedExportsOrder,v as default};
