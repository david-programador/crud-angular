import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../courses/services/courses.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Course } from '../courses/model/course';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss']
})
export class EditCourseComponent implements OnInit {

  id!: string;
  course!: Course;


  constructor(private coursesService: CoursesService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

     }

  ngOnInit(): void {
    // Recuperar o course pelo ID
    this.id = this.activatedRoute.snapshot.url[2].path;

    this.coursesService.chamarPeloCoursesById(this.id).subscribe((course: Course) => {
      this.course = course;


    });
  }

  updateCourse(): void {}

  cancel(): void {
    this.router.navigate(['/courses/'])
  }
selecionarCourse(course: Course){
  this.coursesService.chamarPeloCoursesById(course._id)
  .subscribe(resposta => {

  });
}
salvarCurso() {
  const cursoAdiciona: Course = {
    _id: this.id,
    name: this.course.name,
    category: this.course.category
  }
  console.log(cursoAdiciona);

  this.coursesService.atualizarCourse(cursoAdiciona).subscribe(response => {
    console.log(response)
  })

}

}
