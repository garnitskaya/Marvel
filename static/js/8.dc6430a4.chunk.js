(this.webpackJsonpmarvel=this.webpackJsonpmarvel||[]).push([[8],{222:function(e,t,c){"use strict";c.r(t);var s=c(35),n=c(2),r=c(0),a=c(44),i=c(102),l=c(61),o=c(1);t.default=function(e){var t=e.Component,c=e.dataType,j=Object(n.g)().id,u=Object(r.useState)(null),b=Object(s.a)(u,2),d=b[0],O=b[1],h=Object(a.a)(),m=h.getComic,f=h.clearError,p=h.getCharacter,x=h.process,_=h.setProcess;Object(r.useEffect)((function(){v()}),[j]);var v=function(){switch(f(),c){case"comic":return m(j).then(k).then((function(){return _("confirmed")}));case"character":return p(j).then(k).then((function(){return _("confirmed")}))}},k=function(e){O(e)};return Object(o.jsxs)(o.Fragment,{children:[Object(o.jsx)(i.a,{}),Object(l.a)(x,t,d)]})}},61:function(e,t,c){"use strict";c(64);var s=c(1),n=function(){return Object(s.jsxs)(s.Fragment,{children:[Object(s.jsx)("p",{className:"char__select",children:"Please select a character to see information"}),Object(s.jsxs)("div",{className:"skeleton",children:[Object(s.jsxs)("div",{className:"pulse skeleton__header",children:[Object(s.jsx)("div",{className:"pulse skeleton__circle"}),Object(s.jsx)("div",{className:"pulse skeleton__mini"})]}),Object(s.jsx)("div",{className:"pulse skeleton__block"}),Object(s.jsx)("div",{className:"pulse skeleton__block"}),Object(s.jsx)("div",{className:"pulse skeleton__block"})]})]})},r=c(14),a=c(38);t.a=function(e,t,c){switch(e){case"waiting":return Object(s.jsx)(n,{});case"loading":return Object(s.jsx)(r.a,{});case"confirmed":return Object(s.jsx)(t,{data:c});case"error":return Object(s.jsx)(a.a,{});default:throw new Error("Unexpected process state")}}},64:function(e,t,c){}}]);
//# sourceMappingURL=8.dc6430a4.chunk.js.map