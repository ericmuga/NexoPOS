import{a as L,p as N,F as V,n as f,b}from"./bootstrap.915ca5b6.js";import{_ as d}from"./lang.2d0006f0.js";import{_ as T}from"./plugin-vue_export-helper.21dcd24c.js";import"./index.es.f7e98ba1.js";import"./vue-upload-component.1d25656a.js";import F from"./ns-pos-confirm-popup.679dbfbb.js";import{v as B}from"./runtime-dom.esm-bundler.68a12c3b.js";import{b8 as _,b1 as r,aA as l,aB as e,ao as s,bt as S,y as u,br as p,aF as h,L as y,b6 as g,az as v,ay as j}from"./runtime-core.esm-bundler.aa7a54f6.js";import"./vue.runtime.esm-bundler.e8ef992f.js";const I={name:"ns-token-output",data(){return{accessToken:""}},mounted(){this.accessToken=this.$popupParams.result.data.token.plainTextToken,this.popupCloser(),setTimeout(()=>{this.$refs.token.select(),this.$refs.token.setSelectionRange(0,99999)},100)},methods:{__:d,popupResolver:L,popupCloser:N,close(){navigator.clipboard.writeText(this.$refs.token.value),this.popupResolver(!0)}}},R={id:"alert-popup",class:"w-6/7-screen md:w-4/7-screen lg:w-3/7-screen flex flex-col shadow-lg"},U={class:"flex items-center justify-center flex-col flex-auto p-4"},D={class:"text-3xl font-body"},O={class:"py-4 text-center"},Y={class:"action-buttons flex border-t justify-end items-center p-2"};function E(i,o,c,w,n,t){const x=_("ns-button");return r(),l("div",R,[e("div",U,[e("h2",D,s(t.__("API Token")),1),e("p",O,s(t.__(`The API token has been generated. Make sure to copy this code on a safe place as it will only be displayed once.
                If you loose this token, you'll need to revoke it and generate a new one.`)),1),S(e("input",{ref:"token","onUpdate:modelValue":o[0]||(o[0]=m=>n.accessToken=m),readonly:"",type:"text",class:"my-2 p-2 w-full border-2 rounded border-input-edge bg-input-background"},null,512),[[B,n.accessToken]])]),e("div",Y,[u(x,{onClick:o[1]||(o[1]=m=>t.close()),type:"info"},{default:p(()=>[h(s(t.__("Copy And Close")),1)]),_:1})])])}var M=T(I,[["render",E]]);const q={name:"ns-token",data(){return{validation:new V,tokens:[],isLoading:!1,fields:[{type:"text",label:d("Token Name"),name:"name",description:d("This will be used to identifier the token."),validation:"required"}]}},methods:{__:d,createToken(){if(!this.validation.validateFields(this.fields))return f.error(d("Unable to proceed, the form is not valid.")).subscribe();b.post("/api/users/create-token",this.validation.extractFields(this.fields)).subscribe(async i=>{try{await new Promise((o,c)=>{Popup.show(M,{resolve:o,reject:c,result:i})}),this.loadTokens()}catch(o){console.log(o)}})},revokeToken(i){Popup.show(F,{title:d("Confirm Your Action"),message:d("You're about to delete a token that might be in use by an external app. Deleting will prevent that app from accessing the API. Would you like to proceed ?"),onAction:o=>{o&&b.delete(`/api/users/tokens/${i.id}`).subscribe({next:c=>{this.loadTokens(),f.success(c.message).subscribe()},error:c=>{f.error(c.message||"An unexpected error occured.").subscribe()}})}})},loadTokens(){this.isLoading=!0,b.get("/api/users/tokens").subscribe({next:i=>{this.isLoading=!1,this.tokens=i},error:i=>{f.error("Unable to load the token. An unexpected error occured.").subscribe()}})}},mounted(){this.fields=this.validation.createFields(this.fields),this.loadTokens()}},z={class:"-mx-2"},G={class:"px-2 w-full md:w-1/2"},H={class:"mb-4"},W={class:"my-2"},J={class:"flex justify-end"},K={class:"py-2 border-b-4 text-center border-box-edge text-xl"},Q={key:0},X={class:"flex flex-col"},Z={class:"text-lg"},$={class:"-mx-2 flex flex-col"},ee={class:"px-2"},te={class:"text-xs text-tertiary"},se={class:"px-2"},oe={class:"text-xs text-tertiary"},ne={class:"px-2"},re={class:"text-xs text-tertiary"},ie={key:1,class:"my-4"},ae={key:2,class:"mt-2"},le={class:"text-center text-tertiary text-sm my-4"};function ce(i,o,c,w,n,t){const x=_("ns-notice"),m=_("ns-field"),C=_("ns-button"),P=_("ns-close-button"),A=_("ns-spinner");return r(),l("div",z,[e("div",G,[e("div",H,[u(x,null,{title:p(()=>[h(s(t.__("About Token")),1)]),description:p(()=>[h(s(t.__(`Token are used to provide a secure access to NexoPOS resources without having to share your personal username and password.
                       Once generated, they doens't expires until you explicitely revoke it.`)),1)]),_:1})]),e("div",W,[(r(!0),l(y,null,g(n.fields,(a,k)=>(r(),j(m,{key:k,field:a},null,8,["field"]))),128)),e("div",J,[u(C,{onClick:o[0]||(o[0]=a=>t.createToken()),type:"info"},{default:p(()=>[h(s(t.__("Save Token")),1)]),_:1})])]),e("div",null,[e("h3",K,s(t.__("Generated Tokens")),1),n.tokens.length>0&&!n.isLoading?(r(),l("ul",Q,[(r(!0),l(y,null,g(n.tokens,(a,k)=>(r(),l("li",{key:k,class:"p-2 border-b flex justify-between items-center border-box-edge"},[e("div",X,[e("h4",Z,s(a.name),1),e("div",$,[e("div",ee,[e("span",te,s(t.__("Created"))+": "+s(a.created_at),1)]),e("div",se,[e("span",oe,s(t.__("Last Use"))+": "+s(a.last_used_at||t.__("Never")),1)]),e("div",ne,[e("span",re,s(t.__("Expires"))+": "+s(a.expires_at||t.__("Never")),1)])])]),e("div",null,[u(P,{onClick:de=>t.revokeToken(a),class:"px-2"},{default:p(()=>[h(s(t.__("Revoke")),1)]),_:2},1032,["onClick"])])]))),128))])):v("",!0),n.isLoading?(r(),l("div",ie,[u(A)])):v("",!0),!n.isLoading&&n.tokens.length===0?(r(),l("div",ae,[e("div",le,s(t.__("You haven't yet generated any token for your account. Create one to get started.")),1)])):v("",!0)])])])}var ve=T(q,[["render",ce]]);export{ve as default};