# https_to_http_proxy
Dirty fix ment to fix the issue in Odoo to print from POS with ESC/POS to printers that does not support https like the Epson TM-T88V with UB-R04 wifi interface board.
I have this running on a Raspberry Pi on the internal network.
Guess it can be used for anything else also that needs a https to http downgrade.

Generate a certificate
#openssl req -nodes -new -x509 -keyout server.key -out server.cert

Edit the file to reflect your target host.

