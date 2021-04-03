using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Text.RegularExpressions;

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
            var files = System.IO.Directory.GetFiles(System.IO.Path.Combine(System.IO.Directory.GetCurrentDirectory(), "wwwroot", "Shaders"));

            foreach (var file in files)
            {
                var shader = new Shader
                {
                    Title = GetShaderTitle(file),
                    Code = System.IO.File.ReadAllText(file)
                };
                shaders.Add(shader);
            }

            return shaders;
        }

        private static string GetShaderTitle(string fileName)
        {
            var temp = System.IO.Path.GetFileNameWithoutExtension(fileName);
            var temps = SplitCamelCase(temp);
            temp = string.Join(" ", temps);
            return temp;
        }

        private static string[] SplitCamelCase(string source)
        {
            return Regex.Split(source, @"(?<!^)(?=[A-Z])");
        }
    }
}
