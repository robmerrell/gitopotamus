function RepositoryListAssistant() {
	/* this is the creator function for your scene assistant object. It will be passed all the 
	   additional parameters (after the scene name) that were passed to pushScene. The reference
	   to the scene controller (this.controller) has not be established yet, so any initialization
	   that needs the scene controller should be done in the setup function below. */
}

RepositoryListAssistant.prototype.models = {
 lstMyRepositories: {items: []}
};

RepositoryListAssistant.prototype.setup = function() {
  // load my repositories (asynch)
  this.setup_repository_list_model();
  
  // setup the repository list
  this.controller.setupWidget("lstMyRepositories", {
    itemTemplate: "repository-list/item-template",
    swipeToDelete: false,
    reorderable: false
  }, this.models.lstMyRepositories);
  
}

RepositoryListAssistant.prototype.setup_repository_list_model = function() {
  repo = new Repository();
  
  repo.get_my_repositories({
    onSuccess: this.update_my_repositories.bind(this)
  });
}

RepositoryListAssistant.prototype.update_my_repositories = function(transport) {
  var response = transport.responseJSON;
  
  this.models.lstMyRepositories.items = response.repositories;
  this.controller.modelChanged(this.models.lstMyRepositories);
}