export default class Person {
  constructor(id, firstName, lastName) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  fullName() {
    return `${firstName} ${lastName}`;
  }
}

export const getFullName = (person) => `${person.firstName} ${person.lastName}`;
