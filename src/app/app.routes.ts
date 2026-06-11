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
    { path: 'profile' , component: ProfileComponent}
    
];
