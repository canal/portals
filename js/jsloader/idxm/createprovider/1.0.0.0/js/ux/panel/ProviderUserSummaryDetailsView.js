Ext.namespace("idxm.create.provider.ux.panel.ProviderUserSummaryDetailsView");
idxm.create.provider.ux.panel.ProviderUserSummaryDetailsView = Ext.extend(uRadix.form.FormPanel, {
	
	constructor: function(config)
	{
//		var providerUserDetails = config.createProviderParentObject.userDetails;
//		var providerName = providerUserDetails.FirstName + providerUserDetails.LastName;
//		var providerEmail = providerUserDetails.UserID;
		
		var htmlText = new Ext.XTemplate(
				'<div>{FirstName} {LastName}</div><br><br>'
				,'<div>Email:<br>'
				,'{UserID}</div>');
		
		var htmlText2 = new Ext.XTemplate(
				'<div>Access</div><br><br>'
				,'<div>{name}</div><br>'				
				,'<tpl if="this.isPrac(\'{accessType}\')"><div>NPI:&nbsp;{npi}</div>'
				,'&nbsp;&nbsp;</tpl>'
				,'MultiPlan ID:&nbsp;{providerID}</div>'
				,{
					isPrac:function(value) {
						return value == 'P';
					}
				});
		
//		htmlText.apply(config.createProviderParentObject.userDetails);
		
		config.createProviderParentObject.selectedProvider.accessType = config.createProviderParentObject.accessType;
		
//		console.log(config.createProviderParentObject.selectedProvider);
		
//		htmlText2.apply(config.createProviderParentObject.selectedProvider);
		
		/*var temp = new Ext.Panel({
      		xtype: 'panel'
  			,layout: 'column'          				
				,width: 800
				,height: 300
				,items: [{
					xtype : "panel"
					,columnWidth: .3
					//,html: htmlText.apply(config.createProviderParentObject.userDetails)
					,items: [{
						html: 'First Panel'
					}]          					
					},{
					xtype : "panel"  							
					,columnWidth: .7      						
					,items:[{
						html: "Second Panel"
						}
					]
					}
				]	
      	};*/
		
	    var defaults = {
		 id: 'providerUserSummaryDetailsView'
	     ,bodyBorder: false
	     ,border: false
	     ,layout:"form"
//    	 ,width: 800
    	 ,buttonAlign: 'center'
//		 ,cls: 'user-profile-body'
	     ,items: [{
	    	 	xtype: 'panel'
	   			,layout: 'column'          				
 				,width: 800
 				,height: 300
 				,items: [{
 					xtype : "panel"
 					,columnWidth: .3
 					//,html: htmlText.apply(config.createProviderParentObject.userDetails)
 					,items: [{
 						html: htmlText.apply(config.createProviderParentObject.userDetails)
 					}]          					
 					},{
 					xtype : "panel"  							
 					,columnWidth: .7      						
 					,items:[{
 						html: htmlText2.apply(config.createProviderParentObject.selectedProvider)
 						}
 					]
 					}
 				]}
	              	/*,{
					    xtype:"panel"
					    ,border:false
					    ,style:"padding-top:10px; padding-bottom:10px;"
				    	,hidden: config.createProviderParentObject.blnReadUser
					    ,html:"<span class='portal-text-large'>You are about to create the following user</span>"
					},{
					    xtype:"panel"
					    ,border:false
					    ,style:"padding-top:10px; padding-bottom:10px;"
				    	,hidden: !config.createProviderParentObject.blnReadUser
					    ,html:"<span class='portal-text-large'>You are about to add the following access to this user</span>"
					},{
					    xtype:"panel"
					    ,border:false
//					    ,style:"padding-top:10px; padding-bottom:10px;"
				    	,cls: 'user-profile-body'
			    		,height: 200
//					    ,html:"<span class='portal-text-large'>You are about to add the following access to this user</span>"
					}*/
	     ]
	    };
	
	    Ext.apply(this, defaults);
	    idxm.create.provider.ux.panel.ProviderUserSummaryDetailsView.superclass.constructor.call(this, defaults);
	}
});
Ext.reg("idxm.create.provider.ux.panel.ProviderUserSummaryDetailsView", idxm.create.provider.ux.panel.ProviderUserSummaryDetailsView);