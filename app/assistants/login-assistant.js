function LoginAssistant() {
	/* this is the creator function for your scene assistant object. It will be passed all the 
	   additional parameters (after the scene name) that were passed to pushScene. The reference
	   to the scene controller (this.controller) has not be established yet, so any initialization
	   that needs the scene controller should be done in the setup function below. */
}

LoginAssistant.prototype.models = {
  txtUsername: {value: ""},
  txtApiToken: {value: ""},
  btnLogin: {buttonLabel: "Login", disabled: false}
};

LoginAssistant.prototype.setup = function() {
  this.controller.setupWidget("txtUsername", {}, this.models.txtUsername);
  this.controller.setupWidget("txtApiToken", {}, this.models.txtApiToken);
  
  this.controller.setupWidget("btnLogin", {type: Mojo.Widget.activityButton}, this.models.btnLogin);
  Mojo.Event.listen(this.controller.get("btnLogin"), Mojo.Event.tap, this.login.bind(this));
}

LoginAssistant.prototype.login = function() {
  if (this.models.txtUsername.value && this.models.txtApiToken.value) {
    this.models.btnLogin.disabled = true;
    this.controller.modelChanged(this.models.btnLogin, this);
    
    // write the username and api token into the credentials cookie
    var new_creds = {login: this.models.txtUsername.value, token: this.models.txtApiToken.value};
    var cred_store = new Mojo.Model.Cookie("GitopotamusLogin");
    cred_store.put(new_creds);
    
    // make the ajax request to validate the credentials
    user = new User();
    user.validate_request({
      onComplete: this.on_request_complete.bind(this),
      onSuccess: this.on_request_success.bind(this)
    });
  }
}

LoginAssistant.prototype.on_request_complete = function(transport) {
  this.models.btnLogin.disabled = false;
  this.controller.modelChanged(this.models.btnLogin, this);
  this.controller.get("btnLogin").mojo.deactivate();
}

LoginAssistant.prototype.on_request_success = function(transport) {
  var response = transport.responseJSON;
  
  if (response.user.plan)
    Mojo.Controller.errorDialog("success.");
  else
    Mojo.Controller.errorDialog("Invalid username or api token.");
}