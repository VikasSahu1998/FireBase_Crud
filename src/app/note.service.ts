import { Injectable } from '@angular/core';
import { Note } from './note';
import { addDoc, collectionData, deleteDoc, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private fs: Firestore) { }

  //Add New
  addNote(note: Note) {
    note.id = doc(collection(this.fs, 'id')).id
    return addDoc(collection(this.fs, 'Notes'), note)
  }

  //get All notes form firebase
  getNotes(): Observable<Note[]> {
    let notesRef = collection(this.fs, 'Notes')
    return collectionData(notesRef, { idField: 'id' }) as Observable<Note[]>
  }

  //Delete Notes Form Firebase
  deleteNote(note: Note) {
    let docref = doc(this.fs, `Notes/${note.id}`);
    return deleteDoc(docref)
  }

  //update Note form firebase
  updatenote(note:Note,notes:any){
    let docref = doc(this.fs, `Notes/${note.id}`);
    return updateDoc(docref,notes)
  }

}

