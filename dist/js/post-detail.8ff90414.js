(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["post-detail"],{2777:function(t,e,a){},c1d4:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"profile"},[s("div",{staticClass:"container"},[s("div",{staticClass:"row",staticStyle:{"justify-content":"center"}},[t.image?s("img",{attrs:{id:"profile-img",src:t.image}}):t._e()]),s("div",{staticClass:"row"},[s("div",{staticClass:"col-md"},[s("div",{staticClass:"shadow-lg p-3 mb-5 bg-body rounded",attrs:{id:"box"}},[t._m(0),s("div",{attrs:{id:"separator"}}),s("div",{staticClass:"inline-row"},[t._m(1),s("p",{staticClass:"info",staticStyle:{width:"100px"}},[t._v("Name:")]),s("p",{staticClass:"info"},[t._v(t._s(t.user.name))]),s("i",{staticClass:"far fa-question-circle",attrs:{cont:t.user.adr}})]),s("div",{attrs:{id:"separator"}}),s("div",{staticClass:"inline-row"},[t._m(2),s("p",{staticClass:"info",staticStyle:{width:"100px"}},[t._v("Address:")]),s("p",{staticClass:"info"},[t._v(t._s(t.user.location))])]),s("div",{attrs:{id:"separator"}}),s("div",{staticClass:"inline-row"},[s("i",{staticClass:"fas fa-envelope",attrs:{id:"icon"}}),s("p",{staticClass:"info",staticStyle:{width:"100px"}},[t._v("Email:")]),s("p",{staticClass:"info"},[t._v(t._s(t.user.email))])]),s("div",{attrs:{id:"separator"}}),s("div",{staticClass:"inline-row"},[s("i",{staticClass:"fas fa-heart",attrs:{id:"icon"}}),s("p",{staticClass:"info",staticStyle:{width:"100px"}},[t._v("Category:")]),s("p",{staticClass:"info"},[t._v(t._s(t.user.category))])])]),s("div",{staticClass:"shadow-lg p-3 mb-5 bg-body rounded",attrs:{id:"box"}},[t._m(3),s("div",{attrs:{id:"separator"}}),s("div",{staticClass:"yt-container"},[s("iframe",{staticClass:"ytvideo",attrs:{src:t.embededYtLink,allow:"accelerometer; autoplay; \n              clipboard-write; encrypted-media; \n              gyroscope; picture-in-picture",allowfullscreen:""}})])])]),1==t.getRole?s("div",{staticClass:"col-md"},[s("div",{staticClass:"shadow-lg p-3 mb-5 bg-body rounded",attrs:{id:"box"}},[t._m(4),s("div",{attrs:{id:"separator"}}),s("div",{staticClass:"inline-row"},[s("i",{staticClass:"fas fa-coins",attrs:{id:"icon"}}),s("p",{staticClass:"info",staticStyle:{width:"100px"}},[t._v("Ether:")]),s("p",{staticClass:"info"},[t._v(t._s(t.getCurrentUser.monthAmount))]),s("img",{attrs:{id:"eth-img",src:a("c877")}})]),s("div",{attrs:{id:"separator"}}),s("div",{staticClass:"inline-row"},[s("p",{staticClass:"info"},[t._v("Fundraised: "+t._s(t.user.recievedAmount)+" ETH")]),s("img",{attrs:{id:"eth-img",src:a("c877")}})]),s("div",{staticClass:"progress"},[s("div",{staticClass:"progress-bar progress-bar-striped bg-success",style:{width:t.calculate_percentage+"%"},attrs:{role:"progressbar","aria-valuenow":t.calculate_percentage,"aria-valuemin":"0","aria-valuemax":"100"}})])])]):t._e()])])])},i=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"general-header"},[a("p",{staticClass:"header-title"},[t._v("General information")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"icon"}},[a("i",{staticClass:"fas fa-user"})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"icon"}},[a("i",{staticClass:"fas fa-map-marker-alt"})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"general-header"},[a("p",{staticClass:"header-title"},[t._v("Promotional video")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"general-header"},[a("p",{staticClass:"header-title"},[t._v("Funding information")])])}],r=a("1da1"),n=a("5530"),c=(a("96cf"),a("caad"),a("2532"),a("c975"),a("d3b7"),a("07a4"),a("7ab1"),a("2f62")),o=(a("f9ea"),a("324b"),{name:"Profile",data:function(){return{user:{},target_amount:"",edit_mode:!1,image:""}},components:{},computed:Object(n["a"])(Object(n["a"])(Object(n["a"])(Object(n["a"])({},Object(c["mapGetters"])(["getRole","getCurrentUser"])),Object(c["mapGetters"])("drizzle",["drizzleInstance","isDrizzleInitialized"])),Object(c["mapGetters"])("contracts",["getContractData"])),{},{utils:function(){return this.drizzleInstance.web3.utils},calculate_percentage:function(){return this.user.recievedAmount/1e18/this.user.monthAmount*100},embededYtLink:function(){var t=this.user.ytLink;if(t){if(t.includes("/embed/"))return t;var e=t.substring(t.indexOf("v=")+2,t.indexOf("v=")+13),a="https://www.youtube.com/embed/".concat(e);return a}}}),methods:{load_user:function(t){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function a(){var s;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,e.drizzleInstance.contracts.RebelsFund.methods.getOneCharity(t).call();case 2:s=a.sent,e.user=s;case 4:case"end":return a.stop()}}),a)})))()},load_image:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(""!=t.user.image&&void 0!=t.user.image){e.next=3;break}return t.image="@/assets/RebelsFundLightLogo.png",e.abrupt("return");case 3:return e.next=5,fetch("http://127.0.0.1:8080/ipfs/".concat(t.user.image,"/"));case 5:return a=e.sent,e.next=8,a.text();case 8:t.image=e.sent,t.loaded=!0;case 10:case"end":return e.stop()}}),e)})))()}},mounted:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.load_user(t.$route.params.id);case 2:return e.next=4,t.load_image();case 4:case"end":return e.stop()}}),e)})))()}}),l=o,d=(a("e603"),a("2877")),u=Object(d["a"])(l,s,i,!1,null,null,null);e["default"]=u.exports},e603:function(t,e,a){"use strict";a("2777")}}]);
//# sourceMappingURL=post-detail.8ff90414.js.map