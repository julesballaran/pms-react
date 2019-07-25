import bap from '../../../data/temp_baptismal.docx'
import con from '../../../data/temp_confirmation.docx'
import ded from '../../../data/temp_death.docx'
import mar from '../../../data/temp_marriage.docx'

import { saveAs } from 'file-saver'
import * as PizZipUtils from 'pizzip/utils'
import PizZip from 'pizzip'
import docxtemplater from 'docxtemplater'

const today = new Date().toLocaleDateString('en-GB', {
  month : 'long',
  day : 'numeric',
  year : 'numeric'
})

const ordinalSuffix = ['st', 'nd', 'rd']
	const addSuffix = n => n + (ordinalSuffix[(n - 1) % 10] || 'th')
	const numberToOrdinal = n => `${n}`.match(/1\d$/) ? n + 'th' : addSuffix(n)

function loadFile(url,callback){
  PizZipUtils.getBinaryContent(url,callback);
}

function getDate(date){	
  var day = new Date(date).toLocaleDateString('en-GB', {
    day : 'numeric',
    month : 'long',
    year : 'numeric'
  }).replace(/,/g, '').split(' ');

  day[0] = numberToOrdinal(day[0])
  return day
}

function setBaptismal(data){
	const day1 = getDate(data.birthdate)
	const day2 = getDate(data.date)

	return {
    name: data.name,
    father: data.father,
    mother: data.mother,
    born: data.birthplace,
    day1: day1[0],
    month1: day1[1],
    year1: day1[2],
    day2: day2[0],
    month2: day2[1],
    year2: day2[2],
    by: data.rev,
    sponsor1: data.sponsor1,
    sponsor2: data.sponsor2,
    book: data.book,
    page: data.page,
    no: data.no,
    date: today,
    priest: 'test',
    purpose: 'for reference',
  }
}

function setConfirmation(data){
	const day = getDate(data.date)
	return {
		name: data.name,
		day: day[0],
		month: day[1],
		year: day[2],
		by: data.rev,
		book: data.book,
    page: data.page,
    no: data.no,
    date: today,
    priest: 'test',
    purpose: 'for reference',
	}
}

function setDeath(data){
	const day = today.split(' ')
	return {
		name: data.name,
		age: data.age,
		nationality: data.nationality,
		residence: data.residence,
		civil: data.civilstatus,
		father: data.father,
		mother: data.mother,
		spouse: data.spouse,
		date_of_birth: data.dateofdeath,
		cause_of_death: data.causeofdeath,
		date_of_burial: data.date,
		place_of_burial: data.placeofburial,
		priest: data.rev,
		month: day[1],
		day: numberToOrdinal(day[0]),
		YY: day[2].substr(2),
		sign: 'test',
		no: data.book,
		page: data.page,
	}
}

function setMarriage(data){
	const day = today.split(' ')
	return {
		name: data.name,
		name2: data.name2,
		age: data.age,
		age2: data.age2,
		nationality: data.nationality,
		nationality2: data.nationality2,
		residence: data.residence,
		residence2: data.residence2,
		civil: data.civilstatus,
		civil2: data.civilstatus2,
		father: data.father,
		father2: data.father2,
		mother: data.mother,
		mother2: data.mother2,
		witness: data.witness,
		witness2: data.witness2,
		place: data.placeofmarriage,
		date: data.date,
		priest: data.rev,
		day: numberToOrdinal(day[0]),
		month: day[1],
		YY: day[2].substr(2),
		no: data.book,
		page: data.page,
		sign: 'test',
	}
}

export default function print(data){
	let file, func;
	if(data.type === 'baptismal'){
		file = bap
		func = setBaptismal
	} else if (data.type === 'confirmation'){
		file = con
		func = setConfirmation
	} else if (data.type === 'death'){
		file = ded
		func = setDeath
	} else if (data.type === 'marriage'){
		file = mar
		func = setMarriage
	}

	loadFile(file ,function(error,content){
    if (error) { throw error };
    var zip = new PizZip(content);
    var doc=new docxtemplater().loadZip(zip)
    doc.setData(func(data));
    try {
      doc.render()
    }
    catch (error) {
      var e = {
          message: error.message,
          name: error.name,
          stack: error.stack,
          properties: error.properties,
      }
      console.log(JSON.stringify({error: e}));
      throw error;
    }
    var out=doc.getZip().generate({
      type:"blob",
      mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    })
    saveAs(out,`${today.split(' ').join('-').toLowerCase()}-${data.type}-${data.name.toLowerCase()}.docx`)
	})
}