using Sandbox.Exceptions;

namespace Sandbox.Services
{
    public class ImgBBService
    {
        private readonly string _uri;
        public ImgBBService()
        {
            _uri = "https://api.imgbb.com/1/upload?key=c490430e29d6fa971154c9f46b1df6be";
        }

        public async Task<string?> UploadImage(string imageBase64)
        {
            var nvc = new List<KeyValuePair<string, string>>();
            nvc.Add(new KeyValuePair<string, string>("image", imageBase64.Split(',')[1]));
            var client = new HttpClient();
            var req = new HttpRequestMessage(HttpMethod.Post, _uri) { Content = new FormUrlEncodedContent(nvc) };
            var res = await client.SendAsync(req);

            var result = await res.Content.ReadAsAsync<ImgBBResponse>();
            return result?.data?.url;
        }
    }

    public class ImgBBResponse
    {
        public ImgBBData? data { get; set; }
        public bool success { get; set; }
        public int status { get; set; }
    }

    public class ImgBBData
    {
        public string? id { get; set; }
        public string? title { get; set; }
        public string? url_viewer { get; set; }
        public string? url { get; set; }
        public string? display_url { get; set; }
        public int? size { get; set; }
        public string? time { get; set; }
        public string? expiration { get; set; }
        public ImgBBImage? image { get; set; }
        public ImgBBImage? thumb { get; set; }
        public string? delete_url { get; set; }
    }

    public class ImgBBImage
    {
        public string? filename { get; set; }
        public string? name { get; set; }
        public string? mime { get; set; }
        public string? extension { get; set; }
        public string? url { get; set; }
    }
}
