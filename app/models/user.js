var User = Class.create(GitHubBase, {

  /**
   * validate that the username and api token (from the cookie) by making a call to
   * get user info and check for the presence of certain objects
   */
  validate_request: function(username, callbacks) {
    var url = this.create_url("user/show/#{username}", {username: username})
    var credentials = this.get_credentials();
  
    // create the settings for our ajax request by combining the passed in callbacks
    // with or settings defined below
    var request_settings = {
      method: "get",
      parameters: "login=#{login}&token=#{token}".interpolate(credentials),
      onFailure: function(transport) {
        Mojo.Controller.errorDialog("Invalid username or api token.");
      },
      onException: function(transport) {
        Mojo.Controller.errorDialog("We weren't able to contact the GitHub servers.  Please try again later.");
      }
    };
    Object.extend(request_settings, callbacks);
    
    new Ajax.Request(url, request_settings);
  }

});