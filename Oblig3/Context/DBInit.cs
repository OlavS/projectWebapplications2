using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Oblig3.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Oblig3.Context
{
    /// <summary>
    /// Provides initialization of data to the database.
    /// </summary>
    public static class DBInit
    {
        public static void Initialize(IServiceProvider services)
        {
            var context = services.GetRequiredService<CustomerServiceContext>();

            if (!context.Database.EnsureCreated())
            {
                context.Database.Migrate();
            }

            if (!context.Categories.Any())
            {
                context.Categories.Add(
                    new Category
                    {
                        Name = "Refusjon",
                        Questions = new List<Question>()
                    }
                );
                context.Categories.Add(
                    new Category
                    {
                        Name = "Konto opplysninger",
                        Questions = new List<Question>()
                    }
                 );
                context.Categories.Add(
                    new Category
                    {
                        Name = "Innhold",
                        Questions = new List<Question>()
                    }
                );
                context.Categories.Add(
                    new Category
                    {
                        Name = "Øvrige",
                        Questions = new List<Question>()
                    }
                );
                context.SaveChanges();
            }

            if (!context.Questions.Any())
            {
                context.Questions.Add(
                    new Question
                    {
                        Title = "Jeg har glemt passordet mitt.",
                        Answer = "For å opprette nytt passord, trykk på påloggingsknappen, " +
                                 "velg så 'Glemt Passord'. Videre må du fylle inn navn og " +
                                 "telefonnummer for å verifisere at du er deg. Når du så " +
                                 "trykke videre, får du muligheten til å velge et nytt passord.",
                        Rating = 5,
                        Category = context.Categories.Find(2)
                    }
                );
                context.Questions.Add(
                    new Question
                    {
                        Title = "Jeg vil refundere en film. Er det mulig?",
                        Answer = "Du må kontakte kundeservice. Dersom vi ser at filmen ikke er " +
                                 "sett av deg vil du bli refundert beløpet du betalte for filmen.",
                        Rating = 2,
                        Category = context.Categories.Find(1)
                    }
                );
                context.Questions.Add(
                    new Question
                    {
                        Title = "Jeg har fått ny epostadresse. Hvordan kan jeg bytte den?",
                        Answer = "Kontakt kundeservice, så ordner vi det.",
                        Rating = -3,
                        Category = context.Categories.Find(2)
                    }
                );
                context.Questions.Add(
                    new Question
                    {
                        Title = "Jeg har fått ny adresse. Hvordan oppdaterer jeg adressen min?",
                        Answer = "Kontakt kundeservice, så ordner vi det.",
                        Rating = 1,
                        Category = context.Categories.Find(2)
                    }
                );
                context.Questions.Add(
                    new Question
                    {
                        Title = "Hvor stort er biblioteket deres?",
                        Answer = "Biblioteket består foreløpig av rundt 25 filmer, men vi jobber " +
                                "stadig med å øke tilgjengelige filmer for kundene våre.",
                        Rating = -1,
                        Category = context.Categories.Find(3)
                    });
                context.Questions.Add(
                    new Question
                    {
                        Title = "Når ble dere etablert?",
                        Answer = "Vi etablerte oss i slutten av 2018.",
                        Category = context.Categories.Find(4)
                    });
                context.Questions.Add(
                    new Question
                    {
                        Title = "Hvis jeg registrerer meg i dag, når vil jeg kunne bruke tjenesten?",
                        Category = context.Categories.Find(4)
                    });
                context.Questions.Add(
                    new Question
                    {
                        Title = "Jeg har nettopp gjennomført et kjøp ved et uhell. Kan jeg få " +
                                "refundert denne ordren?",
                        Category = context.Categories.Find(1)
                    });
                context.SaveChanges();
            }
        }
    }
}