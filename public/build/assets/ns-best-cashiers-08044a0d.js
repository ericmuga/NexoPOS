import{_ as m,n as f}from"./currency-dc6217f5.js";import{_ as p}from"./_plugin-vue_export-helper-c27b6911.js";import{an as d,af as e,G as t,H as s,c as _,F as b,al as x,A as l}from"./npm~@vue~runtime-core_-29a19feb.js";import{V as n}from"./npm~@vue~shared_-951a29c4.js";import"./npm~numeral-304d6dd9.js";import"./npm~@ckeditor~ckeditor5-build-classic_-b5d88964.js";import"./npm~currency.js-57f74176.js";import"./npm~@vue~reactivity_-beabd60a.js";const y={name:"ns-best-customers",data(){return{subscription:null,cashiers:[],hasLoaded:!1}},mounted(){this.hasLoaded=!1,this.subscription=Dashboard.bestCashiers.subscribe(c=>{this.hasLoaded=!0,this.cashiers=c})},methods:{__:m,nsCurrency:f},unmounted(){this.subscription.unsubscribe()}},v={id:"ns-best-cashiers",class:"flex flex-auto flex-col shadow rounded-lg overflow-hidden"},g={class:"flex-auto"},k={class:"head text-center border-b w-full flex justify-between items-center p-2"},C={class:"body"},w={key:0,class:"table w-full"},j={class:"p-2"},L={class:"-mx-1 flex justify-start items-center"},B=s("div",{class:"px-1"},[s("div",{class:"rounded-full"},[s("i",{class:"las la-user-circle text-xl"})])],-1),N={class:"px-1 justify-center"},V={class:"font-semibold items-center"},D={class:"flex justify-end p-2"},F={key:0},z={colspan:"2"},A={key:1,class:"h-56 flex items-center justify-center"},E={key:2,class:"h-56 flex items-center justify-center flex-col"},G=s("i",{class:"las la-grin-beam-sweat text-6xl"},null,-1),H={class:"text-sm"};function R(c,a,S,W,o,r){const h=d("ns-close-button"),u=d("ns-spinner");return e(),t("div",v,[s("div",g,[s("div",k,[s("h5",null,n(r.__("Best Cashiers")),1),s("div",null,[_(h,{onClick:a[0]||(a[0]=i=>c.$emit("onRemove"))})])]),s("div",C,[o.cashiers.length>0?(e(),t("table",w,[s("thead",null,[(e(!0),t(b,null,x(o.cashiers,i=>(e(),t("tr",{key:i.id,class:"entry border-b text-sm"},[s("th",j,[s("div",L,[B,s("div",N,[s("h3",V,n(i.username),1)])])]),s("th",D,n(r.nsCurrency(i.total_sales,"abbreviate")),1)]))),128)),o.cashiers.length===0?(e(),t("tr",F,[s("th",z,n(r.__("No result to display.")),1)])):l("",!0)])])):l("",!0),o.hasLoaded?l("",!0):(e(),t("div",A,[_(u,{size:"8",border:"4"})])),o.hasLoaded&&o.cashiers.length===0?(e(),t("div",E,[G,s("p",H,n(r.__("Well.. nothing to show for the meantime.")),1)])):l("",!0)])])])}const T=p(y,[["render",R]]);export{T as default};