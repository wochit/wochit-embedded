# Quick Start

Give your platform users the power to create professional videos through our intuitive, embeddable, and easy-to-use white-label video editor.

Get your video editor up and running in just 3 steps!

## Get User Token
Call Wochit REST API to get a user token which will be used to open the Video Creator. 

Use your API keys to authenticate requests. You can view (and manage?) your API keys in the Settings Dashboard

Authentication Request:
```bash
curl https://studio-api.wochit.com/api/v1/authentication/insideUserTokens
  -H "Authorization": "Bearer <client_secret>" -H "client-id": <client_id> -H "Content-Type": "application/json"
```

<code-group>
<code-block title="Request Payload" active>
```json
{
  "user": {
    "id": <user's-identifier>,
    "email": <user's-email>,
    "firstName": <user's-first-name>,
    "lastName": <user's-last-name>
  }
}
```
</code-block>

<code-block title="Response">
```json
{
"token":
  {
    "value": <token-value>,
    "expirationDate": <token-expiration-date>
  }
}
```
</code-block>

</code-group>

TBD...