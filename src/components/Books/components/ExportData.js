import React, { useState } from 'react'
import axios from 'axios'
import ReactExport from 'react-data-export'
import { Dialog, Button, Grid } from '@material-ui/core/'
import Close from '@material-ui/icons/Close'

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
	const { setExp, b, url } = props	
	const [f, setF] = useState(false)
	const [data, setData] = useState([])
	const [modal, setModal] = useState(true)

	const handleDownload = () => {
		axios
			.get(`${url}/${b.type}?book=${b.bookNo}`)
			.then(res => {
				// res.data.map(test => {
				// 	setData([...data, test])
				// })
				setData([...res.data])
			})
			.finally(()=>{
				setF(true)
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
			className='del-dialog'
		>	
			<div style={{background: '#3f51b5', padding: 16}}>
        <Grid container>
          <h3 style={{color: 'white', margin: 0, padding: 0}}>Baptismal Record</h3>
          <Close 
            style={{color: 'white', marginLeft: 'auto', cursor: 'pointer'}}
            onClick={()=>{
							setF(false)
							setModal(false)
							setExp(false)
						}}
          />
        </Grid>
      </div>
			<h3>Backup {b.type} book {b.bookNo}</h3>
			<Grid container justify="center">
				<Button style={{color: '#3f51b5', width: '80%', marginBottom: 25, border: '1px solid #3f51b5'}} onClick={handleDownload}>Save</Button>
			</Grid>
			{
				f && b.type === 'baptismal' ?
					<ExcelFile hideElement={true} filename={`backup-${b.type}-book-${b.bookNo}`}>
	          <ExcelSheet data={data} name="Sheet 1">
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
	      	<ExcelFile hideElement={true} filename={`backup-${b.type}-book-${b.bookNo}`}>
	          <ExcelSheet data={data} name="Sheet 1">
	            <ExcelColumn label="Page" value="page"/>
	            <ExcelColumn label="No" value="no"/>
	            <ExcelColumn label="Date" value="date"/>
	            <ExcelColumn label="Name" value="name"/>
	            <ExcelColumn label="Father" value="father"/>
	            <ExcelColumn label="Mother" value="mother"/>
	            <ExcelColumn label="Priest" value="rev"/>
	          </ExcelSheet>
	        </ExcelFile>
	      : f && b.type === 'death' ?
	      	<ExcelFile hideElement={true} filename={`backup-${b.type}-book-${b.bookNo}`}>
	          <ExcelSheet data={data} name="Sheet 1">
	            <ExcelColumn label="Page" value="page"/>
	            <ExcelColumn label="Date" value="date"/>
	            <ExcelColumn label="Name" value="name"/>
	            <ExcelColumn label="Age" value="age"/>
	            <ExcelColumn label="Father" value="father"/>
	            <ExcelColumn label="Mother" value="mother"/>
	            <ExcelColumn label="Spouse" value="spouse"/>
	            <ExcelColumn label="Nationality" value="nationality"/>
	            <ExcelColumn label="Residence" value="residence"/>
	            <ExcelColumn label="Civil Status" value="civilstatus"/>
	            <ExcelColumn label="Date of Death" value="dateofdeath"/>
	            <ExcelColumn label="Cause of Death" value="causeofdeath"/>
	            <ExcelColumn label="Place of Burial" value="placeofburial"/>
	            <ExcelColumn label="Priest" value="rev"/>
	          </ExcelSheet>
	        </ExcelFile>
	      : f && b.type === 'marriage' ?
	      	<ExcelFile hideElement={true} filename={`backup-${b.type}-book-${b.bookNo}`}>
	          <ExcelSheet data={data} name="Sheet 1">
	            <ExcelColumn label="Page" value="page"/>
	            <ExcelColumn label="Date" value="date"/>
	            <ExcelColumn label="Name 1" value="name"/>
	            <ExcelColumn label="Name 2" value="name2"/>
	            <ExcelColumn label="Age 1" value="age"/>
	            <ExcelColumn label="Age 2" value="age2"/>
	            <ExcelColumn label="Father 1" value="father"/>
	            <ExcelColumn label="Mother 1" value="mother"/>
	            <ExcelColumn label="Father 2" value="father2"/>
	            <ExcelColumn label="Mother 2" value="mother2"/>
	            <ExcelColumn label="Nationality 1" value="nationality"/>
	            <ExcelColumn label="Nationality 2" value="nationality2"/>
	            <ExcelColumn label="Residence 1" value="residence"/>
	            <ExcelColumn label="Residence 2" value="residence2"/>
	            <ExcelColumn label="Civil Status 1" value="civilstatus"/>
	            <ExcelColumn label="Civil Status 2" value="civilstatus2"/>
	            <ExcelColumn label="Witness 1" value="witness"/>
	            <ExcelColumn label="Witness 2" value="witness2"/>
	            <ExcelColumn label="Place of Marriage" value="placeofmarriage"/>
	            <ExcelColumn label="Priest" value="rev"/>
	          </ExcelSheet>
	        </ExcelFile>
        : null
			}
    </Dialog>
	)
}