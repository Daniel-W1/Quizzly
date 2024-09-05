import { prisma } from "../prisma";
import { filterConcepts } from "@/lib/constants";

const deleteConcepts = async () => {
    await prisma.keyConcept.deleteMany();
}

const populateConcepts = async () => {
    await prisma.keyConcept.createMany({
        data: filterConcepts[0].concepts.map((concept) => ({
            name: concept.value,
            description: concept.label
        }))
    })
}

const deleteTests = async () => {
    await prisma.test.deleteMany();
}

const populateTests = async () => {
  const keyConcepts = await prisma.keyConcept.findMany();
  
  const testData = [
    {
      title: "Introduction to Computer Science Midterm",
      university: "Addis Ababa University",
      department: "Computer Science",
      teacherName: "Dr. Abebe Bekele",
      courseName: "Introduction to Computer Science",
      chapterNames: "Algorithms, Data Structures, Programming Basics",
      examType: "MIDTERM" as const,
      totalMarks: 40,
      year: 2023,
      difficultyLevel: "MEDIUM" as const,
      version: "1.0",
      allowedTime: 60,
      questions: [
        {
          type: "MULTIPLE_CHOICE",
          statement: "What is the time complexity of binary search?",
          choices: JSON.stringify(["O(n)", "O(log n)", "O(n^2)", "O(1)"]),
          correctAnswer: "O(log n)",
          explanation: "Binary search has a logarithmic time complexity as it halves the search space in each iteration.",
          points: 5,
          keyConcepts: {
            connect: [
              { id: keyConcepts.find(c => c.name === "Algorithms and Data Structures")?.id },
              { id: keyConcepts.find(c => c.name === "Complexity and Big O Notation")?.id },
              { id: keyConcepts.find(c => c.name === "Programming Paradigms")?.id },
              { id: keyConcepts.find(c => c.name === "Complexity and Big O Notation")?.id },
              { id: keyConcepts.find(c => c.name === "Computer Architecture")?.id },
              { id: keyConcepts.find(c => c.name === "Operating Systems")?.id },
              { id: keyConcepts.find(c => c.name === "Networking and Data Transmission Protocols")?.id },
              { id: keyConcepts.find(c => c.name === "Database Management")?.id },
              { id: keyConcepts.find(c => c.name === "Artificial Intelligence")?.id },
              { id: keyConcepts.find(c => c.name === "Cybersecurity")?.id }
            ]
          }
        },
      ],
      keyConcepts: {
        connect: keyConcepts.map(concept => ({ id: concept.id }))
      }
    },
    {
      title: "Introduction to Computer Science Test",
      university: "Addis Ababa University",
      department: "Computer Science",
      teacherName: "Dr. Abebe Bekele",
      courseName: "Introduction to Computer Science",
      chapterNames: "Algorithms, Data Structures, Programming Basics",
      examType: "TEST" as const,
      totalMarks: 20,
      year: 2023,
      difficultyLevel: "HARD" as const,
      version: "1.0",
      allowedTime: 45,
      questions: [
        {
          type: "MULTIPLE_CHOICE",
          statement: "What is the time complexity of binary search?",
          choices: JSON.stringify(["O(n)", "O(log n)", "O(n^2)", "O(1)"]),
          correctAnswer: "O(log n)",
          explanation: "Binary search has a logarithmic time complexity as it halves the search space in each iteration.",
          points: 5,
          keyConcepts: {
            connect: [
              { id: keyConcepts.find(c => c.name === "Algorithms and Data Structures")?.id },
              { id: keyConcepts.find(c => c.name === "Complexity and Big O Notation")?.id },
              { id: keyConcepts.find(c => c.name === "Programming Paradigms")?.id },
              { id: keyConcepts.find(c => c.name === "Complexity and Big O Notation")?.id },
              { id: keyConcepts.find(c => c.name === "Computer Architecture")?.id },
              { id: keyConcepts.find(c => c.name === "Operating Systems")?.id },
              { id: keyConcepts.find(c => c.name === "Networking and Data Transmission Protocols")?.id },
              { id: keyConcepts.find(c => c.name === "Database Management")?.id },
              { id: keyConcepts.find(c => c.name === "Artificial Intelligence")?.id },
              { id: keyConcepts.find(c => c.name === "Cybersecurity")?.id }
            ]
          }
        },
      ],
      keyConcepts: {
        connect: keyConcepts.map(concept => ({ id: concept.id }))
      }
    },
    {
      title: "Introduction to Computer Science Quiz",
      university: "Addis Ababa University",
      department: "Computer Science",
      teacherName: "Dr. Abebe Bekele",
      courseName: "Introduction to Computer Science",
      chapterNames: "Algorithms, Data Structures, Programming Basics",
      examType: "QUIZ" as const,
      totalMarks: 20,
      year: 2023,
      difficultyLevel: "EASY" as const,
      version: "1.0",
      allowedTime: 30,
      questions: [
        {
          type: "MULTIPLE_CHOICE",
          statement: "What is the time complexity of binary search?",
          choices: JSON.stringify(["O(n)", "O(log n)", "O(n^2)", "O(1)"]),
          correctAnswer: "O(log n)",
          explanation: "Binary search has a logarithmic time complexity as it halves the search space in each iteration.",
          points: 5,
          keyConcepts: {
            connect: [
              { id: keyConcepts.find(c => c.name === "Algorithms and Data Structures")?.id },
              { id: keyConcepts.find(c => c.name === "Complexity and Big O Notation")?.id },
              { id: keyConcepts.find(c => c.name === "Programming Paradigms")?.id },
              { id: keyConcepts.find(c => c.name === "Complexity and Big O Notation")?.id },
              { id: keyConcepts.find(c => c.name === "Computer Architecture")?.id },
              { id: keyConcepts.find(c => c.name === "Operating Systems")?.id },
              { id: keyConcepts.find(c => c.name === "Networking and Data Transmission Protocols")?.id },
              { id: keyConcepts.find(c => c.name === "Database Management")?.id },
              { id: keyConcepts.find(c => c.name === "Artificial Intelligence")?.id },
              { id: keyConcepts.find(c => c.name === "Cybersecurity")?.id }
            ]
          }
        },
      ],
      keyConcepts: {
        connect: keyConcepts.map(concept => ({ id: concept.id }))
      }
    },
    {
      title: "Introduction to Computer Science Final",
      university: "Addis Ababa University",
      department: "Computer Science",
      teacherName: "Dr. Abebe Bekele",
      courseName: "Introduction to Computer Science",
      chapterNames: "Algorithms, Data Structures, Programming Basics",
      examType: "FINAL" as const,
      totalMarks: 100,
      year: 2023,
      difficultyLevel: "MEDIUM" as const,
      version: "1.0",
      allowedTime: 120,
      questions: [
        {
          type: "MULTIPLE_CHOICE",
          statement: "What is the time complexity of binary search?",
          choices: JSON.stringify(["O(n)", "O(log n)", "O(n^2)", "O(1)"]),
          correctAnswer: "O(log n)",
          explanation: "Binary search has a logarithmic time complexity as it halves the search space in each iteration.",
          points: 5,
          keyConcepts: {
            connect: [
              { id: keyConcepts.find(c => c.name === "Algorithms and Data Structures")?.id },
              { id: keyConcepts.find(c => c.name === "Complexity and Big O Notation")?.id },
              { id: keyConcepts.find(c => c.name === "Programming Paradigms")?.id },
              { id: keyConcepts.find(c => c.name === "Complexity and Big O Notation")?.id },
              { id: keyConcepts.find(c => c.name === "Computer Architecture")?.id },
              { id: keyConcepts.find(c => c.name === "Operating Systems")?.id },
              { id: keyConcepts.find(c => c.name === "Networking and Data Transmission Protocols")?.id },
              { id: keyConcepts.find(c => c.name === "Database Management")?.id },
              { id: keyConcepts.find(c => c.name === "Artificial Intelligence")?.id },
              { id: keyConcepts.find(c => c.name === "Cybersecurity")?.id }
            ]
          }
        },
      ],
      keyConcepts: {
        connect: keyConcepts.map(concept => ({ id: concept.id }))
      }
    },
  ];

  for (const test of testData) {
    const { questions, ...testInfo } = test;
    const createdTest = await prisma.test.create({
      data: {
        ...testInfo,
        questions: {
          create: questions
        }
      }
    });
  }
};

populateConcepts().then(populateTests);
