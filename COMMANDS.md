npm install -g @angular/cli
ng new pokedex --routing --style=scss
ng serve
ng generate component components/dashboard
ng generate component components/pokemon-list
ng generate component components/pokemon-detail
ng generate component components/search
ng generate component components/navbar
ng generate service services/pokemon
ng generate interface interfaces/pokemon
ng build
