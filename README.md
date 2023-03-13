# CBC-News-Streams.js

<div align="center">
<a href="https://github.com/MarketingPipeline/CBC-News-Streams.js"> 
<img height=350 alt="Repo Banner for CBC-News-Streams.js" src="https://capsule-render.vercel.app/api?type=waving&color=539bf5&height=300&section=header&text=CBC-News-Streams.js&fontSize=60&fontColor=ffffff&animation=fadeIn&fontAlignY=38&desc=Fetch%20live%20stream%20urls%20from%20CBC.ca%20&descAlignY=60&descAlign=50"></img></a>

</div>  
    
<p align="center">
  <b>A JavaScript library for fetching free live IPTV stream URLs from CBC News</b>

  <br>
  <small> <b><i>Show your support!</i> </b></small>
  <br>
   <a href="https://github.com/MarketingPipeline/CBC-News-Streams.js">
    <img title="Star on GitHub" src="https://img.shields.io/github/stars/MarketingPipeline/CBC-News-Streams.js.svg?style=social&label=Star">
  </a>
  <a href="https://github.com/MarketingPipeline/TheMovieDB-API-Wrapper.js/fork">
    <img title="Fork on GitHub" src="https://img.shields.io/github/forks/MarketingPipeline/CBC-News-Streams.js.svg?style=social&label=Fork">
  </a>
   </p>  

A pure JavaScript library for easily fetching free live stream urls (m3u format) for live TV channels from [CBC.ca](https://cbc.ca)

> <b>Note</b>: CBC content is geo-restricted to Canada :canada:


## Example and usage


<details>

<summary> How to fetch <b>all</b> channels</summary>

<br>


```js
// CBC-News-Streams.js Example - get all channels. 
import {CBC_News_Streams} from 'https://cdn.jsdelivr.net/gh/MarketingPipeline/CBC-News-Streams.js@v1.0.0/dist/cbc-news-streams.min.js' 

try {
    console.log(await CBC_News_Streams().getAllChannels()) // returns a JSON array of objects.
} catch (error) {
    console.log(error.message)
}
```

This will return an array of all channel details & stream URLs. 

<br><br><br><br>
</details>


<br>

<details>

<summary> How to fetch <b>single</b> channel</summary>

<br>

```js
/// CBC-News-Streams.js Example - get single channel example.
import {CBC_News} from 'https://cdn.jsdelivr.net/gh/MarketingPipeline/CBC-News-Streams.js@v1.0.0/dist/cbc-news-streams.min.js' 

try {
    console.log(await CBC_News_Streams().getChannel("Toronto")) // returns a JSON object.
} catch (error) {
    console.log(error.message)
}

```


This will return a single JSON object with channel details + the stream URL. 

</details>



## Contributing ![GitHub](https://img.shields.io/github/contributors/MarketingPipeline/CBC-News-Streams.js)

Want to improve this project? Create a pull request with detailed changes / improvements! If approved you will be added to the list of contributors of this awesome project!

See also the list of
[contributors](https://github.com/MarketingPipeline/CBC-News-Streams.js/graphs/contributors) who
participate in this project.

## License ![GitHub](https://img.shields.io/github/license/MarketingPipeline/CBC-News-Streams.js)

This project is licensed under the MIT License - see the
[LICENSE](https://github.com/MarketingPipeline/CBC-News-Streams.js/blob/main/LICENSE) file for
details.
