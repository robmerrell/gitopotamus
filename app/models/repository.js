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
  },
  
  
  /**
   * Using a random keyword return a random result from a search
   */
  random_repo: function(callbacks) {
    // pull a random keyword to search by from our list
    var keyword_list = ["mongodb", "ruby", "rails", "couchdb", "jquery", "webos", "sdl", "opengl"];
    var keyword_index = Math.floor(Math.random() * keyword_list.length);
    
    var url = this.create_url("repos/search/#{keyword}", {keyword: keyword_list[keyword_index]});
    
    error_message = "We weren't able to contact the GitHub servers.  Please try again later."
    var request_settings = {
      method: "get",
      onFailure: function(transport) { Mojo.Controller.errorDialog(error_message); },
      onException: function(transport) { Mojo.Controller.errorDialog(error_message); }
    };
    Object.extend(request_settings, callbacks);
    
    new Ajax.Request(url, request_settings);
  },
  
  
  /**
   * Convert the GitHub last pushed date to a more friendly format
   */
  friendly_last_pushed_date: function(pushed) {
    // extract the date contents from the ISO8601 format
    var date_string = pushed.split('T')[0];
    var date_sections = date_string.split('-');

    var date = new Date();

    // apply the extracted date formats to our date object
    date.setUTCFullYear(Number(date_sections[0]));
    date.setUTCMonth(Number(date_sections[1])-1);
    date.setUTCDate(Number(date_sections[2]));

    return Mojo.Format.formatDate(date, {date: "medium"});
  }

});