import { Component, OnInit } from '@angular/core';
import { Client } from '../../services/api';

@Component({
  selector: 'app-data-extraction',
  templateUrl: './data-extraction.component.html',
  styleUrls: ['./data-extraction.component.scss']
})
export class DataExtractionComponent implements OnInit {

  url: string = '';
  resData: any;
  data: string = "";
  error = '';
  constructor(
    private client: Client
  ) { }

  ngOnInit() {
    console.log("URL: ", this.url);

    // this.load()
  }

  load() {
    this.client.get(this.url)
      .then((response: any) => {
        if (response) {
          this.resData = response.result;
          if (this.resData.length > 0)
            for (let i = 0; i < this.resData.length; i++) {
              this.data += this.resData[i] + '\n';
            }
          console.log("jkvjf", this.resData);

        }
      })
      .catch(e => {
        this.error = e;
      });
  }

}
