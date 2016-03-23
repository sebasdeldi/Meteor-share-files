//creo una collection (usando la variable global FS) Files
var Files = new FS.Collection("files", {
  //especifico que los files se guarden en ~/uploads
  stores: [new FS.Store.FileSystem("files", {path: "~/uploads"})]
});


if (Meteor.isClient) {

  //para el template uploadedFiles, creo la variable files y le paso todos los files guardados para poder mostrarlos en el view
  Template.uploadedFiles.helpers({
    files: Files.find()

  });

  //este bloque toma el file que se pasa como parametro a el input "myFileInput" y lo inserta en la collection "Files"
 
  Template.main.events({
    'change #myFileInput': function(event, template) {
      FS.Utility.eachFile(event, function(file) {
        Files.insert(file, function (err, fileObj) {
          // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
        });
      });
    }
  });
}


// if (Meteor.isServer) {
//   Meteor.startup(function () {

//     este bloque es para la implementación de decidir a quien se le permite subir archivos.

//     Images.allow({
//       'insert': function () {
//         // add custom authentication code here
//         return true;
//       }
//     });
    
//   });
// }





