import { Routes, RouterModule }
  from '@angular/router';
import { WhiteBoardComponent }
  from "./white-board/white-board.component";
import {CourseViewerComponent} from "./course-viewer/course-viewer.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {ProfileComponent} from "./profile/profile.component";
import {SectionListComponent} from './section-list/section-list.component';
import {AdminPageComponent} from './admin-page/admin-page.component';
import { SearchBookComponent } from './search-book/search-book.component';
import {AuthorPageComponent} from './author-page/author-page.component';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {AuthorHostComponent} from './author-host/author-host.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: LandingPageComponent},
  { path: 'search', component: SearchBookComponent},
  {path: 'admin', component: AdminPageComponent},
  {path: 'author', component: AuthorHostComponent},
  { path: 'course/:courseId/section', component: AdminPageComponent },
  { path: 'enroll/course/:courseId/section', component: SectionListComponent },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'course/:courseId', component: CourseViewerComponent },
  // { path: 'course/:courseId/section', component: SectionListComponent },
  { path: 'course/:courseId/module/:moduleId', component: CourseViewerComponent },
  { path: 'course/:courseId/module/:moduleId/lesson/:lessonId', component: CourseViewerComponent },
  { path: '**', component: WhiteBoardComponent} // last
];
export const routing = RouterModule.forRoot(appRoutes);
