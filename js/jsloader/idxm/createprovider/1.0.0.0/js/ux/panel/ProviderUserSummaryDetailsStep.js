Ext.namespace("idxm.create.provider.ux.panel.ProviderUserSummaryDetailsStep");
idxm.create.provider.ux.panel.ProviderUserSummaryDetailsStep = Ext.extend(Ext.Panel, {
	
	constructor: function(config)
	{
	    var defaults = {
		 id: 'providerUserSummaryDetails'
	     ,bodyBorder: false
	     ,border: false
	     ,layout:"form"
    	 ,width: 800    	 
	     ,items: [{
	    	 html : config.title
//	    	 ,ctCls: "portal-title"
	    	 ,cls: "portal-title"
	    	 ,bodyBorder: false
	    	 ,border: false
	     }	     
	     ,new idxm.create.provider.ux.panel.ProviderUserSummaryDetailsView(config)	     
	     ],
		 buttons: [{
						text: "CANCEL"
						,id:"cancelButton"//+this.NAMESPACE					
						,ctCls: "support-portal-btn-cancel"						
						,handler: config.createProviderParentObject.cancelStep
					},{
						text:"CREATE USER"
						,id:"createUserButton"//+this.NAMESPACE
						,hidden: config.createProviderParentObject.blnReadUser
						,ctCls :"support-portal-btn"											
						,handler: config.createProviderParentObject.nextStep
					 },{
						text:"GRANT ACCESS"
						,id:"grantAccessButton"//+this.NAMESPACE
						,hidden: !config.createProviderParentObject.blnReadUser
						,ctCls :"support-portal-btn"											
						,handler: config.createProviderParentObject.nextStep
					 }]	     
	    };
	
	    Ext.apply(this, defaults);
	    idxm.create.provider.ux.panel.ProviderUserSummaryDetailsStep.superclass.constructor.call(this, defaults);
	}
});
Ext.reg("idxm.create.provider.ux.panel.ProviderUserSummaryDetailsStep", idxm.create.provider.ux.panel.ProviderUserSummaryDetailsStep);