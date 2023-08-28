import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditCourseComponent } from './edit-course/edit-course.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'courses' },
  {
    path: 'courses',
    loadChildren: () => import('./courses/courses.module').then(m => m.CoursesModule)
  },
  {
    path: "course/update/:id",
    component: EditCourseComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
