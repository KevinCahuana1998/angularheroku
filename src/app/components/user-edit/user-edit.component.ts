import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { global } from '../../services/global';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  public identity: any;
  public user: User;
  public token: string;
  public afuConfig: any;
  public url: string;
  public status: string;


  constructor(
    private userService: UserService
  ) {
    this.identity = userService.getIdentity();
    this.token = userService.getToken();
    this.user = this.identity;
    this.url = global.url;
    // Configuracion de la subida de imagenes
    this.afuConfig = {
      multiple: false,
      formatAllowed: '.jpg, .png, .jpeg, .gif',
      maxSize: '50',
      uploadAPI: {
        url: this.url + 'upload-avatar',
        headers: {
          'Authorization': this.token
        }
      },
      theme: 'attachPin',
      hideProgressBar: false,
      hideResetBtn: true,
      hideSelectBtn: false,
      attachPinText: 'Sube tu foto',
      replaceTexts: {
        selectFileBtn: 'Select Files',
        resetBtn: 'Reset',
        uploadBtn: 'Upload',
        dragNDropBox: 'Drag N Drop',
        attachPinBtn: 'Subir foto',
        afterUploadMsg_success: 'Successfully Uploaded !',
        afterUploadMsg_error: 'Upload Failed !'
      }
    };
  }

  ngOnInit() {
  }

  avatarUpload(data) {
    const response: any = JSON.parse(data.response);
    this.user.image = response.userUpdate.image;
  }

  onSubmit(form) {
    this.userService.update(this.user).subscribe((respomse: any) => {
      if( !respomse.user) {
        this.status = 'error';
      } else {
        this.status = 'success';
        this.user = respomse.user;
        localStorage.setItem('identity', JSON.stringify(this.user));
      }
    }, (error) => {
      this.status = 'error';
      console.log(error);
    });
  }

}
