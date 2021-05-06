import '../../styles/components/MagicObject.scss'
import itemPoster from '../../assets/images/poster_2.png'

const MagicObjectPoster = ({ highlight = false }) => {

  return (
    <div className={`MagicObject MagicObjectPoster ${ highlight ? 'active' : '' }`}>
      <svg viewBox="0 0 213.7 342.5">
        <g className={`MagicObject_shadow ${ highlight ? 'active' : '' }`}>
          <path fill="#FFEACC" d="M8,8.5l197.1,11.1l0.1,30.7c0,0,0,0,0,0v0c0,0,0,0,0,0l0,3.5c0,0,0,0,0,0v0c0,0,0,0,0,0l0,3.5c0,0,0,0,0,0
            l0.5,228.9c0,0,0,0,0,0s0,0,0,0l0,3.5v0l0.1,27.2l-0.1,0l-79.2,6.9L8.7,333.8L8,8.5 M0,0l0,8.5l0.7,325.3l0,8.7l8.7-0.8l117.7-10.2
            l79.2-6.9l0.1,0l7.3-0.6l0-7.4l-0.1-27.2l0-3.5l-0.5-228.9l0-3.5l0-3.5l-0.1-30.7l0-7.5l-7.5-0.4L8.5,0.5L0,0L0,0z"/>
        </g>
      </svg>
      <img nopin="nopin" style={{position: 'absolute', top:0, left: 0, width:"100%"}} src={itemPoster} alt=''/>
    </div>
  )
}

export default MagicObjectPoster
