Ext.namespace("idxm.create.provider.ux.panel.ProviderSearchStep");
idxm.create.provider.ux.panel.ProviderSearchStep = Ext.extend(Ext.Panel, {
	
	constructor: function(config)
	{
	    var defaults = {
			 id: 'providerSearch'
		     ,bodyBorder: false
		     ,border: false
		     ,layout:"form"
		     ,width: 540
		     ,buttonAlign: 'center' 
		     ,items: [{
			    	 html : config.title
			    	 ,baseCls: "portal-title"
			    	 ,bodyBorder: false
			    	 ,border: false
			     }
		     	,new idxm.create.provider.ux.form.ProviderSearchGroupForm(config)
		     	,new idxm.create.provider.ux.form.ProviderSearchPracForm(config)
	        ],
	        buttons:[{
				text: "CANCEL"
				,id:"cancelButton"//+this.NAMESPACE					
				,ctCls: "support-portal-btn-cancel"						
				,handler: config.createProviderParentObject.cancelStep
				},{
				text:"NEXT"
				,id:"logInButton"+this.NAMESPACE					
				,ctCls :"support-portal-btn"											
				,handler: config.createProviderParentObject.nextStep
			}]
	    };
	
	    Ext.apply(this, defaults);
	    idxm.create.provider.ux.panel.ProviderSearchStep.superclass.constructor.call(this, defaults);
	}
});
Ext.reg("idxm.create.provider.ux.panel.ProviderSearchStep", idxm.create.provider.ux.panel.ProviderSearchStep);