import bap from '../../../data/temp_baptismal.docx'
import { saveAs } from 'file-saver'
import * as PizZipUtils from 'pizzip/utils'
import PizZip from 'pizzip'
import docxtemplater from 'docxtemplater'


function loadFile(url,callback){
  PizZipUtils.getBinaryContent(url,callback);
}

export default function print(data){
	console.log(data.type)
	// loadFile(bap ,function(error,content){
 //    if (error) { throw error };
 //    var zip = new PizZip(content);
 //    var doc=new docxtemplater().loadZip(zip)
 //    doc.setData({
 //      name: 'John',
 //      father: 'Doe',
 //      mother: '0652455478',
 //      born: 'Doe',
 //      born: 'Doe',
 //      born: 'New Website'
 //    });
 //    try {
 //      // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
 //      doc.render()
 //    }
 //    catch (error) {
 //      var e = {
 //          message: error.message,
 //          name: error.name,
 //          stack: error.stack,
 //          properties: error.properties,
 //      }
 //      console.log(JSON.stringify({error: e}));
 //      // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
 //      throw error;
 //    }
 //    var out=doc.getZip().generate({
 //      type:"blob",
 //      mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
 //    }) //Output the document using Data-URI
 //    saveAs(out,"output.docx")
	// })
}