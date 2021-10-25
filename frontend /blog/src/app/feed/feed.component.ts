import { Component, OnInit } from '@angular/core';
import { PostService } from '../service/post.service';
import { Post } from '../model/Post';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  author = "Marcelo Brito";
  faGitHub = faGithub;
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
    if (this.search != ''){
    this.postService.findByName(this.search)
      .subscribe(
        data => {
          this.listPost = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
      } else {
        this.findPosts();
      }
  }

}