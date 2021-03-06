import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { FileDropDirective } from './file-drop.directive';
import { ImageUploadComponent } from './image-upload.component';
import { ImageService } from './image.service';

@NgModule({
  imports: [CommonModule, HttpModule, HttpClientModule],
  declarations: [ImageUploadComponent, FileDropDirective],
  exports: [ImageUploadComponent]
})
export class ImageUploadModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ImageUploadModule,
      providers: [ImageService]
    };
  }
}
