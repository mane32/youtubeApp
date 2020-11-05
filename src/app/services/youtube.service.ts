import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Youtube } from '../models/youtube.models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  private youtubeUrl = 'https://www.googleapis.com/youtube/v3';
  private apikey = 'AIzaSyBqnciAC5PyhgOXSpg71DwjXURVUB0JLfA';
  private playlist = 'PLkY_2xkgAay7L9KXvXlsYf9uWKEAB_R1l';
  private nextPageToken =  '';

  constructor( private http: HttpClient ) {}

  getVideos() {

      const url = `${ this.youtubeUrl }/playlistItems`;

      const params = new HttpParams()
    .set('part', 'snippet')
    .set('maxResults', '10')
    .set('playlistId', this.playlist)
    .set('key', this.apikey)
    .set('pageToken', this.nextPageToken);

    return this.http.get<Youtube>( url, { params })
    .pipe(

      map( resp => {
        this.nextPageToken = resp.nextPageToken;
        return resp.items;
      }),

      map( items => items.map( video => video.snippet ) )

      );
  }

}