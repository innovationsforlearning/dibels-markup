App.Views.MatrixMenuTab=Backbone.View.extend({template:App.templates.tab,tagName:"a",className:"menu--tab grid-cell",events:{click:"handleClick"},initialize:function(t){_.bindAll(this),this.label=t.label,this.key=t.key,this.status=""},render:function(){return this.$el.html(this.template(this.templateJSON())),this},templateJSON:function(){return{label:this.label,status:this.status}},makeActive:function(){this.status="st-active",this.render(),App.selectedSkill=this.key},makeInactive:function(){this.status="",this.render()},handleClick:function(){App.Dispatcher.trigger("matrixMenuTabActiveRequest",this)}});