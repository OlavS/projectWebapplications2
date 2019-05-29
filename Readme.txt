README - Obligatorisk oppgave 3 i faget Webapplikasjoner

INNHOLD:
-- 1. Databasen

-- 2. Funksjonaliteter

-- 3. Warnings i debuggeren til nettleseren.

-- 4. Referanser / Bruk av andres kode

===============================================================================

1. Databasen:
Da databasen lagres til C:\Users\[brukernavn]\CustomerServiceDB.mdf har jeg 
valgt å ikke ta med selve database filen i løsningen, istedenfor har jeg laget 
en db initializer som fyller databasen med data automatisk ved første kjøring.

===============================================================================

2. Funksjonaliteter
Man har mulighet til å stille spørsmål på forsiden, altså "Ofte stilte spørsmål" 
siden. Disse spørsmålene vil ikke være synlige på "Ofte stilte spørsmål" 
siden før de blir besvart. Besvarelse på spørsmålene kan gis på "Administrator"
siden. Først når spørsmålet er besvart kan man gi det en rating. Spørsmål, svar
og rating blir lagret til databasen ettersom de legges inn. 

Når et spørsmål blir lagret eller endret blir det også lagt til eller endret i 
categories arrayet som ligger i staten til App.jsx. Dette gjøres dynamisk da 
kontroller metodene for put og post alltid returnerer tilbake spørsmålet som 
endres eller opprettes.

Validering av svar og spørsmål, samt spørsmålets kategori skjer både front-end og 
back-end. I tillegg skjer validering av rating back-end. Se ../ViewModels for 
back-end og ../ClientApp/src/utils/Validation.jsx for front-end validering.

Ut over dette har siden søkefunksjonalitet.

===============================================================================

3. Warnings i debuggeren til nettleseren
*	../src/containers/AnswerQuestion.jsx på linje 38 og 43: Her har jeg ikke 
	benyttet setState da setState kjøres asynkront, noe som fører til at jeg 
	får feil verdi på linje 50 hvor jeg leser this.state.validated dersom jeg 
	benytter setState.
*	../src/containers/CreateQuestion.jsx på linje 51: Det samme skjer her, jeg 
	prøver å lese ut verdien i linje 58 og får ikke verdien som forventes dersom
	jeg benytter setState.
*	../src/containers/AnswerQuestion.jsx på linje 31: Dersom jeg benytter setState 
	for trimming av tekst strengen som skal settes inn i databasen, oppdateres 
	ikke tekststrengen før funksjonen med databasekallet (linje 52: som kaller 
	PutQuestionsAnswer i api.jsx) er kjørt. Derfor har jeg ikke benyttet 
	setState her heller. 
*	../src/containers/CreateQuestion.jsx på linje 32: Tilsvarende scenario som 
	ovenfor. Kan ikke benytte setState for å trimme tekst strengen her heller, 
	databasekallet (linje 61: som kaller PostQuestion i api.jsx) kjøres før 
	tekst strengen blir endret.

===============================================================================

4. Referanser / Bruk av andres kode:
*	Denne referansen er også ført opp som kommentar der den gjelder.
	I filen ../src/utils/Validation ligger det en funksjon (GetValidationState) 
	som omtrent er tatt rett ut i fra react-bootstrap sine sider: 
	https://react-bootstrap.github.io/components/forms/