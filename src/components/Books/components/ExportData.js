import React, { useState } from 'react'
import axios from 'axios'
import ReactExport from 'react-data-export'
import { Dialog, Button } from '@material-ui/core/'

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const dataSet1 = [
    {
        name: "Johson",
        amount: 30000,
        sex: 'M',
        is_married: true
    },
    {
        name: "Monika",
        amount: 355000,
        sex: 'F',
        is_married: false
    },
    {
        name: "John",
        amount: 250000,
        sex: 'M',
        is_married: false
    },
    {
        name: "Josef",
        amount: 450500,
        sex: 'M',
        is_married: true
    }
];

export default function ExportData(props) {
	const { setExp, b } = props	
	const [f, setF] = useState(false)
	const [data, setData] = useState([])
	const [modal, setModal] = useState(true)

	const handleDownload = () => {
		axios
			.get(`http://localhost:9090/${b.type}?book=${b.bookNo}`)
			.then(res => {
				res.data.map(test => setData(data.push(test)))
			})
			.finally(()=>{
				setF(true)
				console.log(data)
				console.log(dataSet1)
			})
	}

	return (
		<Dialog 
			open={modal} 
			onClose={()=>{
				setF(false)
				setModal(false)
				setExp(false)
			}}
		>	
			<h3>Backup {b.type} book {b.bookNo}</h3>
			<Button onClick={handleDownload}>test</Button>
			{
				f && b.type === 'baptismal' ?
					<ExcelFile hideElement={true}>
	          <ExcelSheet data={data} name="Employees">
	            <ExcelColumn label="Page" value="page"/>
	            <ExcelColumn label="No" value="no"/>
	            <ExcelColumn label="Date" value="date"/>
	            <ExcelColumn label="Name" value="name"/>
	            <ExcelColumn label="Father" value="father"/>
	            <ExcelColumn label="Mother" value="mother"/>
	            <ExcelColumn label="Birthdate" value="birthdate"/>
	            <ExcelColumn label="Birth Place" value="birthplace"/>
	            <ExcelColumn label="Sponsor #1" value="sponsor1"/>
	            <ExcelColumn label="Sponsor #2" value="sponsor2"/>
	            <ExcelColumn label="Priest" value="rev"/>
	          </ExcelSheet>
	        </ExcelFile>
	      : f && b.type === 'confirmation' ?
	      	<ExcelFile hideElement={true}>
	          <ExcelSheet data={data} name="Employees">
	            <ExcelColumn label="Name" value="name"/>
	            <ExcelColumn label="Wallet Money" value="amount"/>
	            <ExcelColumn label="Gender" value="sex"/>
	            <ExcelColumn label="Marital Status"
	             	value={(col) => col.is_married ? "Married" : "Single"}/>
	          </ExcelSheet>
	        </ExcelFile>
	      : f && b.type === 'death' ?
	      	<ExcelFile hideElement={true}>
	          <ExcelSheet data={data} name="Employees">
	            <ExcelColumn label="Name" value="name"/>
	            <ExcelColumn label="Wallet Money" value="amount"/>
	            <ExcelColumn label="Gender" value="sex"/>
	            <ExcelColumn label="Marital Status"
	             	value={(col) => col.is_married ? "Married" : "Single"}/>
	          </ExcelSheet>
	        </ExcelFile>
	      : f && b.type === 'marriage' ?
	      	<ExcelFile hideElement={true}>
	          <ExcelSheet data={data} name="Employees">
	            <ExcelColumn label="Name" value="name"/>
	            <ExcelColumn label="Wallet Money" value="amount"/>
	            <ExcelColumn label="Gender" value="sex"/>
	            <ExcelColumn label="Marital Status"
	             	value={(col) => col.is_married ? "Married" : "Single"}/>
	          </ExcelSheet>
	        </ExcelFile>
        : null
			}
    </Dialog>
	)
}