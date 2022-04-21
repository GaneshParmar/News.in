import React, { Component } from 'react'
import cskLogo from '../Images/Logo/csk.png'
import milogo from '../Images/Logo/mumbai.png'
import rrlogo from '../Images/Logo/rr.png'
import rcblogo from '../Images/Logo/rcb.png'
import dlogo from '../Images/Logo/delhi.png'
import srhlogo from '../Images/Logo/srh.jfif'
import lsglogo from '../Images/Logo/lsg.png'
import gtlogo from '../Images/Logo/gt.png'
import kkrlogo from '../Images/Logo/kkr.png'
import pbkslogo from '../Images/Logo/punjab.png'
import '../Css/MatchCard.css'

export class MatchCard extends Component {
  

    constructor(props){
        super()
        this.state={
            matchData_:[],
            dataLoaded:false
        }
        window.scoreData_=this.state.matchData_

    }

    dataFetched(){
                fetch(
                    `https://cricket-api.vercel.app/cri.php?url=https://www.cricbuzz.com/live-cricket-scores/${this.props.matchNo}/`)
                                .then((res) => res.json())
                                .then((json) => {
                                        this.setState({
                                            matchData_:json,
                                            dataLoaded:true
                                        })
                                })
            }



    componentDidMount(){
        this.dataFetched()
        setInterval(() => {
            this.dataFetched()
        }, 5000);
    }

    // Check live

    live=()=>{
        if(this.state.matchData_.livescore.current!="Data Not Found"){
            return <p className='text-danger h6'>Live</p>
        }
    }

    // Get batsman stat
    getBatsmanScore=()=>{
        {/* "batsman": "Suryakumar Yadav*",
    "batsmanrun": "29",
    "ballsfaced": "(16)", */}
    let scoreData=this.state.matchData_.livescore
        return(
            <>
                <p>{scoreData.batsman} {scoreData.batsmanrun=="Data Not Found"?0:scoreData.batsmanrun}{scoreData.ballsfaced=="Data Not Found"?(0):scoreData.ballsfaced}</p>
                <p>{scoreData.batsmantwo} {scoreData.batsmantworun=="Data Not Found"?0:scoreData.batsmantworun}{scoreData.batsmantwoballsfaced=="Data Not Found"?'(0)':scoreData.batsmantwoballsfaced}</p>
            </>
        );
    }

    getBowlerStat=()=>{
        // "bowler": "Maheesh Theekshana*",
        // "bowlerover": "1.5",
        // "bowlerruns": "14",
        // "bowlerwickets": "0",


        let scoreData=this.state.matchData_.livescore
        return (<>
            <p>{scoreData.bowlerwickets+"/"+scoreData.bowlerruns+"("+scoreData.bowlerover+") "+scoreData.bowler}</p>
            <p>{scoreData.bowlertwowickets+"/"+scoreData.bowlertworuns+"("+scoreData.bowletworover+") "+scoreData.bowlertwo}</p></>);}

    // get bowler state

    renderUpdate=()=>{
        if(this.state.matchData_.livescore.current!="Data Not Found"){
            return(<>
                <div className='team1 team-stats'>
                    {this.getBatsmanScore()}
                </div>
                <div className='team2 team-stats'>
                    {this.getBowlerStat()}
                </div>
            </>)
        }
    }
    getTeamLogo=(team,t1=true)=>{
        let t=''
        if(t1==true){
            t=team.team1
        }
        else{
            t=team.team2
        }
        switch (t) {
            case 'Chennai':
                return ([cskLogo,"Csk"])
        
            case 'Mumbai':
                return ([milogo,"Mi"])
        
            case 'Rajasthan':
                return ([rrlogo,"Rr"])
        
            case 'Royal':
                return ([rcblogo,"Rcb"])
        
            case 'Kolkata':
                return ([kkrlogo,"Kkr"])
        
            case 'Sunrisers':
                return ([srhlogo,"Srh"])
        
            case 'Delhi':
                return ([dlogo,"Del"])
        
            case 'Lucknow':
                return ([lsglogo,"Lsg"])
        
            case 'Gujarat':
                return ([gtlogo,"Gt"])
        
            case 'Punjab':
                return ([pbkslogo,"Pbks"])
        
        
            default:
        
        }
    }

    //get Live commentry
    getLiveCommentry=()=>{
    let scoreData=this.state.matchData_.livescore
    if(scoreData.commentary!="Data Not Found")
        return(
            <>
                <h5>Live commentary</h5>
                <div className='comment shadow'>
                    {scoreData.commentary[0]}
                </div>
                <div className='comment shadow'>
                    {scoreData.commentary[1]}
                </div>
                <div className='comment shadow'>
                    {scoreData.commentary[2]}
                </div>
            </>
        );
    }

    getScoreTeam1=()=>{
        let scoreData=this.state.matchData_.livescore
        if (!scoreData.update.includes("runs")) {
            return scoreData.current.split("-")[1]
            
        }
        else{
            return "Bated"
        }
    }

    getScoreTeam2=()=>{
        let scoreData=this.state.matchData_.livescore
        if (scoreData.update.includes("runs")) {
            return scoreData.current.split("-")[1]
        }
        else{
            return ""
        }
    }

    teamPlaying=()=>{
            const title=this.state.matchData_.livescore.title
            // const title="Delhi Capitals vs Punjab Kings, 32nd Match"
            const team1=title.split("vs")[0].split(" ")[0]
            const team2=title.split("vs")[1].split(" ")[1]
    
    
            return(
                <>
                <div className='team team1'>
                            <div className='team1Img'>
                                <img src={this.getTeamLogo({team1})[0]} alt="team1" width={60}/>
                                <h4>{this.getTeamLogo({team1})[1]}</h4>
                            </div>
                            <div className='team1Score score'>
                                {this.getScoreTeam1()}
                            </div>
                        </div>
    
                        <h1 className='text-primary'>Vs</h1>
    
                        <div className='team team2'>
                            <div className='team2Img'>
                                <img src={this.getTeamLogo({team2},false)[0]} alt="team2" width={60}/>
                                <h4>{this.getTeamLogo({team2},false)[1]}</h4>
                            </div>
                            <div className='team2Score score'>
                                {this.getScoreTeam2()}
                            </div>
                        </div>    
                        </>
            );
    }


    render() {


    if(!this.state.dataLoaded){
        return <p>loading</p>
    }
    else{
        
            return (
            <div className='card p-2 shadow'>
                <p className='text-danger'>
                    {this.live()}
                </p>
                <div className='cardWrap1'>
                    {this.teamPlaying()}
                </div>
                <p className='text-center text-secondary m-2'>{this.state.matchData_.livescore.update}</p>
                <div className='cardWrap2'>
                    {this.renderUpdate()}
                </div>
                {this.getLiveCommentry()}
        
            </div>
            )

    }
  }
}

export default MatchCard
