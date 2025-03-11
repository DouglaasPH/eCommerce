import { Injectable, HostListener } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScreenSizeService {
  public width: number = window.innerWidth;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.width = event.target.innerWidth;
  }

  constructor() {}
}
