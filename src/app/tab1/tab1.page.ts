import { Component } from '@angular/core';
import { GeminiService } from '../services/gemini.service';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {
  prompt: string = '';
  response: string = '';

  constructor(private geminiService: GeminiService) {}

}
