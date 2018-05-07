W3C protocol compatibility status by driver
===

 * W3C protocol: https://www.w3.org/TR/webdriver/
 * JsonWire protocol: https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol
 * Chromedriver W3C compatibility status: https://chromium.googlesource.com/chromium/src/+/master/docs/chromedriver_status.md
 * geckodriver W3C compatibility status: https://developer.mozilla.org/en-US/docs/Mozilla/QA/Marionette/WebDriver/status
 * Microsoft Edge W3C compatibility: https://docs.microsoft.com/en-us/microsoft-edge/webdriver#w3c-webdriver-specification-support
 * safari webdriver: https://developer.apple.com/documentation/webkit/macos_webdriver_commands_for_safari
 * JsonWireProtocol to W3C comparision table: https://github.com/facebook/php-webdriver/wiki/JsonWireProtocol-vs.-W3C-WebDriver

|	Method	|	URL	|	Command	|	[geckodriver](https://github.com/mozilla/geckodriver)	|	[chromedriver](https://sites.google.com/a/chromium.org/chromedriver/)	|	Bug	|	[IEDriver](https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/)	|	Available Release/Priority	|	Method	|	URI template	|	[safaridriver](https://developer.apple.com/documentation/webkit/testing_with_webdriver_in_safari)	|	Availability	|
|	---	|	---	|	---	|	---	|	---	|	---	|	---	|	---	|	---	|	---	|	---	|	---	|
|	POST	|	/session	|	New Session	|	Complete	|	Partially Complete	|	1997	|	Supported	|	10240	|	GET	|	/status	|	See note below	|		|
|	DELETE	|	/session/{sessionId}	|	Delete Session	|	Complete	|	Complete	|		|	Supported	|	10240	|	POST	|	/session	|	✓	|	14, 10.0	|
|	GET	|	/status	|	Status	|	Complete	|	Complete	|		|	Supported	|	10240	|	GET	|	/sessions	|	See note below	|		|
|	GET	|	/session/{sessionId}/timeouts	|	Get Timeouts	|	Complete	|	Complete	|		|	Not Supported	|	Priority 3	|	GET, DELETE	|	/session/:sessionId	|	✓	|	14, 10.0	|
|	POST	|	/session/{sessionId}/timeouts	|	Set Timeouts	|	Partially complete Bug 1264259 - Implement user prompt handler	|	Partially Complete	|	1951	|	Supported	|	10240	|	POST, DELETE	|	/session/:sessionId/window	|	✓	|	14, 10.0	|
|	POST	|	/session/{sessionId}/url	|	Get	|	Partially complete Bug 1264259 - Implement user prompt handler Bug 1280448 - Basic auth information lost when navigating Bug 1333458 - Improve logic to determine if a load event is expected 	|	Partially Complete	|	1987	|	Supported	|	10240	|	GET	|	/session/:sessionId/window_handle	|	✓	|	14, 10.0	|
|	GET	|	/session/{sessionId}/url	|	Get Current URL	|	Partially complete Bug 1264259 - Implement user prompt handler	|	Complete	|		|	Supported	|	10240	|	GET	|	/session/:sessionId/window_handles	|	✓	|	14, 10.0	|
|	POST	|	/session/{sessionId}/back	|	Back	|	Partially complete Bug 1264259 - Implement user prompt handler	|		|		|	Supported	|	10240	|	GET, POST	|	/session/:sessionId/window/:windowHandle/size	|	✓	|	14, 10.0	|
|	POST	|	/session/{sessionId}/forward	|	Forward	|	Partially complete Bug 1264259 - Implement user prompt handler	|		|		|	Supported	|	10240	|	GET, POST	|	/session/:sessionId/window/:windowHandle/position	|	✓	|	14, 10.0	|
|	POST	|	/session/{sessionId}/refresh	|	Refresh	|	Partially complete Bug 1264259 - Implement user prompt handler 	|	Partially Complete	|	1988	|	Supported	|	10240	|	POST	|	/session/:sessionId/window/:windowHandle/maximize	|	✓	|	14, 10.0	|
|	GET	|	/session/{sessionId}/title	|	Get Title	|	Partially complete Bug 1255946 - `Getting top-level browsing context’s title from nested browsing context if frame is changed with target=_top does not work` Bug 1264259 - Implement user prompt handler	|	Complete	|		|	Supported	|	10240	|	GET, POST	|	/session/:sessionId/url	|	✓	|	14, 10.0	|
|	GET	|	/session/{sessionId}/window/handle	|	Get Window Handle	|	Partially complete Bug 1264259 - Implement user prompt handler	|	Complete	|		|	Supported	|	15063	|	POST	|	/session/:sessionId/forward	|	✓	|	14, 10.0	|
|	DELETE	|	/session/{sessionId}/window	|	Close Window	|	Partially complete Bug 1264259 - Implement user prompt handler	|	Partially Complete	|	1990	|	Supported	|	10586	|	POST	|	/session/:sessionId/back	|	✓	|	14, 10.0	|
|	POST	|	/session/{sessionId}/window	|	Switch To Window	|	Partially complete Bug 1264259 - Implement user prompt handler Bug 1301073 - Switch To Window should not allow switching by window name Bug 1305822 - Marionette should switch back to the top-level context when switching windows	|	Partially Complete	|	1991	|	Supported	|	10586	|	POST	|	/session/:sessionId/refresh	|	✓	|	14, 10.0	|
|	GET	|	/session/{sessionId}/window/handles	|	Get Window Handles	|	Partially complete Bug 1264259 - Implement user prompt handler Bug 1311041 - Window handle changes on remoteness change	|	Complete	|		|	Supported	|	15063	|	POST	|	/session/:sessionId/frame	|	✓	|	14, 10.0	|
|	POST	|	/session/{sessionId}/frame	|	Switch To Frame	|	Partially complete Bug 1143908 - Switching to frame by element should accept element reference instead of UUID Bug 1202246 - After switching remote frame, the uuid of the element has changed Bug 1264259 - Implement user prompt handler	|	Partially Complete	|	1992	|	Supported	|	10586	|	POST	|	/session/:sessionId/frame/parent	|	✓	|	14, 10.0	|
|	POST	|	/session/{sessionId}/frame/parent	|	Switch To Parent Frame	|	Partially complete Bug 1202246 - After switching remote frame, the uuid of the element has changed Bug 1264259 - Implement user prompt handler	|		|		|	Supported	|	10586	|	POST	|	/session/:sessionId/moveto	|	✓	|	14, 10.0	|
|	GET	|	/session/{sessionId}/window/rect	|	Get Window Rect	|	Complete	|	Complete	|		|	Not Supported	|	Priority 3	|	POST	|	/session/:sessionId/click	|	✓	|	14, 10.0	|
|	POST	|	/session/{sessionId}/window/rect	|	Set Window Rect	|	Complete	|	Complete	|		|	Not Supported	|	Priority 3	|	POST	|	/session/:sessionId/doubleclick	|	✓	|	14, 10.0	|
|	POST	|	/session/{sessionId}/window/size	|	Set Window Size	|	Partially complete Bug 1264259 - Implement user prompt handler	|	unknown status	|		|	unknown status	|		|	POST	|	/session/:sessionId/buttondown	|	✓	|	14, 10.0	|
|	GET	|	/session/{sessionId}/window/size	|	Get Window Size	|	Partially complete Bug 1264259 - Implement user prompt handler	|	unknown status	|		|	unknown status	|		|	POST	|	/session/:sessionId/buttonup	|	✓	|	14, 10.0	|
|	POST	|	/session/{sessionId}/window/maximize	|	Maximize Window	|	Partially complete Bug 1264259 - Implement user prompt handler	|	Incomplete	|	1940	|	Not Supported	|	Priority 3	|	POST	|	/session/:sessionId/keys	|	✓	|	14, 10.0	|
|	POST	|	/session/{session id}/window/minimize	|	Miminize Window	|	unknown status	|	Incomplete	|	1940	|	Not Supported	|	Priority 3	|	POST	|	/session/:sessionId/execute	|	✓	|	14, 10.0	|
|	POST	|	/session/{sessionId}/window/fullscreen	|	Fullscreen Window	|	Partially complete Bug 1264259 - Implement user prompt handler	|	Partially Complete	|	1993	|	Not Supported	|	Priority 4	|	POST	|	/session/:sessionId/execute_async	|	✓	|	14, 10.0	|
|	GET	|	/session/{session id}/element/active	|	Get Active Element	|	unknown status	|	Complete	|		|	Supported	|	10586	|	POST	|	/session/:sessionId/element	|	✓	|	14, 10.0	|
|	POST	|	/session/{sessionId}/element	|	Find Element	|	Partially complete Bug 1202246 - After switching remote frame, the uuid of the element has changed Bug 1264259 - Implement user prompt handler Bug 1381519 - Find element does not work when link text case changed by CSS text-transform	|		|		|	Supported	|	10586	|	POST	|	/session/:sessionId/elements	|	✓	|	14, 10.0	|
|	POST	|	/session/{sessionId}/elements	|	Find Elements	|	Partially complete Bug 1202246 - After switching remote frame, the uuid of the element has changed  Bug 1264259 - Implement user prompt handler Bug 1381519 - Find element does not work when link text case changed by CSS text-transform	|		|		|	Supported	|	10586	|	GET	|	/session/:sessionId/element/:id/text	|	✓	|	14, 10.0	|
|	POST	|	/session/{session id}/element/{element id}/element	|	Find Element From Element	|	Partially complete Bug 1202246 - After switching remote frame, the uuid of the element has changed Bug 1264259 - Implement user prompt handler Bug 1381519 - Find element does not work when link text case changed by CSS text-transform	|		|		|	Supported	|	10586	|	GET	|	/session/:sessionId/element/:id/name	|	✓	|	14, 10.0	|
|	POST	|	/session/{session id}/element/{element id}/elements	|	Find Elements From Element	|	Partially complete Bug 1202246 - After switching remote frame, the uuid of the element has changed  Bug 1264259 - Implement user prompt handler Bug 1381519 - Find element does not work when link text case changed by CSS text-transform	|		|		|	Supported	|	10586	|	GET	|	/session/:sessionId/element/:id/selected	|	✓	|	14, 10.0	|
|	GET	|	/session/{sessionId}/element/{elementId}/selected	|	Is Element Selected	|	Incomplete Bug 1279205 - Implement spec compatible Is Element Selected command Bug 1264259 - Implement user prompt handler	|		|		|	Supported	|	10240	|	GET	|	/session/:sessionId/element/:id/enabled	|	✓	|	14, 10.0	|
|	GET	|	/session/{sessionId}/element/{elementId}/attribute/{name}	|	Get Element Attribute	|	Partially complete Bug 1264259 - Implement user prompt handler	|		|		|	Supported	|	10240	|	GET	|	/session/:sessionId/element/:id/attribute/:name	|	✓	|	14, 10.0	|
|	GET	|	/session/{sessionId}/element/{elementId}/property/{name}	|	Get Element Property	|	Partially complete Bug 1260233 - Can't get value from file type input Bug 1264259 - Implement user prompt handler Bug 1398792 - getElementProperty does not use content principal of element 	|	Incomplete	|	1936	|	Not Supported	|	Priority 2	|	GET	|	/session/:sessionId/element/:id/css/:propertyName	|	✓	|	14, 10.0	|
|	GET	|	/session/{sessionId}/element/{elementId}/css/{propertyName}	|	Get Element CSS Value	|	Partially complete Bug 1264259 - Implement user prompt handler	|	Partially Complete	|	1994	|	Supported	|	10240	|	GET	|	/session/:sessionId/element/:id/displayed	|	✓	|	14, 10.0	|
|	GET	|	/session/{sessionId}/element/{elementId}/text	|	Get Element Text	|	Partially complete Bug 1264259 - Implement user prompt handler	|	Complete	|		|	Supported	|	10240	|	GET	|	/session/:sessionId/element/:id/location	|	✓	|	14, 10.0	|
|	GET	|	/session/{sessionId}/element/{elementId}/name	|	Get Element Tag Name	|	Partially complete Bug 1264259 - Implement user prompt handler	|	Complete	|		|	Supported	|	10240	|	GET	|	/session/:sessionId/element/:id/location_in_view	|	✓	|	14, 10.0	|
|	GET	|	/session/{sessionId}/element/{elementId}/rect	|	Get Element Rect	|	Partially complete Bug 1264259 - Implement user prompt handler	|	Incomplete	|	1937	|	Supported	|	10586	|	GET	|	/session/:sessionId/element/:id/size	|	✓	|	14, 10.0	|
|	GET	|	/session/{sessionId}/element/{elementId}/enabled	|	Is Element Enabled	|	Partially complete Bug 1264259 - Implement user prompt handler Bug 1354201 - Make Is Element Enabled command WebDriver conforming	|	Partially Complete	|	1995	|	Supported	|	10240	|	GET	|	/session/:sessionId/element/:id/equals/:other	|	✓	|	14, 10.0	|
|	POST	|	/session/{sessionId}/element/{elementId}/click	|	Element Click	|	Partially complete Bug 1264259 - Implement user prompt handler	|	Partially Complete	|	1996	|	Supported	|	10240	|	POST	|	/session/:sessionId/element/:id/element	|	✓	|	14, 10.0	|
|	POST	|	/session/{sessionId}/element/{elementId}/clear	|	Element Clear	|	Incomplete Bug 1264259 - Implement user prompt handler 	|	Partially Complete	|	1998	|	Supported	|	10240	|	POST	|	/session/:sessionId/element/:id/elements	|	✓	|	14, 10.0	|
|	POST	|	/session/{sessionId}/element/{elementId}/value	|	Element Send Keys	|	Partially complete Bug 1255260 - Incorrect number of keyDown events when using modifiers Bug 1264259 - Implement user prompt handler  Bug 1385895 - Element Send Keys selects wrong <option> when dispatching text to <select>	|	Partially Complete	|	1999	|	Not Supported	|	Priority 2	|	POST	|	/session/:sessionId/element/active	|	✓	|	14, 10.0	|
|	GET	|	/session/{sessionId}/source	|	Get Page Source	|	Partially complete Bug 1264259 - Implement user prompt handler	|		|		|	Supported	|	10586	|	POST	|	/session/:sessionId/element/:id/click	|	✓	|	14, 10.0	|
|	POST	|	/session/{sessionId}/execute	|	Execute Script	|	Incomplete Bug 1274251 - Provide serialisation of Window object Bug 1128997 - Support indefinite script timeout Bug 1202246 - After switching remote frame, the uuid of the element has changed Bug 1264259 - Implement user prompt handler Bug 1270585 - A modal opening whilst a script runs causes that execute*Script call to immediately return with a null result Bug 1335472 - Promises-based execute script	|	Partially Complete	|	2000	|	Supported	|	15063	|	POST	|	/session/:sessionId/element/:id/submit	|	✓	|	14, 10.0	|
|	POST	|	/session/{sessionId}/execute_async	|	Execute Async Script	|	Incomplete Bug 1274251 - Provide serialisation of Window object Bug 1128997 - Support indefinite script timeout Bug 1202246 - After switching remote frame, the uuid of the element has changed Bug 1264259 - Implement user prompt handler Bug 1270585 - A modal opening whilst a script runs causes that execute*Script call to immediately return with a null result Bug 1335472 - Promises-based execute script	|	Partially Complete	|	2001	|	Supported	|	15063	|	POST	|	/session/:sessionId/element/:id/value	|	✓	|	14, 10.0	|
|	GET	|	/session/{session id}/cookie	|		|	unknown status	|	Complete	|		|	Supported	|	10240	|	POST	|	/session/:sessionId/element/:id/clear	|	✓	|	14, 10.0	|
|	POST	|	/session/{sessionId}/cookie	|	Add Cookie	|	Partially complete Bug 1264259 - Implement user prompt handler	|	Complete	|		|	Supported	|	10240	|	GET	|	/session/:sessionId/screenshot	|	✓	|	14, 10.0	|
|	GET	|	/session/{sessionId}/cookie/{name}	|	Get Cookie	|	Partially complete Bug 1264259 - Implement user prompt handler	|	Partially Complete	|	2002	|	Supported	|	10240	|	GET	|	/session/:sessionId/source	|	✓	|	14, 10.0	|
|	DELETE	|	/session/{sessionId}/cookie/{name}	|	Delete Cookie	|	Partially complete Bug 1264259 - Implement user prompt handler	|	Complete	|		|	Supported	|	10240	|	GET	|	/session/:sessionId/title	|	✓	|	14, 10.0	|
|	DELETE	|	/session/{session id)/cookie	|		|	unknown status	|	Complete	|		|	Supported	|	10586	|	POST	|	/session/:sessionId/timeouts	|	✓	|	14, 10.0	|
|	POST	|	/session/{sessionId}/actions	|	Perform Actions	|	Partially complete Bug 1264259 - Implement user prompt handler Bug 1292178 - [meta] Implement W3C WebDriver-compatible Actions API implementation in marionette	|	Incomplete	|	1897	|	Not Supported	|	Priority 3	|	POST	|	/session/:sessionId/timeouts/async_script	|	✓	|	14, 10.0	|
|	DELETE	|	/session/{session id}/actions	|		|	unknown status	|	Incomplete	|	1897	|	Not Supported	|	Priority 3	|	POST	|	/session/:sessionId/timeouts/implicit_wait	|	✓	|	14, 10.0	|
|	POST	|	/session/{sessionId}/dismiss/alert	|	Dismiss Alert	|	Partially complete Bug 1263661 - Associate user prompts with browser, and not with session	|	Partially Complete	|	1500	|	Supported	|	15063	|	GET, POST	|	/session/:sessionId/alert_text	|	✓	|	14, 10.0	|
|	POST	|	/session/{sessionId}/alert/accept	|	Accept Alert	|	Partially complete Bug 1263661 - Associate user prompts with browser, and not with session	|	Partially Complete	|	1500	|	Supported	|	15063	|	POST	|	/session/:sessionId/accept_alert	|	✓	|	14, 10.0	|
|	GET	|	/session/{sessionId}/alert/text	|	Get Alert Text	|	Partially complete Bug 1263661 - Associate user prompts with browser, and not with session	|	Complete	|		|	Supported	|	15063	|	POST	|	/session/:sessionId/dismiss_alert	|	✓	|	14, 10.0	|
|	POST	|	/session/{sessionId}/alert/text	|	Send Alert Text	|	Partially complete  Bug 1263661 - Associate user prompts with browser, and not with session	|	Partially Complete	|	2003	|	Supported	|	15063	|	GET, POST, DELETE	|	/session/:sessionId/cookie	|	✓	|	14, 10.0	|
|	GET	|	/session/{sessionId}/screenshot	|	Take Screenshot	|	Partially complete Bug 1264259 - Implement user prompt handler Bug 1385706 - Screenshot is smaller than viewPoint	|		|		|	Supported	|	10240	|	DELETE	|	/session/:sessionId/cookie/:name	|	✓	|	14, 10.0	|
|	GET	|	/session/{sessionId}/element/{elementId}/screenshot	|	Take Element Screenshot	|	Partially complete Bug 1264259 - Implement user prompt handler	|	Incomplete	|	1938	|	Supported	|	10240	|	GET, POST	|	/session/:sessionId/apple/permissions	|	✓	|	41, 11.1	|
|		|		|		|		|		|		|		|		|	POST	|	/session/:sessionId/apple/attach_debugger	|	✓	|	42, 11.1	|
|		|		|		|		|		|		|		|		|	GET, POST	|	/session/:sessionId/location	|		|		|
|		|		|		|		|		|		|		|		|	GET, POST	|	/session/:sessionId/orientation	|		|		|
|		|		|		|		|		|		|		|		|	GET, POST, DELETE	|	/session/:sessionId/session_storage	|		|		|
|		|		|		|		|		|		|		|		|	GET	|	/session/:sessionId/session_storage/size	|		|		|
|		|		|		|		|		|		|		|		|	GET, DELETE	|	/session/:sessionId/session_storage/key/:key	|		|		|
|		|		|		|		|		|		|		|		|	GET, POST, DELETE	|	/session/:sessionId/local_storage	|		|		|
|		|		|		|		|		|		|		|		|	GET	|	/session/:sessionId/local_storage/size	|		|		|
|		|		|		|		|		|		|		|		|	GET, DELETE	|	/session/:sessionId/local_storage/key/:key	|		|		|
|		|		|		|		|		|		|		|		|	GET	|	/session/:sessionId/application_cache/status	|		|		|
|		|		|		|		|		|		|		|		|	POST	|	/session/:sessionId/log	|		|		|
|		|		|		|		|		|		|		|		|	GET	|	/session/:sessionId/log/types	|		|		|
|		|		|		|		|		|		|		|		|	POST	|	/session/:sessionId/touch/click	|		|		|
|		|		|		|		|		|		|		|		|	POST	|	/session/:sessionId/touch/down	|		|		|
|		|		|		|		|		|		|		|		|	POST	|	/session/:sessionId/touch/up	|		|		|
|		|		|		|		|		|		|		|		|	POST	|	/session/:sessionId/touch/move	|		|		|
|		|		|		|		|		|		|		|		|	POST	|	/session/:sessionId/touch/scroll	|		|		|
|		|		|		|		|		|		|		|		|	POST	|	/session/:sessionId/touch/doubleclick	|		|		|
|		|		|		|		|		|		|		|		|	POST	|	/session/:sessionId/touch/longclick	|		|		|
|		|		|		|		|		|		|		|		|	POST	|	/session/:sessionId/touch/flick	|		|		|
|		|		|		|		|		|		|		|		|	GET	|	/session/:sessionId/ime/available_engines	|		|		|
|		|		|		|		|		|		|		|		|	GET	|	/session/:sessionId/ime/active_engine	|		|		|
|		|		|		|		|		|		|		|		|	GET 	|	/session/:sessionId/ime/activated	|		|		|
|		|		|		|		|		|		|		|		|	POST 	|	/session/:sessionId/ime/deactivate	|		|		|
|		|		|		|		|		|		|		|		|	POST 	|	/session/:sessionId/ime/activate	|		|		|
|		|		|		|		|		|		|		|		|	GET	|	/session/:sessionId/element/:elementId	|		|		|

