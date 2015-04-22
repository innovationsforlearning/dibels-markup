App.Views.MatrixMenu=Backbone.View.extend({template:App.templates.matrixMenu,gridClass:"js-matrixMenuTabs",tabs:[{label:"LETTER NAMES & SOUNDS",key:App.Config.skill.letters},{label:"SIGHT WORDS",key:App.Config.skill.sightWords},{label:"ONSETS & RIMES",key:App.Config.skill.onsetRimes},{label:"AFFIXES",key:App.Config.skill.affixes},{label:"STORIES",key:App.Config.skill.stories}],initialize:function(){_.bindAll(this),this.render(),this.listen()},listen:function(){this.listenTo(App.Dispatcher,"matrixMenuTabActiveRequest",this.handleMatrixMenuTabActveRequest)},render:function(){this.$el.html(this.template(this.templateJSON())),this.$gridClass=$("."+this.gridClass);var e=this;_.each(this.tabs,function(i){var t={label:i.label,key:i.key},s=e[i.key]=new App.Views.MatrixMenuTab(t);e.$gridClass.append(s.render().el)}),this.closeTab=new App.Views.ButtonMatrixClose,this.$gridClass.append(this.closeTab.render().el)},templateJSON:function(){return{jsClass:this.gridClass}},handleMatrixMenuTabActveRequest:function(e){var i=this;_.each(this.tabs,function(t){e.label===t.label?(e.makeActive(),App.Dispatcher.trigger("SkillChangeRequested:"+t.key)):i[t.key].makeInactive()})}});