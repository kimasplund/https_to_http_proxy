# https_to_http_proxy
Dirty fix ment to fix the issue in Odoo to print from POS with ESC/POS to printers that does not support https like the Epson TM-T88V with UB-R04 wifi interface board.
I have this running on a Raspberry Pi on the internal network.
Guess it can be used for anything else also that needs a https to http downgrade.

Just run in thedirectory:
#npm install express http-proxy-middleware https

#openssl req -nodes -new -x509 -keyout server.key -out server.cert

Edit the file to reflect your printer (or i guess any other server or service) 

#node proxyServer.js

