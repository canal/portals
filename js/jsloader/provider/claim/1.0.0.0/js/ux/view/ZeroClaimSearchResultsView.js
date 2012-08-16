Ext.namespace("provider.claim.search.view.ZeroClaimSearchResultsView");
provider.claim.search.view.ZeroClaimSearchResultsView = Ext.extend(Ext.Panel, {
	
	ID: 'ZeroClaimSearchResultsView',
	
	initComponent : function(config) {
		var thisObj = this;
		var claimHelpLinkId = Ext.id();
		
		var additionalInformation = new provider.claim.search.panel.AdditionalInfomationPanel({
			id: 'NoResultsAdditionalInfomationPanel'
		});
		// Apply to this component
		Ext.apply(this, {
			id: "ZeroClaimSearchResultsView",
			layout : "form",		
			bodyBorder : false,
			border : false,
			ctCls : "portal-plain-panel",
			hideBorders : true,			
			labelAlign: "top",
			items: [
			        {
			        	xtype: "panel",
			        	cls: "portal-text-large",
			        	html: "<div>Your search yielded no claims.<br><br>Please verify your search criteria and try agan.</div>"
			        }
			        ,{
			        	xtype: "panel",
			        	cls : "provider-title-line-no-background",
			        	style: "padding-top:10px;"
			        }
			        ,{
			        	xtype: "panel",
			        	cls: "portal-text-large",
			        	html: "<div><span class='portal-text-large'>Are you still unable to find your claim?</span><br><br><span class='portal-text-small'>If you're certain that MultiPlan should have your claim or the payer has instructed you to contact MuliPlan, please open a customer service case below.</span></div>",		        	
			        	style: "padding-top:10px;"
			        },additionalInformation
			        ]
		});	
		
		// call parent initComponent
		provider.claim.search.view.ZeroClaimSearchResultsView.superclass.initComponent.call(this);
	}
});
//Register component as xtype
Ext.reg('provider.claim.search.view.ZeroClaimSearchResultsView',provider.claim.search.view.ZeroClaimSearchResultsView);