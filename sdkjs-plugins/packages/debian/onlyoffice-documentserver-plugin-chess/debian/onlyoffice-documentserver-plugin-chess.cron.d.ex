#
# Regular cron jobs for the onlyoffice-documentserver-plugin-chess package
#
0 4	* * *	root	[ -x /usr/bin/onlyoffice-documentserver-plugin-chess_maintenance ] && /usr/bin/onlyoffice-documentserver-plugin-chess_maintenance
