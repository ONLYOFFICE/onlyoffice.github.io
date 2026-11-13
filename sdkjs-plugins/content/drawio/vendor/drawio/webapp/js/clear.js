/**
 * Copyright (c) 2020-2025, JGraph Holdings Ltd
 * Copyright (c) 2020-2025, draw.io AG
 */
try
{
	function write(text)
	{
		document.getElementById('content').appendChild(document.createTextNode(text));
	};

	function writeln(text)
	{
		write(text);
		document.getElementById('content').appendChild(document.createElement('br'));
	};

	// No onclick attributes: the CSP of ac.draw.io and aj.draw.io blocks them
	function addButton(label, fn)
	{
		var button = document.createElement('button');
		button.style.margin = '4px';
		button.appendChild(document.createTextNode(label));
		button.addEventListener('click', fn);
		document.getElementById('content').appendChild(button);
	};

	writeln('');
	write('Clearing Cached version ' + EditorUi.VERSION + '...');

	if (navigator.serviceWorker != null)
	{
		navigator.serviceWorker.getRegistrations().then(function(registrations)
		{
			if (registrations != null && registrations.length > 0)
			{
				for (var i = 0; i < registrations.length; i++)
				{
					registrations[i].unregister();
				}

				writeln('Done');
			}
			else
			{
				writeln('OK');
			}
			
			writeln('');
			addButton('Update', function()
			{
				window.location.reload();
			});

			if ((/test\.draw\.io$/.test(window.location.hostname)) ||
				(/preprod\.diagrams\.net$/.test(window.location.hostname)) ||
				(/app\.diagrams\.net$/.test(window.location.hostname)))
			{
				addButton('Start App', function()
				{
					window.location.href = '/.';
				});
			}
			// Opens the page for app.diagrams.net: a frame cannot clear it,
			// browsers keep the storage of a frame per top-level site
			else if (/^a[cj]\.draw\.io$/.test(window.location.hostname))
			{
				addButton('Clear app.diagrams.net', function()
				{
					window.open('https://clear.diagrams.net', '_blank', 'noopener');
				});
			}
		});
	}
	else
	{
		writeln('OK');
	}
}
catch (e)
{
	write('Error: ' + e.message);
}
