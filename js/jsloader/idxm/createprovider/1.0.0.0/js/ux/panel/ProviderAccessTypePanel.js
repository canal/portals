Ext.namespace("idxm.create.provider.ux.panel.ProviderAccessTypePanel");
idxm.create.provider.ux.panel.ProvideAccessTypePanel = Ext.extend(Ext.Panel, {
	
	constructor : function (config) {
		
		var defaults = {
			layout: "form",
			border: false,
			bodyborder : false,			
			baseCls: 'portal-plain-panel',			
			style:"padding-left:20;",
			hideBorders : true,
			items : [
				{
				xtype: "radiogroup",
				name:"accessTypeGroup",
				vertical: true,
				columns:1,							
				items:[{
						boxLabel : "Individually Contracted Practitioner",
						name : "accessType",
						listeners: {
							check : function(o,b){
								if(b) {
									config.createProviderParentObject.accessType = 'prac';
									
									// Hiding the Search Group Form and showing the Search Prac Form
									var providerSearchPracForm = Ext.getCmp('providerSearchPracForm');
									var providerSearchGroupForm = Ext.getCmp('providerSearchGroupForm');
									providerSearchPracForm.show();
									providerSearchGroupForm.hide();
									//console.log(b);
								}									
							}
						}
					  },{
						boxLabel : "Group",
						name : "accessType",
						listeners: {
							check : function(o,b){
								if(b) {
									config.createProviderParentObject.accessType = 'grp';
									
									// Hiding the Search Prac Form and showing the Search Group Form
									var providerSearchPracForm = Ext.getCmp('providerSearchPracForm');
									var providerSearchGroupForm = Ext.getCmp('providerSearchGroupForm');
									providerSearchGroupForm.show();
									providerSearchPracForm.hide();
									//console.log(config.createProviderParentObject.accessType);
								}									
							}
						}
					  }]
			}]
		};
		
		Ext.apply(this, defaults);
		idxm.create.provider.ux.panel.ProvideAccessTypePanel.superclass.constructor.call(this, defaults);
	}
});
Ext.reg("idxm.create.provider.ux.panel.ProvideAccessTypePanel", idxm.create.provider.ux.panel.ProvideAccessTypePanel);