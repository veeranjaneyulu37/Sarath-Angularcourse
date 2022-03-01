import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProfileInformation } from '../../Model/courses';

@Component({
  selector: 'app-profile-information',
  templateUrl: './profile-information.component.html',
  styleUrls: ['./profile-information.component.css'],
})
export class ProfileInformationComponent implements OnInit {
  public screenInformation = 'my profile';
  public areaOfInterests = [
    { value: 'Designer', selected: true },
    { value: 'Developer', selected: false },
    { value: 'Project Manager', selected: false },
    { value: 'Sales', selected: false },
  ];
  public message = 'Your profile is updated';
  public profileInformationForm!: FormGroup;
  public userType!: string;
  public profileInformation!: IProfileInformation;
  public openDialog: boolean = false;
  public areaOfInterestError: boolean = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createProfileInformationForm();
    this.updateProfessionalDetails();
    const value = localStorage.getItem('profileInformation');
    this.profileInformation = JSON.parse(value!);
    if (this.profileInformation) {
      this.setDataToProfilePage();
    }
  }

  /**
   * Creates the profile information form
   */
  createProfileInformationForm(): void {
    this.profileInformationForm = this.formBuilder.group({
      displayName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: [''],
      description: ['', Validators.maxLength(100)],
      areaOfInterest: this.addAreaOfInterestControls(),
      userType: ['student'],
      experience: ['0'],
      expertise: ['angular'],
      roleDescription: [''],
    });
  }

  /**
   * Updates the professional details based on user type
   */
  updateProfessionalDetails(): void {
    this.profileInformationForm.controls['userType'].valueChanges.subscribe(
      (type: string) => {
        this.userType = type;
        if (this.userType === 'professional') {
          this.profileInformationForm.controls['roleDescription'].setValidators(
            Validators.maxLength(200)
          );
        } else {
          this.profileInformationForm.controls['roleDescription'].reset();
        }
      }
    );
  }

  /**
   * Validates the area of interest control
   */
  validateAreaOfInterestControl(): void {
    let selectedInterests = 0;
    this.areaOfInterestsArray.controls.forEach((control) => {
      if (control.value) {
        selectedInterests += 1;
      }
    });
    this.areaOfInterestError = selectedInterests > 0 ? false : true;
  }

  /**
   * Add area of interest controls
   * @returns - the form array of area of interest controls
   */
  addAreaOfInterestControls(): FormArray {
    const controls = this.areaOfInterests.map((interest) => {
      return this.formBuilder.control(interest.selected);
    });

    return new FormArray(controls);
  }

  /**
   * Sets data to profile page
   */
  setDataToProfilePage(): void {
    this.profileInformationForm.patchValue({
      displayName: this.profileInformation.displayName,
      firstName: this.profileInformation.firstName,
      lastName: this.profileInformation.lastName,
      description: this.profileInformation.description,
      userType: this.profileInformation.userType,
      experience: this.profileInformation.experience,
      expertise: this.profileInformation.expertise,
      roleDescription: this.profileInformation.roleDescription,
    });

    // Sets the value for area of interest
    this.areaOfInterestsArray.controls.forEach((control, index) => {
      control.setValue(this.profileInformation.areaOfInterest[index]);
    });
  }

  /**
   * Getter for area of interest array
   */
  get areaOfInterestsArray() {
    return this.profileInformationForm.controls['areaOfInterest'] as FormArray;
  }

  /**
   * Saves the profile information
   */
  saveProfileInformation(): void {
    localStorage.setItem(
      'profileInformation',
      JSON.stringify(this.profileInformationForm.value)
    );
    this.openDialog = true;
  }

  /**
   * Updates the openDialog property
   * @param action - the action to close dialog
   */
  updateDialog(action: boolean): void {
    this.openDialog = action;
  }
}
