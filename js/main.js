
var students = createStudentsArray(); //array that contains the entire student list
var maxStudentsPerPage = 10;
var pageCount = calcPageCount(students);

var paginationList = document.getElementsByClassName("pagination")[0].querySelector("ul");
var searchBar = document.getElementById("search-bar");
var searchButton = document.getElementById("search-button");
var studentsHeading = document.body.querySelector("h2");

//convert the obj returned by the getElementsByClassName method to an array of student list-items
function createStudentsArray(){
  var studentsObj = document.getElementsByClassName("student-item");
  var studentsArr = [];
  for(var i = 0; i < studentsObj.length; i++){
    studentsArr.push(studentsObj[i]);
  }
  return studentsArr;
}

function calcPageCount(studentList){
  return Math.ceil(studentList.length / maxStudentsPerPage);
}

function hideStudents(){
  for(var i = 0; i < students.length; i++){
    students[i].style.display = "none";
  }
}

//update the html of the student-list ul the contain only the students the meet the search conditions
function updateStudentListHTML(updatedStudents){

  var studentsList = document.getElementsByClassName("student-list")[0];
  studentsList.innerHTML = "";

  //display an error message if no students were found
  if(updatedStudents.length === 0){
    var messageBox = document.createElement("li");
    messageBox.classList.add("error");
    messageBox.innerHTML = "<p>no students matching current search</p>";
    studentsList.appendChild(messageBox);
  }

  for(var i = 0; i < updatedStudents.length; i++){
    studentsList.appendChild(updatedStudents[i]);
  }

}

function showStudentsOnPage(pageNumber,studentList){

  hideStudents(); //clear previously visiable students
  var studentIndexStart = (pageNumber - 1) * maxStudentsPerPage;

  //determine how many students to display on current page
  var studentsOnCurrentPage = studentList.length - studentIndexStart >= maxStudentsPerPage ? maxStudentsPerPage : studentList.length - studentIndexStart;

  for(var i = studentIndexStart; i < studentIndexStart + studentsOnCurrentPage; i++){
    studentList[i].style.display = "list-item";
  }
}

function createPaginationItems(){

  //remove any previous paginationItem
  document.getElementsByClassName("pagination")[0].querySelector("ul").innerHTML = "";

  for(var i = 1; i <= pageCount; i++){
    var paginationItem = document.createElement("li");

    if(i === 1){
      paginationItem.innerHTML = '<a class="active" href="#">' + i + '</a>';
    }else{
      paginationItem.innerHTML = '<a href="#">' + i + '</a>';
    }

    paginationItem.addEventListener("click",handlePageChange);
    paginationList.appendChild(paginationItem);
  }
}

function handlePageChange(){
  var pageNumber = parseInt(this.querySelector("a").innerHTML);
  showStudentsOnPage(pageNumber,students);

  //change to new active class
  var paginationItems = paginationList.querySelectorAll("li");
  for(var i = 0; i < paginationItems.length; i++){
    var paginationItemLink = paginationItems[i].querySelector("a");
    if(parseInt(paginationItemLink.innerHTML) === pageNumber){
      paginationItemLink.classList.add("active");
    }
    else{
      paginationItemLink.classList.remove("active");
    }
  }
}

function handleSearch(searchValue){
  var matchingStudents = [];

  //if no search value entered show all students
  //otherwise add students that match the search conditions to the matchingStudents array
  if(searchValue === ""){
    matchingStudents = students;
  }else{
    for(var i = 0; i < students.length; i++){
      var studentName = students[i].querySelector("h3").innerHTML;
      var studentEmail = students[i].querySelector("span").innerHTML;
      if(studentName.toLowerCase().includes(searchValue.toLowerCase()) || searchValue === studentEmail){
        matchingStudents.push(students[i]);
      }
    }

  }

  pageCount = calcPageCount(matchingStudents);
  updateStudentListHTML(matchingStudents);
  showStudentsOnPage(1,matchingStudents);
  createPaginationItems();

}

//handle events
searchButton.addEventListener("click",function(){
  handleSearch(document.getElementById("search-bar").value);
});

searchBar.addEventListener("keyup",function(){
  handleSearch(document.getElementById("search-bar").value)
});

studentsHeading.addEventListener("click",function(){
  handleSearch("");
})


showStudentsOnPage(1,students);
createPaginationItems();
