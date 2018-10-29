import {Injectable} from "@angular/core";
import {Loading, LoadingController} from "ionic-angular";


@Injectable()
export class LoadingService {
  private loading: Loading;
  private isLoading: boolean;

  constructor(private loadingCtrl: LoadingController) {
  }

  public setIsLoading(isLoading:boolean) {
    if (isLoading) {
      this.isLoading = isLoading;
        // Delay to prevent showing if loaded quickly
        setTimeout(() => {
          if (!this.loading && this.isLoading) {
            this.loading = this.loadingCtrl.create({
              spinner: 'crescent'
              //content: 'Loading...'
            });
            this.loading.present();
            this.isLoading = true;
          }
        }, 500);
    } else {
      if (this.isLoading && this.loading) {
        this.loading.dismiss().then(() => {
          this.loading = null;
        });
      }
      this.isLoading = false;
    }
  }
}
