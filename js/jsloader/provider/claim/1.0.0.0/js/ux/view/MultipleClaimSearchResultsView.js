Ext.namespace("provider.claim.search.view.MultipleClaimSearchResultsView");
provider.claim.search.view.MultipleClaimSearchResultsView = Ext
		.extend(
				Ext.Panel,
				{
					//ID: 'MultipleClaimSearchResultsView',
					
					constructor : function(config) {
						var thisObj = this;
						var findClaimHelpLinkId = Ext.id();						

						var multipleAdditionalInformation = new provider.claim.search.panel.AdditionalInfomationPanel({
							id: 'MultipleResultsAdditionalInfomationPanel'
						});			

						// Apply to this component
						Ext
								.apply(
										this,
										{
											id: "MultipleClaimSearchResultsView",
											layout : "form",
											bodyBorder : false,
											border : false,
											ctCls : "portal-plain-panel",
											hideBorders : true,
											labelAlign : "top",
											items : [
													{
														xtype : "panel",
														cls : "portal-text-large",
														html : "<div>We found your claim.<br><br>However at this time we cannot display it on the portal.</div>"
													},
													{
														xtype : "panel",
														cls : "provider-title-line-no-background",
														style : "padding-top:10px;"
													},
													{
														xtype : "panel",
														style : "padding-top:10px;"
													},
													{
														xtype : "panel",
														cls : "portal-text-large",
														html : "<div>Would you like to create a customer service case?</div>"
													},multipleAdditionalInformation
													]
										});
						// call parent initComponent
						provider.claim.search.view.MultipleClaimSearchResultsView.superclass.constructor
								.call(this);
					}
				});
// Register component as xtype
Ext.reg('provider.claim.search.view.MultipleClaimSearchResultsView',
		provider.claim.search.view.MultipleClaimSearchResultsView);