<%@ include file="header.jsp" %>

<script>
  JSLoader.load("idxm", "core", "1.0-g");
  JSLoader.load("idxm", "login", "1.0-g");
</script>

<div id="loginPaneljs_902_"></div>
<script>
	Ext.onReady(function(){		
		new idxm.login.ux.panel.login.LoginPanel({
			 namespace:"js_902_"
			 ,renderTo:"loginPaneljs_902_"
			 ,redirectUrl:"/bluenog/portal/idxm/createinternal.psml?menuID=1"
			 ,loginUrl:"/portals/json/login.json"
			 ,profileUrl:"/bluenog/portal/home.psml"
			 ,passwordExpireUrl:"/bluenog/portal/idxm/selfservice/profilepasswordexpire.psml"
			 ,updatePasswordUrl:"/bluenog/portal/idxm/selfservice/profileupdatepassword.psml"
			 ,requestForgotPasswordUrl:"/bluenog/portal/idxm/selfservice/requestforgotpassword.psml"
			 ,loggedOut:"1"
			 ,activated:"null"
			 ,loginPanelId:"loginPanelIdjs_902_"
			 ,loginFormPanelId:"loginFormPanelIdjs_902_"
			 ,loginInternalLabel:false
		});
	});	
</script>
<%@ include file="footer.jsp" %>
