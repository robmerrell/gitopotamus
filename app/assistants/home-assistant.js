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

}

HomeAssistant.prototype.handleButtonPress = function() {
  Mojo.Controller.errorDialog("success.");
}