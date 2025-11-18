const courses = [
  {
    subject: 'CSE',
    number: 110,
    title: 'Introduction to Programming',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
    technology: [
      'Python'
    ],
    completed: true
  },
  {
    subject: 'WDD',
    number: 130,
    title: 'Web Fundamentals',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
    technology: [
      'HTML',
      'CSS'
    ],
    completed: true
  },
  {
    subject: 'CSE',
    number: 111,
    title: 'Programming with Functions',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
    technology: [
      'Python'
    ],
    completed: true
  },
  {
    subject: 'CSE',
    number: 210,
    title: 'Programming with Classes',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
    technology: [
      'C#'
    ],
    completed: true
  },
  {
    subject: 'WDD',
    number: 131,
    title: 'Dynamic Web Fundamentals',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
    technology: [
      'HTML',
      'CSS',
      'JavaScript'
    ],
    completed: true
  },
  {
    subject: 'WDD',
    number: 231,
    title: 'Frontend Web Development I',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
    technology: [
      'HTML',
      'CSS',
      'JavaScript'
    ],
    completed: false
  }
];

const displayCard = (course) => {
  return `
    <div class="course-header">
      <h3 class="course-title">${course.subject} ${course.number}</h3>
      <span class="course-credits">${course.credits} credits</span>
    </div>
    <h4 class="course-name">${course.title}</h4>
    <p class="course-description">${course.description}</p>
    <div class="course-details">
      <div class="course-certificate">
        <strong>Certificate:</strong> ${course.certificate}
      </div>
      <div class="course-technologies">
        <strong>Technologies:</strong> 
        <span class="tech-tags">
          ${course.technology.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
        </span>
      </div>
    </div>
    <div class="course-status">
      <span class="status-badge ${course.completed ? 'completed' : 'in-progress'}">
        ${course.completed ? '✓ Completed' : '⏳ In Progress'}
      </span>
    </div>
  `;
}

const populateAllCourses = (filter=null, completed=false) => {
  const listCoursesElement = document.querySelector("#listCourses");

  listCoursesElement.replaceChildren();

  let coursesList = courses;

  if (!completed && filter) {
    coursesList = courses.filter((course) => filter.toLocaleLowerCase() === course.subject.toLocaleLowerCase());
  }

  if (completed) {
    coursesList = courses.filter((course) => course.completed);
  }
  
  let creditsTotal = 0;
  
  coursesList.forEach((course) => {
    const articleElement = document.createElement("article");
    articleElement.classList.add("course");
    if (course.completed) {
      articleElement.classList.add("completed-course");
    }

    articleElement.innerHTML = displayCard(course);

    articleElement.addEventListener('click', () => {
      displayCourseDetails(course);
    });
    
    listCoursesElement.appendChild(articleElement);
    creditsTotal += course.credits;
  });

  const creditsElement = document.querySelector("#totalCredits");

  creditsElement.innerHTML = `The total credits for course listed above is ${creditsTotal}.`;
};

const filterCoursesListen = () => {
  const allElement = document.querySelector("#allCourses");
  const cseElement = document.querySelector("#cseCourses");
  const wddElement = document.querySelector("#wddCourses");
  const completedElement = document.querySelector("#completedCourses");

  const buttons = [allElement, cseElement, wddElement, completedElement];

  const removeActiveClass = () => {
    buttons.forEach(button => button.classList.remove("active"));
  };

  const setActiveButton = (activeButton) => {
    removeActiveClass();
    activeButton.classList.add("active");
  };

  allElement.addEventListener("click", () => {
    setActiveButton(allElement);
    populateAllCourses();
  });

  completedElement.addEventListener("click", () => {
    setActiveButton(completedElement);
    populateAllCourses(null, true);
  });

  cseElement.addEventListener("click", () => {
    setActiveButton(cseElement);
    populateAllCourses("CSE");
  });

  wddElement.addEventListener("click", () => {
    setActiveButton(wddElement);
    populateAllCourses("WDD");
  });

  setActiveButton(allElement);
};

const toggleIcon = () => {
  const openIcon = document.querySelector("#openIcon");
  const closeIcon = document.querySelector("#closeIcon");
  const menu = document.querySelector("#toogleMenu");

  menu.classList.toggle("open");

  openIcon.classList.toggle("open-icon", !menu.classList.contains("open"));
  openIcon.classList.toggle("close-icon", menu.classList.contains("open"));
  closeIcon.classList.toggle("close-icon", !menu.classList.contains("open"));
  closeIcon.classList.toggle("open-icon", menu.classList.contains("open"));
};

const displayCourseDetails = (course) => {
  const courseDetails = document.querySelector("#course-details");
  courseDetails.innerHTML = '';
  courseDetails.innerHTML = `
    <div class="modal-body">
    ${displayCard(course)}
    </div>
    <div class="modal-footer">
      <button id="closeModal">Close</button>
    </div>
  `;
  courseDetails.showModal();
  
  closeModal.addEventListener("click", () => {
    courseDetails.close();
  });
}

const setupMenuClickHandler = () => {
  const toogleMenu = document.querySelector("#toogleMenu");
  const navigation = document.querySelector("nav");
  
  toogleMenu.addEventListener("click", () => {
    toggleIcon();

    navigation.classList.toggle("open");

    navigation.classList.toggle("nav-hidden", !navigation.classList.contains("open"));
  });
};

populateAllCourses();
filterCoursesListen();
setupMenuClickHandler();
