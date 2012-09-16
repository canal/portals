<html>
	<head>
		<script src="js/jsloader/jsloader.js"></script>
		<script>
			var _ext_adapter = "jquery";
			
			JSLoader.load("extjs", "ext", "3.0.3-g");
			JSLoader.load("jquery", "main", "1.7.2");
			JSLoader.load("uradix", "extensions", "1.0-g");
			JSLoader.load("uradix", "utilities", "1.0-g");
			JSLoader.load("uradix", "validation", "1.0-g");
			JSLoader.load("menu", "extjs", "1.0");
			//JSLoader.load("uradix", "fileupload", "1.0-g");
			//JSLoader.load("extjs", "extux", "Menu");
		</script>
		<script>
			<%@ include file="menu.jsp" %>
			var g_portalURL = "http://localhost:8080/portals/index.jsp";
		</script>
	</head>

	<body>
	<div id="northRegionDiv">
		<table border="0" cellpadding"0" cellspacing="0" width="100%">
			<tr>
				<td height="60px">
					<table border="0" cellpadding="0" cellspacing="0" width="100%">
						<tr>
							<td width="33%" align="left">									
								<div style="padding: 4px 0px 0px 10px;">
									<a href="" style="text-decoration:none;">
										<div class="portal-mpi-logo-employee"></div>
									</a>
								</div>																									
							</td>
							<td width="33%" ></td>
							<td width="33%">
								<table cellpadding="0" cellspacing="0" height="59px" width="100%">
									<tr>
										<td align="right" valign="top">
											<div class="portal-date">Tuesday August 14, 2012 10:54 PM ET</div>
										</td>
									</tr>
									<tr>
										<td align="right" valign="bottom">
											<table border="0" cellpadding="3" cellspacing="3">
												<tr>
													<!-- <td nowrap>Welcome, <b>roberto.brenes</b> -->
													<td nowrap>Hello, <b>Roberto Brenes </b> <span class="portal-link">| <a href="/bluenog/portal/idxm/selfservice/profile.psml" style="color: black;">Profile</a> | <a href="/bluenog/portal/preferences/default.psml" style="color: black;">Preferences</a> | <a href="https://provider.multiplan.com:443/bluenog/login/logout" style="color: black;">Log Out</a></span></td>
													<td nowrap>&nbsp;&nbsp;&nbsp;</td>
													<td nowrap></td>
												</tr>
											</table>

										</td>
									</tr>
								</table>
							</td>								
						</tr>
					</table>

				</td>
			</tr>
			<tr>
				<td height="34px" valign="bottom">
					<!-- Toolbar Menu -->
					<div id="g_toolbardiv" style="width:100%"></div>							
				</td>
			</tr>
			<tr>
				<td>
					<!-- Status box -->
					<div id="uradix_statusbox" style="padding:0px;"></div>						
					<script type="text/javascript">Ext.onReady(function(){uRadixClientMessageHandler.initializeStatusDOM();});</script>							
				</td>
			</tr>

		</table>										
	</div>
	<div id="centerRegionDiv">	
		
