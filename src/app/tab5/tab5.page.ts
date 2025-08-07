import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Comment {
  user: string;
  text: string;
}

interface Post {
  id: number;
  imageUrl: string;
  caption: string;
  comments: Comment[];
}

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
  standalone: false
})
export class Tab5Page implements OnInit {
  posts: Post[] = [
    {
      id: 1,
      imageUrl: 'https://via.placeholder.com/300',
      caption: 'Loving this summer vibe! 🌞',
      comments: [
        { user: 'friend1', text: 'Looks amazing!' },
        { user: 'friend2', text: 'Where is this?' },
      ],
    },
    {
      id: 2,
      imageUrl: 'https://via.placeholder.com/300',
      caption: 'New outfit, who dis? 😎',
      comments: [
        { user: 'friend3', text: 'Slaying it!' },
      ],
    },
  ];

 searchQuery: string = '';
  newComment: string = '';
  filteredPosts: Post[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.filteredPosts = [...this.posts]; // Inicializa com todos os posts
  }

  editProfile() {
    this.router.navigate(['/profile/edit']);
  }

  onCommentChange(event: any, postId: number) {
    this.newComment = event.detail.value;
  }

  addComment(postId: number) {
    if (this.newComment.trim()) {
      const post = this.posts.find((p) => p.id === postId);
      if (post) {
        post.comments.push({ user: 'currentUser', text: this.newComment });
        this.newComment = '';
      }
    }
  }

  onSearchChange() {
    if (!this.searchQuery) {
      this.filteredPosts = [...this.posts]; // Mostra todos os posts se a pesquisa estiver vazia
    } else {
      this.filteredPosts = this.posts.filter(post =>
        post.caption.toLowerCase().includes(this.searchQuery.toLowerCase())
      ); // Filtra por caption
    }
  }
}
