App.Collections.Notes = Backbone.Collection.extend({
  model: App.Models.Note,

  url: function(){
    var url =  App.url + "/classrooms/" + App.loggedInTeacher.classroom_id + "/notes";

    if(App.notesLastTakenAt){
      url = url + "?taken_at="+App.notesLastTakenAt;
    }
    return url;
  },

  storeName: "App.notes",

  comparator: "taken_at",

  local: function(){
    return App.Config.storageLocalState;
  },

  parse: function(resp, xhr) {
    if(this.local()){
      App.resp.notes = [];
      return resp;
    }else{
      App.resp.notes = resp.notes;
      return resp.notes;
    }
  }
});
