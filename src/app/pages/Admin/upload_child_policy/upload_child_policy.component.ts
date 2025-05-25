import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';


@Component({
  selector: 'app-upload_child_policy',
  templateUrl: './upload_child_policy.component.html',
  styleUrls: ['./upload_child_policy.component.css']
})
export class Upload_child_policyComponent implements OnInit {
  // uploadedData: any[] = [];
  // displayedColumns: string[] = [];
  // selectedFileName: string = '';

  selectedFileName: string = '';
  data: any[] = [];
  uploadedData: any[] = [];
  progress = 0;
  uploadComplete = false;
  displayedColumns: string[] = [];
  parsedData: any[] = []; 
  displayedData: any[] = [];  
  uploading = false;


  constructor(private router: Router,private dataServe: DataService,
private route: ActivatedRoute) { }

  ngOnInit() {}

 onFileChange(event: any) {
  const file = event.target.files[0];

  if (file) {
    this.selectedFileName = file.name;

    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const bstr = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      this.data = XLSX.utils.sheet_to_json(ws, { raw: false });
      this.uploadedData = this.data;


      // Dynamically set table headers
      if (this.data.length > 0) {
        this.displayedColumns = Object.keys(this.data[0]);
      }
    };

    reader.readAsBinaryString(file);
  }
}

  async uploadFile() {
    // Remove rows with any blank (null/undefined/empty string) values
      this.data = this.data.filter(row =>
      Object.values(row).every(
        value => value !== null && value !== undefined && String(value).trim() !== '')
      );

    const chunkSize = 50;
    const totalChunks = Math.ceil(this.data.length / chunkSize);

    let currentMemberNo = null;
    let currentMemberName = null;
    let currpolicyAmount = null;
    let currpremiumAmount = null;

     const allFormattedData: any[] = [];

    for (let i = 0; i < totalChunks; i++) {
      const chunk = this.data.slice(i * chunkSize, (i + 1) * chunkSize);
      console.log(chunk);
      const formattedChunk: any[] = [];

      function excelDateToJSDate(excelDate: number): string {
  const jsDate = new Date((excelDate - (25567 + 2)) * 86400 * 1000);
  return jsDate.toISOString().split('T')[0];
}
      
      if(Array.isArray(chunk)){
        for(let dt of chunk){
          var data = Object.values(dt)
          console.log(data)

          if (data[3] === 'M') {
          const member = {
            memberNo: data[1],
            slNo: data[2],
            userType: data[3],
            name: data[4],
            dependname: data[5],
            dob: typeof data[7] === 'number' ? excelDateToJSDate(data[7]) : data[7],
            gender: data[8],
            status: data[9],
            effectiveDate: typeof data[10] === 'number' ? excelDateToJSDate(data[10]) : data[10],
            age: data[11],
            policyAmount: data[12],
            premium:data[13]
          };
           currentMemberNo = member.memberNo;
           currentMemberName = member.name;
           currpolicyAmount = member.policyAmount;
           currpremiumAmount = member.premium;
          formattedChunk.push(member);
        } else {
          const depend = {
            memberNo: currentMemberNo,
            slNo: data[0],
            userType: data[1],
            name: currentMemberName,
            dependname: data[2],
            dob: typeof data[4] === 'number' ? excelDateToJSDate(data[4]) : data[4],
            gender: data[5],
            status: data[6],
            effectiveDate: typeof data[7] === 'number' ? excelDateToJSDate(data[7]) : data[7],
            age: data[8],
            policyAmount: currpolicyAmount,
            premium: currpremiumAmount
          };
          formattedChunk.push(depend);
        }
      }
    }

    console.log('Formatted Chunk:', formattedChunk);


      // Simulated upload; replace with actual HTTP call
      // await this.http.post('/api/upload-chunk', { data: chunk }).toPromise();
      allFormattedData.push(...formattedChunk);
      this.progress = ((i + 1) / totalChunks) * 100;
      // break;
    }

    this.parsedData = allFormattedData;
    this.displayedData = allFormattedData;
    this.uploadComplete = true;
  }

   submitData() {
  if (!this.displayedData.length) return;

  this.uploading = true;

  this.dataServe.global_service(1, '/upload_child_policy', { data: this.displayedData })
    .subscribe({
      next: (response: any) => {
        this.uploading = false;
        if (response.message) {
          alert('✅ Data uploaded successfully!');
          this.displayedData = [];
        } else {
          alert('⚠️ Upload failed.');
        }
      },
      error: (error) => {
        this.uploading = false;
        alert('❌ Error uploading data.');
      }
    });
}

} 