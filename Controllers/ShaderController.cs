using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;

namespace MS.ShaderGallery.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ShaderController : ControllerBase
    {
        private readonly ILogger<ShaderController> _logger;

        public ShaderController(ILogger<ShaderController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Shader>> Get()
        {
            var shaders = new List<Shader>();
            var files = System.IO.Directory.GetFiles(@"wwwroot\Shaders", "*.txt" );

            foreach (var file in files)
            {
                var shader = new Shader
                {
                    Title = new System.IO.FileInfo(file).Name,
                    Code = System.IO.File.ReadAllText(file)
                };
                shaders.Add(shader);
            }

            return shaders;
        }
    }
}
