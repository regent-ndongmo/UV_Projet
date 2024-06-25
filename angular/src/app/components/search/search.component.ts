import { Component } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  standalone: true,
  imports: [CommonModule,FormsModule],
  styleUrls: ['./search.component.css']
})

export class SearchComponent {
  query: string = '';
  results: any = {};
  suggestions: string[] = [];

  constructor(private searchService: SearchService) {}

  onSearch(): void {
    this.searchService.search(this.query).subscribe(
      data => this.results = data,
      error => console.error(error)
    );
  }

  onQueryChange(): void {
    if (this.query.length > 2) {
      this.searchService.autocomplete(this.query).subscribe(
        data => this.suggestions = data,
        error => console.error(error)
      );
    } else {
      this.suggestions = [];
    }
  }

  onSelectSuggestion(suggestion: string): void {
    this.query = suggestion;
    this.onSearch();
  }
}
