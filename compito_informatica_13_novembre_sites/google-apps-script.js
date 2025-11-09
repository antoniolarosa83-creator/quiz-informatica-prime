/**
 * Google Apps Script per gestire i risultati del test di informatica
 * Versione: 2.0 - Supporta 110 domande con selezione casuale di 20
 *
 * Istruzioni per l'implementazione:
 * 1. Vai su https://script.google.com
 * 2. Crea un nuovo progetto
 * 3. Incolla questo codice
 * 4. Salva e pubblica come Web App
 * 5. Copia l'URL generato e sostituiscilo in index.html
 */

// ==================== BANCA DATI DOMANDE ====================
// Array di tutte le 110 domande disponibili
const TUTTE_LE_DOMANDE = [
  {"numero": 1, "testo": "Quale tra le seguenti è la caratteristica fondamentale della FINITEZZA di un algoritmo?", "opzioni": ["a) Un algoritmo deve avere un numero infinito di passi", "b) Un algoritmo deve terminare in un numero finito di passi", "c) Un algoritmo può continuare indefinitamente", "d) Un algoritmo non ha limiti di tempo di esecuzione"], "risposta_corretta": "b"},
  {"numero": 2, "testo": "Cosa si intende per DETERMINISMO in un algoritmo?", "opzioni": ["a) Ogni passo ha uno scopo determinato dal programmatore", "b) Ad ogni passo, il prossimo passo è univocamente determinato", "c) L'algoritmo determina automaticamente gli input", "d) L'algoritmo produce sempre output diversi"], "risposta_corretta": "b"},
  {"numero": 3, "testo": "Quale caratteristica garantisce che ogni istruzione sia realizzabile praticamente?", "opzioni": ["a) Non-ambiguità", "b) Efficacia", "c) Finitezza", "d) Generalità"], "risposta_corretta": "b"},
  {"numero": 4, "testo": "Cosa significa che un'istruzione deve avere NON-AMBIGUITÀ?", "opzioni": ["a) Deve essere scritta in una sola riga", "b) Deve essere elementare e realizzabile", "c) Deve avere un significato univoco e non equivocabile", "d) Deve essere comprensibile solo dal programmatore"], "risposta_corretta": "c"},
  {"numero": 5, "testo": "Qual è il primo passo nel processo di creazione di un algoritmo?", "opzioni": ["a) Scrivere le istruzioni", "b) Analizzare il problema", "c) Testare l'algoritmo", "d) Definire il linguaggio di programmazione"], "risposta_corretta": "b"},
  {"numero": 6, "testo": "Quale tra le seguenti è una struttura di controllo fondamentale di un algoritmo strutturato?", "opzioni": ["a) Condizionale", "b) Sequenza, Selezione, Iterazione", "c) Funzione", "d) Dichiarazione"], "risposta_corretta": "b"},
  {"numero": 7, "testo": "In un algoritmo strutturato, cosa rappresenta la SELEZIONE?", "opzioni": ["a) Una sequenza di istruzioni una dopo l'altra", "b) Una scelta tra percorsi diversi basata su una condizione", "c) Una ripetizione di istruzioni", "d) Una pausa nell'esecuzione"], "risposta_corretta": "b"},
  {"numero": 8, "testo": "Cosa rappresenta l'ITERAZIONE in un algoritmo?", "opzioni": ["a) Una decisione tra due opzioni", "b) Un ordine di istruzioni", "c) Una ripetizione di istruzioni", "d) Un errore di programmazione"], "risposta_corretta": "c"},
  {"numero": 9, "testo": "Quale è il significato di 'Analizzare il problema' nella progettazione di un algoritmo?", "opzioni": ["a) Capire cosa si deve risolvere e quali sono i vincoli", "b) Scrivere il codice immediatamente", "c) Cercare algoritmi già esistenti", "d) Compilare il programma"], "risposta_corretta": "a"},
  {"numero": 10, "testo": "In quale fase si scrive l'algoritmo in pseudocodice?", "opzioni": ["a) ANALISI DEL PROBLEMA", "b) DEFINIRE INPUT E OUTPUT", "c) SCRIVERE LE ISTRUZIONI", "d) VERIFICARE E TESTARE"], "risposta_corretta": "c"},
  {"numero": 11, "testo": "Cosa è una variabile in programmazione?", "opzioni": ["a) Un elemento che cambia continuamente", "b) Uno spazio di memoria a cui assegniamo un nome per memorizzare dati", "c) Una funzione che modifica i dati", "d) Un tipo di errore nel programma"], "risposta_corretta": "b"},
  {"numero": 12, "testo": "Quale tipo di dato memorizza numeri interi senza virgola?", "opzioni": ["a) REAL", "b) STRING", "c) INTEGER", "d) BOOLEAN"], "risposta_corretta": "c"},
  {"numero": 13, "testo": "Quale è il tipo di dato per memorizzare numeri con la virgola?", "opzioni": ["a) INTEGER", "b) REAL", "c) TEXT", "d) NUMERO"], "risposta_corretta": "b"},
  {"numero": 14, "testo": "Quale tipo di dato memorizza testo e parole?", "opzioni": ["a) NUMERO", "b) INTEGER", "c) STRING", "d) DECIMALE"], "risposta_corretta": "c"},
  {"numero": 15, "testo": "Quanti byte occupa generalmente un tipo INTEGER?", "opzioni": ["a) 1 byte", "b) 2 byte", "c) 4 byte", "d) 8 byte"], "risposta_corretta": "c"},
  {"numero": 16, "testo": "Quale intervallo copre tipicamente un INTEGER a 32 bit?", "opzioni": ["a) 0 a 255", "b) -32768 a 32767", "c) -2.147.483.648 a 2.147.483.647", "d) 0 a 1"], "risposta_corretta": "c"},
  {"numero": 17, "testo": "Come si dichiarano più variabili dello stesso tipo?", "opzioni": ["a) INTEGER a = 5; b = 10", "b) INTEGER a; INTEGER b", "c) INTEGER a, b", "d) a, b INTEGER"], "risposta_corretta": "c"},
  {"numero": 18, "testo": "Quale affermazione sul tipo BOOLEAN è corretta?", "opzioni": ["a) Può contenere numeri infiniti", "b) Può contenere solo VERO o FALSO", "c) È lo stesso del tipo INTEGER", "d) Non esiste nel pseudocodice"], "risposta_corretta": "b"},
  {"numero": 19, "testo": "Cosa caratterizza il tipo REAL rispetto a INTEGER?", "opzioni": ["a) È più veloce da elaborare", "b) Occupa meno memoria", "c) Può contenere numeri con decimali", "d) È più accurato per grandi numeri"], "risposta_corretta": "c"},
  {"numero": 20, "testo": "Quale è un valido nome di variabile?", "opzioni": ["a) 123variabile", "b) var-iabile", "c) mia_variabile", "d) var iabile"], "risposta_corretta": "c"},
  {"numero": 21, "testo": "Quale affermazione sulla dichiarazione di variabile è corretta?", "opzioni": ["a) La dichiarazione deve avvenire DOPO aver usato la variabile", "b) La dichiarazione deve avvenire PRIMA di usare la variabile", "c) Non è necessario dichiarare le variabili", "d) La dichiarazione è opzionale"], "risposta_corretta": "b"},
  {"numero": 22, "testo": "Quale è la corretta sintassi di dichiarazione di una variabile?", "opzioni": ["a) nome_variabile TIPO_DATO", "b) TIPO_DATO nome_variabile", "c) variabile TIPO", "d) TIPO - nome_variabile"], "risposta_corretta": "b"},
  {"numero": 23, "testo": "Quale affermazione sul nome di una variabile è FALSA?", "opzioni": ["a) Deve iniziare con una lettera o underscore", "b) Deve contenere solo numeri", "c) Può contenere numeri dopo la prima lettera", "d) Non deve contenere spazi"], "risposta_corretta": "b"},
  {"numero": 24, "testo": "Quale tra questi è un nome di variabile VALIDO?", "opzioni": ["a) 2nome", "b) nome studente", "c) nome-studente", "d) nome_studente"], "risposta_corretta": "d"},
  {"numero": 25, "testo": "Cosa indica il TIPO_DATO nella dichiarazione?", "opzioni": ["a) Il nome del programma", "b) Quale tipo di informazione può contenere la variabile", "c) La memoria disponibile", "d) L'ordine di esecuzione"], "risposta_corretta": "b"},
  {"numero": 26, "testo": "Come si dichiara correttamente una variabile intera di nome 'età'?", "opzioni": ["a) età INTEGER", "b) INTEGER età", "c) var età: INTEGER", "d) INTEGER: età"], "risposta_corretta": "b"},
  {"numero": 27, "testo": "Quale è un errore nella dichiarazione di variabile?", "opzioni": ["a) STRING nome", "b) REAL prezzo", "c) INTERO valore", "d) BOOLEAN risultato"], "risposta_corretta": "c"},
  {"numero": 28, "testo": "Quante variabili si possono dichiarare in un programma?", "opzioni": ["a) Massimo 10", "b) Massimo 100", "c) Quante ce ne servono", "d) Una sola"], "risposta_corretta": "c"},
  {"numero": 29, "testo": "Cosa accade se si usa una variabile prima di dichiararla?", "opzioni": ["a) Il programma funziona comunque", "b) Si genera un errore", "c) La variabile viene automaticamente dichiarata", "d) Niente di particolare"], "risposta_corretta": "b"},
  {"numero": 30, "testo": "La dichiarazione di una variabile alloca memoria?", "opzioni": ["a) No, la memoria è allocata solo all'assegnazione", "b) Sì, la dichiarazione riserva spazio di memoria", "c) Dipende dal tipo di dato", "d) No, la memoria non serve in programmazione"], "risposta_corretta": "b"},
  {"numero": 31, "testo": "Quale è la differenza tra inizializzazione e assegnazione?", "opzioni": ["a) Non c'è differenza", "b) Inizializzazione è al momento della dichiarazione, assegnazione modifica una variabile già dichiarata", "c) L'assegnazione deve avvenire prima dell'inizializzazione", "d) Inizializzazione cambia il tipo della variabile"], "risposta_corretta": "b"},
  {"numero": 32, "testo": "Quale tra questi è un esempio di INIZIALIZZAZIONE?", "opzioni": ["a) INTEGER età; età = 25", "b) INTEGER età = 25", "c) età = 25", "d) MODIFICA età a 25"], "risposta_corretta": "b"},
  {"numero": 33, "testo": "Quale tra questi è un esempio di ASSEGNAZIONE?", "opzioni": ["a) REAL prezzo = 19.99", "b) STRING nome = \"Mario\"", "c) INTEGER numero; numero = 10", "d) BOOLEAN attivo = VERO"], "risposta_corretta": "c"},
  {"numero": 34, "testo": "Quale è la sintassi corretta di assegnazione?", "opzioni": ["a) variabile == valore", "b) variabile = valore", "c) valore variabile", "d) valore > variabile"], "risposta_corretta": "b"},
  {"numero": 35, "testo": "Cosa rappresenta il simbolo '=' nella programmazione?", "opzioni": ["a) Un confronto di uguaglianza", "b) Un'assegnazione di valore", "c) Una equazione matematica", "d) Un'operazione di divisione"], "risposta_corretta": "b"},
  {"numero": 36, "testo": "Dopo la dichiarazione 'INTEGER a', quale è un'assegnazione valida?", "opzioni": ["a) a == 5", "b) a = 5.5", "c) a = 10", "d) a := 10"], "risposta_corretta": "c"},
  {"numero": 37, "testo": "Si può inizializzare una variabile con un valore di tipo diverso da quello dichiarato?", "opzioni": ["a) Sì, sempre", "b) No, deve essere dello stesso tipo (o convertibile)", "c) Sì, ma solo per INTEGER", "d) Dipende dal valore"], "risposta_corretta": "b"},
  {"numero": 38, "testo": "Quale affermazione sull'assegnazione è corretta?", "opzioni": ["a) Si può assegnare un valore una sola volta", "b) Si possono assegnare valori diversi più volte alla stessa variabile", "c) L'assegnazione crea una nuova variabile", "d) L'assegnazione non modifica il valore"], "risposta_corretta": "b"},
  {"numero": 39, "testo": "Cosa succede quando si assegna un nuovo valore a una variabile?", "opzioni": ["a) Il vecchio valore viene preservato in memoria", "b) Il vecchio valore viene sostituito dal nuovo", "c) Si crea una nuova variabile", "d) Il programma genera un errore"], "risposta_corretta": "b"},
  {"numero": 40, "testo": "Quale è l'ordine corretto di dichiarazione e assegnazione?", "opzioni": ["a) Assegnazione, poi dichiarazione", "b) Dichiarazione, poi assegnazione", "c) Non importa l'ordine", "d) Solo dichiarazione, l'assegnazione è facoltativa"], "risposta_corretta": "b"},
  {"numero": 41, "testo": "A cosa serve l'operatore IF?", "opzioni": ["a) A ripetere istruzioni", "b) A prendere decisioni basate su condizioni", "c) A dichiarare variabili", "d) A terminare il programma"], "risposta_corretta": "b"},
  {"numero": 42, "testo": "Quale è la sintassi corretta di un IF semplice?", "opzioni": ["a) SE condizione ALLORA istruzioni", "b) WHILE condizione ESEGUI istruzioni", "c) SE (condizione) ALLORA istruzioni FINE SE", "d) IF condizione DO istruzioni END"], "risposta_corretta": "c"},
  {"numero": 43, "testo": "Quale è la differenza tra IF e IF-ELSE?", "opzioni": ["a) Non c'è differenza", "b) IF esegue solo se vero, IF-ELSE ha un'alternativa se falso", "c) IF-ELSE è più veloce", "d) IF lavora con numeri, IF-ELSE con stringhe"], "risposta_corretta": "b"},
  {"numero": 44, "testo": "Qual è un esempio corretto di condizione nell'IF?", "opzioni": ["a) SE (età > 18)", "b) SE (età: 18)", "c) SE età 18", "d) SE [età > 18]"], "risposta_corretta": "a"},
  {"numero": 45, "testo": "Cosa rappresenta ELSE nell'IF-ELSE?", "opzioni": ["a) Un'altra condizione", "b) Un'alternativa quando la condizione è falsa", "c) Una ripetizione", "d) Una variabile"], "risposta_corretta": "b"},
  {"numero": 46, "testo": "Quale è un errore nella sintassi IF-ELSE?", "opzioni": ["a) SE (condizione) ALLORA istruzioni ALTRIMENTI altre_istruzioni FINE SE", "b) SE (condizione) ALLORA istruzioni ELSE altre_istruzioni FINE SE", "c) SE condizione istruzioni ALTRIMENTI altre_istruzioni", "d) SE (condizione) istruzioni FINE SE ALTRIMENTI altre_istruzioni"], "risposta_corretta": "d"},
  {"numero": 47, "testo": "Si possono annidare più IF dentro un IF?", "opzioni": ["a) No, non è possibile", "b) Sì, è possibile per condizioni più complesse", "c) Solo una volta", "d) Solo se usi ELSE"], "risposta_corretta": "b"},
  {"numero": 48, "testo": "Quale operatore di confronto si usa per 'maggiore di'?", "opzioni": ["a) >>", "b) =>", "c) >", "d) >="], "risposta_corretta": "c"},
  {"numero": 49, "testo": "Quale è un operatore di uguaglianza?", "opzioni": ["a) =", "b) ==", "c) !=", "d) <>"], "risposta_corretta": "b"},
  {"numero": 50, "testo": "Quale è la condizione per verificare che un numero NON sia uguale a 5?", "opzioni": ["a) numero = 5", "b) numero == 5", "c) numero != 5", "d) numero <> 5"], "risposta_corretta": "c"},
  {"numero": 51, "testo": "Cos'è un IF annidato?", "opzioni": ["a) Un IF con molte condizioni alternative", "b) Un IF dentro un'altro IF", "c) Un IF che ripete le istruzioni", "d) Un IF che verifica due variabili"], "risposta_corretta": "b"},
  {"numero": 52, "testo": "Per quale scopo si usa l'IF annidato?", "opzioni": ["a) Per rendere il codice più veloce", "b) Per controllare condizioni più complesse in sequenza", "c) Per ridurre il numero di variabili", "d) Per evitare errori di programmazione"], "risposta_corretta": "b"},
  {"numero": 53, "testo": "Quale è la sintassi corretta di un IF annidato?", "opzioni": ["a) SE (cond1) ALLORA SE (cond2) ALLORA istruzioni FINE SE FINE SE", "b) SE (cond1 AND cond2) ALLORA istruzioni FINE SE", "c) IF cond1 AND cond2 THEN istruzioni", "d) SE cond1 cond2 ALLORA istruzioni"], "risposta_corretta": "a"},
  {"numero": 54, "testo": "Quanti livelli di annidamento di IF si possono avere?", "opzioni": ["a) Massimo 2 livelli", "b) Massimo 5 livelli", "c) Teoricamente illimitati (ma in pratica da evitare)", "d) Solo 1 livello"], "risposta_corretta": "c"},
  {"numero": 55, "testo": "Come si organizzano logicamente gli IF annidati?", "opzioni": ["a) In modo casuale", "b) Dal controllo più generale a quello più specifico", "c) Dal controllare gli errori alle variabili", "d) Senza un ordine particolare"], "risposta_corretta": "b"},
  {"numero": 56, "testo": "Quale è un vantaggio dell'IF annidato?", "opzioni": ["a) Rende il codice più lungo", "b) Permette di gestire logiche decisionali complesse", "c) Aumenta la velocità di esecuzione", "d) Non ha vantaggi"], "risposta_corretta": "b"},
  {"numero": 57, "testo": "Quale è uno SVANTAGGIO potenziale dell'IF annidato?", "opzioni": ["a) Non ha svantaggi", "b) Può rendere il codice difficile da leggere se troppo annidato", "c) È più lento rispetto a IF singoli", "d) Non funziona in alcuni linguaggi"], "risposta_corretta": "b"},
  {"numero": 58, "testo": "In un IF annidato, quale istruzione si esegue se entrambe le condizioni sono vere?", "opzioni": ["a) Solo le istruzioni dell'IF esterno", "b) Solo le istruzioni dell'IF interno", "c) Le istruzioni dell'IF interno", "d) Nessuna istruzione"], "risposta_corretta": "c"},
  {"numero": 59, "testo": "È possibile usare IF annidati con ELSE?", "opzioni": ["a) No, ELSE non funziona con IF annidati", "b) Sì, si possono usare ELSE a ogni livello", "c) Solo al primo livello", "d) Solo al livello più interno"], "risposta_corretta": "b"},
  {"numero": 60, "testo": "Quale è un caso d'uso comune per IF annidati?", "opzioni": ["a) Verificare se un numero è positivo", "b) Stampare un testo", "c) Classificare dati basandosi su multiple condizioni (es. voto scolastico)", "d) Dichiarare variabili"], "risposta_corretta": "c"},
  {"numero": 61, "testo": "A cosa servono i connettivi logici AND e OR?", "opzioni": ["a) A dichiarare variabili", "b) A combinare due o più condizioni", "c) A ripetere istruzioni", "d) A terminare il programma"], "risposta_corretta": "b"},
  {"numero": 62, "testo": "Quale è il significato del connettivo logico AND?", "opzioni": ["a) Almeno una condizione deve essere vera", "b) Entrambe le condizioni devono essere vere", "c) Una delle due condizioni può essere vera", "d) Nessuna condizione deve essere vera"], "risposta_corretta": "b"},
  {"numero": 63, "testo": "Quale è il significato del connettivo logico OR?", "opzioni": ["a) Entrambe le condizioni devono essere vere", "b) Solo una condizione deve essere vera", "c) Almeno una delle condizioni deve essere vera", "d) Le condizioni devono essere opposte"], "risposta_corretta": "c"},
  {"numero": 64, "testo": "Quale è la sintassi corretta per AND?", "opzioni": ["a) SE (condizione1 || condizione2)", "b) SE (condizione1 AND condizione2)", "c) SE (condizione1 & condizione2)", "d) SE condizione1 condizione2"], "risposta_corretta": "b"},
  {"numero": 65, "testo": "Quale è la sintassi corretta per OR?", "opzioni": ["a) SE (condizione1 AND condizione2)", "b) SE (condizione1 || condizione2)", "c) SE (condizione1 OR condizione2)", "d) SE (condizione1 | condizione2)"], "risposta_corretta": "c"},
  {"numero": 66, "testo": "Quale espressione è vera se a > 5 AND b < 10, con a=7 e b=8?", "opzioni": ["a) Falso", "b) Vero", "c) Indeterminato", "d) Dipende dal valore di c"], "risposta_corretta": "b"},
  {"numero": 67, "testo": "Quale espressione è vera se a > 10 OR b < 5, con a=3 e b=2?", "opzioni": ["a) Falso", "b) Vero", "c) Non determinabile", "d) Dipende dal valore di c"], "risposta_corretta": "b"},
  {"numero": 68, "testo": "Si possono combinare AND e OR nella stessa espressione?", "opzioni": ["a) No, sono incompatibili", "b) Sì, prestando attenzione alla precedenza", "c) Solo se usati con ELSE", "d) No, bisogna usare IF annidati"], "risposta_corretta": "b"},
  {"numero": 69, "testo": "Quale è un caso d'uso comune per AND?", "opzioni": ["a) Controllare se un numero è positivo", "b) Verificare se l'età è tra 18 e 65 anni", "c) Controllare se un valore è zero", "d) Stampare un messaggio"], "risposta_corretta": "b"},
  {"numero": 70, "testo": "Quale è un caso d'uso comune per OR?", "opzioni": ["a) Verificare se l'età è esattamente 18 anni", "b) Controllare se un numero è divisibile per 2 o 3", "c) Verificare se due variabili sono uguali", "d) Dichiarare una variabile"], "risposta_corretta": "b"},
  {"numero": 71, "testo": "A cosa serve il ciclo WHILE?", "opzioni": ["a) A dichiarare variabili", "b) A prendere decisioni", "c) A ripetere un blocco di istruzioni finché una condizione è vera", "d) A terminare il programma"], "risposta_corretta": "c"},
  {"numero": 72, "testo": "Quale è la differenza tra WHILE e FOR?", "opzioni": ["a) Non c'è differenza", "b) FOR ripete un numero predefinito di volte, WHILE ripete finché una condizione è vera", "c) WHILE è più veloce di FOR", "d) WHILE funziona solo con interi"], "risposta_corretta": "b"},
  {"numero": 73, "testo": "Quale è la sintassi corretta di WHILE?", "opzioni": ["a) PER i DA 1 A 10 ESEGUI", "b) MENTRE (condizione) ESEGUI istruzioni FINE MENTRE", "c) WHILE condizione istruzioni END", "d) SE (condizione) ALLORA istruzioni"], "risposta_corretta": "b"},
  {"numero": 74, "testo": "Cosa deve accadere dentro il ciclo WHILE per evitare loop infiniti?", "opzioni": ["a) La variabile di controllo deve rimanere costante", "b) La condizione deve diventare falsa in un momento", "c) Non c'è modo di evitarli", "d) Bisogna aggiungere ELSE"], "risposta_corretta": "b"},
  {"numero": 75, "testo": "Quando viene controllata la condizione in un WHILE?", "opzioni": ["a) Dopo ogni iterazione", "b) Soltanto la prima volta", "c) Prima di ogni iterazione", "d) Alla fine del programma"], "risposta_corretta": "c"},
  {"numero": 76, "testo": "Quale è un esempio corretto di WHILE per contare da 1 a 5?", "opzioni": ["a) MENTRE (i <= 5) ESEGUI SCRIVI i FINE MENTRE", "b) MENTRE (i <= 5) ESEGUI SCRIVI i, i = i + 1 FINE MENTRE", "c) MENTRE (i >= 5) ESEGUI SCRIVI i FINE MENTRE", "d) MENTRE (i > 5) ESEGUI SCRIVI i FINE MENTRE"], "risposta_corretta": "b"},
  {"numero": 77, "testo": "È possibile usare un WHILE con una condizione che è sempre vera?", "opzioni": ["a) No, il programma crasha", "b) Sì, ma crea un loop infinito", "c) Solo se il computer è molto veloce", "d) Dipende dal linguaggio"], "risposta_corretta": "b"},
  {"numero": 78, "testo": "Quale variabile è importante modificare dentro il ciclo WHILE?", "opzioni": ["a) Tutte le variabili", "b) La variabile di controllo della condizione", "c) Le variabili non usate", "d) Nessuna in particolare"], "risposta_corretta": "b"},
  {"numero": 79, "testo": "Qual è un caso d'uso per WHILE?", "opzioni": ["a) Leggere input finché l'utente non inserisce uno specifico valore", "b) Contare da 1 a 100", "c) Dichiarare una variabile", "d) Terminare il programma"], "risposta_corretta": "a"},
  {"numero": 80, "testo": "Il ciclo WHILE si esegue almeno una volta?", "opzioni": ["a) Sempre", "b) No, se la condizione è falsa da subito non si esegue", "c) Solo se contiene istruzioni", "d) Dipende dalla versione di pseudocodice"], "risposta_corretta": "b"},
  {"numero": 81, "testo": "Quale è la principale differenza tra DO WHILE e WHILE?", "opzioni": ["a) Non c'è differenza", "b) DO WHILE esegue il blocco almeno una volta, WHILE verifica prima", "c) WHILE è più veloce", "d) DO WHILE funziona solo con numeri"], "risposta_corretta": "b"},
  {"numero": 82, "testo": "Quale è la sintassi corretta di DO WHILE?", "opzioni": ["a) MENTRE (condizione) ESEGUI istruzioni FINE MENTRE", "b) FAI istruzioni MENTRE (condizione)", "c) DO istruzioni WHILE condizione END", "d) ESEGUI istruzioni FINCHÉ (condizione)"], "risposta_corretta": "b"},
  {"numero": 83, "testo": "Quando viene controllata la condizione in un DO WHILE?", "opzioni": ["a) Prima di ogni iterazione", "b) Dopo ogni iterazione", "c) Solo la prima volta", "d) Alla fine del programma"], "risposta_corretta": "b"},
  {"numero": 84, "testo": "Se la condizione di un DO WHILE è falsa da subito, il blocco si esegue?", "opzioni": ["a) No, non si esegue mai", "b) Sì, si esegue almeno una volta", "c) Dipende dalla variabile", "d) Solo parzialmente"], "risposta_corretta": "b"},
  {"numero": 85, "testo": "Quale è un caso d'uso ideale per DO WHILE?", "opzioni": ["a) Contare da 1 a 100 con numero noto", "b) Menu che si esegue almeno una volta finché l'utente non sceglie di uscire", "c) Verificare se un numero è positivo", "d) Dichiarare variabili"], "risposta_corretta": "b"},
  {"numero": 86, "testo": "Il DO WHILE protegge dal rischio di loop infiniti?", "opzioni": ["a) Sì, sempre", "b) No, può comunque creare loop infiniti se la condizione è sempre vera", "c) Solo se ha ELSE", "d) Dipende dal numero di iterazioni"], "risposta_corretta": "b"},
  {"numero": 87, "testo": "Quale è la differenza nel comportamento tra un WHILE e DO WHILE con condizione falsa?", "opzioni": ["a) Nessuna differenza", "b) WHILE non esegue, DO WHILE esegue almeno una volta", "c) WHILE esegue una volta, DO WHILE non esegue", "d) Entrambi non eseguono"], "risposta_corretta": "b"},
  {"numero": 88, "testo": "Si possono usare connettivi logici AND e OR nella condizione di DO WHILE?", "opzioni": ["a) No, non sono supportati", "b) Sì, come in qualsiasi condizione", "c) Solo AND", "d) Solo OR"], "risposta_corretta": "b"},
  {"numero": 89, "testo": "Quale affermazione sul DO WHILE è corretta?", "opzioni": ["a) È più veloce del WHILE", "b) Garantisce che il blocco si esegua almeno una volta", "c) Non richiede la modifica di variabili", "d) Non può avere condizioni complesse"], "risposta_corretta": "b"},
  {"numero": 90, "testo": "In un DO WHILE, dove deve trovarsi la variabile di controllo della condizione?", "opzioni": ["a) Solo dentro il blocco", "b) Sia prima che dentro il blocco (dichiarata prima, modificata dentro)", "c) Solo prima del ciclo", "d) Non importa dove si trovi"], "risposta_corretta": "b"},
  {"numero": 91, "testo": "A cosa serve il ciclo FOR?", "opzioni": ["a) A prendere decisioni", "b) A ripetere un blocco di istruzioni un numero PREDEFINITO di volte", "c) A dichiarare variabili", "d) A terminare il programma"], "risposta_corretta": "b"},
  {"numero": 92, "testo": "Quale è la sintassi corretta di FOR?", "opzioni": ["a) PER contatore DA inizio A fine ESEGUI istruzioni FINE PER", "b) FOR counter = start TO end DO instructions END", "c) WHILE counter < end DO instructions END", "d) SE (counter <= end) ALLORA istruzioni"], "risposta_corretta": "a"},
  {"numero": 93, "testo": "Cosa rappresenta il parametro 'PASSO' in un FOR?", "opzioni": ["a) Il valore iniziale del contatore", "b) Il numero di iterazioni", "c) Di quanto aumentare il contatore ad ogni iterazione", "d) La condizione di fine ciclo"], "risposta_corretta": "c"},
  {"numero": 94, "testo": "Quale è il valore di default del PASSO in un FOR?", "opzioni": ["a) 0", "b) 1", "c) 10", "d) -1"], "risposta_corretta": "b"},
  {"numero": 95, "testo": "Si possono fare passo decrescente con FOR (es. 10, 9, 8...)?", "opzioni": ["a) No, il FOR conta sempre in crescita", "b) Sì, usando un PASSO negativo", "c) Solo se usi WHILE", "d) Dipende dal linguaggio"], "risposta_corretta": "b"},
  {"numero": 96, "testo": "Quale è un esempio corretto di FOR per stampare da 1 a 5?", "opzioni": ["a) PER i DA 1 A 5 ESEGUI SCRIVI i FINE PER", "b) FOR i = 1 TO 5 PRINT i END", "c) MENTRE (i <= 5) ESEGUI SCRIVI i, i = i + 1 FINE MENTRE", "d) SE (i <= 5) ALLORA SCRIVI i"], "risposta_corretta": "a"},
  {"numero": 97, "testo": "Il FOR garantisce che non ci siano loop infiniti?", "opzioni": ["a) Sì, sempre", "b) Sì, perché il numero di iterazioni è predefinito", "c) No, dipende dal programmatore", "d) Solo se il PASSO è positivo"], "risposta_corretta": "b"},
  {"numero": 98, "testo": "Si può modificare il contatore del FOR dentro il ciclo?", "opzioni": ["a) Sì, sempre", "b) No, il FOR controlla automaticamente il contatore", "c) Sì, ma è sconsigliato", "d) Dipende dal linguaggio"], "risposta_corretta": "c"},
  {"numero": 99, "testo": "Quale è più sicuro da loop infiniti: FOR o WHILE?", "opzioni": ["a) Sono uguali", "b) FOR è più sicuro perché ha un numero definito di iterazioni", "c) WHILE è più sicuro", "d) Dipende dalla condizione"], "risposta_corretta": "b"},
  {"numero": 100, "testo": "Come si scrive un FOR per contare da 10 a 1 con PASSO -1?", "opzioni": ["a) PER i DA 1 A 10 ESEGUI SCRIVI i FINE PER", "b) PER i DA 10 A 1 PASSO -1 ESEGUI SCRIVI i FINE PER", "c) FOR i = 10 DOWN TO 1 PRINT i", "d) MENTRE (i >= 1) ESEGUI SCRIVI i"], "risposta_corretta": "b"},
  {"numero": 101, "testo": "Cos'è un loop infinito?", "opzioni": ["a) Un ciclo che si ripete molte volte", "b) Un ciclo che non termina mai perché la condizione di uscita non viene raggiunta", "c) Un ciclo con PASSO infinito", "d) Un ciclo che ripete infinitamente le stesse istruzioni"], "risposta_corretta": "b"},
  {"numero": 102, "testo": "Quale è un causa comune di loop infiniti nei WHILE?", "opzioni": ["a) La condizione è sempre falsa", "b) Non si modifica la variabile di controllo della condizione", "c) Il PASSO è troppo piccolo", "d) Si usa IF invece di IF-ELSE"], "risposta_corretta": "b"},
  {"numero": 103, "testo": "Quale è un problema causato da un loop infinito?", "opzioni": ["a) Nessuno, il programma funziona normalmente", "b) Il programma non risponde e consuma risorse (CPU e RAM)", "c) Il file viene cancellato", "d) Gli altri programmi funzionano più velocemente"], "risposta_corretta": "b"},
  {"numero": 104, "testo": "Come si può uscire da un loop infinito bloccato?", "opzioni": ["a) Non è possibile", "b) Premendo Ctrl+C in terminale o forzando la chiusura del programma", "c) Riavviando il computer", "d) Aspettando che il loop termini da solo"], "risposta_corretta": "b"},
  {"numero": 105, "testo": "Quale affermazione su 'MENTRE (true) ESEGUI' è corretta?", "opzioni": ["a) È una pratica sconsigliata perché crea facilmente loop infiniti", "b) È sempre sicura perché WHILE controlla la condizione", "c) Non causa mai problemi", "d) Funziona solo una volta"], "risposta_corretta": "a"},
  {"numero": 106, "testo": "Come si può prevenire un loop infinito?", "opzioni": ["a) Usando sempre IF", "b) Assicurandosi che la condizione possa diventare falsa e che la variabile di controllo si modifichi", "c) Usando FOR invece di WHILE", "d) Aggiungendo ELSE al ciclo"], "risposta_corretta": "b"},
  {"numero": 107, "testo": "Quale è il principale rischio di un loop infinito in termini di risorse?", "opzioni": ["a) Perdita di dati", "b) Rallentamento o blocco del sistema dovuto al consumo eccessivo di CPU e RAM", "c) Corruzione del disco fisso", "d) Perdita di connessione internet"], "risposta_corretta": "b"},
  {"numero": 108, "testo": "Se un loop legge input da tastiera, cosa accade in un loop infinito?", "opzioni": ["a) L'input viene letto una sola volta", "b) Il programma aspetta infinitamente l'input", "c) L'input viene ignorato", "d) Il programma si chiude automaticamente"], "risposta_corretta": "b"},
  {"numero": 109, "testo": "Quale struttura di controllo è più sicura dai loop infiniti?", "opzioni": ["a) WHILE", "b) DO WHILE", "c) FOR", "d) IF"], "risposta_corretta": "c"},
  {"numero": 110, "testo": "In quale scenario è più facile commettere l'errore di loop infinito?", "opzioni": ["a) Quando si usa FOR con numero definito di iterazioni", "b) Quando si usa WHILE e si dimentica di modificare la variabile di controllo", "c) Quando si usa DO WHILE", "d) Quando si dichiara una variabile"], "risposta_corretta": "b"}
];

// Costanti per la configurazione del test
const NUM_DOMANDE_TOTALI = 110;
const NUM_DOMANDE_TEST = 20;
const SOGLIA_ECCELLENTE = 16; // 80% di 20
const SOGLIA_BUONO = 12;       // 60% di 20
const SHEET_ID = '1CfPdeVbNiTjGeYbsmQxC8y-PjfyoOe0vOkGHnRJso8o';

// ==================== FUNZIONI UTILITÀ ====================

/**
 * Seleziona casualmente N domande dalle TUTTE_LE_DOMANDE
 * @param {number} n - Numero di domande da selezionare
 * @return {Array} - Array di domande selezionate con numeri sequenziali 1-20
 */
function selectRandomQuestions(n) {
  // Copia array per non modificare l'originale
  const disponibili = [...TUTTE_LE_DOMANDE];
  const selezionate = [];

  // Fisher-Yates shuffle
  for (let i = disponibili.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [disponibili[i], disponibili[j]] = [disponibili[j], disponibili[i]];
  }

  // Prendi le prime N domande
  for (let i = 0; i < n && i < disponibili.length; i++) {
    const domanda = Object.assign({}, disponibili[i]);
    domanda.numero_originale = domanda.numero; // Salva numero originale
    domanda.numero = i + 1; // Assegna numero sequenziale
    selezionate.push(domanda);
  }

  return selezionate;
}

/**
 * Calcola il punteggio in base alle risposte
 */
function calculateScore(data, domande) {
  let corrette = 0;
  const dettaglio = {};

  domande.forEach(domanda => {
    const rispostaUtente = data.risposte[`domanda_${domanda.numero}`];
    const rispostaCorretta = domanda.risposta_corretta;

    if (rispostaUtente === rispostaCorretta) {
      corrette++;
      dettaglio[`domanda_${domanda.numero}_punti`] = 1;
      dettaglio[`domanda_${domanda.numero}_corretta`] = rispostaCorretta;
    } else {
      dettaglio[`domanda_${domanda.numero}_punti`] = 0;
      dettaglio[`domanda_${domanda.numero}_corretta`] = rispostaCorretta;
    }
  });

  return {
    punteggio: corrette,
    percentuale: ((corrette / NUM_DOMANDE_TEST) * 100).toFixed(1),
    risposteCorrette: corrette,
    risposteErrate: NUM_DOMANDE_TEST - corrette,
    risposteMancanti: 0,
    dettaglioRisposte: dettaglio
  };
}

// ==================== HANDLER PRINCIPALI ====================

function doGet(e) {
  Logger.log('=== GET RICEVUTO ===');
  return ContentService
    .createTextOutput('Google Apps Script attivo per test informatica - v2.0 (110 domande, 20 casuali)')
    .setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  Logger.log('=== INIZIO doPost ===');

  // Debug dettagliato
  Logger.log('Tipo di e:', typeof e);
  Logger.log('e === null?:', e === null);
  Logger.log('e === undefined?:', e === undefined);
  if (e) {
    Logger.log('Chiavi di e:', Object.keys(e).join(', '));
    Logger.log('postData tipo:', typeof e.postData);
    Logger.log('parameter tipo:', typeof e.parameter);
    if (e.postData) {
      Logger.log('postData.contents tipo:', typeof e.postData.contents);
    }
  }
  Logger.log('Evento ricevuto:', JSON.stringify(e));

  try {
    // Verifica che l'oggetto evento e postData esistano
    if (!e) {
      Logger.log('ERRORE CRITICO: Evento completamente nullo!');
      Logger.log('Questo significa che lo script non è stato pubblicato correttamente come Web App.');
      throw new Error('Evento completamente nullo - Ripubblicare lo script come Web App');
    }

    let data = null;

    // Prova prima con postData (metodo standard)
    if (e.postData && e.postData.contents) {
      Logger.log('Parsing postData.contents');
      Logger.log('Contenuto:', e.postData.contents.substring(0, 200));
      data = JSON.parse(e.postData.contents);
    }
    // Fallback: prova con i parametri
    else if (e.parameter) {
      Logger.log('postData mancante, usando e.parameter come fallback');
      Logger.log('Parametri disponibili:', JSON.stringify(e.parameter));
      data = e.parameter;
      // Se i dati sono stringhe, prova a parsarli come JSON
      if (typeof data === 'string') {
        data = JSON.parse(data);
      }
    }
    else {
      throw new Error('Nè postData nè parameter disponibili nell\'evento. Evento ricevuto: ' + JSON.stringify(e));
    }

    if (!data) {
      throw new Error('Impossibile estrarre dati dall\'evento');
    }

    Logger.log('Dati parsati correttamente:', JSON.stringify(data).substring(0, 300));

    // Recupera le domande EFFETTIVAMENTE usate dal frontend
    // Se disponibili usa quelle, altrimenti seleziona casualmente
    let domande;
    if (data.domandeUsate && data.domandeUsate.length > 0) {
      // Ricostruisci l'oggetto domande a partire dai numeri originali ricevuti dal frontend
      domande = data.domandeUsate.map((numeroOriginale, index) => {
        const domandaOriginale = TUTTE_LE_DOMANDE.find(d => d.numero === numeroOriginale);
        if (!domandaOriginale) {
          throw new Error(`Domanda originale ${numeroOriginale} non trovata`);
        }
        const domanda = Object.assign({}, domandaOriginale);
        domanda.numero = index + 1; // Numero sequenziale nel test
        domanda.numero_originale = numeroOriginale;
        return domanda;
      });
      Logger.log('Domande recuperate dal frontend:', domande.map(d => d.numero_originale).join(', '));
    } else {
      // Fallback: seleziona casualmente (per compatibilità con versioni vecchie)
      Logger.log('AVVISO: domandeUsate non trovate, selezionando casualmente');
      domande = selectRandomQuestions(NUM_DOMANDE_TEST);
    }

    // Calcola il punteggio
    const scoreData = calculateScore(data, domande);

    // Apri il foglio di lavoro
    const ss = SpreadsheetApp.openById(SHEET_ID);
    let sheet = ss.getSheetByName('Risultati Test');

    // Se il foglio non esiste, crealo
    if (!sheet) {
      sheet = ss.insertSheet('Risultati Test');

      // Aggiungi intestazioni per 20 domande
      const headers = ['Timestamp', 'Nome', 'Cognome', 'Classe'];

      // Aggiungi colonne per tutte le 20 domande del test
      for (let i = 1; i <= NUM_DOMANDE_TEST; i++) {
        headers.push(`Domanda ${i}`);
      }

      // Aggiungi colonne di riepilogo
      headers.push('Punteggio', 'Percentuale', 'Risposte Corrette', 'Risposte Errate', 'Risposte Mancanti');

      // Aggiungi colonne punti per tutte le 20 domande
      for (let i = 1; i <= NUM_DOMANDE_TEST; i++) {
        headers.push(`Punti Q${i}`);
      }

      // Aggiungi colonna per i numeri originali delle domande
      headers.push('Numeri Domande Originali', 'Data Test');

      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    // Prepara i dati per l'inserimento
    const rowData = [
      new Date(),
      data.nome,
      data.cognome,
      data.classe
    ];

    // Aggiungi risposte per tutte le 20 domande del test
    for (let i = 1; i <= NUM_DOMANDE_TEST; i++) {
      rowData.push(data.risposte[`domanda_${i}`] || '');
    }

    // Aggiungi dati di riepilogo
    rowData.push(
      scoreData.punteggio,
      scoreData.percentuale + '%',
      scoreData.risposteCorrette,
      scoreData.risposteErrate,
      scoreData.risposteMancanti
    );

    // Aggiungi punti per tutte le 20 domande
    for (let i = 1; i <= NUM_DOMANDE_TEST; i++) {
      rowData.push(scoreData.dettaglioRisposte[`domanda_${i}_punti`] || 0);
    }

    // Aggiungi numeri originali delle domande
    const numeriOriginali = domande.map(d => d.numero_originale).join(', ');
    rowData.push(numeriOriginali, data.dataTest);

    // Aggiungi la riga al foglio
    sheet.appendRow(rowData);

    // Formattazione automatica
    const lastRow = sheet.getLastRow();

    // Colonna del punteggio (dopo 20 domande + 4 colonne iniziali = colonna 25)
    const scoreColIndex = 25;
    const correctColIndex = 27; // Colonna Risposte Corrette
    const errorColIndex = 28;   // Colonna Risposte Errate

    const scoreCell = sheet.getRange(lastRow, scoreColIndex);
    const correctCell = sheet.getRange(lastRow, correctColIndex);
    const errorCell = sheet.getRange(lastRow, errorColIndex);

    // Soglie per 20 domande: 16+ = 80%+, 12+ = 60%+
    if (scoreData.punteggio >= SOGLIA_ECCELLENTE) {
      scoreCell.setBackground('#d4edda'); // Verde per 80%+
      correctCell.setBackground('#d4edda');
    } else if (scoreData.punteggio >= SOGLIA_BUONO) {
      scoreCell.setBackground('#fff3cd'); // Giallo per 60-79%
      correctCell.setBackground('#fff3cd');
    } else {
      scoreCell.setBackground('#f8d7da'); // Rosso per <60%
      correctCell.setBackground('#f8d7da');
    }

    // Colora la colonna errori sempre in rosso se ci sono errori
    if (scoreData.risposteErrate && scoreData.risposteErrate > 0) {
      errorCell.setBackground('#f8d7da');
    }

    // Colora le colonne dei punti individuali per tutte le 20 domande
    // La struttura è: 4 colonne iniziali + 20 risposte + 5 riepilogo = colonne 1-29
    // Le colonne punti iniziano da colonna 30

    // Usa il dettaglio dal frontend per evitare mismatch di indici
    const dettaglioSorgente = data.dettaglioRisposte || scoreData.dettaglioRisposte;

    Logger.log('DEBUG Colorazione - dettaglio disponibile:', JSON.stringify(dettaglioSorgente).substring(0, 200));

    for (let i = 1; i <= NUM_DOMANDE_TEST; i++) {
      const puntiColIndex = 29 + i; // Colonna 30 per i=1, colonna 31 per i=2, ecc.
      const puntiCell = sheet.getRange(lastRow, puntiColIndex);
      const punti = dettaglioSorgente[`domanda_${i}_punti`];

      Logger.log(`Domanda ${i}: puntiColIndex=${puntiColIndex}, punti=${punti}`);

      if (punti === 1) {
        puntiCell.setBackground('#d4edda'); // Verde per risposta corretta
      } else if (punti === 0) {
        puntiCell.setBackground('#f8d7da'); // Rosso per risposta errata/mancante
      }
    }

    // Invia email di notifica
    sendNotificationEmail(data, scoreData, domande);

    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Test salvato con successo',
        punteggio: scoreData.punteggio,
        percentuale: scoreData.percentuale
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log('Errore doPost: ' + error.toString());
    Logger.log('Oggetto evento ricevuto: ' + JSON.stringify(e));

    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: error.toString(),
        debug: e ? 'evento presente' : 'evento mancante'
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function sendNotificationEmail(data, scoreData, domande) {
  try {
    // Email del docente (sostituire con la propria)
    const teacherEmail = 'antonio.larosa@iisfamiliari.edu.it';

    const subject = `Nuovo test completato - ${data.nome} ${data.cognome} (${scoreData.percentuale}%)`;

    const domandeFacilitate = domande
      .filter(d => scoreData.dettaglioRisposte[`domanda_${d.numero}_punti`] === 0)
      .map(d => `Q${d.numero} (orig. ${d.numero_originale}): ${d.testo.substring(0, 50)}...`)
      .join('\n- ');

    const body = `
Un nuovo studente ha completato il test di informatica (20 domande casuali su 110):

=== DATI STUDENTE ===
Nome: ${data.nome} ${data.cognome}
Classe: ${data.classe}
Data: ${data.dataTest}

=== RISULTATI ===
Punteggio: ${scoreData.punteggio}/${NUM_DOMANDE_TEST} (${scoreData.percentuale}%)
Risposte Corrette: ${scoreData.risposteCorrette}
Risposte Errate: ${scoreData.risposteErrate}

=== DOMANDE SBAGLIATE ===
${domandeFacilitate || 'Nessuna - Test perfetto!'}

=== NUMERI DOMANDE SELEZIONATE ===
${domande.map(d => `${d.numero} (originale ${d.numero_originale})`).join(', ')}

Il test è stato automaticamente salvato nel foglio Google Sheets.
Per il dettaglio completo consultare il foglio con tutti i dati.
    `;

    MailApp.sendEmail(teacherEmail, subject, body);

  } catch (error) {
    Logger.log('Errore invio email: ' + error.toString());
  }
}

// ==================== FUNZIONI DI TEST ====================

/**
 * Funzione per testare lo script
 */
function testScript() {
  // Seleziona 20 domande casuali
  const domande = selectRandomQuestions(NUM_DOMANDE_TEST);

  Logger.log('=== TEST SCRIPT ===');
  Logger.log('Domande selezionate: ' + NUM_DOMANDE_TEST);
  Logger.log('Domande originali: ' + domande.map(d => d.numero_originale).join(', '));

  // Crea dati di test
  const testData = {
    nome: 'Mario',
    cognome: 'Rossi',
    classe: '1A',
    dataTest: new Date().toLocaleString('it-IT'),
    risposte: {}
  };

  // Assegna risposte (tutte corrette per il test)
  domande.forEach(d => {
    testData.risposte[`domanda_${d.numero}`] = d.risposta_corretta;
  });

  // Simula una chiamata POST
  const e = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };

  const result = doPost(e);
  Logger.log('Risultato: ' + result.getContent());
}

/**
 * Funzione per creare il foglio di calcolo
 */
function setupGoogleSheet() {
  // Crea un nuovo foglio di calcolo
  const ss = SpreadsheetApp.create('Risultati Test Informatica v2.0');
  const sheet = ss.getActiveSheet();
  sheet.setName('Risultati Test');

  // Aggiungi intestazioni per 20 domande
  const headers = ['Timestamp', 'Nome', 'Cognome', 'Classe'];

  for (let i = 1; i <= NUM_DOMANDE_TEST; i++) {
    headers.push(`Domanda ${i}`);
  }

  headers.push('Punteggio', 'Percentuale', 'Risposte Corrette', 'Risposte Errate', 'Risposte Mancanti');

  for (let i = 1; i <= NUM_DOMANDE_TEST; i++) {
    headers.push(`Punti Q${i}`);
  }

  headers.push('Numeri Domande Originali', 'Data Test');

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  sheet.setFrozenRows(1);

  // Formattazione delle colonne
  sheet.setColumnWidth(1, 150);  // Timestamp
  sheet.setColumnWidth(2, 100);  // Nome
  sheet.setColumnWidth(3, 100);  // Cognome
  sheet.setColumnWidth(4, 80);   // Classe

  // Formattazione condizionale per il punteggio (colonna 25 per 20 domande)
  const scoreColIndex = 25;
  const scoreRange = sheet.getRange(2, scoreColIndex, sheet.getMaxRows() - 1, 1);

  const rules = [
    SpreadsheetApp.newConditionalFormatRule()
      .setRanges([scoreRange])
      .whenNumberGreaterThanOrEqualTo(SOGLIA_ECCELLENTE)
      .setBackground('#d4edda')
      .build(),
    SpreadsheetApp.newConditionalFormatRule()
      .setRanges([scoreRange])
      .whenNumberBetween(SOGLIA_BUONO, SOGLIA_ECCELLENTE - 1)
      .setBackground('#fff3cd')
      .build(),
    SpreadsheetApp.newConditionalFormatRule()
      .setRanges([scoreRange])
      .whenNumberLessThan(SOGLIA_BUONO)
      .setBackground('#f8d7da')
      .build()
  ];

  sheet.setConditionalFormatRules(rules);

  Logger.log('Foglio di calcolo creato: ' + ss.getUrl());
  Logger.log('ID del foglio: ' + ss.getId());

  return ss.getId();
}
