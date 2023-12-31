import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

import { Course } from '../model/course';
import { CoursesService } from './../services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  id!: string;
  name: string = '';
  category: string = '';

  courses$: Observable<Course[]>;
  displayedColumns = ['name','category'];

  constructor(
    private coursesService: CoursesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog) {

    this.courses$ = this.coursesService.list()
    .pipe(
      catchError(error => {
        this.onError('Erro ao carregar cursos.');
        console.log(error);
        return of([])
      })
    );
  }

  salvarCurso() {
    const cursoAdiciona: Course = {
      _id: this.id,
      name: this.name,
      category: this.category
    }
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
}
