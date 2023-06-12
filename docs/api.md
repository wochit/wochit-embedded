# Wochit APIs

Enhance your integration by utilizing API calls to efficiently manage drafts and videos, while also enabling the extraction of template category IDs.

## Drafts & Videos


You can enable your users to clone or delete videos and drafts using the following API calls:

### Clone Draft

```bash
curl --request POST 'https://api.wochit.com/v1/users/drafts/{id}/clone' \
--header 'Authorization: Bearer <user token>' \
--header 'client-id: <client id>' \
--header 'Content-Type: application/json' \
}
```

### Delete Draft

```bash
curl --request DELETE 'https://api.wochit.com/v1/users/drafts/{id}' \
--header 'Authorization: Bearer <user token>' \
--header 'client-id: <client id>' \
--header 'Content-Type: application/json' \
}
```

### Clone Video

```bash
curl --request POST 'https://api.wochit.com/v1/users/videos/{id}/clone' \
--header 'Authorization: Bearer <user token>' \
--header 'client-id: <client id>' \
--header 'Content-Type: application/json' \
}
```

### Delete Video

```bash
curl --request DELETE 'https://api.wochit.com/v1/users/videos/{id}' \
--header 'Authorization: Bearer <user token>' \
--header 'client-id: <client id>' \
--header 'Content-Type: application/json' \
}
```

Please note that to access these APIs, you need your *Client ID* and a *user token*. You can find the Client ID in your [Developer Tools](https://admin.wochit.com/developers/integration-setup). The user token is a unique key [generated](/authentication.html#user-authentication) each time a user accesses the Wochit Video Editor.   

* ID - mandatory. This is a unique identifier of the video or draft.
* A draft\video can be deleted or cloned only by the user who created it. This is a default setup to help you secure your user's actions. If you need to remove this limitation please [contact us](https://www.wochit.com/contact).

#### Response  


The response for cloning a draft or a video will include the following JSON structure:

```json
{
  "wochitVideoId": "63ce6eaa7304484941234524",
  "title": "My Video",
  "thumbnail": "https://example.com/direct-link-to-thumbnail"
}
```

For successful deletion, the response will be a `204 No Content` status code.

### Attributes

The API responses include the following attributes:

***
**wochitVideoId** <code>string</code>  
Wochit unique identifier for this video. You can use it to [re-edit the video](/embed.html#customize-the-wochit-video-editor-by-using-the-following-properties). 
***
**title** <code>string</code>  
The title of the video. The title is given by the end-user. 
***
**thumbnail** <code>string</code>  
Direct link to the thumbnail of the video. Links have an expiration time of 24 hours so make sure you download the video to your system and use your own storage / CDN.    
***

### Error handling

The API follows conventional HTTP response codes for indicating success or failure. Here are some of the common error responses:  


<code-group>

<code-block title="400 - Bad Request" active>
```json
{
  "code": 400,
  "type": "Bad Request",
  "requestId": "a43e6ee3def25828cad8a2e9270b08c0",
  "errors": []
}
```
</code-block>

<code-block title="401 - Unauthorized" >
```json
{
  "code": 401,
  "type": "Unauthorized",
  "requestId": "dea7bfbd46d3a73a3f51f002550b5959",
  "errors": [
    {
      "parameter": null,
      "message": "Unauthorized",
      "details": null
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

If you encounter any errors, please provide the `requestId` for further assistance. 


## Template Categories

Each template in the template gallery belongs to one or more categories. You can choose the entire set of templates you’d like to include in your Video Editor in the [admin panel](https://admin.wochit.com/my-video-editor) under *Templates -> Wochit Template Packages*.      
Have your own set of templates and categories in the [admin panel](https://admin.wochit.com/my-video-editor) under *Templates -> My Templates -> Create*.    

Use the template IDs to filter templates when you [open the video creator](/embed.html#customize-the-wochit-video-editor-by-using-the-following-properties).   
To extract the IDs of your template categories using the API, use the following request:    

```bash
curl --request POST 'https://api.wochit.com/v1/accounts/templates/categories' \
--header 'secret-key: <secret key>' \
--header 'client-id: <client id>' \
--header 'Content-Type: application/json' \
}'
```

Please refer to the [Developer Tools](https://admin.wochit.com/developers/integration-setup) to obtain your *Client ID* and *Secret Key*.

The response will be structured in a JSON format and will include the registered and owned categories:

```json
{
  "registered": [
    {
      "id": "62543d82f22d3777bc28986c",
      "name": "Education"
    }
  ],
  "owned": [
    {
      "id": "647f33677387131d481f2d30",
      "name": "My Category"
    }
  ]
}
```

The response is structured in a JSON format with the following parameters:

***
**registered** <code>object[]</code>
List of categories selected in the Wochit Admin. 
***
**owned** <code>object[]</code>
Your custom categories created using the Wochit Studio application.
***
- **id** <code>string</code> 
A Unique identifier of each category. Use the [categoryIds](/embed.html#customize-the-wochit-video-editor-by-using-the-following-properties) property to filter the template gallery.
***
- **name** <code>string</code> 
The Name of the category. Use the [categoryNames](/embed.html#customize-the-wochit-video-editor-by-using-the-following-properties) property to filter the template gallery.
***


### Error handling


Similar to the Drafts & Videos section, the API uses conventional HTTP response codes for indicating success or failure. The possible error responses include:


<code-group>

<code-block title="400 - Bad Request" active>
```json
{
  "code": 400,
  "type": "Bad Request",
  "requestId": "a43e6ee3def25828cad8a2e9270b08c0",
  "errors": []
}
```
</code-block>

<code-block title="401 - Unauthorized" >
```json
{
  "code": 401,
  "type": "Unauthorized",
  "requestId": "dea7bfbd46d3a73a3f51f002550b5959",
  "errors": [
    {
      "parameter": null,
      "message": "Unauthorized",
      "details": null
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

If you encounter any errors, please provide the `requestId` for further assistance.