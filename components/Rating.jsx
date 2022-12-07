import React from 'react'
import PropTypes from 'prop-types'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { FaStarHalfAlt } from 'react-icons/fa'

const Rating = ({rating,text,color}) => {
  return (
    <div className="rating">
            <span>
                {rating >=1 ?  <AiFillStar style={{color,fontSize:"20px"}} /> : rating>=.5 ? <FaStarHalfAlt style={{color,fontSize:"16.5px",marginBottom:"2.2px",marginLeft:"1px"}}/>  :  <AiOutlineStar style={{color,fontSize:"20px"}}   />} 
                {rating >=2 ?  <AiFillStar style={{color,fontSize:"20px"}} /> : rating>=1.5 ? <FaStarHalfAlt style={{color,fontSize:"16.5px",marginBottom:"2.2px",marginLeft:"1px"}}/>  :  <AiOutlineStar style={{color,fontSize:"20px"}}   />} 
                {rating >=3 ?  <AiFillStar style={{color,fontSize:"20px"}} /> : rating>=2.5 ? <FaStarHalfAlt style={{color,fontSize:"16.5px",marginBottom:"2.2px",marginLeft:"1px"}}/>  :  <AiOutlineStar style={{color,fontSize:"20px"}}   />} 
                {rating >=4 ?  <AiFillStar style={{color,fontSize:"20px"}} /> : rating>=3.5 ? <FaStarHalfAlt style={{color,fontSize:"16.5px",marginBottom:"2.2px",marginLeft:"1px"}}/>  :  <AiOutlineStar style={{color,fontSize:"20px"}}   />} 
                {rating >=5 ?  <AiFillStar style={{color,fontSize:"20px"}} /> : rating>=4.5 ?  <FaStarHalfAlt style={{color,fontSize:"16.5px",marginBottom:"2px",marginLeft:"1px"}}/>  :  <AiOutlineStar style={{color,fontSize:"20px"}}   />} 
            </span>
            <span>({text && text})</span>
    </div>
  )
}

Rating.defaultProps={
        color:"#f02d34"
}

Rating.propTypes={
        rating:PropTypes.number.isRequired,
        text:PropTypes.string.isRequired,
        color:PropTypes.string
}

export default Rating