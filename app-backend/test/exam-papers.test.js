describe('Exam papers', () => {

    const EPModel = require('../src/ep');
    let EP;
    let testDirectories = [
        './src/resources/exam-papers',
        './src/resources/exam-papers/AQA',
        './src/resources/exam-papers/OCR',
        './src/resources/exam-papers/Edexcel',
    ];
    beforeEach(() => {
        EP = new EPModel();
    })
    /* To-do list of exam-papers testing */
    it.todo('Check no-param constructer is initially empty');
    it.todo('Searches for files of all exam papers through all exam board directories');
    it.todo('Searches for files of Edexcel exam papers through its directory');
    it.todo('Searches for files of AQA exam papers through its directory');
    it.todo('Searches for files of OCR exam papers through its directory');

    it('Check no-param constructer is initially empty', () => {
        expect(EP.papers.length).toBe(0);
    });

    it('Check no-param constructer is not empty', () => {
        console.log(testDirectories[0]);
        EP.papers = EP.loadExamPapers('./src/exam-papers');
        console.log('EP: ', EP.papers);
    });
})