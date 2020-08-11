import { Component, Inject, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ladang } from '../jadual/ladang';

@Component({
  selector: 'app-borang',
  templateUrl: './borang.component.html',
  styleUrls: ['./borang.component.css']
})
export class BorangComponent implements OnInit {

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<BorangComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Ladang) {

     }

  ladangForm = this.fb.group({
    id: null,
    nama: [null, Validators.required],
    kategori: [null, Validators.required],
    lokasi: [null, Validators.required]
  });
  ngOnInit(): void {
    this.ladangForm.patchValue({
      id: this.data.id,
      nama: this.data.nama,
      kategori: this.data.kategori,
      telefon: this.data.telefon
    });
  }

     onNoClick(): void {
       this.dialogRef.close();
     }

     onSubmit() {
       this.dialogRef.close(this.ladangForm.value);
     }

}
