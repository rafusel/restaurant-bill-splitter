(this["webpackJsonprestaurant-bill-splitter"]=this["webpackJsonprestaurant-bill-splitter"]||[]).push([[0],{101:function(e,t,r){},215:function(e,t,r){"use strict";r.r(t);var a=r(8),s=r(0),i=r.n(s),l=r(23),n=r.n(l),c=r(59),d=r(60),o=r(67),p=r(65),h=(r(101),r(94)),j=r(219),u=r(220),m=r(40),O=r(223),x=r(225),b=r(224);function v(e){var t=["#ff8519","#07d907","#c904db","#fa0c34","#0cfae2","#ff1979"],r=Object(s.useState)(t[Math.floor(Math.random()*t.length)]),i={backgroundColor:Object(h.a)(r,1)[0],borderRadius:"10px",color:"white",fontSize:"25px",padding:"5px 15px 5px 15px",margin:"0 10px 10px 0",display:"inline-flex",alignItems:"center"};return Object(a.jsxs)("span",{style:i,children:[Object(a.jsx)(O.a,{}),"  ".concat(e.name),Object(a.jsx)(m.a,{type:"primary",onClick:e.handleDelete,style:{marginLeft:"10px"},children:Object(a.jsx)(b.a,{})})]})}var f=j.a.Title;function g(e){var t=e.orderers.map((function(t,r){return Object(a.jsx)(i.a.Fragment,{children:Object(a.jsx)(v,{name:t.toString(),handleDelete:function(){e.deleteOrderer(r)}})})})),r=Object(s.useState)(""),l=Object(h.a)(r,2),n=l[0],c=l[1],d=function(){c(""),e.addOrderer(n)};return Object(a.jsxs)("div",{style:{marginTop:"60px"},children:[Object(a.jsx)(f,{children:"Orderer Details"}),Object(a.jsx)(f,{level:2,children:"Add Orderer"}),Object(a.jsx)(u.a,{size:"large",placeholder:"Orderer name",prefix:Object(a.jsx)(O.a,{}),value:n,onChange:function(e){c(e.target.value)},onKeyPress:function(e){return"Enter"===e.key&&d()},suffix:Object(a.jsx)(m.a,{type:"primary",onClick:d,children:Object(a.jsx)(x.a,{})}),style:{marginBottom:"10px"}}),t]})}var y=r(47),I=r(77),M=r(221),F=r(222),S=r(218),k=r(226),C=r(227),T=j.a.Title,N=I.a.Option,U=function(e){Object(o.a)(r,e);var t=Object(p.a)(r);function r(e){var a;return Object(c.a)(this,r),(a=t.call(this,e)).state={name:"",cost:"",orderer:"changeme"},a.handleMealCostUpdate=a.handleMealCostUpdate.bind(Object(y.a)(a)),a.handleMealNameUpdate=a.handleMealNameUpdate.bind(Object(y.a)(a)),a.handleMealOrdererUpdate=a.handleMealOrdererUpdate.bind(Object(y.a)(a)),a.addMealItem=a.addMealItem.bind(Object(y.a)(a)),a.deleteMealItem=a.deleteMealItem.bind(Object(y.a)(a)),a}return Object(d.a)(r,[{key:"getColumns",value:function(){var e=this;return[{title:"Item",dataIndex:"name",key:"name"},{title:"Price",dataIndex:"cost",key:"cost"},{title:"Orderer",dataIndex:"orderer",key:"orderer"},{title:"Delete",dataIndex:"deleteFunction",render:function(t,r){return Object(a.jsx)(m.a,{type:"primary",onClick:function(){e.deleteMealItem(r.index)},children:Object(a.jsx)(b.a,{})})}}]}},{key:"handleMealNameUpdate",value:function(e){this.setState({name:e.target.value})}},{key:"handleMealCostUpdate",value:function(e){this.setState({cost:e.target.value})}},{key:"handleMealOrdererUpdate",value:function(e){this.setState({orderer:e})}},{key:"addMealItem",value:function(){"changeme"!==this.state.orderer?(this.setState({name:"",orderer:"changeme",cost:""}),this.props.addMealItem(this.state)):alert("Change the orderer for this meal item.")}},{key:"deleteMealItem",value:function(e){this.props.deleteMealItem(e)}},{key:"render",value:function(){var e=this;return Object(a.jsxs)("div",{style:{marginTop:"30px"},children:[Object(a.jsx)(T,{children:"Meal Details"}),Object(a.jsx)(T,{level:2,children:"Add Meal Items"}),Object(a.jsxs)(M.a,{style:{marginBottom:"20px"},children:[Object(a.jsx)(F.a,{flex:"auto",className:"pr-5",children:Object(a.jsx)(u.a,{value:this.state.name,onChange:this.handleMealNameUpdate,prefix:Object(a.jsx)(k.a,{}),size:"large",placeholder:"Meal item name"})}),Object(a.jsx)(F.a,{flex:"auto",className:"pr-5",children:Object(a.jsx)(u.a,{value:this.state.cost,onChange:this.handleMealCostUpdate,prefix:Object(a.jsx)(C.a,{}),size:"large",placeholder:"Meal item price"})}),Object(a.jsx)(F.a,{flex:"auto",className:"pr-5",children:Object(a.jsxs)(I.a,{style:{width:"100%"},size:"large",value:this.state.orderer,onChange:this.handleMealOrdererUpdate,children:[Object(a.jsx)(N,{value:"changeme",children:"Orderer"}),this.props.orderers.map((function(e,t){return Object(a.jsx)(N,{value:e,children:e})}))]})}),Object(a.jsx)(F.a,{flex:"10px",children:Object(a.jsx)(m.a,{type:"primary",size:"large",onClick:this.addMealItem,children:"Add Meal Item"})})]}),!!this.props.receipt.mealItems.length&&Object(a.jsx)(S.a,{dataSource:this.props.receipt.mealItems.map((function(e,t){return e.index=t,e})),columns:this.getColumns()},this.props.receipt.mealItems),Object(a.jsx)(T,{level:2,children:"Total"}),Object(a.jsx)(u.a,{value:this.props.receipt.total.toString(),onChange:function(t){e.props.updateTotal(t.target.value)},size:"large",prefix:Object(a.jsx)(C.a,{}),className:"mb-15 max-w-300"}),Object(a.jsx)(T,{level:2,children:"Delivery Fee"}),Object(a.jsx)(u.a,{value:this.props.receipt.deliveryFee.toString(),onChange:function(t){e.props.updateDeliveryFee(t.target.value)},size:"large",prefix:Object(a.jsx)(C.a,{}),className:"mb-15 max-w-300"}),Object(a.jsx)(T,{level:2,children:"Service Fee"}),Object(a.jsx)(u.a,{value:this.props.receipt.serviceFee.toString(),onChange:function(t){e.props.updateServiceFee(t.target.value)},size:"large",prefix:Object(a.jsx)(C.a,{}),className:"mb-15 max-w-300"})]})}}]),r}(i.a.Component),w=r(228),z=j.a.Title,D=[{title:"Orderer",dataIndex:"orderer",key:"orderer"},{title:"Share of Total",dataIndex:"shareOfTotal",key:"shareOfTotal"}],B=function(e){Object(o.a)(r,e);var t=Object(p.a)(r);function r(){return Object(c.a)(this,r),t.apply(this,arguments)}return Object(d.a)(r,[{key:"getMealItemTotalByOrderer",value:function(e){return this.props.receipt.mealItems.reduce((function(t,r){return r.orderer===e?t+parseFloat(r.cost):t}),0)}},{key:"getSubtotal",value:function(){return this.props.receipt.mealItems.reduce((function(e,t){return e+parseFloat(t.cost)}),0)}},{key:"getShareTotals",value:function(){var e=this,t=(parseFloat(this.props.receipt.deliveryFee)+parseFloat(this.props.receipt.serviceFee))/this.props.orderers.length,r=parseFloat(this.props.receipt.total)-(parseFloat(this.props.receipt.deliveryFee)+parseFloat(this.props.receipt.serviceFee)),a=[];return this.props.orderers.forEach((function(s){var i=e.getMealItemTotalByOrderer(s)/e.getSubtotal(),l={orderer:s,shareOfTotal:"$".concat((t+i*r).toFixed(2))};a.push(l)})),a}},{key:"render",value:function(){var e=parseFloat(this.props.receipt.total),t=parseFloat(this.props.receipt.serviceFee),r=parseFloat(this.props.receipt.deliveryFee),s=e&&t&&r,i=this.props.orderers.length,l=this.props.receipt.mealItems.every((function(e){return parseFloat(e.cost)}));return s&&i&&l?Object(a.jsxs)("div",{style:{paddingBottom:"30px"},children:[Object(a.jsx)(z,{children:"Your splits"}),Object(a.jsx)(S.a,{columns:D,dataSource:this.getShareTotals()})]}):Object(a.jsxs)("div",{children:[Object(a.jsx)(z,{children:"No splits to show"}),Object(a.jsx)("div",{style:{display:"flex",alignItems:"center",width:"100%"},children:Object(a.jsx)("span",{style:{margin:"auto",fontSize:"100px"},children:Object(a.jsx)(w.a,{})})})]})}}]),r}(i.a.Component),E=r(217),A=r(229),J=function(e){Object(o.a)(r,e);var t=Object(p.a)(r);function r(e){var a;return Object(c.a)(this,r),(a=t.call(this,e)).addOrderer=function(e){var t=a.state.orderers;t.push(e),a.setState({orderers:t})},a.deleteOrderer=function(e){var t=a.state.orderers,r=t[e];t.splice(e,1),a.setState({orderers:t});var s=a.state.receipt.mealItems,i=[];s.forEach((function(e,t){e.orderer===r&&i.push(t)})),i.reverse().forEach((function(e){s.splice(e,1)}));var l=a.state.receipt;l.mealItems=s,a.setState({receipt:l})},a.updateTotal=function(e){var t=a.state.receipt;t.total=e,a.setState({receipt:t})},a.updateDeliveryFee=function(e){var t=a.state.receipt;t.deliveryFee=e,a.setState({receipt:t})},a.updateServiceFee=function(e){var t=a.state.receipt;t.serviceFee=e,a.setState({receipt:t})},a.addMealItem=function(e){var t=a.state.receipt.mealItems;t.push(e);var r=a.state.receipt;r.mealItems=t,a.setState({receipt:r})},a.deleteMealItem=function(e){var t=a.state.receipt.mealItems;t.splice(e,1);var r=a.state.receipt;r.mealItems=t,a.setState({receipt:r})},a.state={receipt:{mealItems:[],deliveryFee:"",serviceFee:"",total:""},orderers:[]},a}return Object(d.a)(r,[{key:"render",value:function(){return Object(a.jsxs)(E.a,{children:[Object(a.jsxs)(E.a.Header,{className:"white fs-30",children:[Object(a.jsx)(A.a,{spin:!0}),"   ","Fair Share"]}),Object(a.jsx)(E.a,{children:Object(a.jsxs)(E.a.Content,{className:"main-content",children:[Object(a.jsx)(g,{orderers:this.state.orderers,addOrderer:this.addOrderer,deleteOrderer:this.deleteOrderer}),Object(a.jsx)(U,{updateServiceFee:this.updateServiceFee,updateDeliveryFee:this.updateDeliveryFee,updateTotal:this.updateTotal,addMealItem:this.addMealItem,deleteMealItem:this.deleteMealItem,orderers:this.state.orderers,receipt:this.state.receipt}),Object(a.jsx)(B,{receipt:this.state.receipt,orderers:this.state.orderers})]})})]})}}]),r}(i.a.Component);n.a.render(Object(a.jsx)(i.a.StrictMode,{children:Object(a.jsx)(J,{})}),document.getElementById("root"))}},[[215,1,2]]]);
//# sourceMappingURL=main.d1f6db96.chunk.js.map