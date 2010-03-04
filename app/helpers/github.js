function GitHubHelper() {}

/**
 * Generates a url for a call to GitHub using using prototypes string interpolation
 * url: string
 * interplation_values: pattern {key:value}
 *
 * create_url("user/#{username}", {username: "my_username"})
 * outputs "http://github.com/api/v2/json/user/my_username"
 */
GitHubHelper.create_url = function(url, interpolation_values) {
  return "http://github.com/api/v2/json/" + url.interpolate(interpolation_values);
}


/**
 * Gets the API login credentials that we've stored in the cookie
 */
GitHubHelper.get_credentials = function() {
  var cred_store = new Mojo.Model.Cookie("GitopotamusLogin");
  var creds = cred_store.get();
  
  if (creds)
    return {login: creds.login, token: creds.token};
  else
    return {login: "", token: ""};
}