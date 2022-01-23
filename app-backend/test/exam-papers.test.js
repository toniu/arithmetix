describe('Exam papers', () => {

    const EP = require('../src/eps');
    let eps = [];
 
    let testDirectories = [
        './src/resources/public/exam-papers',
        './src/resources/public/exam-papers/AQA',
        './src/resources/public/exam-papers/OCR',
        './src/resources/public/exam-papers/Edexcel',
        './src/resources/public/exam-papers/Board-That-Does-Not-Exist',
    ];

    /* To-do list of exam-papers testing */
    it.todo('Exam paper search for all');
    it.todo('Exam paper search for AQA papers');
    it.todo('Exam paper search for OCR papers');
    it.todo('Exam paper search for Edexcel papers');
    it.todo('Invalid directory/file');

    /** Checks that the list is empty after
     * instantiation of singleton */
    test('Exam paper list empty', async () => {
        eps = new EP();
        console.log(eps);
        var papers = function() {
            return eps.getPapers();
        }

        expect(papers.length).toBe(0);
        console.log(papers.length);
    });

    afterEach(() => {
        console.log(eps);
    });
})