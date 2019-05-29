using Oblig3.Context;
using Oblig3.Models;
using Oblig3.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Oblig3
{
    public class CustomerServiceAccessLayer
    {
        private readonly CustomerServiceContext _context;

        public CustomerServiceAccessLayer(CustomerServiceContext context)
        {
            this._context = context;
        }

        /// <summary>
        /// Getter for all categories and all associated questions in the database.
        /// </summary>
        /// <returns>All categories with all of the questions.</returns>
        public IEnumerable<Category> GetAllCategories()
        {
            List<Category> allCategories = new List<Category>();
            try
            {
                foreach (var category in _context.Categories)
                {
                    List<Question> questions = new List<Question>();
                    foreach(var question in _context.Questions.Where(q => q.Category.Id == category.Id))
                    {
                        questions.Add(
                            new Question
                            {
                                Id = question.Id,
                                Title = question.Title,
                                Answer = question.Answer,
                                Rating = question.Rating
                            });
                    }
                    allCategories.Add(
                    new Category
                    {
                        Id = category.Id,
                        Name = category.Name,
                        Questions = questions
                    });
                }
                return allCategories;
            }
            catch (Exception e)
            {
                Console.Error.WriteLine("Something went wrong in Oblig3.CustomerServiceAccessLayer.GetAllCategories()", e);
            }
            return null;
        }

        /// <summary>
        /// Putter for a questions rating. Adds to a question's rating rating based on the 
        /// RateQuestion's Rate value.
        /// </summary>
        /// <param name="id">Question ID.</param>
        /// <param name="rater">Rates the question based on its Rate value attributt.</param>
        /// <returns>The rated question.</returns>
        public Question PutRating(int id, RateQuestion rater)
        {
            try
            {
                Question question = _context.Questions.Find(id);
                question.Rating = question.Rating + rater.Rate;
                _context.SaveChanges();
                return question;
            }
            catch (Exception e)
            {
                Console.Error.WriteLine("Something went wrong in Oblig3.CustomerServiceAccessLayer.PutRating(int id, RateQuestion rater)", e);
            }
            return null;
        }

        /// <summary>
        /// Puts a questions answer based on the AnswerQuestion's Answer value.
        /// </summary>
        /// <param name="id">Question Id to change.</param>
        /// <param name="inAnswer">Contains the answer to update the question with.</param>
        /// <returns>The answered question.</returns>
        public Question PutQuestionsAnswer(int id, AnswerQuestion inAnswer)
        {
            try
            {
                Question question = _context.Questions.Find(id);
                question.Answer = inAnswer.Answer;
                _context.SaveChanges();
                return question;
        }
            catch (Exception e)
            {
                Console.Error.WriteLine("Something went wrong in Oblig3.CustomerServiceAccessLayer.PutQuestionsAnswer(int id, AnswerQuestion inAnswer)", e);
                return null;
            }
        }

        /// <summary>
        /// Posts a question to the database based on the CreateQuestion's title value, and binds it
        /// to the Categories table using the CreateQuestion's CategoryId value.
        /// </summary>
        /// <param name="inQuestion">Contains question title ie. the question and a category id.</param>
        /// <returns>The added question.</returns>
        public Question PostQuestion(CreateQuestion inQuestion)
        {
            try
            {
                Question question = new Question()
                {
                    Title = inQuestion.Title,
                    Category = _context.Categories.Find(inQuestion.CategoryId)
                };
                _context.Add(question);
                _context.SaveChanges();
                return question;
            }catch(Exception e)
            {
                Console.Error.WriteLine("Something went wrong in Oblig3.CustomerServiceAccessLayer.PostQuestion(CreateQuestion inQuestion)", e);
                return null;
            }
        }
    }
}
