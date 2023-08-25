import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../model/course';
import { CoursesService } from './../services/courses.service';
import { core } from '@angular/compiler';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  id!: string;
  course!: Course;
  rota: string = '';

  name: string = '';
  category: string = '';


  courses$: Observable<Course[]>;
  //courses: Course[] = [];
  displayedColumns = ['name','category'];

  constructor(
    private coursesService: CoursesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog) {


    //this.courses = [];
    //this.coursesService = new CoursesService();
    this.courses$ = this.coursesService.list()
    .pipe(
      catchError(error => {
        this.onError('Erro ao carregar cursos.');
        console.log(error);
        return of([])
      })
    );
    //this.coursesService.list().subscribe(courses => this.courses = courses);
  }

  salvarCurso() {
    const cursoAdiciona: Course = {
      _id: this.id,
      name: this.name,
      category: this.category
    }
    console.log(cursoAdiciona);

    this.coursesService.salvar(cursoAdiciona).subscribe(response => {
      console.log(response)
    })

  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }



  ngOnInit(): void {
    // Recuperar o curso pelo ID

    this.id = this.activatedRoute.snapshot.url[1].path;

    this.coursesService.getCoursesById(this.id).subscribe((course: Course) => {
      this.course = this.course;
      console.log(course);

  });
}

deletarCourses(course: Course){
  this.coursesService.excluirCourse(course._id)
  .subscribe(resposta => {

  });
}

selecionarCourse(course: Course){
  this.coursesService.chamarPeloCoursesById(course._id)
  .subscribe(resposta => {

  });
}

//selecionarCourse(course: Course){
 // this.coursesService.atualizarCourse(course)
 // .subscribe(resposta => {

 // });
//}

}
