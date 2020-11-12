export class EmployeeModel {
    constructor(
        public id = 0,
        public name = '',
        public lastName = '',
        public dateOfBirth = new Date(),
        public dateOfAdmission = new Date(),
        public afp = '',
        public position = '',
        public salary = 0
    ) {}
}
