import{y as k,u as B,B as D,r as I,b as o,o as M,c as N,d as e,g as s,f as n,F as U,h as u,t as a}from"./index-DGSYi3EO.js";import{d as q}from"./api-D7mIgXGH.js";const C=e("header",null,[e("nav")],-1),V={style:{display:"flex","justify-content":"flex-end"}},F={class:"product-item"},P={class:"product-images"},R=["src"],j={class:"product-introduction"},z={class:"product-title"},E={class:"product-price"},S={class:"product-condition"},T={class:"seller-information"},A={class:"seller-name"},G={class:"seller-phone"},H={class:"seller-qq"},J={class:"product-description"},K=e("div",{class:"des-title"},"商品描述",-1),L={class:"des-content"},O=e("section",{class:"user-reviews"},null,-1),Z={__name:"Detail",setup(Q){const m=k(),p=B(),i=m.params.id;D(()=>{h()});const t=I({name:"",description:"",createDate:"",sellerName:"",imageUrls:"",price:""}),h=async()=>{const c=await q(i);console.log(c.data),t.value=c.data},f=()=>{p.push({name:"trade",query:{id:i}})};return(c,W)=>{const v=o("el-button"),g=o("el-carousel-item"),y=o("el-carousel"),d=o("el-divider"),b=o("User"),l=o("el-icon"),w=o("Phone"),x=o("Message"),_=o("el-card");return M(),N(U,null,[C,e("main",null,[s(_,{class:"detail-item"},{default:n(()=>[e("div",V,[s(v,{type:"primary",size:"large",class:"btn-back",onClick:f},{default:n(()=>[u("返回")]),_:1})]),e("div",F,[e("div",P,[s(y,{"indicator-position":"none",style:{width:"100%",height:"40rem"}},{default:n(()=>[s(g,{style:{width:"100%",height:"40rem"}},{default:n(()=>{var r;return[e("img",{src:(r=t.value.imageUrls)==null?void 0:r[0],width:"100%",class:"head-img"},null,8,R)]}),_:1})]),_:1})]),e("div",j,[e("div",z,a(t.value.name),1),e("span",E,"￥"+a(t.value.price),1),e("span",S,"发布时间:"+a(t.value.createDate),1),e("div",T,[s(d,{"content-position":"left"},{default:n(()=>[u("卖家信息")]),_:1}),e("div",A,[s(l,{class:"info-icon"},{default:n(()=>[s(b)]),_:1}),e("span",null,"商家名称:"+a(t.value.sellerName),1)]),e("div",G,[s(l,{class:"info-icon"},{default:n(()=>[s(w)]),_:1}),e("span",null,"联系电话:"+a(t.value.mobile),1)]),e("div",H,[s(l,{class:"info-icon"},{default:n(()=>[s(x)]),_:1}),e("span",null,"邮箱地址:"+a(t.value.email),1)])])])])]),_:1}),e("section",J,[s(_,{class:"des"},{default:n(()=>[K,s(d,{"border-style":"dashed"}),e("div",L," 描述:"+a(t.value.description),1)]),_:1})]),O])],64)}}};export{Z as default};
