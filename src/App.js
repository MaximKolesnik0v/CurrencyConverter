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
const [output, setOutput] = useState(0);
const [output2, setOutput2] = useState(0);
const [result, setResult] = useState("");

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
		setOutput(input * rate);
		setResult(input+" "+from+" = "+output.toFixed(2) + " " + to)}
	if (input2 > 0){
		var rate2 = info[from];
		setOutput2(input2 * rate2);
		setResult(input2+" "+to+" = "+output2.toFixed(2) + " " + from)}
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
          		<h3>Amount</h3>
          		<input type="text" 
             		placeholder="Enter the amount" 
             		onChange={(e) => setInput(e.target.value)} />
       		 </div>
       		 <div className="right">
          		<h3>From</h3>
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
				<h3>Amount</h3>
				<input type = "text"
					placeholder="Enter the amount"
					onChange={(e) => setInput2(e.target.value)}/>
			</div>
			<div className='right'>
				<h3>To</h3>
				<Dropdown options={options}
					onChange={(e) => {setTo(e.value)}}
				value = {to} placeholder = "To"/>
			</div>
		</div>
		<div className="result">
			<div>
				<button onClick={() => {convert()}}>Convert</button>
			</div>
			<h2>Converted Amount:</h2>
			<p>{result}</p>
		</div>
	</div>
	);
}

export default App;
