(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{10:function(e,t,a){"use strict";a.r(t);var n=a(1),l=a(2),r=a(4),s=a(3),u=a(5),c=a(0),i=a.n(c),h=a(8),o=a.n(h),m=(a(15),function(e){function t(){return Object(n.a)(this,t),Object(r.a)(this,Object(s.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return i.a.createElement("div",{className:"app"},i.a.createElement("div",{className:"header"},i.a.createElement("h1",null,"WaterJug Puzzle App"),i.a.createElement("p",null,"Enter sizes for Jugs M and N, and a Goal value then click `Find Path`!")),i.a.createElement(p,null))}}]),t}(i.a.Component)),p=function(e){function t(){return Object(n.a)(this,t),Object(r.a)(this,Object(s.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return i.a.createElement("div",{className:"board"},i.a.createElement(b,null))}}]),t}(i.a.Component);function g(e){var t=e.bigSize?"big":"little",a="jug ".concat(t),n={height:(e.jugSize>0?Math.ceil(e.fill/e.jugSize*100):0)+"%",transition:"height 250ms ease"};return i.a.createElement("div",{className:a},i.a.createElement("div",{className:"waterContainer"},i.a.createElement("div",{className:"water",style:n}),i.a.createElement("div",{className:"waterAmount"},e.fill)))}function d(e){return!0===e.warning?i.a.createElement("div",{className:"warning"},i.a.createElement("span",null,"No Path to Goal.")):null}function f(e){return i.a.createElement("div",{className:"step"},i.a.createElement("span",null,e.stepText),i.a.createElement("br",null),i.a.createElement("span",{className:"stepValue"},"[ ",e.step[0],", ",e.step[1]," ]"))}function v(e){return i.a.createElement("div",{className:"stepArrow"},i.a.createElement("span",null,"\u27be"))}function E(e){if(e.path.length>0){var t=0;return i.a.createElement("div",{className:"path"},i.a.createElement("h3",null,"PATH"),e.path.map(function(e,a){return t="stepArrow".concat(a),i.a.createElement(f,{stepText:e.text,step:e.step,key:a})}).reduce(function(e,a){return[e,i.a.createElement(v,{key:t}),a]}))}return null}var j=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(r.a)(this,Object(s.a)(t).call(this,e))).state={playing:!1,currentStep:null},a}return Object(u.a)(t,e),Object(l.a)(t,[{key:"handleClick",value:function(){var e=this;this.setState({playing:!0}),this.props.handleClick(function(t){return e.setState({currentStep:t})}).then(function(){return e.setState({playing:!1,currentStep:null})})}},{key:"handleUpdate",value:function(){this.setState({hasPath:!0})}},{key:"render",value:function(){var e=this,t=this.props.hasPath?{}:{display:"none"};return i.a.createElement("button",{disabled:this.state.playing,style:t,onClick:function(){return e.handleClick()}},"Play ",this.state.currentStep)}}]),t}(i.a.Component),b=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(r.a)(this,Object(s.a)(t).call(this,e))).state={jugM:0,jugN:0,goal:0,path:[],warning:!1,currentStep:0},a}return Object(u.a)(t,e),Object(l.a)(t,[{key:"handleClick",value:function(){var e=this;return fetch("http://192.168.99.100:5000/find-path/"+this.state.jugM+"/"+this.state.jugN+"/"+this.state.goal+"/",{crossDomain:!0}).then(function(e){return e.json()}).then(function(t){"success"===t.status?e.setState({warning:!1,path:t.payload.path}):e.setState({warning:!0,path:[]})})}},{key:"handleJugMChange",value:function(e){this.setState({jugM:e.target.value})}},{key:"handleJugNChange",value:function(e){this.setState({jugN:e.target.value})}},{key:"handleGoalChange",value:function(e){this.setState({goal:e.target.value})}},{key:"handlePlayBtnClick",value:function(e){var t=this;return new Promise(function(a,n){var l=t.state.path.length-1,r=null;r=setInterval(function(){l>0?(t.setState({currentStep:t.state.currentStep+1}),e(t.state.currentStep),l--):(clearInterval(r),t.setState({currentStep:0}),e(0),a())},1e3)})}},{key:"render",value:function(){var e=this,t=this.state.jugM>=this.state.jugN,a=this.state.jugN>=this.state.jugM,n=this.state.path[this.state.currentStep]?this.state.path[this.state.currentStep]:{step:[0,0],text:"Start"},l=n.step[0],r=n.step[1];return i.a.createElement("div",{className:"form"},i.a.createElement("div",{className:"jugs"},i.a.createElement("div",{className:"jugsCenter"},i.a.createElement(g,{jugSize:this.state.jugM,bigSize:t,fill:l}),i.a.createElement(g,{jugSize:this.state.jugN,bigSize:a,fill:r})),i.a.createElement("div",{className:"jugText"},i.a.createElement("span",null,this.state.path.length>0?n.text:null))),i.a.createElement("form",null,i.a.createElement("div",{className:"formGroup"},i.a.createElement("label",{name:"jugM"},"Jug M"),i.a.createElement("div",null,i.a.createElement("input",{type:"text",id:"jugM",name:"jugM",size:"5",value:this.state.jugM,onChange:function(t){return e.handleJugMChange(t)}}))),i.a.createElement("div",{className:"formGroup"},i.a.createElement("label",{name:"jugN"},"Jug N"),i.a.createElement("div",null,i.a.createElement("input",{type:"text",id:"jugN",name:"jugN",size:"5",value:this.state.jugN,onChange:function(t){return e.handleJugNChange(t)}}))),i.a.createElement("div",{className:"formGroup"},i.a.createElement("label",{name:"goal"},"Goal"),i.a.createElement("div",null,i.a.createElement("input",{type:"text",id:"goal",name:"goal",size:"5",value:this.state.goal,onChange:function(t){return e.handleGoalChange(t)}}))),i.a.createElement("div",{className:"formGroup"},i.a.createElement("button",{type:"button",className:"querybutton",onClick:function(){return e.handleClick()}},"Find Path"))),i.a.createElement("br",{clear:"both"}),i.a.createElement(d,{warning:this.state.warning}),i.a.createElement(j,{hasPath:this.state.path.length>0,handleClick:function(t){return e.handlePlayBtnClick(t)},currentStep:this.state.currentStep}),i.a.createElement(E,{path:this.state.path}))}}]),t}(i.a.Component);o.a.render(i.a.createElement(m,null),document.getElementById("root"))},15:function(e,t,a){},9:function(e,t,a){e.exports=a(10)}},[[9,2,1]]]);
//# sourceMappingURL=main.d7286679.chunk.js.map