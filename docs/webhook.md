# Webhook


Define and implement a  webhook to be notified whenever a video is created by one of your end-users.  The notification will be triggered asynchronously, whether the Video Editor iFrame is open or not.    
Set up your webhook endpoint [here!](https://admin.wochit.com/developers/integration-setup) 

Once a video is successfully produced on the Wochit servers,  a POST request will be sent to  the Webhook address provided. Expect the following JSON structure:


```json
{
    "videoContext": "string-sent-when-opened-the-video-editor",
    "wochitVideoId": "6094092472a9105747957aa3",
    "thumbnailUrl": "http://example.com/direct-link-to-thumbnail",    
    "videoUrl": "https://example.com/direct-link-to-video", 
    "title": "The video title" 
}
```
### Attributes:
***
**videoContext** <code>string</code>   
String initiated when calling openVideoEditor(). [videoContext](/embed.html#customize-the-wochit-video-editor-by-using-the-following-properties) connects the video to the Video Editor instance, so you can associate the video with the right end-user, customer or page it belongs to. 
***
**wochitVideoId** <code>string</code>  
Wochit unique identifier for this video. You can use it to [re-edit the video](/embed.html#customize-the-wochit-video-editor-by-using-the-following-properties). 
***
**thumbnailUrl** <code>string</code>  
Direct link to the thumbnail of the video. Links have an expiration time of 24 hours so make sure you download the video to your system and use your own storage / CDN.    
***
**videoUrl** <code>string</code>  
Direct link to the video. Links have an expiration time of 24 hours so make sure you download the video to your system and use your own storage / CDN.  
***
**title** <code>string</code>  
The title of the video. The title is given by the end-user. 
***
::: warning You might need to whitelist Wochit IPs to allow triggering the Webhook post:
* 54.81.68.237
* 54.147.58.230
* 52.1.193.159
* 18.204.107.61
* 100.25.120.71
:::

Need any technical assistance? [Contact us!](https://www.wochit.com/contact) 



