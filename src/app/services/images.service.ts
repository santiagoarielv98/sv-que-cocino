import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Cloudinary } from '@cloudinary/url-gen';

@Injectable({
  providedIn: 'root',
})
export class ImagesService {
  cld: Cloudinary;

  constructor() {
    this.cld = new Cloudinary({
      cloud: environment.cloudinaryConfig,
    });
  }
}
