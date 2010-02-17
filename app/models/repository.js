var Repository = Class.create(GitHubBase, {
  
  /**
   * get the collection of a user's repositories from GitHub
   */
  get_my_repositories: function(callbacks) {
    var credentials = this.get_credentials();
    var url = this.create_url("repos/show/#{username}", {username: credentials.login});
    Mojo.Log.info(url);
    
    error_message = "We weren't able to contact the GitHub servers.  Please try again later."
    var request_settings = {
      method: "get",
      parameters: "login=#{login}&token=#{token}".interpolate(credentials),
      onFailure: function(transport) { Mojo.Controller.errorDialog(error_message); },
      onException: function(transport) { Mojo.Controller.errorDialog(error_message); }
    };
    Object.extend(request_settings, callbacks);
    
    Mojo.Log.info("call made");
    
    new Ajax.Request(url, request_settings);
  }

});