
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;

namespace TrainMicroservice
{
    public class Train
    {
        public string TrainNumber { get; set; }
        public DateTime DepartureTime { get; set; }
        public DateTime ArrivalTime { get; set; }
        public int AvailableSeats { get; set; }
    }

    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
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
    [Route("api/trains")]
    public class TrainsController : ControllerBase
    {
        private List<Train> _trains;

        public TrainsController()
        {
            // Mock data for demonstration
            _trains = new List<Train>
            {
                new Train { TrainNumber = "TR123", DepartureTime = DateTime.Now.AddHours(1), ArrivalTime = DateTime.Now.AddHours(3), AvailableSeats = 50 },
                new Train { TrainNumber = "TR234", DepartureTime = DateTime.Now.AddHours(2), ArrivalTime = DateTime.Now.AddHours(4), AvailableSeats = 30 },
                new Train { TrainNumber = "TR345", DepartureTime = DateTime.Now.AddHours(6), ArrivalTime = DateTime.Now.AddHours(8), AvailableSeats = 10 }
            };
        }

        [HttpGet("next12hours")]
        public IActionResult GetTrainsNext12Hours()
        {
            DateTime now = DateTime.Now;
            DateTime twelveHoursLater = now.AddHours(12);

            var next12HourTrains = _trains
                .Where(train => train.DepartureTime >= now && train.DepartureTime <= twelveHoursLater)
                .ToList();

            return Ok(next12HourTrains);
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
