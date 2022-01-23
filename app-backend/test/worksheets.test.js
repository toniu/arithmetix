describe('Practice Worksheets', () => {

    const WS = require('../src/ws');
    let worksheet = [];
 
    let testDirectories = [
        './src/resources/public/modules',
        './src/resources/public/modules/C1', 
        './src/resources/public/modules/C2', 
        './src/resources/public/modules/C3', 
        './src/resources/public/modules/C4', 
        './src/resources/public/modules/M1', 
        './src/resources/public/modules/S1', 
        './src/resources/public/modules/Invalid-Module', 
    ];

    /* To-do list of exam-papers testing */
    it.todo('Worksheets search for all');
    it.todo('Worksheets for all topics of module C1');
    it.todo('Worksheets for all topics of module C2');
    it.todo('Worksheets for all topics of module C3');
    it.todo('Worksheets for all topics of module C4');
    it.todo('Worksheets for all topics of module M1');
    it.todo('Worksheets for all topics of module S1');
    it.todo('Invalid directory/file');


    test('Worksheets search for all', async () => {
        worksheet = new WS();
        console.log(worksheet);
        worksheet.loadWorksheets(testDirectories[0]);
        console.log('Getting worksheets...', worksheet.getWorksheets());
    });

    afterEach(() => {
        console.log(worksheet);
    });
})