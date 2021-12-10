describe('Revision Notes', () => {

    const RN = require('../src/rn');
    let revisionNotes = [];
 
    let testDirectories = [
        './src/resources/revision-notes',
        './src/resources/revision-notes/C1', 
        './src/resources/revision-notes/C2', 
        './src/resources/revision-notes/C3', 
        './src/resources/revision-notes/C4', 
        './src/resources/revision-notes/M1', 
        './src/resources/revision-notes/S1', 
        './src/resources/revision-notes/Invalid-Module', 
    ];

    /* To-do list of exam-papers testing */
    it.todo('Revision notes search for all modules');
    it.todo('Revision notes for module C1');
    it.todo('Revision notes module C2');
    it.todo('Revision notes module C3');
    it.todo('Revision notes module C4');
    it.todo('Revision notes module M1');
    it.todo('Revision notes module S1');
    it.todo('Invalid directory/file');


    test('Worksheets search for all', () => {
        revisionNotes = new RN();
        console.log(revisionNotes);
        revisionNotes.loadNotes(testDirectories[0]);
        console.log(revisionNotes.getNotes());
    });

    afterEach(() => {
        console.log(revisionNotes);
    });
})