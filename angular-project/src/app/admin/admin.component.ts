import { Component, OnInit } from '@angular/core';
import { Student } from '../model/student';
import { AuthService } from '../shared/auth.service';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
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
  }

  // register(){
  //   this.auth.logout();
  // }

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
  resetForm() {
    this.id = '';
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.mobile = '';
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
