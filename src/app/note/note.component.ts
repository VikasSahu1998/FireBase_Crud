import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Note } from '../note';
import { NoteService } from '../note.service';
@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  noteForm!: FormGroup;
  editForm!: FormGroup;
  noteDetails: any;
  notesData: any = [];
  noteObj: Note = {
    id: '',
    note_title: '',
    note_dec: ''
  }
  constructor(private fb: FormBuilder, private noteservice: NoteService) {
    this.noteForm = this.fb.group({
      title: new FormControl('', [Validators.required]),
      decription: new FormControl('', [Validators.required]),

    });
    this.editForm = this.fb.group({
      edit_title: new FormControl('', [Validators.required]),
      edit_decription: new FormControl('', [Validators.required]),

    });
  }

  ngOnInit() {
    this.getAllNotes()
  }

  addNote() {
    const { value } = this.noteForm;
    console.log(value);
    this.noteObj.id = '',
      this.noteObj.note_title = value.title,
      this.noteObj.note_dec = value.decription;

    this.noteservice.addNote(this.noteObj).then((note) => {
      if (note) {
        alert("Data added")
        this.noteForm.reset();

      }
    })
  }

  //get data from firebase
  getAllNotes() {
    this.noteservice.getNotes().subscribe((res: Note[]) => {
      // console.log(res);
      this.notesData = res;
    })
  }


  deleteNote(note: Note) {
    let decision = confirm("are sure want to delete this note!");
    if (decision == true) {
      this.noteservice.deleteNote(note);
    }
  }

  getAllNoteDetails(note: Note) {
    this.noteDetails = note
    console.log(this.noteDetails)
  }

  updateNote(note: Note) {
    const { value } = this.editForm
    console.log(value);
    (this.noteObj.id = note.id),
      (this.noteObj.note_title = value.edit_title),
      (this.noteObj.note_dec = value.edit_decription);
    this.noteservice.updatenote(note, this.noteObj).then(() => {
      alert("updatded")
    })
    this.editForm.reset();
  }
}




