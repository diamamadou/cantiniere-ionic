import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'menu', pathMatch: 'full' },
  //    { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'order',
    loadChildren: () => import('./order/order.module').then(m => m.OrderPageModule)
  },
  {
    path: 'meal',
    children: [{
      path: '',
      loadChildren: () => import('./meal/meal.module').then(m => m.MealPageModule)
    }, {
      path: 'detail/:IdPlat',
      loadChildren: () => import('./detail-meal/detail-meal.module').then(m => m.DetailMealPageModule)
    }, {
      path: 'edit/:IdPlat',
      loadChildren: () => import('./edit-meal/edit-meal.module').then(m => m.EditMealPageModule)
    }]
  },

  {
    path: 'todays-menu',
    loadChildren: () => import('./todays-menu/todays-menu.module').then(m => m.TodaysMenuPageModule)
  },
  {

    path: 'detail-menu-jour/:id',
    loadChildren: () => import('./detail-menu-jour/detail-menu-jour.module').then(m => m.DetailMenuJourPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'order-detail/:id',
    loadChildren: () => import('./order-detail/order-detail.module').then( m => m.OrderDetailPageModule)
  },
  {
    path: 'utilisateurs',
    loadChildren: () => import('./utilisateurs/utilisateurs.module').then(m => m.UtilisateursPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
