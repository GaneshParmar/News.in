import React, { Component } from 'react'
import MatchCard from './MatchCard';



export class CricketScore extends Component {


        constructor(props){
            super(props);
            this.state = {
                scoreData: [],
                DetailsLoaded:false,
                result:'',
                matchno:localStorage.getItem('NextMatchId')?parseInt(localStorage.getItem('NextMatchId'))-5:46026
            };
            if(localStorage.getItem('NextMatchId')==null){
                console.log('true')
                localStorage.setItem('NextMatchId', this.state.matchno + 5);
            }
        }

    // Change state
     

    // Fetching the data

     dataFetched(matchId) {
        fetch(
            `https://cricket-api.vercel.app/cri.php?url=https://www.cricbuzz.com/live-cricket-scores/${matchId}/`)
                        .then((res) => res.json())
                        .then((json) => {
                            this.setState({
                                scoreData: json,
                                DataisLoaded: true,
                                result:json.livescore.current
                            });
                        })
    }

    // Change match no
    changeMatchNo(){
        let nextmatchid=parseInt(localStorage.getItem('NextMatchId'))
        console.log('Next id from locS',nextmatchid)
        this.setState({
            matchno:nextmatchid
        })
        localStorage.setItem('NextMatchId', JSON.stringify(nextmatchid+5));
        console.log(this.state.matchno)
    }

    // Checking new matches
    checkNewMatch=()=>{
        
        fetch(
            `https://cricket-api.vercel.app/cri.php?url=https://www.cricbuzz.com/live-cricket-scores/${localStorage.getItem('NextMatchId')}/`)
                        .then((res) => res.json())
                        .then((json) => {
                            console.log(json.livescore.update)
                            if(json.livescore.update!='Data Not Found'){
                                this.changeMatchNo()
                                this.checkNewMatch()
                            }    
                        
                        })
    }

    
    componentDidMount(){
        this.checkNewMatch()
        setTimeout(() => {
                this.dataFetched(this.state.matchno)
        }, 2000);
    }



  render() {

    const {DataisLoaded,result}=this.state

    if (!DataisLoaded) {return(
		<div>
		<div className='loading'>
              <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Loader.gif/380px-Loader.gif' alt='loading..'/>
			  </div>
		</div>);}
    return (
      <div className='d-flex flex-wrap'>
            <MatchCard matchNo={this.state.matchno}/>        
            <MatchCard matchNo={this.state.matchno-5}/>        
            <MatchCard matchNo={this.state.matchno-10}/>        
      </div>
    )
  }
}

export default CricketScore