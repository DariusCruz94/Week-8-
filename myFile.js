class Teacher {
    constructor(name, lesson) {
        this.name = name;
        this.lesson = lesson;
    }

    // Started with a class to structure our Teachers and Schools.

    describe() {
        return `${this.name} teaches ${this.lesson}.`;
    }
    // added a describe function to print out the information on the teachers.
     
}

class School  {
    constructor(name) {
        this.name = name;
        this.teachers = [];
    }
    //this blank array will hold the teachers names that work for that school.

    addTeacher(teacher) {
        if (teacher instanceof Teacher) {
         this.teachers.push(teacher);
        } else {
         throw new Error(`You can only add an instance of a Teacher. ${teacher}`);
        }
        // added the addTeacher function to add teacher if it is only an instance of the Teacher class. 
    }   
    
    describe() {
        return `${this.name} has ${this.teachers.length} teachers.`;
    } //describe funtion will print out the information of the school.
}


class Menu {
    constructor() {
        this.schools = [];
        this.selectedSchool = null;
    }

    //This method is going to return the the input the user has submitted. 
  start() {
    let selection = this.showMainMenuOptions();

      while (selection != 0) {
         switch (selection) {
            case '1':
                this.createSchool();
                break;
            case '2':
                this.viewSchool();
                break;
            case '3':
                this.deleteSchool();
                break;
            case '4':
                this.displaySchool();
                break;
            default:
                selection = 0;  
         }
         selection = this.showMainMenuOptions();
      }

      alert('No Option Available');
    }
    
    showMainMenuOptions() {
      return prompt(`
        0) exit
        1) create new school
        2) view school
        3) delete school
        4) display all schools 
      `);
    }


    showSchoolMenuOptions(schoolInfo){
        return prompt(`
        0) back
        1) create teacher
        2) delete teacher
        ---------------------------
        ${schoolInfo}
        `);
    }
    // using a blank string, to build a string that has all the information for the schools and it could be prompted. 
    displaySchool() {
        let schoolString = '';
        for (let i = 0; i < this.schools.length; i++) {
            schoolString += i + ') ' + this.schools[i].name + '\n';
        }
        alert(schoolString)
        //this method will use a blank string to bring the names of schools numbered (indexed) schools. Then will add a new line using the '\n'. 
    }

    createSchool() {
        let name = prompt ('Create School Name:');
        this.schools.push(new School(name));
    }

    viewSchool() {
        let index = prompt('Enter Index number of School to view');
        if (index > -1 && index < this.schools.length) {
            this.selectedSchool = this.schools[index];
            let description = 'School Name: ' + this.selectedSchool.name + '\n';

            for (let i = 0; i < this.selectedSchool.teachers.length; i++) {
               description += i + ') ' + this.selectedSchool.teachers[i].name + ' - ' + this.selectedSchool.teachers[i].lesson + '\n';
            }

            let selection = this.showSchoolMenuOptions(description);
            switch (selection) {
                case '1':
                    this.createTeacher();
                    break;
                case '2':
                    this.deleteTeacher();    
            }
        }
    }

    deleteSchool() {
        let index = prompt('Enter Index number of school you wish to be deleted');
        if (index > -1 && index < this.schools.length) {
           this.schools.splice(index, 1);
        }
    }

    createTeacher() {
        let name = prompt('Enter New Teacher Name');
        let lesson = prompt('Enter Teacher specialty');
        this.selectedSchool.teachers.push(new Teacher(name, lesson));
    }

    deleteTeacher() {
        let index = prompt('Enter the index number of Teacher to delete');
        if (index > -1 && index < this.selectedSchool.teachers.length) {
            this.selectedSchool.teachers.splice(index, 1);
        }
    }
}

let menu = new Menu();   
menu.start();
//  used the menu.start to display our menu and also created an instance to activate the rest of the classes above.  
