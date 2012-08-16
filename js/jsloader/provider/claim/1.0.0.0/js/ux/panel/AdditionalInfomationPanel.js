Ext.namespace("provider.claim.search.panel.AdditionalInfomationPanel");
provider.claim.search.panel.AdditionalInfomationPanel = Ext
		.extend(
				Ext.Panel,
				{

					// initComponent
					constructor : function(config) {

						// Apply to this component
						Ext
								.apply(
										this,
										{
											id : config.id,
											layout : "form",
											bodyBorder : false,
											border : false,
											hideBorders : true,
											ctCls : "portal-plain-panel",
											name : "AdditionalInformation",
											// width : 410,
											items : [
													{
														xtype : "panel",
														style : "padding-top:10px;"
													},
													{
														xtype : "panel",
														layout : "column",
														border : false,
														items : [
																{
																	xtype : "panel",
																	layout : "form",
																	border : false,
																	bodyBorder : false,
																	labelAlign : "top",
																	columnWidth : .43,
																	items : [
																			{
																				xtype : "textarea",
																				fieldLabel : "Please provide some details and we'll create a customer service case",
																				name : "callMeInfo",
																				maxLength : 1024,
																				width : 430,
																				height: 111
																			},
																			{
																				xtype : "button",
																				id : "callMeBtn",
																				style : "float:right;",
																				text : "<div>CREATE CASE</div>"
																			} ]
																},
																{
																	xtype : "panel",
																	border : false,
																	bodyBorder : false,
																	html : "&nbsp;",
																	columnWidth : .14
																},
																{
																	xtype : "panel",
																	border : false,
																	bodyBorder : false,
																	html : "<br/><br/><table border='0'><tr><td><div class='provider-content-box'><table cellspacing='10'><tr><td><div class='telephone-icon' style='visibility: visible;'></div></td>"
																		+ "<td><div><p>Or call us at 800-000-0000</p><p>to further discuss your questions.<p></div></td></tr></table></div></td></tr></table>",
																	columnWidth : .43
																} ]
													} ]
										});

						// call parent initComponent
						provider.claim.search.panel.AdditionalInfomationPanel.superclass.constructor
								.call(this);
					}
				});
// Register component as xtype
Ext.reg('provider.claim.search.panel.AdditionalInfomationPanel',
		provider.claim.search.panel.AdditionalInfomationPanel);
