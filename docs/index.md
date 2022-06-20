# Quick Start
Adding Wochit video creator to your web or mobile platform means your customers can create polished, high-quality videos without leaving your site. It’s fast, easy to integrate, and customizable to deliver a video experience specific to your users.  

Give your platform users the power to create professional videos through our intuitive, embeddable, and easy-to-use white-label video editor!


You should [Generate a token](/authentication.html#user-authentication) for each user and use the token to [open the video creator](/embed.html#embed-wochit-video-creator) in your web application. Your user will be able to select a template and produce a video based on the template they selected. Once the video is ready, we will send you a notification using [webhooks](webhook.html#webhook).

Haven't found what you are looking for? [Contact us!](https://admin.wochit.com/contact-us)   

![An image](./docs/Wochit API user flow temp.png)     

**Get your video editor up and running in just 3 steps!**

## Step 1: Get User Token

A user token is a unique access token that is used to authenticate the user. It will allow us to identify the user.  
Call Wochit REST API to get a *userToken* which will be used to open the Video Creator. 

Use your API keys to authenticate requests. 
Post your *Client ID* and *Secret Key* along with your user's data.   
Get your *Client ID* and *Secret Key* in the [Developers Settings](https://admin.wochit.com/developers)   

<code-group>
<code-block title="cURL" active>
```bash
curl https://studio-api.wochit.com/api/v1/authentication/insideUserTokens \
  -H "Authorization: Bearer <secret_key>" -H "client-id: <client_id>" \
  -H "Content-Type: application/json" \
  -d {"user":{"id": "<user_identifier>"}}
```
</code-block>

</code-group>


<code-group>
<code-block title="Authenticated Response - 200" active>
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


Use the token value to open the Wochit video creator in the next step. The token expiration time is 24 hours. 

More on Authentication [here!](/authentication.html#user-authentication)



## Step 2: Embed your video creator


### Install the Wochit JavaScript module

You can install the Wochit JavaScript module as an NPM package or set an HTML script snippet.


<code-group>

<code-block title="NPM" active>
```sh
npm i @wochit/embedded
```
</code-block>

<code-block title="PNPM">
```sh
pnpm add @wochit/embedded
```
</code-block>

<code-block title="YARN">
```sh
yarn add @wochit/embedded
```
</code-block>

<code-block title="HTML">
```html
<script type="application/javascript">
(function (window, document, tag, url, name, a, m) {
    window['__wochit_object_name__'] = name;
    window[name] =
      window[name] ||
      function () {
        (window[name].q = window[name].q || []).push(arguments);
};
    (a = document.createElement(tag)), (m = document.getElementsByTagName(tag)[0]);
    a.async = 1;
    a.src = url;
    m.parentNode.insertBefore(a, m);
  })(window, document, 'script', 'https://embedded.wochit.com/latest.min.js', ‘wochit’);
</script>
```
</code-block>

</code-group>





### Context configuration

Call config() to set up the integration context. It must be called only once in the scope where *Client ID* and *userToken* are easily available. 

<code-group>

<code-block title="Module" active>
```js
import { config } from '@wochit/embedded';

config({ clientId, userToken });
```
</code-block>

<code-block title="HTML">
```js
window.wt('config', { clientId, userToken });
```
</code-block>

</code-group>





### Open the video creator

Call openVideoCreator() to open the video creation application.


<code-group>
<code-block title="Module" active>
```js
import { openVideoCreator } from '@wochit/embedded';

document.querySelector('.video-creator-btn').addEventListener('click', () => {
  openVideoCreator({}); 
});
```
</code-block>

<code-block title="HTML">
```js
document.querySelector('.video-creator-btn').addEventListener('click', () => {
  window.wt('openVideoCreator', {});
});
```
</code-block>

</code-group>

This javascript should be launched from your site. See how you can [configure your video creator!](/embed.html#open-the-video-creator)




## Step 3: Listen to a webhook

We use webhooks to let your application know when the video has been produced asynchronously, after it was published in the video creator application.
Set up your webhook [here!](https://admin.wochit.com/settings)

We'll make a POST request to the address you give us and you can do whatever you need with it on your end.
You should expect the following JSON structure:


```json
{
    "videoContext": "string-sent-when-opened-the-video-creator",
    "wochitVideoId": "6094092472a9105747957aa3",
    "thumbnailUrl": "http://example.com/direct-link-to-thumbnail",    
    "videoUrl": "https://example.com/direct-link-to-video", 
    "title": "The video title" 
}
```

Read more about webhooks [here!](/webhook.html)

