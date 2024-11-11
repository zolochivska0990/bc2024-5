const express = require('express');
const app = express();
const port = 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


let notes = {};


app.get('/notes/:noteName', (req, res) => {
    const noteName = req.params.noteName;
    if (notes[noteName]) {
        res.status(200).send(notes[noteName]);
    } else {
        res.status(404).send('Note not found');
    }
});


app.put('/notes/:noteName', (req, res) => {
    const noteName = req.params.noteName;
    if (notes[noteName]) {
        notes[noteName] = req.body.text;
        res.status(200).send('Note updated');
    } else {
        res.status(404).send('Note not found');
    }
});


app.delete('/notes/:noteName', (req, res) => {
    const noteName = req.params.noteName;
    if (notes[noteName]) {
        delete notes[noteName];
        res.status(200).send('Note deleted');
    } else {
        res.status(404).send('Note not found');
    }
});


app.get('/notes', (req, res) => {
    const notesList = Object.keys(notes).map(name => ({
        name: name,
        text: notes[name]
    }));
    res.status(200).json(notesList);
});


app.post('/write', (req, res) => {
    const { note_name, note } = req.body;
    if (notes[note_name]) {
        res.status(400).send('Note already exists');
    } else {
        notes[note_name] = note;
        res.status(201).send('Note created');
    }
});


app.get('/UploadForm.html', (req, res) => {
    const htmlForm = `
    <html>
        <body>
            <form action="/write" method="POST">
                <label for="note_name">Note Name:</label>
                <input type="text" id="note_name" name="note_name"><br><br>
                <label for="note">Note Text:</label>
                <textarea id="note" name="note"></textarea><br><br>
                <button type="submit">Submit</button>
            </form>
        </body>
    </html>
    `;
    res.status(200).send(htmlForm);
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

