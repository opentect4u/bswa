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

  constructor(private messageService: MessageService) {}

  ngOnInit() {}

  onUpload(event: any, flag: any) {
    const file = event.files[0];
    if (file) {
      this.fileSelected.emit({ file, flag });
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

  onRemove(event: any, flag: any) {
    console.log(event, 'clear event');
    this.fileSelected.emit({ file: '', flag });
  }
}
