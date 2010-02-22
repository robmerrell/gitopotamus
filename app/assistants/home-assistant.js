function HomeAssistant() {
	/* this is the creator function for your scene assistant object. It will be passed all the 
	   additional parameters (after the scene name) that were passed to pushScene. The reference
	   to the scene controller (this.controller) has not be established yet, so any initialization
	   that needs the scene controller should be done in the setup function below. */
}

HomeAssistant.prototype.setup = function() {
  Mojo.Event.listen(this.controller.get("starred_button"), Mojo.Event.tap, function(){ Mojo.Controller.errorDialog("starred"); });
  Mojo.Event.listen(this.controller.get("my_repos_button"), Mojo.Event.tap, function(){ Mojo.Controller.errorDialog("my repos"); });  
  Mojo.Event.listen(this.controller.get("watched_button"), Mojo.Event.tap, function(){ Mojo.Controller.errorDialog("watched"); });
  Mojo.Event.listen(this.controller.get("search_button"), Mojo.Event.tap, function(){ Mojo.Controller.errorDialog("search"); });
  
  // load a random repo and show it in the "Exploration" section
  repo = new Repository();
  repo.random_repo({
    onSuccess: this.on_explore_success.bind(this)
  });
}

HomeAssistant.prototype.on_explore_success = function(transport) {
  var response = transport.responseJSON;
  
  var repo = response.repositories[0];
  
  // get the name, last push and description of the repo
  var partial = Mojo.View.render({
    object: {name: repo.name, last_push: repo.pushed, description: repo.description},
    template: "home/explore"
  });
  
  $("explore").update(partial);
}