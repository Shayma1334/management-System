function generateId() {
  var count = 0;
  return function () {
    return count++;
  };
}
var id = generateId();
var admin = {
  email: "admin@gmail.com",
  password: "admin@",
};

$("#submit").on("click", function () {
  var Email = $("#email").val();
  var Passe = $("#password").val();
  if (admin.email === Email && admin.password === Passe) {
    alert("You can access Oxford students.");
    $("#succlogin").show();
  }
});

////////////////////////////////////////////////////////////////

function makeStudent(firstName, lastName, age, email, number) {
  return {
    id: id(),
    firstName: firstName,
    lastName: lastName,
    age: age,
    email: email,
    number: number,
  };
}

///////////////////////////////////////////////////////////////

var studentslist = function () {
  return {
    numberOfStudents: 0,
    students: [],
    addStudent: addStudent,
    getStudentsByInitials: getStudentsByInitials,
    removeStudent: removeStudent,
    displayAllStudents: displayAllStudents,
  };
};

//////////////////////////////////////////////////////////

var addStudent = function () {
  var firstName = $("#firstName").val();
  var lastName = $("#lastName").val();
  var email = $("#email").val();
  var number = $("#number").val();
  var age = $("#age").val();

  this.students.push(makeStudent(firstName, lastName, age, email, number));
  this.numberOfStudents = this.students.length;

  // Immediately display all students after adding a new one
  this.displayAllStudents();
};

///////////////////////////////////////////////////////

var getStudentsByInitials = function (firstinitial, secondinitial) {
  var i = 0;
  var array = [];
  while (i < this.students.length) {
    if (
      this.students[i].firstName.toLowerCase() === firstinitial.toLowerCase() &&
      secondinitial.toLowerCase() === this.students[i].lastName.toLowerCase()
    ) {
      return this.students[i];
    }
    i++;
  }
  return "student not found";
};

/////////////////////////////////////////////////////

var removeStudent = function (id) {
  for (let i = 0; i < this.students.length; i++) {
    if (this.students[i].id === id) {
      this.students.splice(i, 1);
      console.log(this.students);
    }
  }
  this.numberOfStudents = this.students.length;
  this.displayAllStudents();
};

//////////////////////////////////////////////////////

var displayAllStudents = function () {
  $("#studentslist").empty();
  for (var i = 0; i < this.students.length; i++) {
    $("#studentslist").append(
      `<div class="student" data-id="${this.students[i].id}">
        <p>First Name: ${this.students[i].firstName}</p>
        <p>Last Name: ${this.students[i].lastName}</p>
        <p>Age: ${this.students[i].age}</p>
        <p>Email: ${this.students[i].email}</p>
        <p>Phone Number: ${this.students[i].number}</p>
        <button class="remove-btn" data-id="${this.students[i].id}">Remove Student</button>
      </div>`
    );
  }

  // Add event listener for remove buttons
  $(".remove-btn").on("click", function () {
    var studentId = $(this).data("id");
    class1.removeStudent(studentId);
  });
};

/////////////////////////////////////////////////////
var class1 = studentslist();
//////////////////////////////////////////////////////
// events
$("#add").on("click", function () {
  class1.addStudent();
});
