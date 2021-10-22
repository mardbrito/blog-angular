import { Component, OnInit } from '@angular/core';
import { PostService } from '../service/post.service';
import { Post } from '../model/Post';
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  listPost!: Post[];
  post: Post = new Post;
  nome!: string;
  search = '';

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.findPosts()
  }

  findPosts() {
    this.postService.getPosts()
      .subscribe( (data: any) => {
      this.listPost = data;
      
    })
  }

  cadastrarMensagem() {
    this.postService.postMensagem(this.post)
      .subscribe((data: any) => {
      this.post = data
      location.assign('/feed')
    })
  }

  searchName(): void { 
    this.postService.findByName(this.search)
      .subscribe(
        data => {
          this.listPost = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

}