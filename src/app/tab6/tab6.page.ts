import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface NewsItem {
  id: number;
  title: string;
  content: string;
}

@Component({
  selector: 'app-tab6',
  templateUrl: 'tab6.page.html',
  styleUrls: ['tab6.page.scss'],
  standalone: false,
})
export class Tab6Page implements OnInit{

  newsItems: NewsItem[] = [
    {
      id: 1,
      title: 'Fashion Trend 2025',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      id: 2,
      title: 'Summer Collection Highlights',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
    },
    {
      id: 3,
      title: 'Sustainable Fashion News',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse.',
    },
  ];

  constructor(private router: Router) {}

  ngOnInit() {}

  readMore(id: number) {
    this.router.navigate(['/news', id]);
  }
}
