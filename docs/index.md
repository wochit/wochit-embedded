# Quick Start
Add Wochit Video Creator to your platform and have  your customers create professional videos swiftly and intuitively, without leaving your site.   

The Wochit Video Creator can be fully customized to fit your brand and offer the right templates for your audience. [Log-in to our admin site](https://admin.wochit.com) to customize your Video Creator.  

**Get your video editor up and running in just 3 steps!**

1. [Get A User Token](/authentication.html#user-authentication)

2. [Embed your video creator](/embed.html#open-the-video-creator)

3. [Listen to a webhook](/webhook.html)


The general flow of the integration is as follows:  
![An image](./Wochit_API_user_flow.png)  
Our recommendation would be to add a link or a button to your app, offering end-users to create their very own video. As can be seen in the diagram above, once an end-user chooses to create a video, this is the expected flow:   

1. [Generate a token](/authentication.html#user-authentication) for the end-user  
2. Use the token to [open the video creator](/embed.html#embed-wochit-video-creator): an iFrame with your pre-customized Wochit Video Creator.  
3. Now it’s our part! Inside the Wochit Video Creator, your end-user may choose from a variety of templates, visuals and sounds to make the perfect video for their business.
4. While your customer enjoys the power of video creation, keep yourself aware of their actions. Once the video is ready, we will use a [webhook](webhook.html#webhook) to push the video along with its metadata back to your backoffice. 
 



Haven't found what you are looking for? [Contact us!](https://www.wochit.com/contact)   
