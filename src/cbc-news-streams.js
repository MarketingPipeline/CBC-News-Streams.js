/**!
 * @license CBC-News-Streams.js - A JavaScript library for fetching free live TV stream URLs from CBC.ca / CBC News
 * VERSION: 1.0.0
 * CREATED BY: JARED VAN VALKENOGED
 * LICENSED UNDER MIT LICENSE
 * MORE INFO CAN BE FOUND AT https://github.com/MarketingPipeline/CBC-News-Streams.js/
 */
export function CBC_News_Streams() {

    if (typeof node !== 'undefined' || typeof process === 'object') {
        try {
            let fetch = require('node-fetch');
        } catch (e) {
            console.log('node-fetch is not installed. Please install node-fetch to use "CBC-News.js".');
            if (typeof process !== 'undefined') {
                process.exit(1);
            }
        }
    }

    async function getAllChannels() {
        try {
            let result = await fetchURL("url", "https://tpfeed.cbc.ca/f/ExhSPC/t_t3UKJR6MAT?pretty=true&sort=pubDate%7Cdesc");
            return await fetchAllChannelURLs(result)
        } catch (err) {
            throw err
        }
    }


    async function getChannel(channel_title) {
        try {
            if (!channel_title) {
                throw new Error('Error: No channel title provided to .getChannel() for.');
            }
            // Uppercase the first letter.
            channel_title = channel_title.charAt(0).toUpperCase() + channel_title.slice(1);
            let result = await fetchURL("url", "https://tpfeed.cbc.ca/f/ExhSPC/t_t3UKJR6MAT?pretty=true&sort=pubDate%7Cdesc");
            let channels = result.entries
            let foundResults = false
            for (const channel in channels) {
                if (channel_title === channels[channel].title) {
                    foundResults = true
                    let results = {
                        channel_title: channels[channel].title,
                        description: channels[channel].description,
                        channel_image: channels[channel].cbc$staticImage,
                        stream_url: await getStreamData(channels[channel].content[0].url)
                    }
                    return results
                }
            }

            if (foundResults != true) {
                throw new Error(`Error: No results found for channel ${channel_title}`);

            }
        } catch (err) {
            throw err
        }
    }

    /// CORE FUNCTIONS BELOW

    // Core function to fetch URL from text (for XML) or JSON file
    async function fetchURL(fetchType, url) {

        //console.log(url)
        if (fetchType === "text") {
            const rsp = await fetch(url),
            data = await rsp.text();
            return data;
        } else {
            const rsp = await fetch(url),
            data = await rsp.json();
            return data;
        }

    }

    // Core function to fetch all channels
    async function fetchAllChannelURLs(json) {
        let results = []
        for (const channel in json) {
            for (const id in json[channel]) {
                if (json[channel][id].id) {
                    results.push({
                        channel_title: json[channel][id].title,
                        description: json[channel][id].description,
                        channel_image: json[channel][id].cbc$staticImage,
                        stream_url: await getStreamData(json[channel][id].content[0].url)
                    })
                }
            }
        }
        return results
    }


    async function getStreamData(url) {
        try {
            let result = await fetchURL("text", url);
            return parseXML(result)
        } catch (err) {
            throw err
            return
        }
    }

    // Core function to parse XML files from CBC
    function parseXML(file) {
        let xmlDoc;
        let text = file
        xmlDoc = new DOMParser().parseFromString(text, 'text/xml');
        let videoTag = xmlDoc.querySelector("video").outerHTML
        const regex = /src="[^"]*"/gm;
        const found = videoTag.match(regex);
        // some hacky work-around to parse source
        let parsedResults = found[0].replace('src="', '');
        parsedResults = parsedResults.replace('"', '');
        // return the parsed stream SRC 
        return parsedResults
    } 

    return {
        getChannel: getChannel,
        getAllChannels: getAllChannels
    }
}
