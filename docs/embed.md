# Embed Wochit Video Creator


## Install the Wochit JavaScript module

The Wochit JavaScript module may be installed as an NPM package, or as an HTML script snippet.


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





## Set configuration

Call the config() method to set up the integration context. This method must be called only **once** in the scope, where *Client ID* and *userToken* are easily available.

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

*** 
**clientId** <code>string</code> <Badge text="Required" type="warning"/>  
Your unique *Client ID*.  
Log-in to the Wochit [Developers’ Tools](https://admin.wochit.com/developers/integration-setup) to obtain your *Client ID*. 
***  
**userToken** <code>string</code> <Badge text="Required" type="warning"/>  
A user token that is the unique key generated every time a user accesses the Wochit Video Creator, as explained [above](/authentication.html#user-authentication).
***



## Open the video creator

Call openVideoCreator() to open your customized Wochit Video Creator in an iFrame.  
The following example shows how to create a button or a link that triggers the openVideoCreator action: 
  


<code-group>
<code-block title="Module" active>
```js
import { openVideoCreator } from '@wochit/embedded';

document.querySelector('.video-creator-btn').addEventListener('click', () => {
  openVideoCreator({
    videoContext: 'my-page-context',
    on: {
      loaded: ($iframe) => {
        console.log('loaded', $iframe);
      },
      ready: () => {
        console.log('ready');
      },
      abort: (payload) => {
        console.log('abort', payload);
      },
      produce: (payload) => {
        console.log('produce', payload);
      },
    },
  }); 
});
```
</code-block>

<code-block title="HTML">
```js
document.querySelector('.video-creator-btn').addEventListener('click', () => {
  window.wt('openVideoCreator', {
    videoContext: 'my-page-context',
    on: {
      loaded: ($iframe) => {
        console.log('loaded', $iframe);
      },
      ready: () => {
        console.log('ready');
      },
      abort: (payload) => {
        console.log('abort', payload);
      },
      produce: (payload) => {
        console.log('produce', payload);
      },
    },
  });
});
```
</code-block>

</code-group>


#### Customize the Wochit Video Creator by using the following properties:  
*** 
**videoContext** <code>string</code> <Badge text="Optional" />   
This property can be set as a unique identifier. It could be a customer ID, a page ID, or any other metadata you may want to use to reconcile the produced video with your internal systems. [We will send it back](/webhook.html) with the produced video so you can know where the video belongs.   
*Sending videoContext is highly recommended*
*** 
**on** <code>object</code> <Badge text="Optional" />   
While your end-user interacts with the Wochit Video Creator iFrame, events will be triggered to notify you of the user’s actions and allow you to react to these.   
For more information see [Triggered Events](/embed.html#triggered-events).
***  
**showCreativeGallery** <code>boolean</code> <Badge text="Optional" />   
Whether to allow users to choose from Wochit’s extensive library of rights-cleared stock photos and videos image and video creative library.  
*(The default value can be set in the [admin panel](https://admin.wochit.com/my-video-creator) under *Look & Feel -> Advanced -> Stock photos & videos*.
)*   
***
**showUploadGallery** <code>boolean</code> <Badge text="Optional" />     
Whether to allow users to upload their own content from their device.   
*(The default value can be set in the [admin panel](https://admin.wochit.com/my-video-creator) under *Look & Feel -> Advanced -> Self upload photos and videos*.)*

***
**destLanguage** <code>string</code> <Badge text="Optional" />      
Pass language code to adjust the Video Editor UI. Available options are: en, es, fr and de.  
*(The default value can be set in the [admin panel](https://admin.wochit.com/my-video-creator) under *Look & Feel -> Localization -> Language*.)*   
Note: Our default language is English. 
***
**aspectRatios** <code>string[]</code> <Badge text="Optional" />  
To filter the templates with specific aspect ratios, pass a list of comma-separated aspect ratios. 
*(The default value can be set in the [admin panel](https://admin.wochit.com/my-video-creator) under *Templates -> Aspect Ratio*.)*
This filtering can be used in order to present templates targeted to different social media platforms. 
```javascript
aspectRatios: 'ASPECT_16_9, ASPECT_1_1'
```
Available options are: ASPECT_16_9, ASPECT_1_1 and ASPECT_9_16.
***
**galleryAssets** <code>object[]</code> <Badge text="Optional" />  
You may pass a list of image / video URLs. The Wochit Video Creator will show these assets under the "My Gallery" tab, for the end-user to choose for their video.  
See how you can [personalize the user experience](/embed.html#add-personal-asset-gallery) by sending an array of the user's personal assets.
***
**linkedFields** <code>object</code> <Badge text="Optional" />  
Wochit’s Video Creator can jump-start the templates with pre-injected data, personalized to each user.   
You can [personalize the user experience](/embed.html#linked-fields) by sending an array of personal data injected into the video.
***
**categoryNames** <code>string[]</code> <Badge text="Optional" />   
Each template in the template gallery belongs to one or more categories. In the [admin panel](https://admin.wochit.com/my-video-creator) you can choose the entire set of templates you’d like to include in your Video Creator. Use the categoryName parameter to filter the template gallery for specific categories. For example - this filtering can be used in order to present one set of templates for end-users accessing the Video Creator from entry point A, and a different set of templates for end-users accessing from entry point B.  
To filter the templates for specific categories, pass a list of comma-separated category names. If empty, the entire gallery of templates will be shown.

```javascript
categoryNames: 'Food,Wellness,Story Telling,TikTok'
```
Here's a [full list](/categories.html) of available template categories.
***
**videoId** <code>string</code> <Badge text="Optional" />  
By launching the Wochit Video Creator with a specific videoID, you may get the user directly into re-editing a previously produced video.   
If not specified, the Wochit Video Creator will open with the template gallery page, where users create a brand new video.   
Note, that when re-editing a video, a new video ID will be assigned to the edited video.
***
**containerEl** <code>HTMLElement</code> <Badge text="Optional" />  
By default, the Wochit Video Creator will open as a modal in your website / app.    
If you wish to embed the Video Creator as an inline element inside a page, you can pass a container element to the containerEl property:
```javascript
var videoCreatorContainer = document.createElement('div');
openVideoCreator({
  containerEl: videoCreatorContainer
});
```
***



## Triggered Events
As the user interacts with the Wochit Video Creator, a few events will be triggered. You are welcome to implement callback functions on your side and react to any of these events.
<code>on.loaded</code>
Triggered when the Video Creator resources have been loaded.  

<code>on.ready</code>
Triggered when the Video Creator is ready to use and the user can start working.  

<code>on.abort</code>
Triggered when the user clicked the ‘Exit’ button or chose to close the Video Creator.  

<code>on.produce</code>
Triggered when the user clicked the ‘Produce’ button. In this case, a payload with the wochit videoId will be passed to the event.  
Payload example:

```json
{
  duration: 18.5341
  title: "Video Title"
  videoContext: "ABC"
  videoId: "6094092472a9105747957aa3"
  videoState: "PROCESSING"
}
```

#### Attributes:
***
**duration** <code>float</code>  
The video duration in seconds. 
***
**title** <code>string</code>  
The title of the video.  
***
**videoContext** <code>string</code>  
String initiated when calling openVideoCreator(). [videoContext](/embed.html#you-can-customize-the-video-creator-by-using-the-following-properties) connects the video to the video creator instance, so you can know where the video belongs to. 
***
**videoId** <code>string</code>  
Wochit unique identifier for this video. You can use it to [re-edit the video](/embed.html#you-can-customize-the-video-creator-by-using-the-following-properties). 
***
**videoState** <code>string</code>   
This property indicates the state of the video. 'PROCESSING' is the initial state of the video.  
***



<code>on.produce_done</code>
Triggered as soon as a video is produced. A payload with a link to the video alongside some additional metadata will be passed to the event:   
Payload example:

<code-group>
<code-block title="Success" active>
```json
{
  state: "DONE",
  videoId: "6094092472a9105747957aa3",
  duration: 35.192, 
  videoContext: "string-sent-when-opened-the-video-creator",
  title: "The video title",
  videoUrl: "https://example.com/direct-link-to-video",
  thumbnailUrl: "http://example.com/direct-link-to-thumbnail",
}
```
</code-block>

<code-block title="Failure - (Rare)">
```json
{
  state: "FAILED",
  videoId: "6094092472a9105747957aa3",
  duration: null,
  videoContext: null,
  title: null,
  videoUrl: null,
  thumbnailUrl: null
}
```
</code-block>

</code-group>

#### Attributes:
***
**state** <code>string</code>   
This property indicates the state of the video. 'DONE' means that the video has been produced successfully. 'FAILED' means that the video production failed. 
***
**wochitVideoId** <code>string</code>  
Wochit unique identifier for this video. You can use it to [re-edit the video](/embed.html#you-can-customize-the-video-creator-by-using-the-following-properties). 
***
**duration** <code>float</code>  
The video duration in seconds. 
***
**videoContext** <code>string</code>  
String initiated when calling openVideoCreator(). [videoContext](/embed.html#you-can-customize-the-video-creator-by-using-the-following-properties) connects the video to the video creator instance, so you can know where the video belongs to. 
***
**title** <code>string</code>  
The title of the video. The user can edit the video title in the video creator.  
***
**videoUrl** <code>string</code>  
Direct link to the video. Links have an expiration time of 24 hours so make sure you download the video to your system and use your own storage / CDN.  
***
**thumbnailUrl** <code>string</code>  
Direct link to the thumbnail (poster frame) of the video. Links have an expiration time of 24 hours so make sure to download it to your system and use your own storage / CDN.  
***


::: danger Important!
A faster and safer way for retrieving the video file at the end of the process is by implementing a listener to [a webhook endpoint](/webhook.html).

:::

Need any technical assistance? [Contact us!](https://www.wochit.com/contact/) 


## Personalize the Experience

All default values for the Wochit Video Creator are defined in our [admin tool](https://admin.wochit.com/my-video-creator).  
However, sometimes, you may need to personalize the experience for specific users. For example - you may want to add more features to premium users; or set up a different UI language for users based on their localization. This can be done by setting overriding the defaults and passing specific parameters to the openVideoCreator() function.   



### Add personal asset gallery
In case your platform already stores photos or videos associated with your customer (e.g. assets they’ve uploaded directly to your platform), it is fairly easy to present them with their own gallery inside the Wochit Video Creator. All you have to do is pass a list of image / video URLs. These assets will be shown in the ‘My Gallery’ tab for the user to pick and choose for their video creation. Personalized galleries may be organized in folders.  

```javascript
galleryAssets: [
  {
    title: 'My Project',
    assets: [
      {
        url: 'https://cdn1.sample.com/image1.jpg',
        type: 'image',
      },
      {
        url: 'https://cdn1.sample.com/video.mp4',
        thumbnailUrl: 'https://cdn1.sample.com/videoThumbnail.jpg'
        duration: 2.21, 
        type: 'video',
      },
    ],
  },
  {
    title: 'My Profile',
    assets: [
      {
        url: 'https://cdn1.sample.com/image2.jpg',
        type: 'image',
      },
      {
        url: 'https://cdn1.sample.com/video2.mp4',
        thumbnailUrl: 'https://cdn1.sample.com/videoThumbnail2.jpg'
        duration: 5.21, 
        type: 'video',
      },
    ],
  },
]
```

The galleryAssets property is structured in a JSON format with the following parameters:  
**title** <code>string</code> <Badge text="Required" type="warning"/> 
This is the name of the folder.  
***
**assets** <code>object[]</code> <Badge text="Required" type="warning"/> 
An array of assets objects. Each asset has the following properties: 

- **type** <code>string</code> <Badge text="Required" type="warning"/>  
The type of the asset. Can be *image* or *video*. 
***
- **url** <code>string</code> <Badge text="Required" type="warning"/>  
Direct link to the media asset. This should be a cross-origin link that is available for us to download.   
Supported formats: png, jpeg for images and mp4 and mov for video assets. 
***
- **thumbnailUrl** <code>string</code> <Badge text="Required*" type="warning"/> (*only if the asset is a *video*)   
Direct link to the video thumbnail. This should be a cross-origin link that is available for us to download.  
Supported formats: png and jpeg.
***
- **duration** <code>float</code> <Badge text="Required*" type="warning"/> (*only if the asset is a *video*)   
The video duration in seconds. 
***


### Linked fields

The Wochit Video Creator can jump-start the templates with pre-injected data, personalized to each user. Use Linked Fields to auto-fill texts like user name, address, project name, etc; as well as to pre-select assets for the video, such as: company logo, project pictures and so on. [Click here](https://www.wochit.com/contact/) to learn how Linked Fields can speed up the video creation process to literally 2 clicks per video.  







