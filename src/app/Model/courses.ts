export interface ICourses {
  courseId: number;
  courseName: string;
  description: string;
  tags: string[];
  author: string;
  IsWhishlisted: boolean;
  price: number;
  actualPrice: number;
  isCourseDiscounted: boolean;
}

export interface IProfileInformation {
  displayName: string;
  firstName: string;
  lastName: string;
  description: string;
  areaOfInterest: boolean[];
  userType: string;
  experience: string;
  expertise: string;
  roleDescription: string;
}
