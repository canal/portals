function needAssistanceWindow() {
	var window = new provider.claim.search.window.NeedAssistanceWindow({});
};
						
Ext.namespace("provider.claim.search.view.OneClaimSearchResultView");
provider.claim.search.view.OneClaimSearchResultView = Ext
		.extend(
				Ext.Panel,
				{

					ID : "OneClaimSearchResultView",

					initComponent : function(config) {
						var thisObj = this;

						function pricingInfoTemplate(claim) {

							// This is the actual Template
							var t = new Ext.XTemplate(
									'<div height="350px">',
									'<table width="100%" border="0" cellspacing="10" cellpadding="0">',
									'<tr>',
									'<td align="left" style="white-space:nowrap;">',
									'<div class="calculator-icon" style="visibility: visible;"></div>',
									'</td>',
									'<td align="left" stle="padding-top: 10px;">',
									'<table>',
									'<tr>',
									'<td align="right" style="white-space:nowrap;"><span class="portal-text-large">Total Charges:</span></td>',
									'<td align="left" style="white-space:nowrap;"><span class="portal-text-large-bold">&nbsp;${totalCharges}</span></td>',
									'</tr>',
									'<tr><td>&nbsp;</td></tr>',
									'<tr>',
									'<td align="right" style="white-space:nowrap;"><span class="portal-text-large">Allowable:</span></td>',
									'<td align="left" style="white-space:nowrap;"><span class="portal-text-large-bold">&nbsp;${allowedCharges}</span></td>',
									'</tr>',
									'</table>',
									'</td>',
									'</tr>',
									'<tr><td colspan="2"><div class="provider-title-line-no-background">&nbsp</div></td></tr>',
									'<tr>',
									'<td align="left" style="white-space:nowrap;" colspan="2">',
									'<table width="100%" border="0" cellspacing="0" cellpadding="0">',
									'<tr>',
									'<td align="left" style="white-space:nowrap; padding-bottom: 10px;">',
									'{networkInfo}',
									'</td>',
									'</tr>',
									'<tpl if="showProvider == true">',
									'<tr>',
									'<td align="left" style="white-space:nowrap; padding-left: 10px;padding-bottom: 2px;">',
									'{providerName}',
									'</td>',
									'<tr>',
									'<td align="left" style="white-space:nowrap; padding-left: 10px;padding-bottom: 2px;">',
									'{addressLine}',
									'</td>',
									'<tr>',
									'<td align="left" style="white-space:nowrap; padding-left: 10px;">',
									'{cityStateZip}',
									'</td>',
									'<tr>',
									'<td align="left" style="white-space:nowrap; padding-left: 10px;padding-top: 5px;padding-bottom: 5px;">',
									'TIN: {tin}', 
									'</td>', 
									'</tr>', 
									'</tpl>',	
									'<tpl if="outOfNetwork == true">',
									'<tr>',
									'<td align="left" style="white-space:nowrap; padding-left: 10px;">',
									'<div>',
									'<table cellspacing="0">',
									'<tr>',
									'<td><div class="info-icon" style="visibility: visible;"></div></td>',
									'<td><div class="portal-text-small"><p>See below for more information.</p></div></td>',
									'</tr>',
									'</table>',										
									'</div>',
									'</td>', 
									'</tpl>',									
									'</table>',
									'</td></tr>', 									
									'</table>', '</div>');

							var totalCharges = '', allowedCharges = '';
							if (claim.PricingList && claim.PricingList
									&& claim.PricingList[0].PricingResults) {
								totalCharges = claim.PricingList[0].PricingResults.TotalCharges;
								allowedCharges = claim.PricingList[0].PricingResults.TotalAllowedCharges;
							}

							// extract provider information
							var networkInfo = '', outOfNetwork = false;
							if (!uRadixUtilities.jsonPath(claim, '$.PricingList[0].PricingMetaData.RateSheet.RateSheetCode[0]')) {
								networkInfo = 'This claim is <b>Out of Network.</b>';
								outOfNetwork = true;
							} else {
								networkInfo = 'Priced using the <b>The MultiPlan Network</b>';
							}
							var providerName = '', addressLine = '', cityStateZip = '', tin = '', showProvider = false;
							if (!outOfNetwork && claim.PricingList
									&& claim.PricingList[0].PricingMetaData
									&& claim.PricingList[0].PricingMetaData.PricingProvider
									&& claim.PricingList[0].PricingMetaData.PricingProvider.MatchProvider
									&& (claim.PricingList[0].PricingMetaData.PricingProvider.MatchProvider.LastName || claim.PricingList[0].PricingMetaData.PricingProvider.MatchProvider.Name)) {
								networkInfo += ' and the following provider:';
								if (claim.PricingList[0].PricingMetaData.PricingProvider.MatchProvider.LastName) {
									providerName = 'Dr. '
											+ claim.PricingList[0].PricingMetaData.PricingProvider.MatchProvider.LastName
											+ ', ' + claim.PricingList[0].PricingMetaData.PricingProvider.MatchProvider.FirstName;
								} else {
									providerName = claim.PricingList[0].PricingMetaData.PricingProvider.MatchProvider.Name;
								}
								if (claim.PricingList[0].PricingMetaData.PricingProvider.MatchProvider.Address) {
									addressLine += claim.PricingList[0].PricingMetaData.PricingProvider.MatchProvider.Address.AddressLine1
									if (claim.PricingList[0].PricingMetaData.PricingProvider.MatchProvider.Address.AddressLine2
											&& claim.PricingList[0].PricingMetaData.PricingProvider.MatchProvider.Address.AddressLine2 != 'NONE') {
										addressLine += ", "
												+ claim.PricingList[0].PricingMetaData.PricingProvider.MatchProvider.Address.AddressLine2;
									}
									cityStateZip = claim.PricingList[0].PricingMetaData.PricingProvider.MatchProvider.Address.City
											+ ", "
											+ claim.PricingList[0].PricingMetaData.PricingProvider.MatchProvider.Address.State
											+ " "
											+ claim.PricingList[0].PricingMetaData.PricingProvider.MatchProvider.Address.ZipCode;
								}
								tin = claim.PricingList[0].PricingMetaData.PricingProvider.MatchProvider.Tin;
								showProvider = true;
							}

							// Pass data to template
							var templateString = t.apply({
								totalCharges : totalCharges,
								allowedCharges : allowedCharges,
								networkInfo : networkInfo,
								providerName : providerName,
								addressLine : addressLine,
								cityStateZip : cityStateZip,
								tin : tin,
								showProvider : showProvider,
								outOfNetwork: outOfNetwork
							});
							return templateString;

						}; // end of pricing information template function

						function lineItemsTemplate(claim) {

							// This is the actual Template
							var t = new Ext.XTemplate(
									'<div height="95%">',
									'<table width="100%" border="0" cellspacing="0">',
									'<thead>',
									'<tr>',
									'<th style="white-space:nowrap;" align="center" class="portal-text-small-bold provider-title-line-no-background">Line</th>',
									'<th style="white-space:nowrap;" align="center" class="portal-text-small-bold provider-title-line-no-background">DOS</th>',
									'<th style="white-space:nowrap;" align="center" class="portal-text-small-bold provider-title-line-no-background">CPT</th>',
									'<th style="white-space:nowrap;" align="center" class="portal-text-small-bold provider-title-line-no-background">MOD</th>',
									'<th style="white-space:nowrap;" align="center" class="portal-text-small-bold provider-title-line-no-background">ICD</th>',
									'<th style="white-space:nowrap;" align="center" class="portal-text-small-bold provider-title-line-no-background">Time Units<br>&nbsp;&nbsp;/ Days</th>',
									'<th style="white-space:nowrap;" align="center" class="portal-text-small-bold provider-title-line-no-background">Charge</th>',									
									'<th style="white-space:nowrap;" align="center" class="portal-text-small-bold provider-title-line-no-background">Allowable</th>',
									'<th style="white-space:nowrap;" align="center" class="portal-text-small-bold provider-title-line-no-background">Omitted from<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Repricing</th>',	
									'<th style="white-space:nowrap;" align="center" class="portal-text-small-bold provider-title-line-no-background">Savings</th>',																	
									'</tr>',
									'</tead>',
									'<tfoot>',
									'<tr>',
									'<td></td>',
									'<td></td>',
									'<td></td>',
									'<td></td>',
									'<td></td>',
									'<td class="portal-text-small-bold" style="padding-top:8px;text-align:center;"><div>Totals</div></td>',
									'<td class="portal-text-small-bold" style="padding-top:8px;text-align:center;"><div>${totalCharge}</div></td>',
									'<td class="portal-text-small-bold" style="padding-top:8px;text-align:center;"><div>${totalAvailable}</div></td>',
									'<td class="portal-text-small-bold" style="padding-top:8px;text-align:center;"><div>${totalOmittedAmount}</div></td>',
									'<td class="portal-text-small-bold" style="padding-top:8px;text-align:center;"><div>${totalDiscount}</div></td>',
									'</tr>',
									'<tr><td colspan=10"></br></td></tr>',
									'<tr>',
									'<td align="right" colspan="10">',
									'<div>',
									'<table cellspacing="0">',
									'<tr>',
									'<td class="green-flag-display"><div class="green-flag-icon" style="visibility: visible;"></div></td>',
									// '<td class="need-assistance-display"><div
									// class="portal-text-small"><a href="#"
									// onclick="needAssistanceWindow();">Need
									// further assistance? Contact
									// MultiPlan.</a></div></td>',
									'<td class="need-assistance-display"><div style="text-decoration:underline; color:#081577;"><p><a>Need further assistance? Contact MultiPlan.</a></p></div></td>',
									'</tr>',
									'</table>',										
									'</div>',								
									'</td>',									
									'</tr>',									
									'</tfoot>',
									'<tbody>',
									'<tpl for="list">',
									'<tpl if="LineNumber % 2 &gt; 0">',
									'<tr class="tableRowOne">',
									'</tpl>',
									'<tpl if="LineNumber % 2 &lt; 1">',
									'<tr class="tableRowTwo">',
									'</tpl>',								
									'<td class="tableRowTd">',
									'<span class="portal-text-small">{LineNumber}</span>',
									'</td>',
									'<td class="tableRowTd">',
									'<span class="portal-text-small">{DosFrom}</span>',
									'</td>',
									'<td class="tableRowTd">',
									'<span class="portal-text-small">{CPTCode}</span>',
									'</td>',
									'<td class="tableRowTd">',
									'<span class="portal-text-small">{Modifier}</span>',
									'</td>',
									'<td class="tableRowTd">',
									'<span class="portal-text-small">{ICD}</span>',
									'</td>',
									'<td class="tableRowTd" style="text-align:center;">',
									'<span class="portal-text-small">{UnitsDays}</span>',
									'</td>',									
									'<td class="tableRowTd" style="text-align:center;">',
									'<span class="portal-text-small">{Charge}</span>',
									'</td>',
									'<td class="tableRowTd" style="text-align:center;">',
									'<span class="portal-text-small">{Allowable}</span>',
									'</td>',
									'<td class="tableRowTd" style="text-align:center;">',
									'<span class="portal-text-small">{OmittedAmount}</span>',
									'</td>',									
									'<td class="tableRowTd" style="text-align:center;">',
									'<span class="portal-text-small">{Discount}</span>',
									'</td>',
									'</tr>',									
									'</tpl>',									
									'</tbody>',
									'</table>',
									'</div>'								
									);

							var totalCharge = '0.0'; totalAvailable = '0.0'; totalDiscount = '0.0'; totalOmittedAmount = '0.0' ;
							var lineItemsArray = new Array();
							for (i = 0; i < claim.ClaimData.Professional.ClaimLines.length; i++) {
								var claimLine = claim.ClaimData.Professional.ClaimLines[i];
								var lineItem = getLineItem(claim,claimLine, i);
								
								lineItemsArray.push(lineItem);
							}
							if (claim.PricingList
									&& claim.PricingList[0] && claim.PricingList[0].PricingResults) {
								totalCharge = claim.PricingList[0].PricingResults.TotalCharges;
								totalAvailable = claim.PricingList[0].PricingResults.TotalAllowedCharges;
								totalDiscount = claim.PricingList[0].PricingResults.TotalSavings;
								totalOmittedAmount = claim.PricingList[0].PricingResults.TotalNonContractAmount;
							}
							// Pass data to template
							var templateString = t.apply({
								list : lineItemsArray,
								totalCharge: totalCharge,
								totalAvailable: totalAvailable,
								totalDiscount: totalDiscount,
								totalOmittedAmount: totalOmittedAmount
							});
							return templateString;

						}; // end of line items template function

						function getLineItem(claim, claimLine, lineNumber) {
							var lineItem = new Object();

							lineItem.LineNumber = lineNumber + 1;
							var dt = null;
							if(claimLine.DateOfServiceFrom) {
								dt = new Date(claimLine.DateOfServiceFrom);
								lineItem.DosFrom = dt.format('m/d/Y');
							} else {
								lineItem.DosFrom = '';
							}
							if(claimLine.DateOfServiceTo) {
								dt = new Date(claimLine.DateOfServiceTo);
								lineItem.DosTo = dt.format('m/d/Y');
							} else {
								lineItem.DosTo = '';
							}
							if(claimLine.ProcedureCode &&
									claimLine.ProcedureCode.ProcedureCodeType
									&& claimLine.ProcedureCode.ProcedureCodeType == 'CPT4') {
								lineItem.CPTCode = claimLine.ProcedureCode.ProcedureCodeName;
							} else {
								lineItem.CPTCode = '';
							}
							
							lineItem.Modifier = (claimLine.Modifiers && claimLine.Modifiers.Modifier ? claimLine.Modifiers.Modifier : '');
							if (claimLine.ClaimDiagCodes) {
								lineItem.ICD = claimLine.ClaimDiagCodes[0].DiagCodeName;
							}
							lineItem.Charge = claimLine.Charges;
							if (claimLine.Anesthesia) {
								lineItem.UnitsDays = claimLine.Units;
							} else {
								lineItem.UnitsDays = claimLine.Anesthesia.AnesthesiaMinutes;
							}
							if (claim.PricingList
									&& claim.PricingList[0]
									&& claim.PricingList[0].PricingResults
									&& claim.PricingList[0].PricingResults.ClaimLineList) {
								var priceLine = claim.PricingList[0].PricingResults.ClaimLineList[lineNumber];
								lineItem.Allowable = (priceLine.AllowedCharges == null
										|| priceLine.AllowedCharges.length == 0 ? '0'
										: priceLine.AllowedCharges);
								lineItem.Discount = (priceLine.Savings == null
										|| priceLine.Savings.length == 0 ? '0'
										: priceLine.Savings);
								lineItem.OmittedAmount = (priceLine.NonContractAmount == null
										|| priceLine.NonContractAmount.length == 0 ? '0'
										: priceLine.NonContractAmount);
							}
							return lineItem;
						};
						function claimInfoTemplate(claim) {

							// This is the actual Template
							var t = new Ext.XTemplate(
									'<div style="background-color:#f7f6f6;">',
									'<table width="100%" border="0" cellspacing="15" cellpadding="0">',
									'<tr>',
									'<td style="white-space:nowrap;" align="left">',
									'<span class="portal-text-small-bold"><b>MultiPlan Claim #: {claimNumber}<b></span>',
									'</td>',
									'</tr>',
									'<tr>',
									'<td style="white-space:nowrap;" align="left">',
									'Payer: {payor}<br>',
									'<div class="provider-title-line-no-background">&nbsp</div>',
									'</td>',
									'</tr>',
									'</table>',
									'<table width="55%" border="0" cellspacing="0">',
									'<tr style="padding-top:15px;">',
									'<td align="left" style="white-space:nowrap;padding-left:15px;padding-bottom:15px;">',
									'DOS:',
									'</td>',
									'<td align="left" style="white-space:nowrap;padding-bottom:15px;">&nbsp;{dos}</td>',
									'</tr>',
									'<tr>',
									'<td align="left" style="white-space:nowrap;padding-left:15px;padding-bottom:15px;">',
									'Patient:',
									'</td>',
									'<td align="left" style="white-space:nowrap;padding-bottom:15px;">&nbsp;{patientName}</td>',
									'</tr>',
									'<tr>',
									'<td align="left" style="white-space:nowrap;padding-left:15px;padding-bottom:15px;">',
									'Insured:',
									'</td>',
									'<td align="left" style="white-space:nowrap;padding-bottom:15px;">&nbsp;{primaryInsured}</td>',
									'</tr>',
									'<tr>',
									'<td align="left" style="white-space:nowrap;padding-left:15px;padding-bottom:55px;">',
									'Insured ID:',
									'</td>',
									'<td align="left" style="white-space:nowrap;padding-bottom:55px;">&nbsp;{insuredId}</td>',
									'</tr>', '</table>', '</div>');

							var payor = '', claimNumber = '', patientName = '', primaryInsured = '', insuredId = '', dos = '';
							if (claim.ClaimIdentifierList) {
								for (i = 0; i < claim.ClaimIdentifierList.length; i++) {
									var claimIdentifier = claim.ClaimIdentifierList[i];
									if (claimIdentifier.System == 'MPI_SUBMITTER') {
										claimNumber = claimIdentifier.Id;
									}
								}
								if (claimNumber) {
									for (i = 0; i < claim.ClaimIdentifierList.length; i++) {
										var claimIdentifier = claim.ClaimIdentifierList[i];
										if (claimIdentifier.System == 'MPI_INTERNAL') {
											claimNumber = claimIdentifier.Id;
										}
									}
								}
							}
							if (claim.ClaimMetaDataList
									&& claim.ClaimMetaDataList[0].ClientIdentifierList
									&& claim.ClaimMetaDataList[0].ClientIdentifierList[0].ClientName) {
								payor = claim.ClaimMetaDataList[0].ClientIdentifierList[0].ClientName;
								claimType = claim.ClaimMetaDataList[0].ClientIdentifierList[0].ClaimType;
							}
							if (claim.ClaimData) {
								if (claim.ClaimData.Professional
										&& claim.ClaimData.Professional.Patient) {
									patientName = claim.ClaimData.Professional.Patient.LastName
											+ ', '
											+ claim.ClaimData.Professional.Patient.FirstName;
								} else if (claim.ClaimData.Institutional
										&& claim.ClaimData.Institutional.Patient) {
									patientName = claim.ClaimData.Institutional.Patient.LastName
											+ ', '
											+ claim.ClaimData.Institutional.Patient.FirstName;
								}
								if (claim.ClaimData.Professional && claim.ClaimData.Professional.PrimaryInsured) {
									primaryInsured = claim.ClaimData.Professional.PrimaryInsured.LastName
											+ ', '
											+ claim.ClaimData.Professional.PrimaryInsured.FirstName;

									insuredId = claim.ClaimData.Professional.PrimaryInsured.InsuredID;
									if (claim.ClaimData.Professional.ServiceFromDate
											&& claim.ClaimData.Professional.ServiceFromDate != '?') {
										var dt = null;
										if(claim.ClaimData.Professional.ServiceFromDate) {
											dt = new Date(claim.ClaimData.Professional.ServiceFromDate);
											dos = dt.format('m/d/Y');
										} 
									}
								} else if (claim.ClaimData.Institutional && claim.ClaimData.Institutional.PrimaryInsured) {
									primaryInsured = claim.ClaimData.Institutional.PrimaryInsured.LastName
											+ ', '
											+ claim.ClaimData.Institutional.PrimaryInsured.FirstName;

									insuredId = claim.ClaimData.Institutional.PrimaryInsured.InsuredID;
									if (claim.ClaimData.Institutional.ServiceFromDate
											&& claim.ClaimData.Institutional.ServiceFromDate != '?') {
										var dt = null;
										if(claim.ClaimData.Institutional.ServiceFromDate) {
											dt = new Date(claim.ClaimData.Institutional.ServiceFromDate);
											dos = dt.format('m/d/Y');
										} 
									}

								}
							}

							// Pass data to template
							var templateString = t.apply({
								payor : payor,
								claimNumber : claimNumber,
								patientName : patientName,
								primaryInsured : primaryInsured,
								insuredId : insuredId,
								dos : dos
							});
							return templateString;

						}; // end of claim information template function
						
						var lineItemsPanel = new Ext.Panel({
							border : false,
							style : "padding-top: 2px;padding-bottom: 2px;",
							id : lineItemsGridId,
							height : 350,
							html : lineItemsTemplate(thisObj.claim),
							autoHeight : true,
							autoScroll : true,
							border : false,
							bodyBorder : false,
						});
						
						// Apply to this component
						Ext
								.apply(
										this,
										{
											id : "OneClaimSearchResultView",
											layout : "form",
											bodyBorder : false,
											border : false,
											ctCls : "portal-plain-panel",
											hideBorders : true,
											labelAlign : "top",
											items : [
													{
														xtype : "panel",
														border : false,
														style : "padding-top:10px;padding-bottom:10px;",
														layout : "column",
														items : [
																{
																	border : false,
																	columnWidth : .5,
																	bodyBorder : false,
																	hideBorders : true,
																	items : [
																			{
																				xtype : "panel",
																				border : false,
																				bodyCssClass : "provider-title-body",
																				cls : "provider-title",
																				html : "Pricing Information"
																			},
																			{
																				xtype : "panel",
																				border : false,
																				cls : "portal-titles",
																				style : "padding-top:5px;",
																				html : pricingInfoTemplate(thisObj.claim),
																				autoHeight : true,
																				autoScroll : true
																			} ]
																},
																{
																	width : 10,
																	border : false,
																	html : "&nbsp;"
																},
																{
																	xtype : "panel",
																	columnWidth : .5,
																	style : "padding-top: 2px;padding-bottom: 2px;",
																	cls:"provider-content-box",
																	width : 540,
																	height : 236,
																	html : claimInfoTemplate(thisObj.claim),
																	border : false,
																	bodyBorder : false,
																	autoHeight : false,
																	autoScroll : false
																} ]
													},
													{
														xtype : "panel",
														border : false,
														bodyCssClass : "provider-title-body",
														cls : "provider-title",
														html : "Additional Information"
													},
													{
														xtype : "panel",
														layout : "form",
														border : false,
														bodyBorder : false,
														items: [
																{
																	xtype : "panel",
																	border : true,
																	style : "padding-top:10px;",
																	cls : "provider-items-title",
																	bodyCssClass : "provider-items-body",
																	layout : "column",
																	id: lineItemsGridId+"Panel",
																	html : "<table width='100%' cellpadding='0' cellspacing='0' border='0'>"
																			+ "<tr><td align='left' width='20'><div id='"+lineItemsGridIconId+"' class='form-arrow-icon' style='visibility: visible;' onmouseover='this.style.cursor=\"pointer\";' onclick='toggleClaimsGrid(\""
																			+ lineItemsGridId
																			+ "\", this.id);'></div></td><td>"
																			+ "<div align='left' onmouseover='this.style.cursor=\"pointer\";' onclick='toggleClaimsGrid(\""
																			+ lineItemsGridId
																			+ "\", \""+ lineItemsGridIconId + "\");' class='provider-items-title' id='"+lineItemsGridId+"Div'>View Line Items</div></td>"	
																			+ "</tr></table>"		
																},lineItemsPanel
														        ]
													},
													{
														xtype : "panel",
														border : true,
														style : "padding-top:10px;",
														cls : "provider-items-title",
														bodyCssClass : "provider-items-body",
														layout : "column",
														id: claimPricedGridId+"Panel",
														html : "<table width='100%' cellpadding='0' cellspacing='0' border='0'><tr><td align='left' width='20'><div id='"+claimPricedGridIconId+"' class='form-arrow-icon' style='visibility: visible;' onmouseover='this.style.cursor=\"pointer\";' onclick='toggleClaimsGrid(\""
																+ claimPricedGridId
																+ "\", this.id);'></div></td><td>"
																+ "<div align='left' onmouseover='this.style.cursor=\"pointer\";' onclick='toggleClaimsGrid(\""
																+ claimPricedGridId
																+ "\", \""+ claimPricedGridIconId + "\");' class='provider-items-title' id='"+claimPricedGridId+"Div'>Why did the claim  price this way?</div></td>"	
																+ "</tr></table>"																
													},
													{
														xtype : "panel",
														border : true,
														style : "padding-top:10px;",
														cls : "provider-items-title",
														bodyCssClass : "provider-items-body",
														layout : "column",
														id: fullAllowableGridId+"Panel",
														html : "<table width='100%' cellpadding='0' cellspacing='0' border='0'><tr><td align='left' width='20'><div id='"+fullAllowableGridIconId+"' class='form-arrow-icon' style='visibility: visible;' onmouseover='this.style.cursor=\"pointer\";' onclick='toggleClaimsGrid(\""
																+ fullAllowableGridId
																+ "\", this.id);'></div></td><td>"
																+ "<div align='left' onmouseover='this.style.cursor=\"pointer\";' onclick='toggleClaimsGrid(\""
																+ fullAllowableGridId
																+ "\", \""+ fullAllowableGridIconId + "\");' class='provider-items-title' id='"+fullAllowableGridId+"Div'>Why did I not get the full allowable amount?</div></td>"	
																+ "</tr></table>"															
													} ]
										});
						
						// call parent initComponent
						provider.claim.search.view.OneClaimSearchResultView.superclass.initComponent
								.call(this);
					}
				});
// Register component as xtype
Ext.reg('provider.claim.search.view.OneClaimSearchResultView',
		provider.claim.search.view.OneClaimSearchResultView);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 