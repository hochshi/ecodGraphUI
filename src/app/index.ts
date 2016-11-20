import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {routing, RootComponent} from './routes';
import {store} from './reducers';
import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataServiceOverride} from './providers/in-memory-data.provider';
import {AppComponent} from './containers/App';
import {FooterComponent} from './components/Footer';
import {HeaderComponent} from './components/Header';
import {MainSectionComponent} from './components/MainSection';
import {TodoItemComponent} from './components/TodoItem';
import {TodoTextInputComponent} from './components/TodoTextInput';
import {CytoscapeComponent} from './components/cytoscape.component';
import {HttpModule} from '@angular/http';
import {EcodService} from './services/ecod.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {Ng2BreadcrumbModule, BreadcrumbService} from 'ng2-breadcrumb/ng2-breadcrumb';
import {CytoscapeSelectionService} from './services/cytoscape.service';

// imports for loading & configuring the in-memory web api

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataServiceOverride),
    routing,
    store,
    NgbModule.forRoot(),
    Ng2BreadcrumbModule
  ],
  declarations: [
    RootComponent,
    AppComponent,
    FooterComponent,
    HeaderComponent,
    MainSectionComponent,
    TodoItemComponent,
    TodoTextInputComponent,
    CytoscapeComponent
  ],
  providers: [
    EcodService,
    BreadcrumbService,
    CytoscapeSelectionService
  ],
  bootstrap: [RootComponent]
})
export class AppModule {}
