import { Injectable } from '@angular/core';
import { Settings } from '../models/Settings';


@Injectable()
export class SettingsService {


  //initial settings for local storage
settings: Settings = {
  allowRegistration: false,
  disableBalanceOnAdd: true,
  disableBalanceOnEdit: true
};

  constructor() { 

    //check to make sure settings is not null in local storage then gets the parsed settings from local storage
    if(localStorage.getItem('settings') != null){
      this.settings = JSON.parse(localStorage.getItem('settings'));
    }
  }

  getSettings(): Settings {
    return this.settings;
  }

  //method to change and update settings from the settings form and store the changes into local storage
  changeSettings(settings: Settings){
    localStorage.setItem('settings', JSON.stringify(settings));
  }
}
