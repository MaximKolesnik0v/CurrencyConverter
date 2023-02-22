import { useEffect, useState } from 'react';
import Axios from 'axios';
import Dropdown from 'react-dropdown';
import { HiSwitchVertical } from 'react-icons/hi';
import 'react-dropdown/style.css';
import './App.css';

function App() {

const [info, setInfo] = useState([]);
const [input, setInput] = useState(0);
const [input2 , setInput2] = useState(0);
const [from, setFrom] = useState("usd");
const [to, setTo] = useState("rub");
const [options, setOptions] = useState([]);
const [output, setOutput] = useState("Введите количество");
const [output2, setOutput2] = useState("Введите количество");

useEffect(() => {
	Axios.get(
`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`)
.then((res) => {
	setInfo(res.data[from]);
	})
}, [from]);

useEffect(() => {
	setOptions(Object.keys(info));
	convert();
}, [info])
	
function convert() {
	if (input > 0){	
		var rate = info[to];
		setOutput2((input * rate).toFixed(2));}
	if (input2 > 0){
		var rate2 = info[from];
		setOutput((input2 * rate2).toFixed(2));}
}

function flip() {
	var temp = from;
	setFrom(to);
	setTo(temp);
}

return (
	<div className="App">
		<div className="heading">
			<h1>Конвертация валюты</h1>
		</div>
		<div className="currency">
       	 	<div className="left">
          		<h3>количество</h3>
          		<input type="text" 
             		placeholder={output} 
             		onChange={(e) => setInput(e.target.value)} />
       		 </div>
       		 <div className="right">
          		<h3>Из</h3>
          		<Dropdown options={options} 
              		      onChange={(e) => {setFrom(e.value)}} 
          		value={from} placeholder="From" />
        	</div>
      	</div>
		<div className='switch'>
			<HiSwitchVertical size="30px"
			onClick={() => {flip()}}/>
		</div>
		<div className='currency2'>
			<div className='left'>
				<h3>Количество</h3>
				<input type = "text"
					placeholder={output2}
					onChange={(e) => setInput2(e.target.value)}/>
			</div>
			<div className='right'>
				<h3>В</h3>
				<Dropdown options={options}
					onChange={(e) => {setTo(e.value)}}
				value = {to} placeholder = "To"/>
			</div>
		</div>
		<div className="result">
			<div>
				<button onClick={() => {convert()}}>Конвертировать</button>
			</div>
		</div>
	</div>
	);
}

export default App;
