"use strict";(self.webpackChunkNexoPOS_4x=self.webpackChunkNexoPOS_4x||[]).push([[163,89],{163:(t,e,s)=>{s.r(e),s.d(e,{default:()=>d});var n=s(9671),i=s(2242),a=s(1345),r=s(2833),o=s(9089),u=s(7389),c=s(2277);const l={name:"ns-stock-adjustment",props:["actions"],data:function(){return{search:"",timeout:null,suggestions:[],products:[]}},mounted:function(){console.log(this.actions)},methods:{__:u.__,searchProduct:function(t){var e=this;t.length>0&&n.ih.post("/api/nexopos/v4/procurements/products/search-procurement-product",{argument:t}).subscribe((function(t){if("products"===t.from){if(!(t.products.length>0))return e.closeSearch(),n.kX.error((0,u.__)("Looks like no products matched the searched term.")).subscribe();1===t.products.length?e.addSuggestion(t.products[0]):e.suggestions=t.products}else if("procurements"===t.from){if(null===t.product)return e.closeSearch(),n.kX.error((0,u.__)("Looks like no products matched the searched term.")).subscribe();e.addProductToList(t.product)}}))},addProductToList:function(t){if(this.products.filter((function(e){return e.procurement_product_id===t.id})).length>0)return this.closeSearch(),n.kX.error((0,u.__)("The product already exists on the table.")).subscribe();var e=new Object;t.unit_quantity.unit=t.unit,e.quantities=[t.unit_quantity],e.name=t.name,e.adjust_unit=t.unit_quantity,e.adjust_quantity=1,e.adjust_action="",e.adjust_reason="",e.adjust_value=0,e.id=t.product_id,e.accurate_tracking=1,e.available_quantity=t.available_quantity,e.procurement_product_id=t.id,e.procurement_history=[{label:"".concat(t.procurement.name," (").concat(t.available_quantity,")"),value:t.id}],this.products.push(e),this.closeSearch()},addSuggestion:function(t){var e=this;(0,c.D)([n.ih.get("/api/nexopos/v4/products/".concat(t.id,"/units/quantities"))]).subscribe((function(s){if(!(s[0].length>0))return n.kX.error((0,u.__)("This product does't have any stock to adjust.")).subscribe();t.quantities=s[0],t.adjust_quantity=1,t.adjust_action="",t.adjust_reason="",t.adjust_unit="",t.adjust_value=0,t.procurement_product_id=0,e.products.push(t),e.closeSearch(),t.accurate_tracking}))},closeSearch:function(){this.search="",this.suggestions=[]},recalculateProduct:function(t){""!==t.adjust_unit&&(["deleted","defective","lost"].includes(t.adjust_action)?t.adjust_value=-t.adjust_quantity*t.adjust_unit.sale_price:t.adjust_value=t.adjust_quantity*t.adjust_unit.sale_price),this.$forceUpdate()},openQuantityPopup:function(t){var e=this;t.quantity;new Promise((function(e,s){i.G.show(a.Z,{resolve:e,reject:s,quantity:t.adjust_quantity})})).then((function(s){if(!["added"].includes(t.adjust_action)){if(void 0!==t.accurate_tracking&&s.quantity>t.available_quantity)return n.kX.error((0,u.__)("The specified quantity exceed the available quantity.")).subscribe();if(s.quantity>t.adjust_unit.quantity)return n.kX.error((0,u.__)("The specified quantity exceed the available quantity.")).subscribe()}t.adjust_quantity=s.quantity,e.recalculateProduct(t)}))},proceedStockAdjustment:function(){var t=this;if(0===this.products.length)return n.kX.error((0,u.__)("Unable to proceed as the table is empty.")).subscribe();i.G.show(r.default,{title:(0,u.__)("Confirm Your Action"),message:(0,u.__)("The stock adjustment is about to be made. Would you like to confirm ?"),onAction:function(e){e&&n.ih.post("/api/nexopos/v4/products/adjustments",{products:t.products}).subscribe((function(e){n.kX.success(e.message).subscribe(),t.products=[]}),(function(t){n.kX.error(t.message).subscribe()}))}})},provideReason:function(t){new Promise((function(e,s){i.G.show(o.default,{title:(0,u.__)("More Details"),resolve:e,reject:s,message:(0,u.__)("Useful to describe better what are the reasons that leaded to this adjustment."),input:t.adjust_reason,onAction:function(e){!1!==e&&(t.adjust_reason=e)}})})).then((function(t){n.kX.success((0,u.__)("The reason has been updated.")).susbcribe()})).catch((function(t){}))},removeProduct:function(t){var e=this;i.G.show(r.default,{title:(0,u.__)("Confirm Your Action"),message:(0,u.__)("Would you like to remove this product from the table ?"),onAction:function(s){if(s){var n=e.products.indexOf(t);e.products.splice(n,1)}}})}},watch:{search:function(){var t=this;this.search.length>0?(clearTimeout(this.timeout),this.timeout=setTimeout((function(){t.searchProduct(t.search)}),500)):this.closeSearch()}}};const d=(0,s(1900).Z)(l,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("div",{staticClass:"input-field flex border-2 input-group rounded"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.search,expression:"search"}],staticClass:"p-2 flex-auto outline-none",attrs:{type:"text"},domProps:{value:t.search},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"esc",27,e.key,["Esc","Escape"])?null:t.closeSearch()},input:function(e){e.target.composing||(t.search=e.target.value)}}}),t._v(" "),s("button",{staticClass:"px-3 py-2 rounded-none"},[t._v(t._s(t.__("Search")))])]),t._v(" "),t.suggestions.length>0?s("div",{staticClass:"h-0"},[s("div",{},[s("ul",{staticClass:"shadow h-96 relative z-10 ns-vertical-menu zoom-in-entrance anim-duration-300 overflow-y-auto"},t._l(t.suggestions,(function(e){return s("li",{key:e.id,staticClass:"cursor-pointer border-b p-2 flex justify-between",on:{click:function(s){return t.addSuggestion(e)}}},[s("span",[t._v(t._s(e.name))])])})),0)])]):t._e(),t._v(" "),s("div",{staticClass:"ns-box rounded shadow my-2 w-full "},[s("table",{staticClass:"table w-full ns-table"},[s("thead",{staticClass:"border-b"},[s("tr",[s("td",{staticClass:"p-2"},[t._v(t._s(t.__("Product")))]),t._v(" "),s("td",{staticClass:"p-2 text-center",attrs:{width:"120"}},[t._v(t._s(t.__("Unit")))]),t._v(" "),s("td",{staticClass:"p-2 text-center",attrs:{width:"120"}},[t._v(t._s(t.__("Operation")))]),t._v(" "),s("td",{staticClass:"p-2 text-center",attrs:{width:"120"}},[t._v(t._s(t.__("Procurement")))]),t._v(" "),s("td",{staticClass:"p-2 text-center",attrs:{width:"120"}},[t._v(t._s(t.__("Quantity")))]),t._v(" "),s("td",{staticClass:"p-2 text-center",attrs:{width:"120"}},[t._v(t._s(t.__("Value")))]),t._v(" "),s("td",{staticClass:"p-2 text-center",attrs:{width:"150"}},[t._v(t._s(t.__("Actions")))])])]),t._v(" "),s("tbody",[0===t.products.length?s("tr",[s("td",{staticClass:"p-2 text-center",attrs:{colspan:"6"}},[t._v(t._s(t.__("Search and add some products")))])]):t._e(),t._v(" "),t._l(t.products,(function(e){return s("tr",{key:e.id},[s("td",{staticClass:"p-2"},[t._v(t._s(e.name)+" ("+t._s((1===e.accurate_tracking?e.available_quantity:e.adjust_unit.quantity)||0)+")")]),t._v(" "),s("td",{staticClass:"p-2"},[s("div",{staticClass:"input-group border-2 info"},[s("select",{directives:[{name:"model",rawName:"v-model",value:e.adjust_unit,expression:"product.adjust_unit"}],staticClass:"outline-none p-2 w-full",on:{change:[function(s){var n=Array.prototype.filter.call(s.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));t.$set(e,"adjust_unit",s.target.multiple?n:n[0])},function(s){return t.recalculateProduct(e)}]}},t._l(e.quantities,(function(e){return s("option",{key:e.id,domProps:{value:e}},[t._v(t._s(e.unit.name))])})),0)])]),t._v(" "),s("td",{staticClass:"p-2"},[s("div",{staticClass:"input-group border-2 info"},[s("select",{directives:[{name:"model",rawName:"v-model",value:e.adjust_action,expression:"product.adjust_action"}],staticClass:"outline-none p-2 w-full",attrs:{name:"",id:""},on:{change:[function(s){var n=Array.prototype.filter.call(s.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));t.$set(e,"adjust_action",s.target.multiple?n:n[0])},function(s){return t.recalculateProduct(e)}]}},t._l(t.actions,(function(e){return s("option",{key:e.value,domProps:{value:e.value}},[t._v(t._s(e.label))])})),0)])]),t._v(" "),s("td",{staticClass:"p-2"},[1===e.accurate_tracking?s("div",{staticClass:"input-group border-2 info"},[s("select",{directives:[{name:"model",rawName:"v-model",value:e.procurement_product_id,expression:"product.procurement_product_id"}],staticClass:"outline-none p-2 bg-white w-full",attrs:{name:"",id:""},on:{change:[function(s){var n=Array.prototype.filter.call(s.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));t.$set(e,"procurement_product_id",s.target.multiple?n:n[0])},function(s){return t.recalculateProduct(e)}]}},t._l(e.procurement_history,(function(e){return s("option",{key:e.value,domProps:{value:e.value}},[t._v(t._s(e.label))])})),0)]):t._e()]),t._v(" "),s("td",{staticClass:"p-2 flex items-center justify-center cursor-pointer",on:{click:function(s){return t.openQuantityPopup(e)}}},[s("span",{staticClass:"border-b border-dashed border-blue-400 py-2 px-4"},[t._v(t._s(e.adjust_quantity))])]),t._v(" "),s("td",{staticClass:"p-2"},[s("span",{staticClass:"border-b border-dashed border-blue-400 py-2 px-4"},[t._v(t._s(t._f("currency")(e.adjust_value)))])]),t._v(" "),s("td",{staticClass:"p-2"},[s("div",{staticClass:"-mx-1 flex justify-end"},[s("div",{staticClass:"px-1"},[s("button",{staticClass:"ns-inset-button active info border outline-none rounded-full shadow h-10 w-10",on:{click:function(s){return t.provideReason(e)}}},[s("i",{staticClass:"las la-comment-dots"})])]),t._v(" "),s("div",{staticClass:"px-1"},[s("button",{staticClass:"ns-inset-button active error border outline-none rounded-full shadow h-10 w-10",on:{click:function(s){return t.removeProduct(e)}}},[s("i",{staticClass:"las la-times"})])])])])])}))],2)]),t._v(" "),s("div",{staticClass:"border-t ns-box-footer p-2 flex justify-end"},[s("ns-button",{attrs:{type:"info"},on:{click:function(e){return t.proceedStockAdjustment()}}},[t._v(t._s(t.__("Proceed")))])],1)])])}),[],!1,null,null,null).exports},1345:(t,e,s)=>{s.d(e,{Z:()=>u});var n=s(9671),i=s(7389);function a(t){return function(t){if(Array.isArray(t))return r(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"==typeof t)return r(t,e);var s=Object.prototype.toString.call(t).slice(8,-1);"Object"===s&&t.constructor&&(s=t.constructor.name);if("Map"===s||"Set"===s)return Array.from(t);if("Arguments"===s||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(s))return r(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function r(t,e){(null==e||e>t.length)&&(e=t.length);for(var s=0,n=new Array(e);s<e;s++)n[s]=t[s];return n}const o={data:function(){return{finalValue:1,virtualStock:null,allSelected:!0,isLoading:!1,keys:[].concat(a([1,2,3].map((function(t){return{identifier:t,value:t}}))),a([4,5,6].map((function(t){return{identifier:t,value:t}}))),a([7,8,9].map((function(t){return{identifier:t,value:t}}))),[{identifier:"backspace",icon:"la-backspace"},{identifier:0,value:0},{identifier:"next",icon:"la-share"}])}},mounted:function(){var t=this;this.$popup.event.subscribe((function(e){"click-overlay"===e.event&&t.closePopup()})),this.$popupParams.quantity&&(this.finalValue=this.$popupParams.quantity),document.addEventListener("keyup",this.handleKeyPress)},destroyed:function(){document.removeEventListener("keypress",this.handleKeyPress)},methods:{__:i.__,handleKeyPress:function(t){13===t.keyCode&&this.inputValue({identifier:"next"})},closePopup:function(){this.$popupParams.reject(!1),this.$popup.close()},inputValue:function(t){if("next"===t.identifier){var e=this.$popupParams,s=(e.product,e.data,parseFloat(this.finalValue));if(0===s)return n.kX.error((0,i.__)("Please provide a quantity")).subscribe();this.resolve({quantity:s})}else"backspace"===t.identifier?this.allSelected?(this.finalValue=0,this.allSelected=!1):(this.finalValue=this.finalValue.toString(),this.finalValue=this.finalValue.substr(0,this.finalValue.length-1)||0):this.allSelected?(this.finalValue=t.value,this.finalValue=parseFloat(this.finalValue),this.allSelected=!1):(this.finalValue+=""+t.value,this.finalValue=parseFloat(this.finalValue))},resolve:function(t){this.$popupParams.resolve(t),this.$popup.close()}}};const u=(0,s(1900).Z)(o,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"ns-box shadow min-h-2/5-screen w-3/4-screen md:w-3/5-screen lg:w-3/5-screen xl:w-2/5-screen relative"},[s("div",{staticClass:"flex-shrink-0 flex p-2 border-b ns-box-header justify-between items-center"},[s("h1",{staticClass:"text-xl font-bold text-primary text-center"},[t._v(t._s(t.__("Define Quantity")))]),t._v(" "),s("div",[s("ns-close-button",{on:{click:function(e){return t.closePopup()}}})],1)]),t._v(" "),s("div",{staticClass:"h-16 border-b ns-box-body flex items-center justify-center",attrs:{id:"screen"}},[s("h1",{staticClass:"font-bold text-3xl"},[t._v(t._s(t.finalValue))])]),t._v(" "),s("div",{staticClass:"grid grid-flow-row grid-cols-3 grid-rows-3",attrs:{id:"numpad"}},t._l(t.keys,(function(e,n){return s("div",{key:n,staticClass:"text-xl font-bold border ns-numpad-key h-24 flex items-center justify-center cursor-pointer",on:{click:function(s){return t.inputValue(e)}}},[void 0!==e.value?s("span",[t._v(t._s(e.value))]):t._e(),t._v(" "),e.icon?s("i",{staticClass:"las",class:e.icon}):t._e()])})),0)])}),[],!1,null,null,null).exports},9089:(t,e,s)=>{s.r(e),s.d(e,{default:()=>i});const n={data:function(){return{title:"",message:"",input:""}},computed:{size:function(){return this.$popupParams.size||"h-full w-full"}},mounted:function(){var t=this;this.input=this.$popupParams.input||"",this.title=this.$popupParams.title,this.message=this.$popupParams.message,this.$popup.event.subscribe((function(e){"click-overlay"===e.event&&(t.$popupParams.reject(!1),t.$popup.close())}))},methods:{__:s(7389).__,emitAction:function(t){this.$popupParams.onAction(t?this.input:t),this.$popup.close()},reject:function(t){void 0!==this.$popupParams.reject&&this.$popupParams.reject(t),this.$popup.close()}}};const i=(0,s(1900).Z)(n,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"w-5/7-screen md:w-3/7-screen flex flex-col shadow-lg",class:t.size,attrs:{id:"prompt-popup"}},[s("div",{staticClass:"flex items-center justify-center flex-col flex-auto p-2"},[s("h2",{staticClass:"text-3xl font-body"},[t._v(t._s(t.title))]),t._v(" "),s("p",{staticClass:"w-full md:mx-auto md:w-2/3 py-4 text-center"},[t._v(t._s(t.message))])]),t._v(" "),s("div",{staticClass:"p-2"},[s("div",{staticClass:"ns-input"},[s("textarea",{directives:[{name:"model",rawName:"v-model",value:t.input,expression:"input"}],staticClass:"w-full border-2 p-2",attrs:{name:"",id:"",cols:"30",rows:"10"},domProps:{value:t.input},on:{input:function(e){e.target.composing||(t.input=e.target.value)}}})])]),t._v(" "),s("div",{staticClass:"flex border-t action-buttons"},[s("button",{staticClass:"flex-auto w-1/2 h-16 flex items-center justify-center uppercase",on:{click:function(e){return t.emitAction(!0)}}},[t._v(t._s(t.__("Ok")))]),t._v(" "),s("hr",{staticClass:"border-r"}),t._v(" "),s("button",{staticClass:"flex-auto w-1/2 h-16 flex items-center justify-center uppercase",on:{click:function(e){return t.reject(!1)}}},[t._v(t._s(t.__("Cancel")))])])])}),[],!1,null,null,null).exports}}]);