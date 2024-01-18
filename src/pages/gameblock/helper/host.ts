import IQuestion from "../interface/iquestion";

/* Template
{
    "title": "Software Engineering Quiz 1",
    "questions": [
        {
            "q_id": "1",
            "p_id": "1",
            "content": "Who is responsible for collecting and specifying requirements in a software project?",
            "url": "",
            "correct_answer": "A",
            "time_limit": 30,
            "allow_power": true,
            "options": [
                {
                    "o_id": "1",
                    "content": "Business analyst"
                },
                {
                    "o_id": "2",
                    "content": "Team leader"
                },
                {
                    "o_id": "3",
                    "content": "Project manager"
                },
                {
                    "o_id": "4",
                    "content": "Developer"
                }
            ]
        },
        {
            "q_id": "2",
            "p_id": "1",
            "content": "Which of these software engineering activities are NOT a part of software processes?",
            "url": "",
            "correct_answer": "B",
            "time_limit": 30,
            "allow_power": true,
            "options": [
                {
                    "o_id": "1",
                    "content": "Software specification"
                },
                {
                    "o_id": "2",
                    "content": "Software dependence"
                },
                {
                    "o_id": "3",
                    "content": "Software validation"
                },
                {
                    "o_id": "4",
                    "content": "Software development"
                }
            ]
        },
        {
            "q_id": "3",
            "p_id": "1",
            "content": "Which one of the following is NOT desired in a good Software Requirement Specifications (SRS) document?",
            "url": "",
            "correct_answer": "A",
            "time_limit": 30,
            "allow_power": true,
            "options": [
                {
                    "o_id": "1",
                    "content": "Algorithms for Software Implementation"
                },
                {
                    "o_id": "2",
                    "content": "Non-Functional Requirements"
                },
                {
                    "o_id": "3",
                    "content": "Functional Requirements"
                },
                {
                    "o_id": "4",
                    "content": "Goals of Implementation"
                }
            ]
        },
        {
            "q_id": "4",
            "p_id": "1",
            "content": "Principle that is NOT always applied to all types of software system",            
            "url": "",
            "correct_answer": "B",
            "time_limit": 30,
            "allow_power": true,
            "options": [
                {
                    "o_id": "1",
                    "content": "All of these principles."
                },
                {
                    "o_id": "2",
                    "content": "Applying pair programming"
                },
                {
                    "o_id": "3",
                    "content": "Understanding and managing the software specification and requirements are important"
                },
                {
                    "o_id": "4",
                    "content": "Using a managed and understood development process"
                }
            ]
        }
    ]
}
*/

export const extractCategorization = (data: any): number[] => {
    const { option1, option2, option3, option4 } = data;
    let categorization_list: number[] = [];
    categorization_list.push(option1);
    categorization_list.push(option2);
    categorization_list.push(option3);
    categorization_list.push(option4);
    return categorization_list;
}

export const extractQuestionV3 = (data: any): IQuestion => {
  const { answers, content, correct_answer, allow_power, time } = data;
  let answers_list: string[] = [];
  for (let i = 0; i < answers.length; i++) {
    let answer = answers[i].content;
    answers_list.push(answer);
  }
  return {
    content: content,
    options: answers_list,
    correct_ans: correct_answer,
    time: time,
    allow_power: allow_power,
  };
}

export const extractQuestionV2 = (data: any): IQuestion => {
  const { answers, content, correctAnswer, permit, time } = data;
  let answers_list: string[] = [];
  for (let i = 0; i < answers.length; i++) {
    let answer = answers[i].content;
    answers_list.push(answer);
  }
  return {
    content: content,
    options: answers_list,
    correct_ans: correctAnswer,
    time: time,
    allow_power: permit,
  };
};

export const extractQuestion = (data: any): IQuestion => {
  const { partyid, question } = data;
  const { content, time, allow_power, url, answers, correct_answer } = question;
  let answers_list: string[] = [];
  for (let i = 0; i < question.answers.length; i++) {
    let answer = question.answers[i].content;
    answers_list.push(answer);
  }
  return {
    content: content,
    options: answers_list,
    correct_ans: correct_answer,
    time: time,
    allow_power: allow_power,
  };
};

export const getNextQuestionIteration = (currentIteration: number) =>
  (currentIteration + 1) % 4;
