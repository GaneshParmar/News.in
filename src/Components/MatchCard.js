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
import bat from '../Images/cricket-bat.png'
import ball from '../Images/cricket-ball.png'
import '../Css/MatchCard.css'
import _ from 'lodash';
import { isEqual } from 'lodash';

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
                                    if(!isEqual(json,this.state.matchData_)){
                                        console.log("Updated")
                                        this.setState({
                                            matchData_:json,
                                            dataLoaded:true
                                        })
                                    }
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
        let scoreData=this.state.matchData_.livescore

        if(scoreData.current!="Data Not Found" && scoreData.teamtwo=="Data Not Found"){
            if(scoreData.commentary[0]=="Timeout!")
            {
                return <p className='text-success h6'>Timeout</p>
            }
            return <p className='text-danger h6'>Live</p>
        }
        else{
            if(scoreData.update.includes("Starts")){
                return <p className='w-10 p-1 rounded text-light bg-primary upcoming'>Up Coming</p>
            }
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
                <p>{scoreData.batsman.replace("*","")}<img src={bat} alt='bat' width={10}/>{scoreData.batsmanrun=="Data Not Found"?0:scoreData.batsmanrun}{scoreData.ballsfaced=="Data Not Found"?(0):scoreData.ballsfaced}</p>
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
            <p>{scoreData.bowlerwickets+"/"+scoreData.bowlerruns+"("+scoreData.bowlerover+") "+scoreData.bowler.replace("*","")}<img src={ball} alt='bal l' width={10}/></p>
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
            <div className="p-2">
                <h5>Live commentary <i class="fa fa-volume-up m-1" aria-hidden="true"></i></h5>
                <div className='comment shadow-lg'>
                    {typeof(scoreData.commentary)!="string"?scoreData.commentary[0]:scoreData.commentary}
                </div>
            </div>
        );
    }
// Get over Runs
    getOverRuns=(runs)=>{
        let len=runs.length
        let divRuns=[]

        for (let i = 1; i < len; i++) {
            if(runs[i]==6){
                divRuns.push(<span className='text-success m-2'>6</span>)
            }
            else if(runs[i]==4){
                divRuns.push(<span className='text-primary m-2'>4</span>)
            }
            else if(runs[i]==0){
                divRuns.push(<span className='h4 circle'></span>)
            }
            else if(runs[i]=='W'){
                divRuns.push(<span className='bg-danger p-1 m-2 rounded text-light'>W</span>)
            }
            else{
                divRuns.push(<span className=''>{runs[i]}</span>)
            }
        }

        return divRuns
    }


    // Get Over Stat
    getOverStat=()=>{
        let scoreData=this.state.matchData_.livescore
        let firstOver=2
        let secondOver=1 
        if(scoreData.recentballs!="Data Not Found"){

            if(scoreData.recentballs.split("|").length==2){
                firstOver=1
                secondOver=0
            }

            let lastover=scoreData.recentballs.split("|")[secondOver].split(" ")
            console.log(lastover)
            let thisover=scoreData.recentballs.split("|")[firstOver].split(" ")
            console.log(thisover)
            return <><p className='text-secondary m-2'>This Over</p><div className='d-flex w-50 m-auto justify-content-evenly align-items-center'>{this.getOverRuns(thisover)}</div>
                    <p className='text-secondary m-2'>Last Over</p><div className='d-flex w-50 m-auto justify-content-evenly align-items-center'>{this.getOverRuns(lastover)}</div>
            </>
        }
    }

    getScoreTeam1=(team,t1=true)=>{

        let scoreData=this.state.matchData_.livescore
        let teamPlaying=this.getTeamLogo(team,t1)[1].toUpperCase()
        let T1=[]
        
        if(scoreData.teamone!="Data Not Found"){
            // Getting the team name
                let teamone=scoreData.teamone.split("-")[0].split(" ")[0]

                if(teamone==teamPlaying){
                    T1=scoreData.teamone.split("-")[1].split(" ")
                }
                else{
                    T1=scoreData.teamtwo.split("-")[1].split(" ")
                }
        }    
        else{
            // Getting the team name
            let teamone=scoreData.current.split("-")[0].split(" ")[0]
            if(teamone==teamPlaying){
                T1=scoreData.current.split("-")[1].split(" ")
            }
        }

        if (scoreData.update.includes("won")) {

                return <>{T1[1]}<p className=''>{T1[2]}</p></>
            }
        else{
            if(T1==[]){
                return "Bated"
            }
            else{
                return <>{T1[1]}<p className=''>{T1[2]}</p></>
            }
        }
        
    }
    
    getScoreTeam2=(team,t1=true)=>{
        let scoreData=this.state.matchData_.livescore
        let teamPlaying=this.getTeamLogo(team,t1)[1].toUpperCase()
        
        let T1=[]
        
        if(scoreData.teamone!="Data Not Found"){
            // Getting the team name
                let teamone=scoreData.teamone.split("-")[0].split(" ")[0]

                if(teamone==teamPlaying){
                    T1=scoreData.teamone.split("-")[1].split(" ")
                }
                else{
                    T1=scoreData.teamtwo.split("-")[1].split(" ")
                }
        }    
        else{
            // Getting the team name
            let teamone=scoreData.current.split("-")[0].split(" ")[0]
            if(teamone==teamPlaying){
                T1=scoreData.current.split("-")[1].split(" ")
            }
        }
        
        if (scoreData.update.includes("won")) {

            return <>{T1[1]}<p className=''>{T1[2]}</p></>
        }
        else{
            if(T1==[]){
                return "Bated"
            }
            else{
                return <>{T1[1]}<p className=''>{T1[2]}</p></>
            }
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
                            <div className='team1Score score d-flex'>
                                {
                                    this.getScoreTeam1({team1})
                                }
                            </div>
                        </div>
    
                        <h1 className='text-primary'>Vs</h1>
    
                        <div className='team team2'>
                            <div className='team2Img'>
                                <img src={this.getTeamLogo({team2},false)[0]} alt="team2" width={60}/>
                                <h4>{this.getTeamLogo({team2},false)[1]}</h4>
                            </div>

                            <div className='team2Score score d-flex'>
                                {this.getScoreTeam2({team2},false)}
                            </div>
                        </div>    
                        </>
            );
    }

    getOrder=()=>{
        let scoreData=this.state.matchData_.livescore
        if(scoreData.current!="Data Not Found" && scoreData.teamtwo=="Data Not Found"){
            return "card p-2 shadow order-first"
        }
        else{
            return "card p-2 shadow"
        }
    }

    //get last wicket
    getLastWicket=()=>{
        let scoreData=this.state.matchData_.livescore
        if(scoreData.lastwicket!="Data Not Found"){
            return (<div className='d-flex align-items-center'><div className='text-secondary m-2 p-1 rounded-circle'>Last Wicket</div><span className='text-light bg-danger p-1'>w</span>{scoreData.lastwicket}</div>)
        }
    }

    render() {


    if(!this.state.dataLoaded){
        return <p>loading</p>
    }
    else{
        
            return (
            <div className={this.getOrder()}>
                <p className='text-danger'>
                    {this.live()}
                    <p className='d-block text-secondary'>Credit:-<a href={`https://www.cricbuzz.com/live-cricket-scores/${this.props.matchNo}/`}>Cricbuzz</a></p>
                </p>
                <div className='cardWrap1'>
                    {this.teamPlaying()}
                </div>
                <p className='text-center text-dark m-2 update'>{this.state.matchData_.livescore.update}</p>
                <div className='cardWrap2'>
                    {this.renderUpdate()}
                </div>
                <div className='overWrap'>
                    {this.getOverStat()}
                </div>
                <div className='lastWicket text-center m-2 shadow rounded'>
                    {this.getLastWicket()}
                </div>
                <div className='bg-primary text-light rounded d-flex'>
                    {this.getLiveCommentry()}
                </div>
        
            </div>
            )

    }
  }
}

export default MatchCard
