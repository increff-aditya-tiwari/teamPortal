import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component,Inject,OnInit } from '@angular/core';

@Component({
  selector: 'app-file-preview',
  templateUrl: './file-preview.component.html',
  styleUrls: ['./file-preview.component.css']
})
export class FilePreviewComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<FilePreviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { expense}
  ) {}

  ngOnInit(): void {
    console.log("this is name  ",this.data.expense)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onDownload(): void {
    this.dialogRef.close('download');
  }

}
