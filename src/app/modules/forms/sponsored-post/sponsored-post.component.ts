import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-sponsored-post',
  templateUrl: './sponsored-post.component.html',
  styleUrls: ['./sponsored-post.component.scss']
})
export class SponsoredPostComponent implements OnInit {

  sponsoredForm: FormGroup;
  constructor(
    private fb: FormBuilder,
  ) {
    console.log('creating com')
   }

  ngOnInit() {
    this.buildForm();
  }

  buildForm(){
    this.sponsoredForm = this.fb.group({
      profileLink:['', Validators.required],
      description:['', Validators.required],
      embedlink: ['', Validators.required],
      postSequence: ['', Validators.required],
      media:['', Validators.required]
    })
  }
  onSubmit(){
    console.log(this.sponsoredForm)
  }

}
