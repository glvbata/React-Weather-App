// I was having CORS issue so I decided to make a fetch call to the proxy server.
export default function ApiService(url, onCallSuccess) {
    fetch(url).then(function(response) {
        return response.json();
    }).then(function(json) {
        onCallSuccess(json);
    });
}
