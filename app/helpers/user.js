function UserHelper() {}

/**
 * Get detailed information about a user
 * username: GitHub username
 * callbacks: object containing function references to Prototype Ajax.Request callbacks {onFailure:func1,onSuccess:func2}
 *
 * User.get_info(username, {onFailure: this.failure.bind(this)});
 */
UserHelper.get_info = function(username, callbacks) {
  var credentials = GitHubHelper.get_credentials();
  var url = GitHubHelper.create_url("user/show/#{username}", {username: username});
  
  var request_settings = {
    method: "get",
    parameters: "login=#{login}&token=#{token}".interpolate(credentials),
    onFailure: function(transport) { Mojo.Controller.errorDialog("Invalid username or api token."); },
    onException: function(transport) { Mojo.Controller.errorDialog("We had trouble connecting with GitHub.  Please try again later."); }
  };
  Object.extend(request_settings, callbacks);
  
  new Ajax.Request(url, request_settings);
}