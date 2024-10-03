import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-gen_img_upload',
  templateUrl: './gen_img_upload.component.html',
  styleUrls: ['./gen_img_upload.component.css'],
  providers: [MessageService],
})
export class Gen_img_uploadComponent implements OnInit {
  @Output() fileSelected = new EventEmitter();

  uploadedFiles: any[] = [];
  file: any[] = [];
  isFileTooLarge: boolean = false;

  constructor(private messageService: MessageService) {}

  ngOnInit() {}

  onUpload(event: any, flag: any) {
    const file = event.files[0];
    const maxFileSize = 1 * 1024 * 1024; // 1MB
    // console.log(this.isFileTooLarge,'file');
    
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

    // this.uploadedFiles.push(file);
    // this.fileSelected.emit({ file, flag });

    // for (let file of event.files) {
    //   this.uploadedFiles.push(file);
    // }

    // this.messageService.add({
    //   severity: 'info',
    //   summary: 'File Uploaded',
    //   detail: '',
    // });
    this.messageService.add({
      severity: 'info',
      summary: 'File Uploaded',
      detail: `${file.name} uploaded successfully`,
    });
  }

  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }

  onRemove(event: any, flag: any) {
    console.log(event, 'clear event');
    this.fileSelected.emit({ file: '', flag });
  }
}
