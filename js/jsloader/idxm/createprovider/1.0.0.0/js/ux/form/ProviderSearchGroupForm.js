Ext.namespace("idxm.create.provider.ux.form.ProviderSearchGroupForm");
idxm.create.provider.ux.form.ProviderSearchGroupForm = Ext.extend(uRadix.form.FormPanel,
{
	
	/*showUserExistsWindow: function(config)
	{
		var parentConfig = Ext.getCmp('providerSearchGroupForm').config;		
		new idxm.create.provider.ux.window.ProviderUserAlreadyExist(parentConfig);
	},*/
	
	constructor: function(config)
  	{  	
		this.config = config;
		//Default Form configuration
		var defaults = {
				id: 'providerSearchGroupForm'
				,border:false
				,bodyBorder:false
				,hideBorders:true
				,width: 400
				,labelAlign:"top"
				,layout: "form"
//				,style:"padding-top:10px;"
				,hidden: true
				,items:[
						{
						    xtype:"panel"
						    ,border:false
						    ,style:"padding-top:10px; padding-bottom:10px;"
						    ,html:"<span class='portal-text-large'>Search for a Group</span>"					    	
						},/*{
							xtype:"textfield"
							,id:"TIN"
							,name:"TIN"
							,width:150
							,fieldLabel:"TIN"																											
							,msgTarget:"sideDetails"
							,hideLabel: true
					    	,hidden: true
					    	//,vtype: "tin"
							,validateOnBlur:false
				            ,validationEvent:false
				            ,validator:function(val_) {
				               return idxm.search.validation.SearchValidator.siblingRequiredCheck(val_,"GROUPNPI");
				             }
						},{
							xtype:"textfield"
							,id:"GROUPNPI"
							,name:"GROUPNPI"
							,width:150
							,fieldLabel:"NPI"
							,msgTarget:"sideDetails"
							,hideLabel: true
					    	,hidden: true
							,validateOnBlur:false
				            ,validationEvent:false
				            ,validator:function(val_) {
				               return idxm.search.validation.SearchValidator.siblingRequiredCheck(val_,"TIN");
				             }
						},*/{
							xtype:"textfield"
							,id:"GROUPPROVIDERID"
							,name:"ProviderID"
							,width:150
							,fieldLabel:"MultiPlan Group ID"							
							,msgTarget:"sideDetails"
						}/*,{
							xtype:"textfield"
							,id:"Name"
							,name:"Name"
							,width:330
							,fieldLabel:"Group Name"							
							,msgTarget:"sideDetails"
							,hideLabel: true
					    	,hidden: true
							,vtype: "orgNamePart"
						},{
							xtype:"textfield"
							,id:"Address"
							,name:"Address"
							,width:330
							,fieldLabel:"Address"							
							,msgTarget:"sideDetails"
							,maxLength: 100
							,hideLabel: true
					    	,hidden: true
							,validationEvent:"blur"															
						},{
							xtype:"panel"
							,html: '<span class="supportPortalFormLabelSmall">Example searches: 123 Main St or Ohio or 43812</span>'
							,hideLabel: true
					    	,hidden: true
							,style: 'padding-bottom: 10px;'							
						}*/
					]
				/*,buttons:[{
						text: "User already Exists Window"
						,ctCls: 'support-portal-btn'
						,handler: this.showUserExistsWindow
					}
				]*/
		};
		
		Ext.apply(this, defaults);
		idxm.create.provider.ux.form.ProviderSearchGroupForm.superclass.constructor.call(this, defaults);		  		
  		
  	}	
});
Ext.reg("idxm.create.provider.ux.form.ProviderSearchGroupForm", idxm.create.provider.ux.form.ProviderSearchGroupForm);