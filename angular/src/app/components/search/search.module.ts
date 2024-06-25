import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import if you are using ngModel or forms

import { SearchComponent } from './search.component';

@NgModule({
  declarations: [
    SearchComponent
  ],
  imports: [
    CommonModule,
    FormsModule // Add if using ngModel or forms
  ],
  exports: [
    SearchComponent
  ]
})
export class SearchModule { }
