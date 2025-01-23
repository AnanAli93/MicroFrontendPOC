import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TodoComponent } from './todo/todo.component';
import { loadRemoteModule } from '@angular-architects/module-federation';


const MFE_APP_URL = "http://localhost:4300/remoteEntry.js";
// const routes: Routes = [
//   {path: '', redirectTo: '/home', pathMatch: 'full'},
//   {path: 'home', component: HomeComponent},
//   {path: 'todo-list', component: TodoComponent}
// ];
const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {
    path: 'todo-list', 
    loadChildren: () => {
      return loadRemoteModule({ //this allow us to load module remotely
        remoteEntry: MFE_APP_URL,
        remoteName: "mfeApp",
        exposedModule: "./TodoListModule"
      }).then(m => m.TodoListModule).catch(err => console.log(err));
    }
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routeCompArr = [HomeComponent, TodoComponent];