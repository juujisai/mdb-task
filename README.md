# O wykonanym zadaniu

Zadanie wykonano w `React.Js`, z wykorzystaniem narzędzia Create React App. Do zarządzania stanem aplikacji wykorzystano bibliotekę `Redux`.

## Aplikacja została przesłana na netlify

https://mdb-task-react-bc.netlify.app/

### `zadanie podstawowe`

Dodano inputy pozwalające na dodanie nowej pozycji w tabeli. Dane przesyłane są do reducera oraz do localStorage. Można też dodać nową kategorię. Kategorie zapisują się w localStorage.

Aplikacja sprawdza czy localStorage posiada jakieś zapisane dane i przesyła je do odpowiedniego reducera.

Do przesłanych danych z inputów dodawane jest unikalne id, generowane przy pomocy biblioteki `uuid`.


### `narzędzia`

Poniżej formularza do przesyłania danych znajduje się kilka przycisków, które pozwalają na wykonanie dodatkowych działań w związku z danymi. Narzędzia opiszę w dalszej części opisu.

Wszystkie ikony w aplikacji pochodzą z paczki `react-icons`.


### `tabela`

Tabela została wykonana bez wykorzystania dodatkowych bibliotek. Po wciśnięciu przycisku edycji na pasku narzędziowym, możliwe jest usunięcie pozycji z tabeli. 

Na końcu tabeli przedstawione jest podsumowanie wszystkich pozycji.

## `Zadania dodatkowe`

### `Zapisywanie danych w localStorage`

Dane po zapisaniu formularza przesyłane są do localStorage. Edycja i usunięcie pozycji w tabeli również powoduje wysłanie danych do localStorage.

### `Zapisywanie danych w Node`

Jest to moja pierwsza stycznośc z `Node.js`. Wykorzystałem narzędzie `express` do postawienia nowego serwera, utworzyłem w nim 3 endpointy - get, post i put. Serwer został przesłany na serwis `heroku`, skąd można pobierać i edytować dane.

** Repozytorium serwera na github **
https://github.com/juujisai/mdb-task-node 

Ważne: dane zapisywane są w zmiennej na serwerze. Heroku odświeża te dane co kilka godzin.

Aby przetestować działalność należy włączyć narzędzie `api`, w którym mamy możliwosć pobierania danych z serwera (istnieje możliwość zapisania danych do localStorage), export ostatniej pozycji z tabeli za pomocą post, oraz podmianę całej tabeli w zmiennej za pomocą put. 

Zapytania obsługiwane są przez `axiosa`. Dodatkowo wykorzystałem paczkę `redux-thunk` aby możliwe było zwracanie funkcji zamiast obiektu w kreatorze akcji odpowiedzialnym za pobieranie danych z api. Link do api schowany został w plik .env.


### `Podsumowanie kosztów i ilości pozycji `

Jest obsługiwane przez narzędzie statystyka w stworzonym przeze mnie pasku narzędziowym. W panelu, który wyskoczy po wciśnięciu przycisku `statystyka`, można wybrać rodzaj statystyki - czy interesuje nas suma czy średnia wartości, można wybrać kolumnę, z której chcemy wybrać interesującą nas wartość.

Dane pojawią się pod tabelą główną.

### `Opcja edycji dodanej pozycji`

Dane można edytować po wciśnięciu przycisku `edytuj`. Nie można edytować kolejnej pozycji przed zapisem lub anulowaniem edycji poprzedniego rekordu. Zedytowane dane podmieniane są w tabeli i wysyłane do localStorage. 

Po wciśnięciu edycji, inputy zmieniają wartość disabled z true na false. Po zapisaniu lub anulowaniu wracają na false.

### `Możliwość filtrowania kategorii`

Dane w tabeli można ograniczyć do poszczególnych kategorii za pomocą narzędzia `wyświetlanie zaawansowane`

### `Możliwość sortowania`

W nagłówkach tabeli znajduje się przycisk pozwalający na sortowanie danych. ** Filtrowanie danych nie powoduje aktualizacji localStorage. ** Jest to działanie celowe, chciałem aby po odświeżeniu dane były dalej w takiej kolejności jak wcześniej.

### `Możliwość dodania nowej kategorii`

Istnieje możliwość dodania nowej kategorii w formularzu dodawania nowych danych do tabeli. Jest to jedna z opcji do wyboru w select kategorii.

### `Drag&drop`

Po wciśnięciu przycisku edycji po prawej części tabeli pojawia się przycisk (dwie równoległe linie), który pozwala na wykonanie operacji przesunięcia i zamiany kolejności w tabeli. Drag&drop pokazuje możliwe miejsca, w które można wstawić dane (hint) oraz miejsce, gdzie aktualnie wstawi się przesuwany rekord. Rekordy nie zamieniają się miejscami, przesuwany rekord wstawiany jest po targetowanym wierszu.


### `Export do:`

Eksporty te obsługiwane są przez przycisk exportuj. Brak możliwości exportu bez danych.

`pdf`

Do eksportu do pdf wykorzystałem biblioteki: `jsPdf` oraz `html2canvas`. W związku z tym, że jspdf ma problem z dopasowaniem danych do szerokości okna, postanowiłem zamienić tabelę najpierw do obrazu i dopiero do pliku pdf. Minusem takiej operacji jest brak możliwośći selekcji danych w powstałym pliku pdf. 

`csv`

Export danych do csv obsługiwany jest przez bibliotekę `react-csv`. 

`xml`

Export danych do xml obsługiwany jest przez bibliotekę `export-from-json`. Dane najpierw zmieniane są w json a następnie eksportowane do xml.

### `dodatkowo`

W przycisku `importuj` dodałem możliwość eksportu danych z pliku csv. Po wgraniu pliku csv pojawi nam się możliwość wyboru kolumny do odowiedniego wiersza w pliku, który podesłaliśmy.

Zrobiłem to, ponieważ w przypadku, gdy użytkownik aplikacji wgra plik csv, który nie posiada dokładnie takich samych nagłówków jak te, które wykorzystałem do przetwarzania danych, import będzie błędny. W taki sposób sam użytkownik podaje, która kolumna zawiera jakie dane. W przypadku danych związanych z ceną, możliwe jest podanie jedynie kolumy zawierającej dane liczbowe. W innym przypadu aplikacja pokaże błąd i nie pozwoli przejść dalej.

Jest to jeden z problemów, z jakimi spotykałem się na studiach w oprogramowaniu GIS. Bardzo często po dograniu nowych danych do baz danych wyskakiwał błąd związany z różnymi nazwami nagłówków kolumn. Istaniło kilka reguł aby zrobić to prawidłowo. 
Myślę, że moje rozwiązanie pozwala na uniknięcie tego problemu i jest dość ciekawe.

Dane po prawidłowym pobraniu przedstawiane są w tabeli - istnieje możliwość zapisania danych w localStorage po wciśnięciu przycisku. 

W zadaniu tym nie korzystałem z dodatkowych bibliotek.
