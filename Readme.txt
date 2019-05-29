README - Obligatorisk oppgave 3 i faget Webapplikasjoner

INNHOLD:
-- 1. Databasen

-- 2. Funksjonaliteter

-- 3. Warnings i debuggeren til nettleseren.

-- 4. Referanser / Bruk av andres kode

===============================================================================

1. Databasen:
Da databasen lagres til C:\Users\[brukernavn]\CustomerServiceDB.mdf har jeg 
valgt � ikke ta med selve database filen i l�sningen, istedenfor har jeg laget 
en db initializer som fyller databasen med data automatisk ved f�rste kj�ring.

===============================================================================

2. Funksjonaliteter
Man har mulighet til � stille sp�rsm�l p� forsiden, alts� "Ofte stilte sp�rsm�l" 
siden. Disse sp�rsm�lene vil ikke v�re synlige p� "Ofte stilte sp�rsm�l" 
siden f�r de blir besvart. Besvarelse p� sp�rsm�lene kan gis p� "Administrator"
siden. F�rst n�r sp�rsm�let er besvart kan man gi det en rating. Sp�rsm�l, svar
og rating blir lagret til databasen ettersom de legges inn. 

N�r et sp�rsm�l blir lagret eller endret blir det ogs� lagt til eller endret i 
categories arrayet som ligger i staten til App.jsx. Dette gj�res dynamisk da 
kontroller metodene for put og post alltid returnerer tilbake sp�rsm�let som 
endres eller opprettes.

Validering av svar og sp�rsm�l, samt sp�rsm�lets kategori skjer b�de front-end og 
back-end. I tillegg skjer validering av rating back-end. Se ../ViewModels for 
back-end og ../ClientApp/src/utils/Validation.jsx for front-end validering.

Ut over dette har siden s�kefunksjonalitet.

===============================================================================

3. Warnings i debuggeren til nettleseren
*	../src/containers/AnswerQuestion.jsx p� linje 38 og 43: Her har jeg ikke 
	benyttet setState da setState kj�res asynkront, noe som f�rer til at jeg 
	f�r feil verdi p� linje 50 hvor jeg leser this.state.validated dersom jeg 
	benytter setState.
*	../src/containers/CreateQuestion.jsx p� linje 51: Det samme skjer her, jeg 
	pr�ver � lese ut verdien i linje 58 og f�r ikke verdien som forventes dersom
	jeg benytter setState.
*	../src/containers/AnswerQuestion.jsx p� linje 31: Dersom jeg benytter setState 
	for trimming av tekst strengen som skal settes inn i databasen, oppdateres 
	ikke tekststrengen f�r funksjonen med databasekallet (linje 52: som kaller 
	PutQuestionsAnswer i api.jsx) er kj�rt. Derfor har jeg ikke benyttet 
	setState her heller. 
*	../src/containers/CreateQuestion.jsx p� linje 32: Tilsvarende scenario som 
	ovenfor. Kan ikke benytte setState for � trimme tekst strengen her heller, 
	databasekallet (linje 61: som kaller PostQuestion i api.jsx) kj�res f�r 
	tekst strengen blir endret.

===============================================================================

4. Referanser / Bruk av andres kode:
*	Denne referansen er ogs� f�rt opp som kommentar der den gjelder.
	I filen ../src/utils/Validation ligger det en funksjon (GetValidationState) 
	som omtrent er tatt rett ut i fra react-bootstrap sine sider: 
	https://react-bootstrap.github.io/components/forms/