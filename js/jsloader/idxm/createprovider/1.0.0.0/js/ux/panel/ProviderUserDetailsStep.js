Ext.namespace("idxm.create.provider.ux.panel.ProviderUserDetailsStep");
idxm.create.provider.ux.panel.ProviderUserDetailsStep = Ext.extend(Ext.Panel, {
	
	constructor: function(config)
	{
	    var defaults = {
		 id: 'providerUserDetails'
	     ,bodyBorder: false
	     ,border: false
	     ,layout:"form"
//    	 ,width: 300
    	 ,buttonAlign: 'center'
	     ,items: [{
	    	 html : config.title
//	    	 ,ctCls: "portal-title"
	    	 ,cls: "portal-title"
	    	 ,bodyBorder: false
	    	 ,border: false
	     }	     
	     ,new idxm.create.provider.ux.form.ProviderUserDetailsForm(config)
	     ,{
	    	 xtype: 'panel'
	    	 ,layout: 'form'
    		 ,border: false
    		 ,bodyBorder: false
    		 ,width: 300
    		 ,buttons: [{
				text:"NEXT"
				,id:"logInButton"+this.NAMESPACE					
				,ctCls :"support-portal-btn"											
				,handler: config.createProviderParentObject.nextStep
			 }]
	     }
	     ]
		      
	    };
	
	    Ext.apply(this, defaults);
	    idxm.create.provider.ux.panel.ProviderUserDetailsStep.superclass.constructor.call(this, defaults);
	}
});
Ext.reg("idxm.create.provider.ux.panel.ProviderUserDetailsStep", idxm.create.provider.ux.panel.ProviderUserDetailsStep);