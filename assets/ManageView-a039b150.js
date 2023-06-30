import{o as l,c as u,a as s,n as h,i as d,F as k,g as F,d as D,t as b,j as C,_ as y,k as U,l as x,s as _,r as f,f as w,v as S,m as I,b as p,w as v,h as R}from"./index-2a1f2f96.js";const T={class:"bg-white rounded border border-gray-200 relative flex flex-col"},$=s("div",{class:"px-6 pt-6 pb-5 font-bold border-b border-gray-200"},[s("span",{class:"card-title"},"Upload"),s("i",{class:"fas fa-upload float-right text-green-400 text-2xl"})],-1),B={class:"p-6"},E=s("h5",null,"Drop your files here",-1),N=[E],q=s("hr",{class:"my-6"},null,-1),V={class:"flex h-4 overflow-hidden bg-gray-200 rounded"};function A(o,e,a,m,n,r){return l(),u("div",T,[$,s("div",B,[s("div",{class:h(["w-full px-10 py-20 rounded text-center cursor-pointer border border-dashed border-gray-400 text-gray-400 transition duration-500 hover:text-white hover:bg-green-400 hover:border-green-400 hover:border-solid",{"bg-green-400 border-green-400 border-solid":n.is_dragover}]),onDrag:e[0]||(e[0]=d(()=>{},["prevent","stop"])),onDragstart:e[1]||(e[1]=d(()=>{},["prevent","stop"])),onDragend:e[2]||(e[2]=d(t=>n.is_dragover=!0,["prevent","stop"])),onDragover:e[3]||(e[3]=d(t=>n.is_dragover=!0,["prevent","stop"])),onDragenter:e[4]||(e[4]=d(t=>n.is_dragover=!0,["prevent","stop"])),onDragleave:e[5]||(e[5]=d(t=>n.is_dragover=!1,["prevent","stop"])),onDrop:e[6]||(e[6]=d(t=>r.upload(t),["prevent","stop"]))},N,34),s("input",{type:"file",multiple:"",onChange:e[7]||(e[7]=t=>r.upload(t))},null,32),q,(l(!0),u(k,null,F(n.uploads,t=>(l(),u("div",{class:"mb-4",key:t.name},[s("div",{class:h(["font-bold text-sm",t.text_class])},[s("i",{class:h(t.icon)},null,2),D(b(t.name),1)],2),s("div",V,[s("div",{class:h(["transition-all progress-bar",t.variant]),style:C({width:t.current_progress+"%"})},null,6)])]))),128))])])}const L={name:"Upload-view",data(){return{is_dragover:!1,uploads:[]}},methods:{upload(o){this.is_dragover=!1,(o.dataTransfer?[...o.dataTransfer.files]:[...o.target.files]).forEach(a=>{if(a.type!=="audio/mpeg")return;navigator.onLine||this.uploads.push({task:{},current_progress:100,name:a.name,variant:"bg-red-400",icon:"fas fa-times",text_class:"text-red-400"});const r=U.ref().child(`songs/${a.name}`).put(a),t=this.uploads.push({task:r,current_progress:0,name:a.name,variant:"bg-blue-400",icon:"fas fa-spinner fa-spin",text_class:""})-1;r.on("state_changed",i=>{const c=i.bytesTransferred/i.totalBytes*100;this.uploads[t].current_progress=c},i=>{this.uploads[t].variant="bg-red-400",this.uploads[t].icon="fas fa-times",this.uploads[t].text_class="text-red-400",console.log(i)},async()=>{const i={uid:x.currentUser.uid,display_name:x.currentUser.displayName,original_name:r.snapshot.ref.name,modified_name:r.snapshot.ref.name,genre:"",comment_count:0};i.url=await r.snapshot.ref.getDownloadURL(),await _.add(i),this.uploads[t].variant="bg-green-400",this.uploads[t].icon="fas fa-check",this.uploads[t].text_class="text-green-400"})})},beforeUnmount(){this.uploads.forEach(o=>{o.task.cancel()})}}},G=y(L,[["render",A]]),M={class:"border border-gray-200 p-3 mb-4 rounded"},j={class:"inline-block text-2xl font-bold"},z=s("i",{class:"fa fa-times"},null,-1),P=[z],O=s("i",{class:"fa fa-pencil-alt"},null,-1),Y=[O],H={class:"mb-3"},J=s("label",{class:"inline-block mb-2"},"Song Title",-1),K={class:"mb-3"},Q=s("label",{class:"inline-block mb-2"},"Genre",-1),W=["disabled"],X=["disabled"];function Z(o,e,a,m,n,r){const t=f("errormessage"),i=f("vee-field"),c=f("vee-form");return l(),u("div",M,[w(s("div",null,[s("h4",j,b(a.song.modified_name),1),s("button",{class:"ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right",onClick:e[0]||(e[0]=d((...g)=>r.deleteSong&&r.deleteSong(...g),["prevent"]))},P),s("button",{class:"ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right",onClick:e[1]||(e[1]=d(g=>n.showForm=!n.showForm,["prevent"]))},Y)],512),[[S,!n.showForm]]),w(s("div",null,[n.show_alert?(l(),u("div",{key:0,class:h(["text-white text-center font-bold p-4 mb-4",n.alert_variant])},b(n.alert_message),3)):I("",!0),p(c,{onSubmit:r.edit,"validation-schema":n.schema,"initial-values":a.song},{default:v(()=>[s("div",H,[J,p(i,{class:"block w-full px-3 text-gray-800 border border-gray-300 transition duration-500 rounded py-1.5 focus:outline-none focus:border-black",name:"modified_name",type:"text",placeholder:"Enter Song Title",onInput:e[2]||(e[2]=g=>a.updateUnsavedFlag(!0))},{default:v(()=>[p(t,{class:"text-red-600",name:"modified_name"})]),_:1})]),s("div",K,[Q,p(i,{class:"block w-full px-3 text-gray-800 border border-gray-300 transition duration-500 rounded py-1.5 focus:outline-none focus:border-black",name:"genre",type:"text",placeholder:"Enter Genre",onInput:e[3]||(e[3]=g=>a.updateUnsavedFlag(!0))},{default:v(()=>[p(t,{class:"text-red-600",name:"genre"})]),_:1})]),s("button",{class:"px-3 rounded text-white bg-green-600 py-1.5",type:"submit",disabled:n.in_submission},"Submit",8,W),s("button",{class:"px-3 rounded text-white bg-gray-600 py-1.5",type:"button",disabled:n.in_submission,onClick:e[4]||(e[4]=d(g=>n.showForm=!1,["prevent"]))},"Go Back",8,X)]),_:1},8,["onSubmit","validation-schema","initial-values"])],512),[[S,n.showForm]])])}const ee={name:"CompositionItem",props:{song:{type:Object,required:!0},updateSong:{type:Function,required:!0},index:{type:Number,required:!0},removeSong:{type:Function,required:!0},updateUnsavedFlag:{type:Function}},data(){return{showForm:!1,schema:{modified_name:"required",genre:"alpha_spaces"},in_submission:!1,show_alert:!1,alert_variant:"bg-blue-500",alert_message:"Please wait! Updating song info"}},methods:{async edit(o){this.in_submission=!0,this.show_alert=!0,this.alert_variant="bg-blue-500",this.alert_message="Please wait! Updating song info";try{await _.doc(this.song.docID).update(o)}catch{this.in_submission=!1,this.alert_variant="bg-red-500",this.alert_message="Something went wrong! Try again later";return}this.updateSong(this.index,o),this.updateUnsavedFlag(!1),this.in_submission=!1,this.alert_variant="bg-green-500",this.alert_message="Success!"},async deleteSong(){await U.ref().child(`songs/${this.song.original_name}`).delete(),await _.doc(this.song.docID).delete(),this.removeSong(this.index)}}},se=y(ee,[["render",Z]]),te={class:"container mx-auto mt-6"},oe={class:"md:grid md:grid-cols-3 md:gap-4"},ne={class:"col-span-1"},re={class:"col-span-2"},ae={class:"bg-white rounded border border-gray-200 relative flex flex-col"},ie=s("div",{class:"px-6 pt-6 pb-5 font-bold border-b border-gray-200"},[s("span",{class:"card-title"},"My Songs"),s("i",{class:"fa fa-compact-disc float-right text-green-400 text-2xl"})],-1),de={class:"p-6"};function le(o,e,a,m,n,r){const t=f("AppUpload"),i=f("CompositionItem");return l(),u("section",te,[s("div",oe,[s("div",ne,[p(t,{ref:"upload",addSong:r.addSong},null,8,["addSong"])]),s("div",re,[s("div",ae,[ie,s("div",de,[(l(!0),u(k,null,F(n.songs,(c,g)=>(l(),R(i,{key:c.docID,song:c,updateSong:r.updateSong,index:g,removeSong:r.removeSong,updateUnsavedFlag:r.updateUnsavedFlag},null,8,["song","updateSong","index","removeSong","updateUnsavedFlag"]))),128))])])])])])}const ge={name:"manage-view",components:{AppUpload:G,CompositionItem:se},data(){return{songs:[],unsavedFlag:!1}},async created(){(await _.where("uid","==",x.currentUser.uid).get()).forEach(this.addSong)},methods:{updateSong(o,e){this.songs[o].modified_name=e.modified_name,this.songs[o].genre=e.genre},removeSong(o){this.songs.splice(o,1)},addSong(o){const e={...o.data(),docID:o.id};this.songs.push(e)},updateUnsavedFlag(o){this.unsavedFlag=o}},beforeRouteLeave(o,e,a){if(!this.unsavedFlag)a();else{const m=confirm("You have unsaved changes. Are you sure you want to leave?");a(m)}}},ce=y(ge,[["render",le]]);export{ce as default};