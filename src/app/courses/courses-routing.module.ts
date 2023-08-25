import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoursesComponent } from './courses/courses.component';
import { EditCourseComponent } from '../edit-course/edit-course.component';

const routes: Routes = [

  { path: '', component: CoursesComponent },
  { path: 'edit-course/:id', component: EditCourseComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
