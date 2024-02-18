const fs = require( 'fs' );

//1-Function to add New Note
const addNote=(tit,bod)=>{  
const notes = loadNotes();
    notes.push({
            title:tit,
            body:bod
});   
        saveNotes(notes);
        console.log("Note saved successfully");
}


//2- Function to load and display current notes 
const loadNotes=()=>{
    try {
        let notesBuffer = fs.readFileSync('notes.json');  
        let notes=notesBuffer.toString();
             return  JSON.parse(notes)  ;        
         
    } catch (error) {
        console.log("Error in loading the file");
        return [];
    }
}


//3- Function to save any changes in notes
saveNotes=(note)=>{
 const notes = JSON.stringify(note);
 fs.writeFileSync('notes.json',notes);
}


//4- Function to remove any note
removeNote=(title)=>{
const notes = loadNotes();

const notesToKeep = notes.filter((note)=>{
    return  note.title !== title;
})

    if(notes.length === notesToKeep.length){
       console.log(`The note ${title} does not exist`)  
    }else{
        saveNotes(notesToKeep);
        console.log(`${title} removed succssfully`);
}
}

//5- Function to read a specific note against specific title
const readNote =(title)=>{
    const notes = loadNotes();
    const note = notes.find((note)=> note.title===title );
    
      if(!note){
        console.log( `No note with the title "${title}" found.`);

      } else{
                console.log(`Title: ${note.title}`);
                console.log(`Body: ${note.body}`);
            }
}

//6-Function to update the body of note
updateNote = (title,body)=>{   //provide the body you want as updated
    const notes = loadNotes();
    
    const  note = notes.find(function(note) {
return  note.title === title;
    })
    if(note){
        note.body= body;
        saveNotes(notes);
        console.log("New Body is : "+body);
    }
    else{
        console.log("No such record is founded to be update!")
        console.log("Try different one");
    }
}


readNote("Second");
updateNote("First","Body has been changed");
readNote("First");
console.log(loadNotes());




