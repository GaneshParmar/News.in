import React, { Component } from 'react'
import MatchCard from './MatchCard';
import '../Css/MatchCard.css'


export class CricketScore extends Component {


        constructor(props){
            super(props);
            this.state = {
                matchesData: [],
                DetailsLoaded:false,
                error_:false,
                result:'',
                // matchno:localStorage.getItem('NextMatchId')?parseInt(localStorage.getItem('NextMatchId'))-5:46026
            };
            // if(localStorage.getItem('NextMatchId')==null){
            //     console.log('true')
            //     localStorage.setItem('NextMatchId', this.state.matchno + 5);
            // }
        }

    // Change state
     

    // Fetching the data

     dataFetched(matchId) {
        


        fetch(
            'https://api.cricapi.com/v1/series_info?apikey=31b0ffd7-1465-4dae-a54a-52875daead33&offset=0&id=47b54677-34de-4378-9019-154e82b9cc1a')
                        .then((res) => res.json())
                        .then((json) => {
                            console.log(json)
                            this.setState({
                                matchesData: json,
                                DataisLoaded: true,
                                error_:false,
                                result:json.data.matchList
                            });
                        })
                        .catch(error => {
                            console.log("Error",error)
                            this.setState({
                                error_:true,
                                DetailsLoaded:true
                            })
                        })
    }
    
    componentDidMount(){
        this.dataFetched()
        // this.checkNewMatch()
        // setTimeout(() => {
        //         this.dataFetched(this.state.matchno)
        // }, 2000);
    }

    // getMatches
    getMatches=()=>{
        console.log(this.state.result)
        const matchList=this.state.result
        const matches=[]
        console.log(matchList[0])
        // matches.push(<MatchCard matchData={matchList[0]}/>)
        // matchList.forEach(match => {
        //     matches.push(<MatchCard matchData={match}/>)
        // });

        let Matchno=1
        let lastMatch=[]
        let upcomingMatch=[]
        let match=[]
        let upcminngMatchRecorded=false

        matches.push(lastMatch)
        for (let i = 0; i < matchList.length; i++) {
            for (let i = 0; i < matchList.length; i++) {
                // parseInt(("Punjab Kings vs Gujarat Titans, 16th Match").split(",")[1].split(" ")[1])
                match=matchList[i]
                let matchNo=parseInt(match.name.split(",")[1].split(" ")[1])
                if(Matchno==matchNo && (match.status!="Match not started" || !upcminngMatchRecorded)){
                    if(match.status=="Match not started"){
                        upcomingMatch=<MatchCard matchData={match} upcoming={true} lastMatch={false}/>
                        upcminngMatchRecorded=true
                        matches.pop()
                        matches.push(lastMatch)
                    }
                    else{
                        lastMatch=<MatchCard matchData={match} upcoming={false} lastMatch={true}/>
                        matches.push(<MatchCard matchData={match} upcoming={false} lastMatch={false}/>)
                        Matchno=Matchno+1
                    }
                }
            }
            
        }

        
        matches.push(upcomingMatch)

        // if(matches.length!=70){
        //     let upcomingmatchNo=matches.length
        //     const newUpcomingMatch=
        //     matches.push(newUpcomingMatch)
        // }

        return matches
    }

//Get Counter
    // getCounter=()=>{
    //     let i=0
        
    // }

  render() {

    const {DataisLoaded,result}=this.state

    if(this.state.error_){
        console.log("I am inside")
        return (<div>
            <p className='d-block text-secondary'>Something went wrong!:-<a href='https://www.google.com/search?q=ipl&rlz=1C1RXQR_enIN994IN994&oq=ipl'>click here</a></p>
        </div>)
    }    
    else if (!this.state.DataisLoaded) {return(
		<div>
		<div className='loading'>
              <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Loader.gif/380px-Loader.gif' alt='loading..'/>
			  </div>
		</div>);}
    return (
      <div className='d-flex flex-wrap wrap'>
          {this.getMatches()}
      </div>
    )
  }
}

export default CricketScore