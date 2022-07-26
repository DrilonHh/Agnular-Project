import { Component, OnInit } from '@angular/core';
import { SubscribeService } from 'subscribe.service';
import { Student } from '../model/student';
import { Teacher } from '../model/teacher';
import { AuthService } from '../shared/auth.service';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  teacherList: Teacher[] = [];
  teacherObj: Teacher = {
    Id: '',
    first_name: '',
    last_name: '',
    Email: '',
    Mobile: '',
  };
  Id: string = '';
  first_name: string = '';
  last_name: string = '';
  Email: string = '';
  Mobile: string = '';

  studentList: Student[] = [];
  studentObj: Student = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
  };
  id: string = '';
  firstName: string = '';
  lastName: string = '';
  mobile: string = '';
  email: string = '';

  constructor(private auth: AuthService, private data: DataService) {}

  ngOnInit(): void {
    this.getAllStudents();
    // this.getAllTeachers();
  }

  // register(){
  //   this.auth.logout();
  // }

  getAllTeachers() {
    this.data.getAllTeachers().subscribe(
      (respond) => {
        this.teacherList = respond.map((t: any) => {
          const data = t.payload.doc.data();
          data.id = t.payload.doc.id;
          return data;
        });
      },
      (err) => {
        alert('Error while fetching teacher data');
      }
    );
  }
  addTeacher() {
    if (
      this.first_name == '' ||
      this.last_name == '' ||
      this.Mobile == '' ||
      this.Email == ''
    ) {
      alert('Fill all input fields');
      return;
    }

    this.teacherObj.Id = '';
    this.teacherObj.Email = this.Email;
    this.teacherObj.first_name = this.first_name;
    this.teacherObj.last_name = this.last_name;
    this.teacherObj.Mobile = this.Mobile;

    this.data.addTeacher(this.teacherObj);
    this.resetFormm();
  }
  updateTeacher() {}
  resetFormm() {
    this.Id = '';
    this.first_name = '';
    this.last_name = '';
    this.Email = '';
    this.Mobile = '';
  }
  deleteTeacher(teacher: Teacher) {
    if (
      window.confirm(
        'Are you sure you want to delete ' +
          teacher.first_name +
          ' ' +
          teacher.last_name +
          ' ?'
      )
    ) {
      this.data.deleteTeacher(teacher);
    }
  }
  /*students */
  getAllStudents() {
    this.data.getAllStudents().subscribe(
      (res) => {
        this.studentList = res.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
        });
      },
      (err) => {
        alert('Error while fetching student data');
      }
    );
  }

  addStudent() {
    if (
      this.firstName == '' ||
      this.lastName == '' ||
      this.mobile == '' ||
      this.email == ''
    ) {
      alert('Fill all input fields');
      return;
    }

    this.studentObj.id = '';
    this.studentObj.email = this.email;
    this.studentObj.firstName = this.firstName;
    this.studentObj.lastName = this.lastName;
    this.studentObj.mobile = this.mobile;

    this.data.addStudent(this.studentObj);
    this.resetForm();
  }

  updateStudent() {}
  resetForm() {
    this.id = '';
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.mobile = '';
  }
  deleteStudent(student: Student) {
    if (
      window.confirm(
        'Are you sure you want to delete ' +
          student.firstName +
          ' ' +
          student.lastName +
          ' ?'
      )
    ) {
      this.data.deleteStudent(student);
    }
  }
}
