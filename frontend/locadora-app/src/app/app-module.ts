import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// Rotas - atenção: o nome do arquivo é app-routing-module.ts
import { AppRoutingModule } from './app-routing-module';

// Componente principal - atenção: o nome do arquivo é app.ts
import { AppComponent } from './app';

// Importar os componentes
import { Login } from './components/login/login';
import { Dashboard } from './components/dashboard/dashboard';
import { Veiculos } from './components/veiculos/veiculos';
import { Marcas } from './components/marcas/marcas';
import { Categorias } from './components/categorias/categorias';
import { Navbar } from './components/navbar/navbar';

// Importar o Interceptor
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    Login,
    Dashboard,
    Veiculos,
    Marcas,
    Categorias,
    Navbar
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,  // <-- Para chamadas HTTP
    FormsModule        // <-- Para usar ngModel nos formulários
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }