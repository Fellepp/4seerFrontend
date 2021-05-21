import axios from 'axios'

const baseURL = "http://127.0.0.1:5000";

async function sendFile(file) {
    console.log(file)
    return axios.post(baseURL + '/visualize?name=' + file.name, file, {
        headers:{
            'Content-Type': "text/csv"
        }
    })
    .then(function(response){
        return response;
    });
}

async function sendParameters(data) {
    console.log("Got", data)
    return axios.post(baseURL + '/image', data
    )
    .then(function(response){
        return response;
    })
}

function getImage(name) {
    return axios.get(baseURL + '/image?file=' + name + ".png", { responseType: 'arraybuffer'})
    .then(response => {
        let blob = new Blob(
            [response.data],
            { type: response.headers['content-type'] }
        )
        let image = URL.createObjectURL(blob)
        return image
    });
}

export {
    sendFile,
    sendParameters,
    getImage
};