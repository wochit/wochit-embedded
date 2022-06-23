# User Authentication

## Get a user token

A user token is a unique access token that is used to authenticate the user. It will allow us to identify the user.

Call Wochit REST API to get a *user-token* which will be used to open the Video Creator.  
A *user-token* is required to initialize the Video Creator. It will allow us to identify you and your user.

Use your API keys to authenticate requests. You can view your *Client ID* and *Secret Key* in the [Developers Settings](https://admin.wochit.com/developers).



<code-group>

<code-block title="cURL" active>

```bash
curl --request POST 'https://authentication.wochit.com/api/v1/embedded/users/tokens' \
--header 'Authorization: Bearer <secret key>' \
--header 'client-id: <client id>' \
--header 'Content-Type: application/json' \
--data-raw '{
    "user": {
        "id": "<your user id>",
        "email": "<user_email>",
        "firstName": "<user_first-name>",
        "lastName": "<user_last-name>"
    }
}'
```

</code-block>

<code-block title="Node.js v<18">

```javascript
const https = require('https');

const data = JSON.stringify({
  user: {
    id: "<user-identifier>",
    email: "<user-email>",
    firstName: "<user-first-name>",
    lastName: "<user-last-name>"
  },
});

const options = {
  hostname: 'authentication.wochit.com',
  port: 443,
  path: '/api/v1/embedded/users/tokens',
  method: 'POST',
  headers: {
    'channel-id': '<client_id>',
    'Authorization': 'Bearer <secret_key>',
    'Content-Type': 'application/json',
    'Content-Length': data.length,
  },
  data:  data,
};

const req = https.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`);

  res.on('data', d => {
    process.stdout.write(d);
  });
});

req.on('error', error => {
  console.error(error);
});

req.write(data);
req.end();
```
</code-block>

<code-block title="Node.js v18+">

```javascript
const body = JSON.stringify({
  user: {
    id: "<user-identifier>",
    email: "<user-email>",
    firstName: "<user-first-name>",
    lastName: "<user-last-name>"
  },
});

fetch('https://authentication.wochit.com/api/v1/embedded/users/tokens', {
  method: 'POST',
  headers: {
    'channel-id': '<client_id>',
    authorization: 'Bearer <secret_key>',
    'content-type': 'application/json',
  },
  credentials: 'omit',
  body,
})
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.status);
    }
  })
  .then((res) => {
    console.log('token', res.token.value);
  })
  .catch((res) => {
    console.error('fetch error', res);
  });
```
</code-block>

<code-block title="Python">

```python
import requests
import json

client_id = "my-client-id"
secret_key = "my-client-secret"
headers = {
    "client-id": str(client_id),
    "Authorization": "Bearer " + secret_key,
    "Content-Type": "application/json"
}

data = {"user": {"id": "<user-id>", "email": "<user-email>", "firstName": "<user-first-name>", "lastName": "<user-last-name>"}}

auth_url = "https://authentication.wochit.com/api/v1/embedded/users/tokens"
response = requests.post(auth_url, json=data, headers=headers)
json.loads(response.text)
```

</code-block>

<code-block title="Java">

```java
UserToken.User user = UserToken.User.builder().id("userId").build();
UserToken userToken = UserToken.builder().user(user).build();

String requestBody = new ObjectMapper().writeValueAsString(userToken);

HttpRequest request = HttpRequest.newBuilder()
        .uri(URI.create("https://authentication.wochit.com/api/v1/embedded/users/tokens"))
        .POST(HttpRequest.BodyPublishers.ofString(requestBody))
        .header("Content-Type", "application/json")
        .header("Authorization", "Bearer <secret_key>")
        .header("channel-id", "<client_id>")
        .build();

HttpResponse<String> response =
        HttpClient.newBuilder().build().send(request, HttpResponse.BodyHandlers.ofString());

System.out.println(response.body());
```
</code-block>

</code-group>

Authenticate via bearer authentication sending the followings:  
**Header**: *Client ID* and *Secret Key* - these are your API keys.   
Your API keys carry many privileges, so be sure to keep them secure! Do not share your secret API keys in publicly accessible areas such as GitHub, client-side code, and so forth.     
   
**Data**: *User* object that contains information about the user.   
Note: **user.id** is a unique identifier of your user and **is a
required parameter**. Email, firstName and lastName are optional for statistics and usage reports.




<code-group>

<code-block title="Authenticated Response: 200 - OK" active>
```json
{
  "token": {
    "value": <token-value>,
    "expirationDate": <token-expiration-date>
  }
}
```
</code-block>

</code-group>

The token value is the *userToken*. Use *userToken* to [open the Wochit video creator!](/embed.html#set-configuration) 
The token expiration time is 24 hours. 

## Error handling

We use conventional HTTP response codes to indicate the success or failure of an API request.


<code-group>

<code-block title="400 - Bad Request" active>
```json
{
    "code": 400,
    "type": "Bad Request",
    "requestId": "cd1573f505be1e12aa023e500db50a09",
    "errors": [
        {
            "parameter": "use1",
            "message": "UNRECOGNIZED_PROPERTY",
            "details": "Unrecognized field \"use1\" (class models.requests.CreateInsideUserTokenRequestModel), not marked as ignorable"
        }
    ]
}
```
</code-block>

<code-block title="401 - Unauthorized" >
```json
{
    "code": 401,
    "type": "Unauthorized",
    "requestId": "a01bba8890f480fc0aef7d3723feb523",
    "errors": [
        {
            "message": "HTTP 401 Unauthorized"
        }
    ]
}
```
</code-block>

<code-block title="500 - Internal Server Error (Rare)" >
```json
{
    "code": 500,
    "type": "Internal Server Error",
    "requestId": "90a5f277e13f78e26dbfd0d02c37f2d7",
    "errors": []
}
```
</code-block>
</code-group>

Need any technical assistance? [Contact us!](https://admin.wochit.com/contact-us) 