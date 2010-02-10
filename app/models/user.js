var User = Class.create(GitHubBase, {

  /**
   * validate that the username and api token (from the cookie) by making a call to
   * get user info and check for the presence of certain objects
   */
  validate_request: function(callbacks) {
    var credentials = this.get_credentials();
    var url = this.create_url("user/show/#{username}", {username: credentials.login})
  
    // create the settings for our ajax request by combining the passed in callbacks
    // with or settings defined below
    error_message = "We weren't able to contact the GitHub servers.  Please try again later."
    var request_settings = {
      method: "get",
      parameters: "login=#{login}&token=#{token}".interpolate(credentials),
      onFailure: function(transport) { Mojo.Controller.errorDialog(error_message); },
      onException: function(transport) { Mojo.Controller.errorDialog(error_message); }
    };
    Object.extend(request_settings, callbacks);
    
    new Ajax.Request(url, request_settings);
  }

});