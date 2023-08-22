
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;

namespace NumberManagementMicroservice
{
    public class Calculator
    {
        public double Add(double a, double b) => a + b;
        public double Subtract(double a, double b) => a - b;
        public double Multiply(double a, double b) => a * b;
        public double Divide(double a, double b) => b != 0 ? a / b : double.NaN;
    }

    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton<Calculator>();
            services.AddMvc();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }

    [ApiController]
    [Route("api/calculator")]
    public class CalculatorController : ControllerBase
    {
        private readonly Calculator _calculator;

        public CalculatorController(Calculator calculator)
        {
            _calculator = calculator;
        }

        [HttpGet("add")]
        public IActionResult AddNumbers(double a, double b)
        {
            double result = _calculator.Add(a, b);
            return Ok(result);
        }

        [HttpGet("subtract")]
        public IActionResult SubtractNumbers(double a, double b)
        {
            double result = _calculator.Subtract(a, b);
            return Ok(result);
        }

        [HttpGet("multiply")]
        public IActionResult MultiplyNumbers(double a, double b)
        {
            double result = _calculator.Multiply(a, b);
            return Ok(result);
        }

        [HttpGet("divide")]
        public IActionResult DivideNumbers(double a, double b)
        {
            double result = _calculator.Divide(a, b);
            return Ok(result);
        }
    }

    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
