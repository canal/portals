Ext.namespace("idxm.create.provider.ux.form.ProviderSearchPracForm");
idxm.create.provider.ux.form.ProviderSearchPracForm = Ext.extend(uRadix.form.FormPanel,
{
	showUserExistsWindow: function(config)
	{
		new idxm.create.provider.ux.window.ProviderUserAlreadyExist({message: ''});
	},
	
	constructor: function(config)
  	{  		
		//Default Form configuration
		var defaults = {
				id: 'providerSearchPracForm'
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
						    ,html:"<span class='portal-text-large'>Search for an Individual Practitioner</span>"
						},/*{
							xtype:"textfield"
							,id:"PRACTIN"
							,name:"TIN"
							,width:150
							,fieldLabel:"TIN"																											
							,msgTarget:"sideDetails"
							,vtype: "tin"
							,hideLabel: true
					    	,hidden: true
					    	,disable: true
						},{
							xtype:"textfield"
							,id:"PRACNPI"
							,name:"NPI"
							,width:150
							,fieldLabel:"NPI"
							,msgTarget:"sideDetails"
							,vtype: "npi"
							,hideLabel: true
					    	,hidden: true
					    	,disable: true
						},*/{
							xtype:"textfield"
							,id:"PRACPROVIDERID"
							,name:"ProviderID"
							,width:150
							,fieldLabel:"MultiPlan Provider ID"							
							,msgTarget:"sideDetails"
						}/*,{
							xtype:"textfield"
							,id:"PRACNAME"
							,name:"Name"
							,width:330
							,fieldLabel:"Practitioner Name"							
							,msgTarget:"sideDetails"
							,vtype: "orgNamePart"
							,hideLabel: true
					    	,hidden: true
					    	,disable: true
						},{
							xtype:"textfield"
							,id:"PRACADDRESS"
							,name:"Address"
							,width:330
							,fieldLabel:"Address"							
							,msgTarget:"sideDetails"
							,maxLength: 100
							,hideLabel: true
					    	,hidden: true
					    	,disable: true
						},{
							xtype:"panel"
							,html: '<span class="supportPortalFormLabelSmall">Example searches: 123 Main St or Ohio or 43812</span>'
							,style: 'padding-bottom: 10px;'
							,hideLabel: true
					    	,hidden: true
					    	,disable: true
						},{
							xtype:"textfield"
							,id:"SPECIALTY"
							,name:"Specialty"
							,width:150
							,fieldLabel:"Specialty"							
							,msgTarget:"sideDetails"
							,hideLabel: true
					    	,hidden: true
					    	,disable: true
						},{
							xtype:"textfield"
							,id:"PRACSSN"
							,name:"SSN"
							,width:150
							,fieldLabel:"Practitioner SSN"							
							,msgTarget:"sideDetails"
							,vtype: "ssn"
							,hideLabel: true
					    	,hidden: true
					    	,disable: true
						},{
							xtype:"textfield"
							,id:"PRACDOB"
							,name:"DateOfBirth"
							,width:150
							,fieldLabel:"Practitioner DOB"							
							,msgTarget:"sideDetails"
							,hideLabel: true
					    	,hidden: true
					    	,disable: true
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
		idxm.create.provider.ux.form.ProviderSearchPracForm.superclass.constructor.call(this, defaults);		  		
  		
  	}	
});
Ext.reg("idxm.create.provider.ux.form.ProviderSearchPracForm", idxm.create.provider.ux.form.ProviderSearchPracForm);