import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-asso_img_upload',
  templateUrl: './asso_img_upload.component.html',
  styleUrls: ['./asso_img_upload.component.css'],
  providers: [MessageService]

})
export class Asso_img_uploadComponent implements OnInit {
  @Output() fileSelected = new EventEmitter();

  items!: any[];
  uploadedFiles: any[] = [];

  constructor(private router: Router, private fb: FormBuilder, private dataServe: DataService, private messageService: MessageService) { }

  ngOnInit() {
    this.items = [
      {
          label: 'Member Information'
      },
      {
          label: 'Introducer Information'
      },
      {
          label: 'Dependent Information'
      },
      {
        label: 'Upload image'
    },
    {
      label: 'Fee Details'
  },
  ];
  }

  onUpload(event: any, flag: any) {
    const file = event.files[0];
    const maxFileSize = 1 * 1024 * 1024; // 1MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (file) {
      this.fileSelected.emit({ file, flag });
    }
    if (!allowedTypes.includes(file.type)) {
      this.showError('Invalid file type. Only JPG, JPEG, and PNG are allowed.');
      return;
    }

    if (file.size > maxFileSize) {
      this.showError('File size exceeds the limit of 1MB.');
      return;
    }

    // for (let file of event.files) {
    //   this.uploadedFiles.push(file);
    // }

    // this.messageService.add({
    //   severity: 'info',
    //   summary: 'File Uploaded',
    //   detail: '',
    // });
  }
  
  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }

  onRemove(event: any, flag: any) {
    console.log(event, 'clear event');
    this.fileSelected.emit({ file: '', flag });
  }

}
