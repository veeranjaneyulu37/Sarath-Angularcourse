export class CoursesMockData {
  public courseData = [
    {
      courseId: 1,
      courseName: 'Angular Framework basic Learning1',
      description:
        'The most efficient way to dive into Angular 2+ if you got limited time or need to refresh the basics!',
      tags: ['Frontend'],
      author: 'Sarath kumar',
      IsWhishlisted: false,
      price: 200,
      actualPrice: 400,
      isCourseDiscounted: true,
    },
    {
      courseId: 2,
      courseName: 'Microservice architecture3',
      description:
        'Learn Microservices architecture with .NET Core MVC(.NET 6) and Identity Server Integration with Azure Service Bus',
      tags: ['Backend', 'Frondend'],
      author: 'Sudhansu Sharma',
      IsWhishlisted: false,
      price: 350,
      actualPrice: 700,
      isCourseDiscounted: true,
    },
  ];

  public profileInformation = {
    areaOfInterest: [true, false, false, false],
    description: 'Farmer',
    displayName: 'Velu',
    experience: '10 & Above',
    expertise: 'vue.js',
    firstName: 'Velusamy',
    lastName: 'Ramasamy',
    roleDescription: 'Farmer',
    userType: 'professional',
  };
}
