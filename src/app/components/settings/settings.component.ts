import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FlashMessagesService } from 'angular2-flash-messages';
import { SettingsService } from '../../services/settings.service';
import { Settings } from '../../models/Settings';



@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  settings : Settings;


  constructor(private router: Router,
              private settingsService: SettingsService,
              private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    this.settings = this.settingsService.getSettings();
  }

  //submit sttings changes to settings serves where it will add to local storage
  onSubmit(){
    this.settingsService.changeSettings(this.settings);
    this.flashMessage.show('Settings Saved!', {
      cssClass: 'alert-success', timeout: 4000
    });
  
  }

}
