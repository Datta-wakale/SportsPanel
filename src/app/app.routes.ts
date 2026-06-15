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

export const routes: Routes = [
    {path:'', redirectTo: '/home', pathMatch:'full'},
    {path:'home', component: Home},
    {path:'register', component: Register},
    {path: 'booking', component: Booking},
    {path:'login', component: LoginComponent},
    {path: 'listofsports' , component: ListOfSportsComponent},
    {path: 'contact', component: Contact},
    {path: 'mybookings', component: MyBookings},
    {path: 'aboutus', component: Aboutus},
    {path:'events', component: EventsComponent},
    { path: 'profile' , component: ProfileComponent},
    {
  path:'admin-dashboard',
  component: AdminDashboardComponent
},

{
  path:'manage-sports',
  component: ManageSportsComponent
},

{
  path:'manage-users',
  component: ManageUsersComponent
},

{
  path:'manage-venues',
  component: ManageVenuesComponent
},
{
    path:'manage-bookings',
    component: ManageBookings
}

    
];
