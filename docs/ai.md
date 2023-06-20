# Wochit AI API Documentation

The Wochit AI API allows you to generate videos or drafts based on a prompt, images, and a description of the desired outcome.

### API Endpoints

There are two endpoints available for generating videos or drafts:

1. To create a draft, make a POST request to the following URL:
   - Endpoint: `https://api.wochit.com/v1/ai/drafts`

2. To create a video, make a POST request to the following URL:
   - Endpoint: `https://api.wochit.com/v1/ai/videos`
   

#### Example:
```bash
curl --request POST 'https://api.wochit.com/v1/ai/videos' \
--header 'Authorization: Bearer <user token>' \
--header 'client-id: <client id>' \
--header 'Content-Type: application/json' \
--data { "prompt": "string" }
}
```

Please note that to access these APIs, you need your *Client ID* and a *user token*. You can find the Client ID in your [Developer Tools](https://admin.wochit.com/developers/integration-setup). The user token is a unique key [generated](/authentication.html#user-authentication) each time a user accesses the Wochit Video Editor.   


### Request Payload

The request payload for both endpoints should be in JSON format and include the following properties:

```json
{
  "prompt": "string",
  "instructions": "string",
  "templateId": "string",
  "categoryIds": ["string"],
  "aspectRatios": ["ASPECT_16_9"],
  "videoContext": "string",
  "mediaGalleryAssets": [
    {
      "url": "string",
      "caption": "summer day football",
      "thumbnailUrl": "string"
    }
  ],
  "colors": ["112341", "FFFFFF"],
  "fonts": ["OpenSans-Regular", "OpenSans-Regular"]
}
```

***
**prompt** <code>string</code> <Badge text="Required" type="warning" />
The prompt can be either a textual description, providing as much detail as possible about the video, or a URL that the video should be based on.
***
**instructions** <code>string</code> <Badge text="Optional"  />
Used for specifying the generation instructions for the text of the video. Note that creative instructions will be ignored.
***
**templateId** <code>string</code> <Badge text="Optional"  />
The ID of the template to be used for generating the video. If you don't provide a template ID, one will be randomly selected from all the available templates in your account.   
If *templateId* is not provided, we utilize the *categoryIds* and *aspectRatios* to fetch a random template that matches these parameters.
***
**categoryIds** <code>string[]</code> <Badge text="Optional"  />
If category IDs are provided, a template will be randomly selected from at least one of the categories you have provided. You can extract the category IDs using [our API](/api.html#template-categories).
***
**aspectRatios** <code>string[]</code> <Badge text="Optional"  />
Specifies the aspect ratio of the video or draft. If it's not sent, the aspect ratio will be determined by the template. Available options are: ASPECT_16_9, ASPECT_1_1, and ASPECT_9_16.
***
**videoContext** <code>string</code> <Badge text="Optional"  />
The "videoContext" property is optional but highly recommended. It can be set as a unique identifier such as a customer ID, a page ID, or any other metadata that helps reconcile the produced video with your internal systems. This property will be sent back with the produced video, allowing you to know where the video belongs.
***
**mediaGalleryAssets** <code>object[]</code> <Badge text="Optional"  />
A list of assets that should be used in the video. Each asset should include a "url" (*mandatory*) and must include "thumbnailUrl" if the asset is a video. The caption is optional, allowing us to better understand the asset to know where to place it in the video by AI. In case there's no caption, we try to generate one ourselves using AI.
The caption should be a description of the image visually or textually.
***
**colors** <code>string[]</code> <Badge text="Optional"  />
A list of colors to brand the video. The first color is the primary color, and you can send up to 4 colors. If the "colors" property is not provided, the colors of the template will be selected as default.
***
**fonts** <code>string[]</code> <Badge text="Optional"  />
A list of fonts to be used in the video or draft. Please contact us to obtain a full list of available fonts.
***

### Response

Successful response from the Wochit AI API is indicated by a 204 status code and an empty body. You will receive a webhook notification when a draft is created or a video is produced.    
Please note that draft webhooks are sent only if you have enabled drafts support in your account.

### Error handling


Our AI API uses conventional HTTP response codes for indicating success or failure. The possible error responses include:


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