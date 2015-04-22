App.Views.MenuActivity=Backbone.View.extend({template:App.templates.menuActivity,config:{buttonMap:{Letters:["letters","words"],SightWords:["words","phrases"],OnsetRime:["words","phrases","tiles"],Affixes:[],Stories:[]}},buttons:{},initialize:function(){_.bindAll(this),this.render(),this.buttons.letters=new App.Views.ButtonLetters({el:".js-buttonLetters"}),this.buttons.words=new App.Views.ButtonWords({el:".js-buttonWords"}),this.buttons.phrases=new App.Views.ButtonPhrases({el:".js-buttonPhrases"}),this.buttons.tiles=new App.Views.ButtonTiles({el:".js-buttonTiles"}),this.listen()},listen:function(){this.listenTo(App.Dispatcher,"matrixMenuTabActiveRequest",this.handleSkillChangeRequest)},render:function(){this.$el.html(this.template())},handleSkillChangeRequest:function(t){var e=this;_.each(this.buttons,function(t){t.$el.hide()}),_.each(this.config.buttonMap[t.key],function(t){e.buttons[t].$el.show()})}});