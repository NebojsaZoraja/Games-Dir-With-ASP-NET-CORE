using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Games_Dir_api.Controllers
{
    [Route("api/config/paypal")]
    [ApiController]
    public class PayPalController : ControllerBase
    {
        public PayPalController()
        {}

        //Paypal Get
        [HttpGet]
        public IActionResult GetClient()
        {
            //string clientId = Environment.GetEnvironmentVariable("PAYPAL_CLIENT_ID");
            string clientId = "AYp_XA2jAiUIel1re0y6DS-vU3WmvMeMDeDoFAhJVR80Y2cGJGS0JJePo3GQBXqyXerG2E1GTw9O6TAx";
            return Ok(clientId);

        }
    }
}
