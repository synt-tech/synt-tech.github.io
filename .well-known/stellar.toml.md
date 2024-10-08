---
layout: none
permalink: /.well-known/stellar.toml
---

NETWORK_PASSPHRASE = "Public Global Stellar Network ; September 2015"
ACCOUNTS = ["GCHW7CWI7GMIYQYFXMFJNJX5645XGWIINIAEQK3SABQO6CAYL5T7JYIH"]

[DOCUMENTATION]
ORG_NAME = "synt.tech"
ORG_URL = "https://synt.tech"
ORG_LOGO = "https://synt.tech/synt_tech_100c.png"
ORG_OFFICIAL_EMAIL = "hi@synt.tech"
ORG_DESCRIPTION = "synt.tech issues synthetic assets pegged to tradfi assets"

[[CURRENCIES]]
code = "sUSD"
name= " synthetic USD"
image= " https://synt.tech/sUSD_100c.png"
issuer = "GCHW7CWI7GMIYQYFXMFJNJX5645XGWIINIAEQK3SABQO6CAYL5T7JYIH"
display_decimals = 7
desc = "a synthetic USD asset on the Stellar network, price-pegged to USD but not redeemable or directly asset-backed"
conditions = "this asset is not redeemable for actual USD, instead it tracks the price of USD."
anchor_asset_type = "other"
anchor_asset = "USD"
</pre>
</body>
</html>
