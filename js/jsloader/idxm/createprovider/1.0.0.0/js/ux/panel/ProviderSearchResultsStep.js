Ext.namespace("idxm.create.provider.ux.panel.ProviderSearchResultsStep");
idxm.create.provider.ux.panel.ProviderSearchResultsStep = Ext.extend(Ext.Panel, {
	
	constructor: function(config)
	{
	    var defaults = {
			 id: 'providerSearchResults'
		     ,bodyBorder: false
		     ,border: false
		     ,layout: "form"
	    	 ,width: 800
		     ,items: [{
			    	 html : config.title
			    	 ,baseCls: "portal-title"
			    	 ,bodyBorder: false
			    	 ,border: false}
		     ,{
				    xtype:"panel"
			    	,id: 'selectGroupTitle'
				    ,border:false
				    ,hidden: true
				    ,style:"padding-bottom:10;padding-top:10px;"
				    ,html:"<span class='portal-text-large'>Select a Group</span>"				   
		     },{
				    xtype:"panel"
			    	,id: 'selectPracTitle'
				    ,border:false
				    ,hidden: true
				    ,style:"padding-bottom:10;padding-top:10px;"
				    ,html:"<span class='portal-text-large'>Select a Practitioner</span>"				   
		     }		  
		     ]
		     ,buttons:[{
						text: "CANCEL"
						,id:"cancelButton"//+this.NAMESPACE					
						,ctCls: "support-portal-btn-cancel"
						,handler: config.createProviderParentObject.cancelStep
					},{
						text:"NEXT"
						,id:"logInButton"+this.NAMESPACE					
						,ctCls :"support-portal-btn"											
						,handler: config.createProviderParentObject.nextStep
					}
			]
	    };
	
	    Ext.apply(this, defaults);
	    idxm.create.provider.ux.panel.ProviderSearchResultsStep.superclass.constructor.call(this, defaults);
	}
});
Ext.reg("idxm.create.provider.ux.panel.ProviderSearchResultsStep", idxm.create.provider.ux.panel.ProviderSearchResultsStep);