describe('Exam papers', () => {

    const EP = require('../src/eps');
    let eps = [];
 
    let testDirectories = [
        './src/resources/exam-papers',
        './src/resources/exam-papers/AQA',
        './src/resources/exam-papers/OCR',
        './src/resources/exam-papers/Edexcel',
        './src/resources/exam-papers/Board-That-Does-Not-Exist',
    ];

    /* To-do list of exam-papers testing */
    it.todo('Exam paper search for all');
    it.todo('Exam paper search for AQA papers');
    it.todo('Exam paper search for OCR papers');
    it.todo('Exam paper search for Edexcel papers');
    it.todo('Invalid directory/file');


    test('Exam paper list empty', () => {
        eps = new EP();
        console.log(eps);
        eps.loadPapers(testDirectories[0]);
        console.log(eps.getPapers());
    });

    afterEach(() => {
        console.log(eps);
    });
})