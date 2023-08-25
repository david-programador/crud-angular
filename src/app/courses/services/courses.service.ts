import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, tap } from 'rxjs/operators';

import { Course } from '../model/course';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly API = 'http://localhost:3000/template';

  constructor(private httpClient: HttpClient) { }

  getCourses(): Observable<Course>{
    return this.httpClient.get<Course>(`${this.API}`);
  }

  getCoursesById(id: string): Observable<Course>{
    return this.httpClient.get<Course>(`${this.API}${id}`);
  }

  chamarPeloCoursesById(id: string): Observable<Course>{
    return this.httpClient.get<Course>(`${this.API}/${id}`)
    ;
  }

  atualizarCourse(course: Course): Observable<any>{
    return this.httpClient.put(`${this.API+"/edit/"}${course._id}`, course);
  }

  salvar(record: Course): Observable<any> {
    return this.httpClient.post<Course>(this.API+"/add", record);
  }

  save(record: Course) {
    this.httpClient.post<Course>(this.API, record);
  }

  excluirCourse(id: string): Observable<any>{
   return this.httpClient.delete<Course>(`${this.API}/delete/${id}`);
  }

  list() {
    return this.httpClient.get<Course[]>(this.API)
    .pipe(
       first(),
      // delay(5000),
       tap(courses => console.log(courses))
    );
  }
}
