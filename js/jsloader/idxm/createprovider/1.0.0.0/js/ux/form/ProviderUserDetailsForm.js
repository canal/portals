Ext.namespace("idxm.create.provider.ux.form.ProviderUserDetailsForm");
idxm.create.provider.ux.form.ProviderUserDetailsForm = Ext.extend(uRadix.form.FormPanel,
{
	
	constructor: function(config)
  	{  		
		this.formSubmit = function (){
			config.createProviderParentObject.DisplayStep('ProviderUserSearchStep');
		};
		
		//Default Form configuration
		var defaults = {
				id: "providerUserDetailsForm"
				,border:false
				,bodyBorder:false
				,hideBorders:true
				,width: 300
				,labelAlign:"top"
				,baseCls:"portal-plain-panel"
				//,listeners: {uradix_enterkey: this.formSubmit}
				,layout: "form"
				,style:"padding-left:20;padding-top:10px;"
				,items:[						
						{
						    xtype:"panel"
						    ,border:false
						    ,style:"padding-top:10px;"
						    ,html:"<span class='portal-text-large'>Access Type:</span>"				   
						},
						new idxm.create.provider.ux.panel.ProvideAccessTypePanel(config),
				        {
							xtype:"textfield"
							,id:"FirstName"
							,name:"FirstName"
							,width:180
							,fieldLabel:"<b>*First Name</b>"																											
							,msgTarget:"sideDetails"
							,vtype: "namePart"
				        },{
							xtype:"textfield"
							,id:"LastName"
							,name:"LastName"
							,width:180
							,fieldLabel:"<b>*Last Name</b>"
							,msgTarget:"sideDetails"
							,vtype: "namePart"
						},{
							xtype:"textfield"
							,id:"UserID"
							,name:"UserID"
//							,id: "Email"
//							,name: "Email"
							,width:180
							,fieldLabel:"<b>*Email</b>"							
							,msgTarget:"sideDetails"
							,vtype: "email"
						}
					]				
		};
		
		Ext.apply(this, defaults);
		idxm.create.provider.ux.form.ProviderUserDetailsForm.superclass.constructor.call(this, defaults);		  		
  		
  	}	
});
Ext.reg("idxm.create.provider.ux.form.ProviderUserDetailsForm", idxm.create.provider.ux.form.ProviderUserDetailsForm);