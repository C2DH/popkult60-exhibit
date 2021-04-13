import '../../styles/components/MagicObject.scss'
import itemMagTv from '../../assets/images/magTv_2.png'
import itemMagPilote from '../../assets/images/magPilote_2.png'

const MagicObjectMag = ({ highlight = false, version='' }) => {

  return (
    <div className={`MagicObject MagicObjectMag ${ highlight ? 'active' : '' }`}>
      <svg viewBox="0 0 244.6 92.6">
        <g className={`MagicObject_shadow ${ highlight ? 'active' : '' }`}>
          <path fill="#FFEACC" d="M104.8,0L0,28.6l137.7,64L244.4,63L104.8,0L104.8,0z"/>
        </g>
      </svg>
      <img className="MagicObject_image" src={version === 'magPilote' ? itemMagPilote: itemMagTv} alt=''/>
    </div>
  )
}

export default MagicObjectMag
