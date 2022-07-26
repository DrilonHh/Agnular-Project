import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore/';
import { Student } from '../model/student';
import { Teacher } from '../model/teacher';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private afs: AngularFirestore) {}

  //add teacher
  addTeacher(teacher: Teacher) {
    teacher.Id = this.afs.createId();
    return this.afs.collection('/Teachers').add(teacher);
  }

  //get all teachers
  getAllTeachers() {
    return this.afs.collection('/Teachers').snapshotChanges();
  }

  //deleteTeacher
  deleteTeacher(teacher: Teacher) {
    return this.afs.doc('/Teachers/' + teacher.Id).delete();
  }

  //updateTeacher
  updateTeacher(teacher: Teacher) {
    this.deleteTeacher(teacher);
    this.addTeacher(teacher);
  }

  //add student
  addStudent(student: Student) {
    student.id = this.afs.createId();
    return this.afs.collection('/Students').add(student);
  }

  //get all students
  getAllStudents() {
    return this.afs.collection('/Students').snapshotChanges();
  }

  //deleteStudent
  deleteStudent(student: Student) {
    return this.afs.doc('/Students/' + student.id).delete();
  }

  //updateStudent
  updateStudent(student: Student) {
    this.deleteStudent(student);
    this.addStudent(student);
  }
}
