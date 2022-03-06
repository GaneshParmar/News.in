import './App.css';
import Header from './Components/Header';
import News from './Components/News';
import React from 'react';


class App extends React.Component {

  
	// Constructor
	constructor(props) {
		super(props);
		this.state = {
			items: [],
			DataisLoaded: false,
			YOUR_API_KEY:"pub_5214b560b6229e77d341be8148930f4ed51e",
			COUNTRY:'in,ua',
			title:"Ukraine",
			sortBy:"popularity",
			date:"2022-03-05",
			random:0,
			result:[],
			pageNo:1,
		};
	// 	this.state = {
	// 		items: [],
	// 		DataisLoaded: false,
    //   API_KEY:"bf096c5cdf5d45edac8a7c94b1675dcd",
    //   title:"Ukraine",
    //   sortBy:"popularity",
    //   date:"2022-03-05",
	//   random:0,
	// 	};
	}
	Reload=()=>{
		window.location.reload(false);
	}
	// ComponentDidMount is used to
	// execute the code
	componentDidMount() {

		let randomNum=Math.floor((Math.random() * 10) + 1);
		console.log("in cdm");
		console.log("Random Num is ",randomNum)
		const items=fetch(
			`https://newsdata.io/api/${this.state.pageNo}/news?apikey=${this.state.YOUR_API_KEY}&country=${this.state.COUNTRY}`)
						.then((res) => res.json())
						.then((json) => {
							this.setState({
								items: json,
								DataisLoaded: true,
								random:randomNum,
								result:json.results[randomNum]
							});
						})
						console.log(this.state.items)
// 		const items=fetch(
// `https://newsapi.org/v2/everything?q=${this.state.title}&from=2022-03-05&sortBy=${this.state.sortBy}&apiKey=${this.state.API_KEY}`)
// 			.then((res) => res.json())
// 			.then((json) => {
// 				this.setState({
// 					items: json,
// 					DataisLoaded: true,
// 					random:randomNum,
// 				});
// 			})
    }
    render() {
      const { DataisLoaded, items } = this.state;
	  
	  if(!DataisLoaded && items.length==0){
		  return(
			  <div>
				<Header />
				<div className='loading loadingExceed'>

					<h3>Enough of news now</h3>
					<p>Come Tommorow!</p>
				</div>
			</div>
		  )
	  }			 

	  if (!DataisLoaded) return <div className='loading'>
		  	<img src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Loader.gif/480px-Loader.gif' alt='loading..'/>
			<h1> Pleses wait some time.... </h1> </div> ;
	//   console.log("Result ",this.state.items);
	//   console.log("C",typeof this.state.items.category[0] !== 'undefined')
	//   if(){
	//   console.log("no result")
	//   return(
	// 	<div className='loading'>
	// 		Something went Wrong
	// 		<button className='btnRed' onClick={this.Reload}>Retry</button>
	// 	</div>)}
	return(

    <div>
      <Header />
	  {/* <News /> */}
      <News 
		Category={this.state.result.category[0]?this.state.result.category[0]:"Top"}
		headline={this.state.result.title} 
		video_={this.state.result.video_url}
		image_={this.state.result.image_url} 
		description={this.state.result.description}
		source_={this.state.result.source_id}
		/>
		<button onClick={this.Reload}>Next!</button>
      {/* <News headline={this.state.items.articles[7].title} image_={this.state.items.articles[7].urlToImage} description={this.state.items.articles[7].description}/> */}
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

