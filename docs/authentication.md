# User Authentication

Call Wochit REST API to get a *user-token* which will be used to open the Video Creator.  
A *user-token* is requiered to intialize the Video Creator. It will allow us to identify you and your user.

Use your API keys to authenticate requests. You can view your API keys in the Settings Dashboard



<code-group>

<code-block title="cURL" active>

```bash
curl https://studio-api.wochit.com/api/v1/authentication/insideUserTokens \
  -H "Authorization: Bearer <client_secret>" -H "client-id: <client_id>" \
  -H "Content-Type: application/json" \
  -d {
  "user": {
    "id": "<user_identifier>",
    "email": "<user_email>",
    "firstName": "<user_first-name>",
    "lastName": "<user_last-name>"
  }
}
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
  hostname: 'studio-api.wochit.com',
  port: 443,
  path: '/api/v1/authentication/insideUserTokens',
  method: 'POST',
  headers: {
    'channel-id': '<client_id>',
    'Authorization': 'Bearer <client_secret>',
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

fetch('https://studio-api.wochit.com/api/v1/authentication/insideUserTokens', {
  method: 'POST',
  headers: {
    'channel-id': '<client_id>',
    authorization: 'Bearer <client_secret>',
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
client_secret = "my-client-secret"
headers = {
    "client-id": str(client_id),
    "Authorization": "Bearer " + client_secret,
    "Content-Type": "application/json"
}

data = {"user": {"id": "<user-id>", "email": "<user-email>", "firstName": "<user-first-name>", "lastName": "<user-last-name>"}}

auth_url = "https://studio-api.wochit.com/api/v1/authentication/insideUserTokens"
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
        .uri(URI.create("https://studio-api.wochit.com/api/v1/authentication/insideUserTokens"))
        .POST(HttpRequest.BodyPublishers.ofString(requestBody))
        .header("Content-Type", "application/json")
        .header("Authorization", "Bearer <client_sercet>")
        .header("channel-id", "<client_id>")
        .build();

HttpResponse<String> response =
        HttpClient.newBuilder().build().send(request, HttpResponse.BodyHandlers.ofString());

System.out.println(response.body());
```
</code-block>

</code-group>

Authenticate via bearer authentication sending the followings:  
Header: *client-id* and *client-secret* - these are your API keys.     
Data: *User* object that contains information about the user. Note: user.id is a unique identifier of your user and is a
required parameter. Email, firstName and lastName are optional.




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

The token value is the userToken. Use userToken to open the Wochit video creator! [link to next phase]

### Errors

We use conventional HTTP response codes to indicate the success or failure of an API request.


<code-group>

<code-block title="400 - Bad Request" active>
```json
{
  'code': 400,
  'message': 'Something Wrong Happened: TraceId: cbfa9fe4430d56be59cc96b26ee12eb3',
  'details': None
}
```
</code-block>

<code-block title="401 - Unauthorized" >
```json
{
  'code': 401,
  'message': 'Something Wrong Happened: TraceId: 1253ee8a4dec867c16e002fd7e15d164',
  'details': None
}
```
</code-block>

<code-block title="500 - Internal Server Error (Rare)" >
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

Contact us if you need any technical assistance.