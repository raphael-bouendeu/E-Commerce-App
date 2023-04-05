import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ui-gallery',
  templateUrl: './gallery.component.html',
  styles: [
  ]
})
export class GalleryComponent implements OnInit {

  selectedImage!: string;
  @Input() images!: string[];
  ngOnInit(): void {
    if (this.images.length) {
      this.selectedImage = this.images[0]
    }
  }
  changeSelectedImage(imageUrl: string) {
    this.selectedImage = imageUrl
  }
  getUrl(image: string) {
    return "url(" + image + ")";
  }
  get hasImages() {
    return this.images?.length > 0
  }
}
