# webhook


We use webhooks to let your application know when the video has been produced asynchronously, outside of a video creator instance.  
Set up your webhook endpoint here! 

We'll make a POST request to the address you give us and you can do whatever you need with it on your end.
You can expect the following JSON structure:


```json
{
    "videoContext": "string-sent-when-opened-the-video-creator",
    "wochitVideoId": "6094092472a9105747957aa3",
    "thumbnailUrl": "http://example.com/direct-link-to-thumbnail",    
    "videoUrl": "https://example.com/direct-link-to-video", 
    "title": "The video title" 
}
```
### Attributes:
***
**videoContext** <code>string</code>   
String initiated when calling openVideoCreator() [ link to the videoContext property of the function above]  
***
**wochitVideoId** <code>string</code>  
Wochit unique identifier for this video. You can use it to re-edit the video. Learn more here [link to the videoId property of the function above]  
***
**thumbnailUrl** <code>string</code>  
Direct link to the thumbnail of the video  
***
**videoUrl** <code>string</code>  
Direct link to the video. Links have an expiration time of X minutes so you should download it to your system and use your own CDN.  
***
**title** <code>string</code>  
The title of the video.  
***
::: warning You might need to whitelist Wochit IPs To Allow Webhooks :
* 54.81.68.237
* 54.147.58.230
* 52.1.193.159
* 18.204.107.61
* 100.25.120.71
:::



