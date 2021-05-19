import '../../styles/components/MagicObject.scss'
import itemTv from '../../assets/images/tv_2.png'

const MagicObjectTv = ({ highlight = false }) => {

  return (
    <div className={`MagicObject MagicObjectTv ${ highlight ? 'active' : '' }`}>
      <svg viewBox="0 0 303.3 377">
        <g className={`MagicObject_shadow ${ highlight ? 'active' : '' }`}>
          <path fill="#FFEACC" d="M288.2,8l4.8,3.3c1.3,0.7,2.3,2.1,2.3,3.7v194.1c0,1.4-0.7,2.6-1.8,3.4l-8.2,9.9h-50.9l29.7,146.5h-4.9h-1.7
            h-2.8l-31.9-146.5h-34.9h-24.6l-0.9,98.1h-5.8l-0.9-98.1h-40.3H82.6L50.7,368.9h-1.8h-4.1h-3.5L71,222.4H18l-8.4-9.9
            c0,0-1.6-2-1.6-3.4V15c0-2.3,1.9-4.2,4.2-4.2h0.4L18.9,8H116h72.2H288.2 M290.7,0h-2.5h-100H116H18.9h-1.7l-1.6,0.7l-5,2.2
            C4.7,3.7,0,8.8,0,15v194.1c0,3.6,2,6.8,3.3,8.4l0.1,0.1l0.1,0.1l8.4,9.9l2.4,2.8H18h43.2L33.5,367.3l-1.9,9.6h9.8h3.5h4.1h1.8h6.5
            l1.4-6.3l30.5-140.2h26.3h32.3l0.8,90.2l0.1,8h8h5.8h8l0.1-8l0.8-90.2h16.6h28.5l30.5,140.2l1.4,6.3h6.5h2.8h1.7h4.9h9.8l-1.9-9.6
            l-27.7-136.9h41.1h3.8l2.4-2.9l7.7-9.3c2.6-2.3,4.1-5.6,4.1-9.1V15c0-4.4-2.3-8.4-6.1-10.5l-4.5-3.1L290.7,0L290.7,0z"/>
        </g>
      </svg>
      <img nopin="nopin" style={{position: 'absolute', top:0, left: 0, width:"100%"}} src={itemTv} alt=''/>
    </div>
  )
}

export default MagicObjectTv
