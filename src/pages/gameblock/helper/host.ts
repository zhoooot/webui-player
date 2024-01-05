export const extractQuestion = (data: any) => {
    const { partyid, question } = data;
      const { content, time, allow_power, url, answers, correct_answer } = question;
      let answers_list: string[] = [];
      for (let i = 0; i < question.answers.length; i++) {
        let answer = question.answers[i].content;
        answers_list.push(answer);
      }
      return {
        content: content,
        answers: answers_list,
        correctAnswer: correct_answer,
        time: time,
        permit: allow_power,
      }
}

export const getNextQuestionIteration = (currentIteration: number) =>  (currentIteration + 1) % 4;


