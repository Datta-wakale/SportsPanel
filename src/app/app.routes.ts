import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Register } from './register/register';
import { Booking } from './booking/booking';
import { LoginComponent } from './login/login';
import { ListOfSportsComponent } from './listofsports/listofsports';
import { Contact } from './contact/contact';
import { MyBookings } from './mybookings/mybookings';
import { Aboutus } from './aboutus/aboutus';
import { EventsComponent } from './events/events';
import { ProfileComponent } from './profile/profile';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard';
import { ManageSportsComponent } from './admin/manage-sports/manage-sports';
import { ManageUsersComponent } from './admin/manage-users/manage-users';
import { ManageVenuesComponent } from './admin/manage-venues/manage-venues';
import { ManageBookings } from './admin/manage-bookings/manage-bookings';
import { AdminHome } from './admin/admin-home/admin-home';
import { loginGuard } from './guards/loginguard-guard';
import { adminGuard } from './guards/adminguard-guard';
import { userGuard } from './guards/userguard-guard';
export const routes: Routes = [
    {path:'', redirectTo: '/home', pathMatch:'full'},
    {path:'home', component: Home},
    {path:'register', component: Register, canActivate: [loginGuard]},
    {path: 'booking', component: Booking , canActivate: [userGuard] },
    {path:'login', component: LoginComponent, canActivate:[loginGuard]},
    {path: 'listofsports' , component: ListOfSportsComponent},
    {path: 'contact', component: Contact},
    {path: 'mybookings', component: MyBookings,canActivate:[userGuard]},
    {path: 'aboutus', component: Aboutus},
    {path:'events', component: EventsComponent},
    {path: 'profile' , component: ProfileComponent,canActivate: [userGuard]},
    {
     path: 'admin-dashboard',component: AdminDashboardComponent,
     canActivate: [adminGuard],
     children: [
      { path: '', component: AdminHome },
      { path: 'manage-sports', component: ManageSportsComponent},
      { path: 'manage-users',component: ManageUsersComponent},
      { path: 'manage-venues', component: ManageVenuesComponent},
      { path: 'manage-bookings', component : ManageBookings}
     ]
   }
];
