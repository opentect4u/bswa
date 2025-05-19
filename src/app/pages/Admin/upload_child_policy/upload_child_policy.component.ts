import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-upload_child_policy',
  templateUrl: './upload_child_policy.component.html',
  styleUrls: ['./upload_child_policy.component.css']
})
export class Upload_child_policyComponent implements OnInit {

  uploadedData: any[] = [];
  displayedColumns: string[] = [];
  selectedFileName: string = '';

  constructor() { }

  ngOnInit() {}

  onFileChange(event: any): void {
    const file = event.target.files[0];
    this.selectedFileName = file?.name || '';
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) {
      alert('Please select a single file.');
      return;
    }


   const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const binaryStr: string = e.target.result;
      const workbook: XLSX.WorkBook = XLSX.read(binaryStr, { type: 'binary' });
      const sheetName: string = workbook.SheetNames[0];
      const sheet: XLSX.WorkSheet = workbook.Sheets[sheetName];
      const data: any[] = XLSX.utils.sheet_to_json(sheet, { defval: '' });

      if (Array.isArray(data) && data.length > 0 && typeof data[0] === 'object') {
        this.uploadedData = data;
        this.displayedColumns = Object.keys(data[0]);
      } else {
        this.uploadedData = [];
        this.displayedColumns = [];
        alert('No valid data found in file.');
      }
    };
    reader.readAsBinaryString(target.files[0]);
  }

  // ✅ submitData is correctly placed here — inside the component class, not inside reader.onload
  submitData(): void {
    console.log('Submitted data:', this.uploadedData);
    alert('Data submitted successfully!');
  }
}



