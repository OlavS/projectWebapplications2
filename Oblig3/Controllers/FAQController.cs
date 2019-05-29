using Microsoft.AspNetCore.Mvc;
using Oblig3.Context;
using Oblig3.Models;
using Oblig3.ViewModels;
using System.Collections.Generic;

namespace Oblig3.Controllers
{
    [Route("api/[controller]")]
    public class FAQController : Controller
    {
        private readonly CustomerServiceContext _context;

        public FAQController(CustomerServiceContext context)
        {
            this._context = context;
        }

        /// <summary>
        /// Getter for all the categories which contains all the questions in the database.
        /// </summary>
        /// <returns>A json serialized categories array.</returns>
        [HttpGet]
        [Route("GetCategories")]
        public JsonResult GetCategories()
        {
            var custServAccessLayer = new CustomerServiceAccessLayer(_context);
            IEnumerable<Category> categories = custServAccessLayer.GetAllCategories();
            return Json(categories);
        }

        /// <summary>
        /// Putter for a questions rating.
        /// </summary>
        /// <param name="id">Question ID.</param>
        /// <param name="rater">RateQuestion object provides backend validation.</param>
        /// <returns>A json serialized question object if validation passes, else a Json serialized null.</returns>
        [HttpPut]
        [Route("PutRating/{id}")]
        public JsonResult PutRating(int id, [FromBody] RateQuestion rater)
        {
            if (TryValidateModel(rater))
            {
                var custServAccessLayer = new CustomerServiceAccessLayer(_context);
                var question = custServAccessLayer.PutRating(id, rater);
                return Json(question);
            }
            return Json(null);
        }

        /// <summary>
        /// Putter for a questions answer.
        /// </summary>
        /// <param name="id">Question ID.</param>
        /// <param name="answer">AnswerQuestion object provides backend validation.</param>
        /// <returns>A json serialized question object if validation passes, else a Json serialized null.</returns>
        [HttpPut]
        [Route("PutQuestionsAnswer/{id}")]
        public JsonResult PutQuestionsAnswer(int id, [FromBody] AnswerQuestion answer)
        {
            if (TryValidateModel(answer))
            {
                var custServAccessLayer = new CustomerServiceAccessLayer(_context);
                var question = custServAccessLayer.PutQuestionsAnswer(id, answer);
                return Json(question);
            }
            return Json(null);
        }

        /// <summary>
        /// Posting a question to the database.
        /// </summary>
        /// <param name="inQuestion">CreateQuestion object provides backend validation.</param>
        /// <returns>A json serialized question object if validation passes, else a Json serialized null.</returns>
        [HttpPost]
        [Route("PostQuestion")]
        public JsonResult PostQuestion([FromBody] CreateQuestion inQuestion)
        {
            if (TryValidateModel(inQuestion))
            {
                var custServAccessLayer = new CustomerServiceAccessLayer(_context);
                var question = custServAccessLayer.PostQuestion(inQuestion);
                return Json(question);
            }
            return Json(null);
        }
    }
}