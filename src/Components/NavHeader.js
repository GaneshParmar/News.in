import React from 'react';
import '../Css/NavHeader.css';

function NavHeader({parentCallback}) {


  function tagChange(e) {
      const tag_=e.target.value
      parentCallback(tag_)
  }
  
    
  return (
    <div>
       
        <ul className="nav rounded-pill my-2 bg-light border-secondary m-auto shadow p-2">
            {/* <li className="nav-item p-1 nav-link text-secondary">
                Tags
            </li> */}
            <li className="nav-item p-1 nav-link">
                <input type='radio' id='navTag1' name='navTag' value={'all'} defaultChecked  onChange={tagChange}/>
                <label htmlFor="navTag1">#All</label>
            </li>
            <li className="nav-item p-1">
                <input type='radio' id='navTag2' name='navTag' value={'top'} onChange={tagChange}/>
                <label htmlFor="navTag2">#Top</label>
                {/* <a className="nav-link" href="#" onClick={()=>{changeTag('top')}}>#Top</a> */}
            </li>
            <li className="nav-item p-1">
                <input type='radio' id='navTag3' name='navTag' value={'sports'} onChange={tagChange}/>
                <label htmlFor="navTag3">#Sports</label>
            </li>
            <li className="nav-item p-1">
                <input type='radio' id='navTag4' name='navTag' value={'technology'} onChange={tagChange}/>
                <label htmlFor="navTag4">#Technology</label>
            </li>
            <li className="nav-item p-1">
                <input type='radio' id='navTag5' name='navTag' value={'entertainment'} onChange={tagChange}/>
                <label htmlFor="navTag5">#Entertainment</label>
            </li>
            <li className="nav-item p-1">
                <input type='radio' id='navTag6' name='navTag' value={'cricket'} onChange={tagChange}/>
                <label htmlFor="navTag6">#LiveScoreIpl</label>
            </li>
        </ul>
    </div>
  )
}

export default NavHeader