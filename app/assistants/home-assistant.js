function HomeAssistant() {
	/* this is the creator function for your scene assistant object. It will be passed all the 
	   additional parameters (after the scene name) that were passed to pushScene. The reference
	   to the scene controller (this.controller) has not be established yet, so any initialization
	   that needs the scene controller should be done in the setup function below. */
}

HomeAssistant.prototype.models = {
  exploreSpinner: {spinning: false}
};

HomeAssistant.prototype.setup = function() {
  Mojo.Event.listen(this.controller.get("starred_button"), Mojo.Event.tap, function(){ Mojo.Controller.errorDialog("starred"); });
  Mojo.Event.listen(this.controller.get("my_repos_button"), Mojo.Event.tap, function(){ Mojo.Controller.errorDialog("my repos"); });  
  Mojo.Event.listen(this.controller.get("watched_button"), Mojo.Event.tap, function(){ Mojo.Controller.errorDialog("watched"); });
  Mojo.Event.listen(this.controller.get("search_button"), Mojo.Event.tap, function(){ Mojo.Controller.errorDialog("search"); });
  
  // set up the explore refresh command menu button and the spinner
  this.controller.setupWidget(Mojo.Menu.commandMenu, {}, {items: [{icon: "refresh", command:'refresh'}]});
  this.controller.setupWidget("exploreSpinner", {spinnerSize: "large"}, this.models.exploreSpinner);
  
  // load a random repo and show it in the "Exploration" section
  repo = new Repository();
  repo.random_repo({
    onSuccess: this.on_explore_success.bind(this),
    onComplete: this.on_explore_complete.bind(this),
    onLoading: this.on_explore_loading.bind(this),
    onFailure: this.on_explore_fail.bind(this),
    onException: this.on_explore_fail.bind(this)
  });
}

HomeAssistant.prototype.handleCommand = function(event) {
  if (event.type == Mojo.Event.command) {
    if (event.command == "refresh") {
      repo = new Repository();
      repo.random_repo({
        onSuccess: this.on_explore_success.bind(this),
        onComplete: this.on_explore_complete.bind(this),
        onLoading: this.on_explore_loading.bind(this),
        onFailure: this.on_explore_fail.bind(this),
        onException: this.on_explore_fail.bind(this)
      });
    }
  }
}

HomeAssistant.prototype.on_explore_success = function(transport) {
  var response = transport.responseJSON;
  
  // get a random repo from the list
  var repo_index = Math.floor(Math.random()  * response.repositories.length);
  var repo = response.repositories[repo_index];
  
  repo_model = new Repository();
  var pushed_date = repo_model.friendly_last_pushed_date(repo.pushed);
  
  // get the username, name, last push and description of the repo and apply it to the home/explore partial
  var partial = Mojo.View.render({
    object: {username: repo.username, name: repo.name, last_push: pushed_date, description: repo.description},
    template: "home/explore"
  });
  
  $("explore").update(partial);
}

HomeAssistant.prototype.on_explore_complete = function(transport) {
  this.models.exploreSpinner.spinning = false;
  this.controller.modelChanged(this.models.exploreSpinner);
}

HomeAssistant.prototype.on_explore_loading = function(transport) {
  $("explore").update("");
    
  this.models.exploreSpinner.spinning = true;
  this.controller.modelChanged(this.models.exploreSpinner);
}

HomeAssistant.prototype.on_explore_fail = function(transport) {
  $("explore").update("The GitHub API encountered an error.  Refresh to try again.");
}