import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ComentData } from '../../sinopsispelicula/sinopsispelicula.component';

@Component({
  selector: 'app-dialog-coment',
  templateUrl: './dialog-coment.component.html',
  styleUrls: ['./dialog-coment.component.css']
})
export class DialogComentComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ComentData>,
    @Inject(MAT_DIALOG_DATA) public data: ComentData
      ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
