import './App.css';
import Header from './Components/Header';
import NewsWrapper from './Components/newsWrapper';
import React from 'react';
import NavHeader from './Components/NavHeader';
import Footer from './Components/Footer'

class App extends React.Component {

  
	// Constructor
	constructor(props) {
		super(props);
		this.state = {
			items: [],
			DataisLoaded: false,
			YOUR_API_KEY:"pub_5214b560b6229e77d341be8148930f4ed51e",
			COUNTRY:'in',
			title:"Ukraine",
			sortBy:"popularity",
			date:"2022-03-05",
			result:[],
			pageNo:1,
			tag:'all'
		};
	}


	
    handleCallback = (tagSelected) =>{
		// this.componentDidMount()
        this.setState({tag: tagSelected})
		// this.render()
    }

	// ComponentDidMount is used to
	// execute the code
	componentDidMount() {
		const items=fetch(
			`https://newsdata.io/api/${this.state.pageNo}/news?apikey=${this.state.YOUR_API_KEY}&country=${this.state.COUNTRY}`)
						.then((res) => res.json())
						.then((json) => {
							this.setState({
								items: json,
								DataisLoaded: true,
								result:json.results
							});
						})
						// const options = {
						// 	method: 'GET',
						// 	headers: {
						// 		'X-RapidAPI-Host': 'cricket-live-data.p.rapidapi.com',
						// 		'X-RapidAPI-Key': '0cadf53f12mshe990fd066c884e7p118e2djsnca4175b11c7f'
						// 	}
						// };
						
						// fetch('https://cricket-live-data.p.rapidapi.com/fixtures-by-date/2022-04-24', options)
						// 	.then(response => response.json())
						// 	.then(response => console.log(response))
						// 	.catch(err => console.error(err));
    }
    render() {
    const { DataisLoaded, items } = this.state;
                   
        console.log(this.state.items)
        if (!DataisLoaded) {return(
		<div>
		<Header />
		<NavHeader parentCallback={this.handleCallback}/>
		<div className='loading'>
              <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Loader.gif/380px-Loader.gif' alt='loading..'/>
			  </div>
		</div>);}

	return(

    <div>
      <Header />
	  <NavHeader parentCallback={this.handleCallback}/>

	  <NewsWrapper r={this.state.result} tag={this.state.tag}/>

	  <Footer />

    </div>
	);
}
}
export default App;










/*


function App() {

  
  /* q=Apple \
    -d from=2022-03-05 \
    -d sortBy=popularity \
    -d apiKey=bf096c5cdf5d45edac8a7c94b1675dcd*/
  //GET https://newsapi.org/v2/everything?q=Apple&from=2022-03-05&sortBy=popularity&apiKey=API_KEY

  // creates entity
// fetch("https://fairestdb.p.rapidapi.com/friend/friendModel", {
//   "method": "POST",
//   "headers": {
//     "x-rapidapi-host": "fairestdb.p.rapidapi.com",
//     "x-rapidapi-key": "apikey",
//     "content-type": "application/json",
//     "accept": "application/json"
//   },
//   "body": JSON.stringify({
//     name: this.state.name,
//     notes: this.state.notes
//   })
// })
// .then(response => response.json())
// .then(response => {
//   console.log(response)
// })
// .catch(err => {
//   console.log(err);
// });

//   return (
  
//   );
// }

// export default App;*/

