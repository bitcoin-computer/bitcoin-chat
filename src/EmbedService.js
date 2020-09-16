import mediaEmbed from 'media-embed'
class EmbedService{
    static  ReplaceURL (message, appendTo){
        try {
            var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
            var regex = new RegExp(expression);
            let urlToTransform = message.match(regex)
            let transformer = ''
            if(urlToTransform && urlToTransform.length > 0){
                if(urlToTransform[0][0]==="h" && urlToTransform[0][1] === 't'){transformer = urlToTransform[0]}
                else{transformer  = 'https://' + urlToTransform[0]}
                console.log(`Embedding URL: ${transformer}`)
                mediaEmbed(transformer, (err, embed) => {
                    
                    if(appendTo && appendTo.childNodes && appendTo.childNodes.length < 2){
                       console.log('has less than 2 children -- embed has not been inserted in the message view yet.')
                       appendTo.appendChild(document.createElement("br"))
                       appendTo.appendChild(embed)
                    }
                })
            }
        }
        catch (err){
            console.log(err)
        }
        return message
    }
}
export default EmbedService

