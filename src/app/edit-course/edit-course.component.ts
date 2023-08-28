import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../courses/services/courses.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../courses/model/course';

@Component({
  selector: 'app-courses',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss'],
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
  cancel() {
    this.router.navigate([''])
  }
selecionarCourse(course: Course){
  this.coursesService.chamarPeloCoursesById(course._id)
  .subscribe(resposta => {

  });
}
atualizarCurso() {
  const curso: Course = {
    _id: this.id,
    name: this.course.name,
    category: this.course.category
  }
  console.log(curso);

  this.coursesService.atualizarCourse(curso).subscribe(response => {
    console.log(response)
  })

}

}
