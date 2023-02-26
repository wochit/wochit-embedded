# Webhook

Define and implement a webhook to be notified whenever an event is triggered by one of your end-users. The notification will be triggered asynchronously, whether the Video Editor iFrame is open or not.     
Set up your webhook endpoint [here!](https://admin.wochit.com/developers/integration-setup)   


## Video Production

We send a notification when a video has been produced successfully, video production has failed, or video has been deleted from the Wochit servers. Once a video event is triggered, a POST request will be sent to the provided Webhook address. Expect the following JSON structure (the content of the object is defined according to its type):   

<code-group>  
<code-block title="Video Produced" active>
```json
{
    "type" : "video.ready",
    "videoContext": "string-sent-when-opened-the-video-editor",
    "wochitVideoId": "6094092472a9105747957aa3",
    "thumbnailUrl": "http://example.com/direct-link-to-thumbnail",    
    "videoUrl": "https://example.com/direct-link-to-video", 
    "title": "The video title",
    "videoDuration" : 35.9
}
```
</code-block>

<code-block title="Video Deleted">
```json
{
    "type" : "video.delete",
    "videoContext": "string-sent-when-opened-the-video-editor",
    "wochitVideoId": "6094092472a9105747957aa3"
}
```

</code-block>

</code-group>

### Attributes:
***
**type** <code>string</code>   
The type of the event.
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
**videoDuration** <code>float</code>  
The duration of the video in seconds. 
***


## Drafts Management
We send a notification when a video draft has been created, updated or deleted. We send webhooks of events only if the draft has a [videoContext](/embed.html#customize-the-wochit-video-editor-by-using-the-following-properties) and the drafts management is enabled in the [admin panel](https://admin.wochit.com/my-video-editor) under *Look & Feel -> Features -> Allow saving drafts*.     
Expect the following JSON structure:

<code-group>
<code-block title="New Draft" active>
```json
{
    "type" : "draft.new",
    "videoContext": "string-sent-when-opened-the-video-editor",
    "wochitVideoId": "6094092472a9105747957aa3",
    "thumbnailUrl": "http://example.com/direct-link-to-thumbnail",    
    "title": "The video title" 
}
```
</code-block>



<code-block title="Draft Updated" >
```json
{
    "type" : "draft.update",
    "videoContext": "string-sent-when-opened-the-video-editor",
    "wochitVideoId": "6094092472a9105747957aa3",
    "thumbnailUrl": "http://example.com/direct-link-to-thumbnail",    
    "title": "The video title" 
}
```
</code-block>

<code-block title="Draft Deleted" >
```json
{
    "type" : "draft.delete",
    "wochitVideoId": "6094092472a9105747957aa3"
}
```
</code-block>

</code-group>


### Attributes:
***
**type** <code>string</code>   
The type of the event.
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
**title** <code>string</code>  
The title of the video. The title is given by the end-user. 
***

::: danger Important!   
* If you allow your users to save drafts, ensure that no more than one user works on the draft simultaneously, as auto-save can override the other user's changes.    
* The videoContext in the draft.update webhook is identical to the videoContext you used when first initiating the draft edit. It's strongly advised that you maintain a mapping between the wochit Video Id and the videoContext for future reference.
::: 

::: warning You might need to whitelist Wochit IPs to allow triggering the Webhook post:
* 54.81.68.237
* 54.147.58.230
* 52.1.193.159
* 18.204.107.61
* 100.25.120.71
:::


Need any technical assistance? [Contact us!](https://www.wochit.com/contact)   