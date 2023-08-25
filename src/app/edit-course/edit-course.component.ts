import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../courses/services/courses.service';
import { ActivatedRoute } from '@angular/router';
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
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // Recuperar o course pelo ID
    this.id = this.activatedRoute.snapshot.url[1].path;

    this.coursesService.getCoursesById(this.id).subscribe((course: Course) => {
      this.course = course;
    })
  }
}
