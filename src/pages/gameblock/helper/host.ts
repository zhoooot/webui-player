import IQuestion from "../interface/iquestion";
export const extractQuestion = (data: any) : IQuestion => {
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
      }
}

export const getNextQuestionIteration = (currentIteration: number) =>  (currentIteration + 1) % 4;