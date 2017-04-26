import {Injectable} from '@angular/core';
import * as permissions from "nativescript-permissions";
import * as fs from "file-system";

import {IVideo} from './video';

@Injectable()
export class VideoService {

  videos: Promise<IVideo[]>;
  constructor() {
    // really important!
    this.videos = permissions.requestPermission([
        "android.permission.READ_EXTERNAL_STORAGE",
        "android.permission.WRITE_EXTERNAL_STORAGE"
    ], "I need these permissions for important stuff, promise")
    .then((res) => {
          let tempPath = fs.path.join(android.os.Environment.getExternalStoragePublicDirectory(android.os.Environment.DIRECTORY_DOWNLOADS).toString());
          let folder = fs.Folder.fromPath(tempPath);
          return folder.getEntities(); 
    }, () => {
      console.log("No permissions - plan B time!");
    })
    .then((entities) => {
        let videos = [];
        entities.forEach((entity, idx) => {
            if (entity.path.match('.*\.mp4')) {

                let media = new android.media.MediaMetadataRetriever();
                media.setDataSource(entity.path);
                let bitmap = media.getFrameAtTime(6000000);
                let destinationFile = fs.knownFolders.documents().getFile(entity.name + '_th.png').path;
                let outputStream = new java.io.FileOutputStream(destinationFile);
                bitmap.compress(android.graphics.Bitmap.CompressFormat.PNG,0,outputStream);
                outputStream.close();

                videos.push({
                  id: idx,
                  src: entity.path,
                  thmb: destinationFile
                });
            }
        }); 
        return videos;
    });
  }

  getVideoById(idx: number): Promise<IVideo> {
    return this.getVideos().then((videos) => {
      let filterResults = videos.filter((vid: IVideo, index: number) => {
        return vid.id == idx;
      });
      return filterResults[0];
    });
  }

  getVideos(): Promise<IVideo[]> {
    return this.videos;
  } 

}