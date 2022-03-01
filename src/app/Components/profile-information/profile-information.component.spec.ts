import { Injector } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { CoursesMockData } from 'src/app/MockData/coursesData';

import { ProfileInformationComponent } from './profile-information.component';

describe('ProfileInformationComponent', () => {
  let component: ProfileInformationComponent;
  let fixture: ComponentFixture<ProfileInformationComponent>;
  let coursesMockData: CoursesMockData;
  let injector: Injector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileInformationComponent],
      providers: [FormBuilder, CoursesMockData],
    });
    fixture = TestBed.createComponent(ProfileInformationComponent);
    component = fixture.componentInstance;
    injector = fixture.debugElement.injector;
    coursesMockData = injector.get(CoursesMockData);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call createProfileInformationForm and updateProfessionalDetails on calling ngOnInit', () => {
    const spyCreateProfileInformationForm = spyOn(
      component,
      'createProfileInformationForm'
    );
    const spyUpdateProfessionalDetails = spyOn(
      component,
      'updateProfessionalDetails'
    );
    component.ngOnInit();
    expect(spyCreateProfileInformationForm).toHaveBeenCalled();
    expect(spyUpdateProfessionalDetails).toHaveBeenCalled();
  });

  it('should not call setDataToProfilePage if profileInformation has no value on calling ngOnInit', () => {
    localStorage.setItem('profileInformation', JSON.stringify(''));
    const spySetDataToProfilePage = spyOn(component, 'setDataToProfilePage');
    component.ngOnInit();
    expect(spySetDataToProfilePage).not.toHaveBeenCalled();
    localStorage.clear();
  });

  it('should not call setDataToProfilePage if profileInformation has no value on calling ngOnInit', () => {
    localStorage.setItem(
      'profileInformation',
      JSON.stringify(coursesMockData.profileInformation)
    );
    const spySetDataToProfilePage = spyOn(component, 'setDataToProfilePage');
    component.ngOnInit();
    expect(spySetDataToProfilePage).toHaveBeenCalled();
    localStorage.clear();
  });

  it('should create profileInformationForm on calling createProfileInformationForm', () => {
    component.createProfileInformationForm();
    expect(component.profileInformationForm).toBeDefined();
  });

  it('should save data to local storage on calling saveProfileInformation', () => {
    component.createProfileInformationForm();
    component.profileInformation = coursesMockData.profileInformation;
    component.profileInformationForm.patchValue({
      displayName: component.profileInformation.displayName,
      firstName: component.profileInformation.firstName,
      lastName: component.profileInformation.lastName,
      description: component.profileInformation.description,
      userType: component.profileInformation.userType,
      experience: component.profileInformation.experience,
      expertise: component.profileInformation.expertise,
      roleDescription: component.profileInformation.roleDescription,
    });
    component.saveProfileInformation();
    const profileInformation = JSON.parse(
      localStorage.getItem('profileInformation')!
    );
    expect(profileInformation.displayName).toEqual(
      component.profileInformation.displayName
    );
    expect(profileInformation.firstName).toEqual(
      component.profileInformation.firstName
    );
    expect(profileInformation.lastName).toEqual(
      component.profileInformation.lastName
    );
    expect(profileInformation.description).toEqual(
      component.profileInformation.description
    );
  });

  it('should set data to profileInformationForm on calling setDataToProfilePage', () => {
    component.createProfileInformationForm();
    component.profileInformation = coursesMockData.profileInformation;
    component.setDataToProfilePage();
    expect(component.profileInformationForm.controls['displayName'].value).toBe(
      component.profileInformation.displayName
    );
    expect(component.profileInformationForm.controls['lastName'].value).toBe(
      component.profileInformation.lastName
    );
    expect(component.profileInformationForm.controls['userType'].value).toBe(
      component.profileInformation.userType
    );
    expect(component.profileInformationForm.controls['description'].value).toBe(
      component.profileInformation.description
    );
    expect(component.profileInformationForm.controls['expertise'].value).toBe(
      component.profileInformation.expertise
    );
  });

  it('should add control for each area of interest on calling addAreaOfInterestControls', () => {
    const arrayControls = component.addAreaOfInterestControls();
    expect(arrayControls.length).toBe(4);
  });
});
